import { useState, useMemo } from "react";
import type { Weapon } from "@/types";
import { useInventoryStore } from "@/store/inventory";
import { AddButton, RemoveButton } from "@/components/buttons";
import { AddToPlannerModal } from "@/components/AddToPlannerModal";
import { RemoveFromPlannerModal } from "@/components/RemoveFromPlannerModal";
import { WeaponConfigModal } from "@/components/WeaponConfigModal";
import { PlannerSection } from "@/components/cards/PlannerSection";
import { calculateWeaponTotalMaterials } from "@/utils/materialCalculator";
import { sortMaterialsByCategory } from "@/utils/materialSorter";
import {
  getAllWeaponMaterialIds,
  mergeWithAllMaterials,
} from "@/utils/allMaterialsGenerator";

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Calculate required materials
  const requiredMaterials = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];
    const materials = calculateWeaponTotalMaterials(weapon, progress);
    return sortMaterialsByCategory(materials);
  }, [plannerMode, isInPlanner, progress, weapon]);

  // Get all possible materials with empty markers
  const allMaterialsDisplay = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];

    // Get all possible material IDs for this weapon
    const allMaterialIds = getAllWeaponMaterialIds(weapon);

    // Filter to get only normal materials (not EXP or Shell Credits)
    const normalRequired = requiredMaterials.filter(
      (m) =>
        m.materialId !== "weapon-exp" &&
        m.materialId !== "shell-credit-leveling" &&
        m.materialId !== "shell-credit"
    );

    // Merge with all possible materials
    const allMaterials = mergeWithAllMaterials(allMaterialIds, normalRequired);

    // Sort: materials you don't have enough of first, then the rest
    const getMaterialQuantity = (materialId: string) => {
      return effectiveInventory !== undefined
        ? effectiveInventory[materialId] || 0
        : 0;
    };

    const materialsNeeded: typeof allMaterials = [];
    const materialsHave: typeof allMaterials = [];

    allMaterials.forEach((mat) => {
      const available = getMaterialQuantity(mat.materialId);
      const hasEnough = available >= mat.quantity;

      if (!hasEnough && mat.quantity > 0) {
        materialsNeeded.push(mat);
      } else {
        materialsHave.push(mat);
      }
    });

    return [...materialsNeeded, ...materialsHave];
  }, [
    plannerMode,
    isInPlanner,
    progress,
    weapon,
    requiredMaterials,
    effectiveInventory,
  ]);

  const rarityColors = {
    3: "from-blue-600 to-blue-700",
    4: "from-purple-600 to-purple-700",
    5: "from-amber-600 to-yellow-600",
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRemoveModal(true);
  };

  const weaponName = weapon.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <div className="h-full flex flex-col">
        <div
          className={`relative bg-gray-800 rounded-xl border ${
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

          {/* Top section: Image and Info side by side */}
          <div className="flex gap-4 p-4">
            {/* Weapon Image */}
            <div
              className={`relative w-24 h-32 bg-gradient-to-br ${
                rarityColors[weapon.rarity]
              } rounded-lg flex items-center justify-center ring-2 ring-gray-700 flex-shrink-0 overflow-hidden`}
            >
              {weapon.image ? (
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="w-20 h-28 object-contain drop-shadow-lg"
                />
              ) : (
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {weapon.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Weapon Info */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Name */}
              <h3 className="text-xl font-bold text-gray-100">{weaponName}</h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {/* Left Column */}
                <div className="space-y-1.5">
                  {/* Rarity */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-12">Stars:</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(weapon.rarity)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ATK */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-12">ATK:</span>
                    <span className="text-gray-200 text-sm font-medium">
                      {weapon.baseAtk}
                    </span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-1.5">
                  {/* Type */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-16">Type:</span>
                    <span className="text-gray-200 text-sm font-medium">
                      {weapon.type}
                    </span>
                  </div>

                  {/* Sub Stat */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-16">
                      Sub Stat:
                    </span>
                    <span className="text-gray-200 text-sm font-medium">
                      {weapon.subStat}
                    </span>
                  </div>
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
