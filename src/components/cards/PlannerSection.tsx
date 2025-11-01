import { useMemo } from "react";
import { ConfigButton } from "@/components/ConfigButton";
import { MaterialCard } from "@/components/material";
import { getMaterialsOfSameBase } from "@/utils/materialGrouping";
import {
  sortMaterialsByRequirement,
  getExpRequirement,
  getShellCreditRequirements,
  getAvailableExpFromInventory,
  getAvailableShellCredits,
  type MaterialRequirementWithEmpty,
  filterSpecialMaterials,
} from "@/utils/plannerHelpers";
import type { MaterialRequirement } from "@/utils/materialCalculator";
import { processExpMaterials } from "@/utils/materialCalculator";
import type { CharacterProgress, WeaponProgress } from "@/types";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { materials } from "@/data/materials";
import {
  consumeMaterialsFromInventory,
  calculateMaterialSynthesis,
  type MaterialRequirement as SynthesisRequirement,
  type MaterialInventory,
} from "@/utils/materialSynthesis";
import { SpecialMaterialUpdateModal } from "@/components/SpecialMaterialUpdateModal";

interface PlannerSectionProps {
  progress: CharacterProgress | WeaponProgress;
  type: "character" | "weapon";
  onConfigClick: () => void;
  requiredMaterials: MaterialRequirement[];
  allMaterialsDisplay: MaterialRequirementWithEmpty[];
  effectiveInventory?: Record<string, number>;
  onComplete: (itemId: string, newInventory: Record<string, number>) => void;
  isCompleted: boolean;
}

export function PlannerSection({
  progress,
  type,
  onConfigClick,
  requiredMaterials,
  allMaterialsDisplay,
  effectiveInventory,
  onComplete,
  isCompleted,
}: PlannerSectionProps) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [showSpecialMaterialsModal, setShowSpecialMaterialsModal] =
    useState(false);

  // Get special requirements (EXP and Shell Credits)
  const expRequirement = getExpRequirement(requiredMaterials, type);
  const { total: totalShellCredits } =
    getShellCreditRequirements(requiredMaterials);

  // Compute available EXP and Shell Credits from effectiveInventory if provided.
  // Parents may attach per-item metadata (__availableExp / __consumedExp) so prefer
  // that for display (shows X used / required). Otherwise fall back to aggregate totals.
  const availableExpFromMeta = effectiveInventory?.__availableExp ?? undefined;
  const consumedExpFromMeta = effectiveInventory?.__consumedExp ?? undefined;
  const availableShellFromMeta =
    effectiveInventory?.__availableShellCredits ?? undefined;
  const consumedShellFromMeta =
    effectiveInventory?.__consumedShellCredits ?? undefined;

  // Show the amount that was available to this item (pre-consumption) if present,
  // otherwise show the aggregate computed available EXP/credits.
  const availableExp =
    availableExpFromMeta !== undefined
      ? Math.min(
          availableExpFromMeta,
          consumedExpFromMeta ?? Number.POSITIVE_INFINITY
        )
      : getAvailableExpFromInventory(effectiveInventory, type);

  const availableShellCredits =
    availableShellFromMeta !== undefined
      ? Math.min(
          availableShellFromMeta,
          consumedShellFromMeta ?? Number.POSITIVE_INFINITY
        )
      : getAvailableShellCredits(effectiveInventory);

  // Sort materials: needed materials first (quantity > 0), preserve original order
  const sortedMaterials = useMemo(
    () => sortMaterialsByRequirement(allMaterialsDisplay),
    [allMaterialsDisplay]
  );

  // Check if we have enough resources to complete this item
  const canComplete = useMemo(() => {
    if (!effectiveInventory) return false;

    // Check EXP
    if (expRequirement && availableExp < expRequirement.quantity) {
      return false;
    }

    // Check Shell Credits
    if (totalShellCredits > 0 && availableShellCredits < totalShellCredits) {
      return false;
    }

    // Check regular materials (filter out special materials)
    const normalRequired = filterSpecialMaterials(requiredMaterials, type);

    // Group materials by baseName (for synthesis validation)
    const materialsByBase = new Map<
      string,
      {
        required: SynthesisRequirement;
        owned: MaterialInventory;
        materialIdsByQuality: Map<string, string>;
      }
    >();

    for (const req of normalRequired) {
      const material = materials.find((m) => m.id === req.materialId);
      if (!material) continue;

      // Only check materials with quality (common/forgery) or boss/overworld
      if (
        !(
          (material.quality &&
            (material.category === "COMMON" ||
              material.category === "FORGERY")) ||
          material.category === "BOSS" ||
          material.category === "OVERWORLD"
        )
      ) {
        continue;
      }

      // Handle materials with quality (common/forgery) - group by baseName
      if (material.quality && material.baseName) {
        if (!materialsByBase.has(material.baseName)) {
          materialsByBase.set(material.baseName, {
            required: {},
            owned: {},
            materialIdsByQuality: new Map(),
          });
        }

        const group = materialsByBase.get(material.baseName)!;
        group.required[material.quality] =
          (group.required[material.quality] || 0) + req.quantity;
        group.materialIdsByQuality.set(material.quality, material.id);
        group.owned[material.quality] = effectiveInventory[material.id] || 0;
      } else {
        // Handle simple materials (boss/overworld) - direct check
        const owned = effectiveInventory[req.materialId] || 0;
        if (owned < req.quantity) {
          return false;
        }
      }
    }

    // Check synthesis for each base material group
    for (const [, group] of materialsByBase) {
      const result = calculateMaterialSynthesis(group.required, group.owned);
      if (!result.canFulfill) {
        return false;
      }
    }

    return true;
  }, [
    effectiveInventory,
    expRequirement,
    availableExp,
    totalShellCredits,
    availableShellCredits,
    requiredMaterials,
    type,
  ]);

  const handleComplete = () => {
    try {
      const itemId =
        type === "character"
          ? (progress as CharacterProgress).characterId
          : (progress as WeaponProgress).weaponId;

      // Assume effectiveInventory is the current inventory
      // In a real application, you might fetch the actual current inventory here
      if (!effectiveInventory) {
        throw new Error("Current inventory not available.");
      }

      // Filter required materials to only include those with quality and categories 'COMMON' or 'FORGERY'
      const filteredRequiredMaterials = requiredMaterials.filter((req) => {
        const material = materials.find((m) => m.id === req.materialId);
        // Include materials that have quality (common/forgery) or are boss/overworld materials
        return (
          material &&
          ((material.quality &&
            (material.category === "COMMON" ||
              material.category === "FORGERY")) ||
            material.category === "BOSS" ||
            material.category === "OVERWORLD")
        );
      });

      // Convert MaterialRequirement[] to the format expected by consumeMaterialsFromInventory
      const materialsToConsume = filteredRequiredMaterials.map((req) => ({
        materialId: req.materialId,
        quantity: req.quantity,
      }));

      // --- Process EXP materials ---
      const expMaterialType =
        type === "character" ? "resonance-potion" : "energy-core";
      const expMaterialsResult = processExpMaterials(
        expRequirement?.quantity || 0,
        effectiveInventory,
        expMaterialType
      );

      // Merge exp materials to subtract with other materials to consume
      for (const matId in expMaterialsResult.materialsToSubtract) {
        const quantity = expMaterialsResult.materialsToSubtract[matId];
        const existing = materialsToConsume.find((m) => m.materialId === matId);
        if (existing) {
          existing.quantity += quantity;
        } else {
          materialsToConsume.push({
            materialId: matId,
            quantity: quantity,
          });
        }
      }

      let newInventory = consumeMaterialsFromInventory(
        effectiveInventory,
        materialsToConsume,
        type
      );

      // Add overflow exp materials back to inventory
      for (const matId in expMaterialsResult.materialsToAdd) {
        newInventory = {
          ...newInventory,
          [matId]:
            (newInventory[matId] || 0) +
            expMaterialsResult.materialsToAdd[matId],
        };
      }

      onComplete(itemId, newInventory);
      setShowCompleteModal(false);
    } catch (error) {
      setCompletionError(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  };

  return (
    <div className="px-4 pb-4 border-t border-gray-700 pt-4">
      {/* Configuration Button */}
      <div className="mb-4">
        <ConfigButton onClick={onConfigClick} progress={progress} type={type} />
      </div>

      {/* Special Requirements: EXP and Shell Credits (Total) */}
      <div className="mb-3 space-y-1.5 text-sm">
        <button
          onClick={() => setShowSpecialMaterialsModal(true)}
          className="block w-full text-left rounded-md hover:font-bold transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-xs">EXP:</span>
            <span
              className={`text-gray-300 ${!expRequirement ? "opacity-50" : ""}`}
            >
              {expRequirement
                ? `${availableExp.toLocaleString()} / ${expRequirement.quantity.toLocaleString()}`
                : "N/A"}
            </span>
          </div>
        </button>
        <button
          onClick={() => setShowSpecialMaterialsModal(true)}
          className="block w-full text-left rounded-md hover:font-bold transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-xs">Credits:</span>
            <span
              className={`text-gray-300 ${
                totalShellCredits === 0 ? "opacity-50" : ""
              }`}
            >
              {totalShellCredits > 0
                ? `${availableShellCredits.toLocaleString()} / ${totalShellCredits.toLocaleString()}`
                : "N/A"}
            </span>
          </div>
        </button>
      </div>

      {/* Materials Needed */}
      {sortedMaterials.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-gray-300">
              Materiales Necesarios
            </div>
            {!isCompleted && (
              <button
                onClick={() => {
                  setCompletionError(null);
                  setShowCompleteModal(true);
                }}
                disabled={!canComplete}
                className={`px-3 py-1 text-white text-xs rounded-md transition-colors ${
                  canComplete
                    ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                    : "bg-gray-600 opacity-50 cursor-not-allowed"
                }`}
                title={
                  !canComplete
                    ? "No hay suficientes materiales, experiencia o créditos"
                    : undefined
                }
              >
                Completar
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sortedMaterials.map((mat) => (
              <MaterialCard
                key={mat.materialId}
                materialId={mat.materialId}
                required={mat.quantity}
                isEmpty={mat.isEmpty}
                allMaterialsOfSameBase={getMaterialsOfSameBase(
                  mat.materialId,
                  sortedMaterials
                )}
                effectiveInventory={effectiveInventory}
                titleMode="popover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Confirmar Completado"
      >
        <div className="p-4">
          <p className="text-gray-300 mb-4">
            ¿Estás seguro de que quieres completar este elemento del
            planificador? Se restarán los materiales de tu inventario.
          </p>
          {completionError && (
            <div className="bg-red-900 text-red-300 p-3 rounded-md mb-4 text-sm">
              Error: {completionError}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowCompleteModal(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Aceptar
            </button>
          </div>
        </div>
      </Modal>

      {/* Special Materials Update Modal */}
      <SpecialMaterialUpdateModal
        isOpen={showSpecialMaterialsModal}
        onClose={() => setShowSpecialMaterialsModal(false)}
      />
    </div>
  );
}
