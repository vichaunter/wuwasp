import { useState, useMemo } from "react";
import type { Weapon } from "@/types";
import { useInventoryStore } from "@/store/inventory";
import { AddButton, RemoveButton } from "@/components/buttons";
import { AddToPlannerModal } from "@/components/AddToPlannerModal";
import { RemoveFromPlannerModal } from "@/components/RemoveFromPlannerModal";
import { WeaponConfigModal } from "@/components/WeaponConfigModal";
import { PlannerSection } from "./PlannerSection";
import { calculateWeaponTotalMaterials } from "@/utils/materialCalculator";
import {
  getAllWeaponMaterialIds,
  mergeWithAllMaterials,
} from "@/utils/allMaterialsGenerator";
import { filterSpecialMaterials } from "@/utils/plannerHelpers";

interface WeaponCardProps {
  weapon: Weapon;
  plannerMode?: boolean;
  effectiveInventory?: Record<string, number>;
}

export function WeaponCard({
  weapon,
  plannerMode = false,
  effectiveInventory,
}: WeaponCardProps) {
  const progress = useInventoryStore((state) =>
    state.getWeaponProgress(weapon.id)
  );
  const isInPlanner = progress?.enabled ?? false;
  const isCompleted = useInventoryStore((state) =>
    state.isWeaponCompleted(weapon.id)
  );
  const toggleWeaponCompleted = useInventoryStore(
    (state) => state.toggleWeaponCompleted
  );
  const setInventory = useInventoryStore((state) => state.setInventory);

  const handlePlannerComplete = (
    itemId: string,
    newInventory: Record<string, number>
  ) => {
    setInventory(newInventory);
    toggleWeaponCompleted(itemId);
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Calculate required materials (no sorting, PlannerSection handles it)
  const requiredMaterials = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];
    return calculateWeaponTotalMaterials(weapon, progress);
  }, [plannerMode, isInPlanner, progress, weapon]);

  // Get all possible materials with empty markers
  const allMaterialsDisplay = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];

    // Get all possible material IDs for this weapon
    const allMaterialIds = getAllWeaponMaterialIds(weapon);

    // Filter to get only normal materials (not EXP or Shell Credits)
    const normalRequired = filterSpecialMaterials(requiredMaterials, "weapon");

    // Merge with all possible materials (PlannerSection will handle sorting)
    return mergeWithAllMaterials(allMaterialIds, normalRequired);
  }, [plannerMode, isInPlanner, progress, weapon, requiredMaterials]);

  const rarityColors = {
    3: "from-blue-700 to-blue-800",
    4: "from-purple-700 to-purple-800",
    5: "from-amber-400 to-yellow-400",
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRemoveModal(true);
  };

  const weaponName = weapon.name;

  const handleCompletedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWeaponCompleted(weapon.id);
  };

  return (
    <>
      <div
        className={`h-full flex flex-col ${
          plannerMode && isCompleted ? "opacity-50" : ""
        }`}
      >
        <div
          className={`h-full flex flex-col relative bg-gray-800 rounded-xl border ${
            isInPlanner
              ? "border-purple-500 ring-2 ring-purple-500/50"
              : "border-gray-700 hover:border-purple-500"
          } transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}
        >
          {/* Add/Remove Button */}
          {isInPlanner ? (
            <RemoveButton onClick={handleRemoveClick} />
          ) : (
            <AddButton onClick={handleAddClick} />
          )}

          {/* Completed Check Button - Only in weapon list, not in planner */}
          {!plannerMode && (
            <button
              onClick={handleCompletedClick}
              className={`group absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer z-10 ${
                isCompleted
                  ? "bg-green-500 border-green-400"
                  : "bg-transparent border-gray-500 hover:border-gray-400"
              }`}
              title={
                isCompleted
                  ? "Arma completamente subida"
                  : "Marcar como completamente subida"
              }
            >
              <svg
                className={`w-4 h-4 transition-opacity ${
                  isCompleted
                    ? "text-white opacity-100"
                    : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}

          {/* Top section: Image and Info side by side */}
          <div className="flex gap-4 p-4">
            {/* Weapon Image */}
            <div
              className="relative w-24 h-32 rounded-lg flex items-center justify-center ring-2 ring-gray-700 flex-shrink-0 overflow-hidden group-hover:ring-purple-500/50 transition-all"
              style={{
                background: `radial-gradient(ellipse at center, rgba(17, 24, 39, 0.9) 35%, ${
                  weapon.rarity === 3
                    ? "rgba(29, 78, 216, 0.6)"
                    : weapon.rarity === 4
                    ? "rgba(147, 51, 234, 0.6)"
                    : "rgba(217, 119, 6, 0.6)"
                } 100%)`,
              }}
            >
              {/* Gradient from edges - more visible border effect */}
              <div
                className={`absolute inset-0 rounded-lg ${
                  weapon.rarity === 3
                    ? "bg-gradient-radial from-blue-600/60 via-blue-700/30 to-transparent"
                    : weapon.rarity === 4
                    ? "bg-gradient-radial from-purple-600/60 via-purple-700/30 to-transparent"
                    : "bg-gradient-radial from-amber-600/60 via-yellow-600/30 to-transparent"
                } opacity-70 group-hover:opacity-90 transition-opacity duration-300`}
                style={{
                  backgroundImage: `radial-gradient(ellipse 100% 110% at center, transparent 40%, ${
                    weapon.rarity === 3
                      ? "rgba(29, 78, 216, 0.8)"
                      : weapon.rarity === 4
                      ? "rgba(147, 51, 234, 0.8)"
                      : "rgba(217, 119, 6, 0.8)"
                  } 100%)`,
                }}
              ></div>

              {/* Subtle glow behind image */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${
                  rarityColors[weapon.rarity]
                } opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-30`}
              ></div>

              {/* Image container */}
              <div className="relative w-full h-full flex items-center justify-center p-1 z-10">
                {weapon.image ? (
                  <img
                    src={weapon.image}
                    alt={weapon.name}
                    className="w-20 h-28 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {weapon.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Weapon Info */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Name */}
              <h3 className="text-xl font-bold text-gray-100">{weaponName}</h3>

              {/* Stats - Flex wrap */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {/* Rarity */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">Stars:</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(weapon.rarity)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">Type:</span>
                  <span className="text-gray-200 text-xs font-medium truncate">
                    {weapon.type}
                  </span>
                </div>

                {/* ATK */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">ATK:</span>
                  <span className="text-gray-200 text-xs font-medium">
                    {weapon.baseAtk}
                  </span>
                </div>

                {/* Sub Stat */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">
                    Sub Stat:
                  </span>
                  <span className="text-gray-200 text-xs font-medium truncate">
                    {weapon.subStat}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Planner Section - Inside the card */}
          {plannerMode && isInPlanner && progress && (
            <PlannerSection
              progress={progress}
              type="weapon"
              onConfigClick={() => setShowConfigModal(true)}
              requiredMaterials={requiredMaterials}
              allMaterialsDisplay={allMaterialsDisplay}
              effectiveInventory={effectiveInventory}
              onComplete={handlePlannerComplete}
              isCompleted={isCompleted}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddToPlannerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        itemType="weapon"
        itemId={weapon.id}
        itemName={weapon.name}
        title="Añadir al Planificador"
        description={`¿Deseas añadir ${weapon.name} al planificador?`}
        acceptButtonText="Añadir"
        acceptButtonClass="bg-green-600 hover:bg-green-700"
        onConfirm={(selectedPosition) => {
          const updateWeaponAscension =
            useInventoryStore.getState().updateWeaponAscension;
          updateWeaponAscension(weapon.id, 0, 6, selectedPosition);
        }}
      />

      <RemoveFromPlannerModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        itemType="weapon"
        itemId={weapon.id}
        itemName={weapon.name}
      />

      {progress && (
        <WeaponConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          weapon={weapon}
          progress={progress}
        />
      )}
    </>
  );
}
