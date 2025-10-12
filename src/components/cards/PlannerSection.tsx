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
} from "@/utils/plannerHelpers";
import type { MaterialRequirement } from "@/utils/materialCalculator";
import type { CharacterProgress, WeaponProgress } from "@/types";

interface PlannerSectionProps {
  progress: CharacterProgress | WeaponProgress;
  type: "character" | "weapon";
  onConfigClick: () => void;
  requiredMaterials: MaterialRequirement[];
  allMaterialsDisplay: MaterialRequirementWithEmpty[];
  effectiveInventory?: Record<string, number>;
}

export function PlannerSection({
  progress,
  type,
  onConfigClick,
  requiredMaterials,
  allMaterialsDisplay,
  effectiveInventory,
}: PlannerSectionProps) {
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

  return (
    <div className="px-4 pb-4 border-t border-gray-700 pt-4">
      {/* Configuration Button */}
      <div className="mb-4">
        <ConfigButton onClick={onConfigClick} progress={progress} type={type} />
      </div>

      {/* Special Requirements: EXP and Shell Credits (Total) */}
      <div className="mb-3 space-y-1.5 text-sm">
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
      </div>

      {/* Materials Needed */}
      {sortedMaterials.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-300 mb-3">
            Materiales Necesarios
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
