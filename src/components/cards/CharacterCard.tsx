import { useState, useMemo } from "react";
import type { Character } from "@/types";
import { useInventoryStore } from "@/store/inventory";
import { AddButton, RemoveButton } from "@/components/buttons";
import { AddToPlannerModal } from "@/components/AddToPlannerModal";
import { RemoveFromPlannerModal } from "@/components/RemoveFromPlannerModal";
import { CharacterConfigModal } from "@/components/CharacterConfigModal";
import { PlannerSection } from "./PlannerSection";
import { calculateCharacterTotalMaterials } from "@/utils/materialCalculator";
import {
  getAllCharacterMaterialIds,
  mergeWithAllMaterials,
} from "@/utils/allMaterialsGenerator";
import { filterSpecialMaterials } from "@/utils/plannerHelpers";

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
  const isCompleted = useInventoryStore((state) =>
    state.isCharacterCompleted(character.id)
  );
  const toggleCharacterCompleted = useInventoryStore(
    (state) => state.toggleCharacterCompleted
  );
  const setInventory = useInventoryStore((state) => state.setInventory);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Calculate required materials (no sorting, PlannerSection handles it)
  const requiredMaterials = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];
    return calculateCharacterTotalMaterials(character, progress);
  }, [plannerMode, isInPlanner, progress, character]);

  // Get all possible materials with empty markers
  const allMaterialsDisplay = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];

    // Get all possible material IDs for this character
    const allMaterialIds = getAllCharacterMaterialIds(character);

    // Filter to get only normal materials (not EXP or Shell Credits)
    const normalRequired = filterSpecialMaterials(
      requiredMaterials,
      "character"
    );

    // Merge with all possible materials (PlannerSection will handle sorting)
    return mergeWithAllMaterials(allMaterialIds, normalRequired);
  }, [plannerMode, isInPlanner, progress, character, requiredMaterials]);

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

  const handleCompletedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCharacterCompleted(character.id);
  };

  const handlePlannerComplete = (
    itemId: string,
    newInventory: Record<string, number>
  ) => {
    setInventory(newInventory);
    toggleCharacterCompleted(itemId);
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

          {/* Completed Check Button - Only in character list, not in planner */}
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
                  ? "Personaje completamente subido"
                  : "Marcar como completamente subido"
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

              {/* Stats - Flex wrap */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {/* Rarity */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">Stars:</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(character.rarity)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Element */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">
                    Element:
                  </span>
                  <span className="text-gray-200 text-xs font-medium truncate">
                    {character.element}
                  </span>
                </div>

                {/* Tier */}
                {character.tier && (
                  <div className="flex items-center gap-1 min-w-[120px]">
                    <span className="text-gray-400 text-xs shrink-0">
                      Tier:
                    </span>
                    <span
                      className={`font-bold text-xs px-1.5 py-0.5 rounded ${
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

                {/* Weapon */}
                <div className="flex items-center gap-1 min-w-[120px]">
                  <span className="text-gray-400 text-xs shrink-0">
                    Weapon:
                  </span>
                  <span className="text-gray-200 text-xs font-medium truncate">
                    {character.weapon}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Planner Section - Inside the card */}
          {plannerMode && isInPlanner && progress && (
            <PlannerSection
              progress={progress}
              type="character"
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
