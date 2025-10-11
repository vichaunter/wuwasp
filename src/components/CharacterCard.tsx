import { useState, useMemo } from "react";
import type { Character } from "@/types";
import { useInventoryStore } from "@/store/inventory";
import { AddButton, RemoveButton } from "@/components/buttons";
import { AddToPlannerModal } from "@/components/AddToPlannerModal";
import { RemoveFromPlannerModal } from "@/components/RemoveFromPlannerModal";
import { CharacterConfigModal } from "@/components/CharacterConfigModal";
import { ConfigButton } from "@/components/ConfigButton";
import { MaterialCard } from "@/components/material";
import { calculateCharacterTotalMaterials } from "@/utils/material-calculator";
import { sortMaterialsByCategory } from "@/utils/material-sorter";
import { getMaterialsOfSameBase } from "@/utils/material-grouping";

interface CharacterCardProps {
  character: Character;
  plannerMode?: boolean;
  effectiveInventory?: Record<string, number>;
}

export function CharacterCard({
  character,
  plannerMode = false,
  effectiveInventory,
}: CharacterCardProps) {
  const progress = useInventoryStore((state) =>
    state.getCharacterProgress(character.id)
  );
  const isInPlanner = progress?.enabled ?? false;

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Calculate required materials
  const requiredMaterials = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];
    const materials = calculateCharacterTotalMaterials(character, progress);
    return sortMaterialsByCategory(materials);
  }, [plannerMode, isInPlanner, progress, character]);

  // Border color based on rarity
  const rarityColors = {
    4: "from-purple-600 to-purple-700",
    5: "from-amber-500 to-yellow-600",
  };

  const borderGradient = rarityColors[character.rarity];

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRemoveModal(true);
  };

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
            {/* Character Image */}
            <div
              className={`relative w-24 h-32 bg-gradient-to-br ${borderGradient} rounded-lg flex items-center justify-center ring-2 ring-gray-700 flex-shrink-0 overflow-hidden`}
            >
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white drop-shadow-lg">
                  {character.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Character Info */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Name */}
              <h3 className="text-xl font-bold text-gray-100 capitalize">
                {character.name}
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {/* Left Column */}
                <div className="space-y-1.5">
                  {/* Rarity */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-12">Stars:</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(character.rarity)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tier */}
                  {character.tier && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400 text-xs w-12">Tier:</span>
                      <span
                        className={`font-bold text-sm px-2 py-0.5 rounded ${
                          character.tier === "S"
                            ? "bg-red-500/20 text-red-400"
                            : character.tier === "A"
                            ? "bg-orange-500/20 text-orange-400"
                            : character.tier === "B"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-600/20 text-gray-400"
                        }`}
                      >
                        {character.tier}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-1.5">
                  {/* Element */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-16">Element:</span>
                    <span className="text-gray-200 text-sm font-medium">
                      {character.element}
                    </span>
                  </div>

                  {/* Weapon */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 text-xs w-16">Weapon:</span>
                    <span className="text-gray-200 text-sm font-medium">
                      {character.weapon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planner Section - Inside the card */}
          {plannerMode &&
            isInPlanner &&
            progress &&
            (() => {
              // Separate special requirements (EXP, all Shell Credits) from normal materials
              const normalMaterials = requiredMaterials.filter(
                (m) =>
                  m.materialId !== "character-exp" &&
                  m.materialId !== "shell-credit-leveling" &&
                  m.materialId !== "shell-credit"
              );

              const expRequirement = requiredMaterials.find(
                (m) => m.materialId === "character-exp"
              );
              const shellLevelingRequirement = requiredMaterials.find(
                (m) => m.materialId === "shell-credit-leveling"
              );
              const shellOtherRequirement = requiredMaterials.find(
                (m) => m.materialId === "shell-credit"
              );

              // Total Shell Credits = leveling + ascension/fortes/passives
              const totalShellCredits =
                (shellLevelingRequirement?.quantity || 0) +
                (shellOtherRequirement?.quantity || 0);

              return (
                <div className="px-4 pb-4 border-t border-gray-700 pt-4">
                  {/* Configuration Button */}
                  <div className="mb-4">
                    <ConfigButton
                      onClick={() => setShowConfigModal(true)}
                      progress={progress}
                      type="character"
                    />
                  </div>

                  {/* Special Requirements: EXP and Shell Credits (Total) */}
                  {(expRequirement || totalShellCredits > 0) && (
                    <div className="mb-3 space-y-1.5 text-sm">
                      {expRequirement && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400 text-xs">EXP:</span>
                          <span className="text-gray-300">
                            0 / {expRequirement.quantity.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {totalShellCredits > 0 && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400 text-xs">
                            Credits:
                          </span>
                          <span className="text-gray-300">
                            0 / {totalShellCredits.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Materials Needed */}
                  {normalMaterials.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-gray-300 mb-3">
                        Materiales Necesarios
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {normalMaterials.map((mat) => (
                          <MaterialCard
                            key={mat.materialId}
                            materialId={mat.materialId}
                            required={mat.quantity}
                            allMaterialsOfSameBase={getMaterialsOfSameBase(
                              mat.materialId,
                              normalMaterials
                            )}
                            effectiveInventory={effectiveInventory}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
        </div>
      </div>

      {/* Modals */}
      <AddToPlannerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        itemType="character"
        itemId={character.id}
        itemName={character.name}
      />

      <RemoveFromPlannerModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        itemType="character"
        itemId={character.id}
        itemName={character.name}
      />

      {progress && (
        <CharacterConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          character={character}
          progress={progress}
        />
      )}
    </>
  );
}
