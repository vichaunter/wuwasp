import { useMemo, useState } from "react";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";
import { CharacterCard, WeaponCard } from "@/components/cards";
import { useInventoryStore } from "@/store/inventory";
import { consumeMaterialsFromInventory } from "@/utils/materialSynthesis";
import {
  getAvailableExpFromInventory,
  getAvailableShellCredits,
} from "@/utils/plannerHelpers";
import {
  calculateCharacterTotalMaterials,
  calculateWeaponTotalMaterials,
} from "@/utils/materialCalculator";
import { calculateExpMaterials } from "@/data/exp-requirements";
import { useEffect } from "react";
import { AddToPlannerModal } from "@/components/AddToPlannerModal";
import { calculateInsertOrder } from "@/utils/plannerOrdering";

// Planner Item wrapper component
interface PlannerItemWrapperProps {
  children: React.ReactNode;
  index: number;
  itemId: string;
  itemType: "character" | "weapon";
  itemName: string;
  onPositionClick: () => void;
}

function PlannerItemWrapper({
  children,
  index,
  onPositionClick,
}: PlannerItemWrapperProps) {
  return (
    <div className="relative h-full">
      {/* Position Badge - Clickable */}
      <button
        onClick={onPositionClick}
        className="absolute -top-2 -left-2 z-20 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-gray-900 hover:bg-purple-500 transition-colors cursor-pointer"
        title="Click para cambiar la posición"
      >
        {index + 1}
      </button>

      <div className="h-full">{children}</div>
    </div>
  );
}

export default function Planning() {
  const characterProgress = useInventoryStore(
    (state) => state.characterProgress
  );
  const weaponProgress = useInventoryStore((state) => state.weaponProgress);
  const globalInventory = useInventoryStore((state) => state.inventory);
  const completedWeapons = useInventoryStore((state) => state.completedWeapons);
  const completedCharacters = useInventoryStore(
    (state) => state.completedCharacters
  );
  const [reorderModalOpen, setReorderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    type: "character" | "weapon";
    name: string;
    currentIndex: number;
  } | null>(null);

  // Combine all enabled items and sort by global order
  // IMPORTANT: Completed items are EXCLUDED to prevent them from consuming materials
  const allEnabledItems = useMemo(() => {
    // Ensure completedCharacters and completedWeapons are objects (defensive)
    const safeCompletedChars = completedCharacters || {};
    const safeCompletedWeapons = completedWeapons || {};
    
    const enabledChars = characters
      .filter((c) => {
        const progress = characterProgress[c.id];
        // Only include if enabled AND not completed
        return progress?.enabled && !safeCompletedChars[c.id];
      })
      .map((c) => ({
        type: "character" as const,
        data: c,
        order: characterProgress[c.id]?.order ?? 999,
        isCompleted: false, // We already filtered out completed items
      }));

    const enabledWeapons = weapons
      .filter((w) => {
        const progress = weaponProgress[w.id];
        // Only include if enabled AND not completed
        return progress?.enabled && !safeCompletedWeapons[w.id];
      })
      .map((w) => ({
        type: "weapon" as const,
        data: w,
        order: weaponProgress[w.id]?.order ?? 999,
        isCompleted: false, // We already filtered out completed items
      }));

    return [...enabledChars, ...enabledWeapons].sort((a, b) => {
      return a.order - b.order;
    });
  }, [
    characterProgress,
    weaponProgress,
    completedWeapons,
    completedCharacters,
  ]);

  const completedCharactersList = useMemo(() => {
    return characters.filter((c) => completedCharacters[c.id]);
  }, [completedCharacters]);

  const completedWeaponsList = useMemo(() => {
    return weapons.filter((w) => completedWeapons[w.id]);
  }, [completedWeapons]);

  // Dev helper: attach a function to window to dump the planner state and
  // inventory with per-item consumption. Call `__dumpPlanner()` in the browser
  // console to get a JSON you can paste here. Only in non-production.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    (window as any).__dumpPlanner = () => {
      const state = useInventoryStore.getState();
      const globalInv = { ...state.inventory };

      // Build enabled items (same logic as above)
      const enabledChars = characters
        .filter((c) => state.characterProgress[c.id]?.enabled)
        .map((c) => ({
          type: "character" as const,
          data: c,
          order: state.characterProgress[c.id]?.order ?? 999,
          progress: state.characterProgress[c.id],
        }));

      const enabledWeapons = weapons
        .filter((w) => state.weaponProgress[w.id]?.enabled)
        .map((w) => ({
          type: "weapon" as const,
          data: w,
          order: state.weaponProgress[w.id]?.order ?? 999,
          progress: state.weaponProgress[w.id],
        }));

      const items = [...enabledChars, ...enabledWeapons].sort(
        (a, b) => a.order - b.order
      );

      const result: any[] = [];
      let currentInventory = { ...globalInv };

      for (const item of items) {
        // compute requirements
        let requirements: { materialId: string; quantity: number }[] = [];
        if (item.type === "character") {
          if (item.progress) {
            requirements = calculateCharacterTotalMaterials(
              item.data,
              item.progress
            );
          }
        } else {
          if (item.progress) {
            requirements = calculateWeaponTotalMaterials(
              item.data,
              item.progress
            );
          }
        }

        // capture before
        const beforeExp = getAvailableExpFromInventory(
          currentInventory,
          item.type
        );
        const beforeShell = getAvailableShellCredits(currentInventory);

        // Expand EXP requirement for logging (if present)
        const expReq = requirements.find(
          (r) =>
            r.materialId ===
            (item.type === "character" ? "character-exp" : "weapon-exp")
        );
        const expandedExp = expReq
          ? calculateExpMaterials(
              expReq.quantity,
              item.type === "character" ? "resonance-potion" : "energy-core"
            )
          : {};

        // Consume for this item
        const afterInventory = consumeMaterialsFromInventory(
          currentInventory,
          requirements,
          item.type
        );

        const afterExp = getAvailableExpFromInventory(
          afterInventory,
          item.type
        );
        const afterShell = getAvailableShellCredits(afterInventory);

        result.push({
          id: item.data.id,
          type: item.type,
          order: item.order,
          beforeExp,
          afterExp,
          consumedExp: Math.max(0, beforeExp - afterExp),
          beforeShell,
          afterShell,
          consumedShell: Math.max(0, beforeShell - afterShell),
          expandedExp,
          requirements,
        });

        currentInventory = afterInventory;
      }

      const out = {
        globalInventory: globalInv,
        items: result,
        remainingInventory: currentInventory,
      };
      console.log("__dumpPlanner ->", out);
      return out;
    };

    return () => {
      try {
        delete (window as any).__dumpPlanner;
      } catch (e) {
        (window as any).__dumpPlanner = undefined;
      }
    };
  }, []);

  // Calculate sequential inventory for each item
  const itemsWithInventory = useMemo(() => {
    let currentInventory = { ...globalInventory };

    return allEnabledItems.map((item) => {
      // Store the inventory available for this item
      const availableInventory: Record<string, any> = { ...currentInventory };

      // Calculate what this item needs
      let requirements: { materialId: string; quantity: number }[] = [];

      if (item.type === "character") {
        const progress = characterProgress[item.data.id];
        if (progress) {
          requirements = calculateCharacterTotalMaterials(item.data, progress);
        }
      } else {
        const progress = weaponProgress[item.data.id];
        if (progress) {
          requirements = calculateWeaponTotalMaterials(item.data, progress);
        }
      }

      // Simulate consuming materials for this item to compute what will be used
      const afterThisItemInventory = consumeMaterialsFromInventory(
        currentInventory,
        requirements,
        item.type
      );

      // Compute EXP consumed for this item (difference between before/after)
      const availableExpBefore = getAvailableExpFromInventory(
        availableInventory,
        item.type
      );
      const availableExpAfter = getAvailableExpFromInventory(
        afterThisItemInventory,
        item.type
      );
      const consumedExp = Math.max(0, availableExpBefore - availableExpAfter);

      // Compute Shell Credits consumed for this item
      const availableShellBefore = getAvailableShellCredits(availableInventory);
      const availableShellAfter = getAvailableShellCredits(
        afterThisItemInventory
      );
      const consumedShell = Math.max(
        0,
        availableShellBefore - availableShellAfter
      );

      // Attach metadata so UI can show consumed/required (not raw totals)
      availableInventory.__availableExp = availableExpBefore;
      availableInventory.__consumedExp = consumedExp;
      availableInventory.__availableShellCredits = availableShellBefore;
      availableInventory.__consumedShellCredits = consumedShell;

      // Now update current inventory to after consuming this item
      currentInventory = afterThisItemInventory;

      return {
        ...item,
        availableInventory,
      };
    });
  }, [allEnabledItems, characterProgress, weaponProgress, globalInventory]);

  const handlePositionClick = (
    itemId: string,
    itemType: "character" | "weapon",
    itemName: string,
    currentIndex: number
  ) => {
    setSelectedItem({ id: itemId, type: itemType, name: itemName, currentIndex });
    setReorderModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Planificación
        </h1>
        <p className="text-xl text-gray-400">
          Gestiona la prioridad de ascensión (click en el número para reordenar)
        </p>
      </div>

      {/* Content - Responsive Grid */}
      {itemsWithInventory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {itemsWithInventory.map((item, index) => (
            <PlannerItemWrapper
              key={`${item.type}-${item.data.id}`}
              index={index}
              itemId={item.data.id}
              itemType={item.type}
              itemName={item.data.name}
              onPositionClick={() =>
                handlePositionClick(
                  item.data.id,
                  item.type,
                  item.data.name,
                  index
                )
              }
            >
              {item.type === "character" ? (
                <CharacterCard
                  character={item.data}
                  plannerMode={true}
                  effectiveInventory={item.availableInventory}
                />
              ) : (
                <WeaponCard
                  weapon={item.data}
                  plannerMode={true}
                  effectiveInventory={item.availableInventory}
                />
              )}
            </PlannerItemWrapper>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No hay items en el planificador</p>
          <p className="text-sm">
            Añade personajes o armas desde sus páginas respectivas
          </p>
        </div>
      )}
      {/* Completed Characters List */}
      {completedCharactersList.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Personajes Completados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {completedCharactersList.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Weapons List */}
      {completedWeaponsList.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Armas Completadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {completedWeaponsList.map((weapon) => (
              <WeaponCard key={weapon.id} weapon={weapon} />
            ))}
          </div>
        </div>
      )}

      {/* Reorder Modal */}
      {selectedItem && (
        <AddToPlannerModal
          isOpen={reorderModalOpen}
          onClose={() => {
            setReorderModalOpen(false);
            setSelectedItem(null);
          }}
          itemType={selectedItem.type}
          itemId={selectedItem.id}
          itemName={selectedItem.name}
          title="Reordenar en el Planificador"
          description={`Mover ${selectedItem.name} a una nueva posición:`}
          acceptButtonText="Mover"
          acceptButtonClass="bg-purple-600 hover:bg-purple-700"
          isReorderMode={true}
          onConfirm={(selectedPosition) => {
            const state = useInventoryStore.getState();
            
            // Calculate the correct insert position for calculateInsertOrder
            // selectedPosition is based on orderedItems (which includes the current item)
            // but calculateInsertOrder uses activeItems (which excludes the current item)
            // We need to adjust: if selectedPosition > currentIndex, subtract 1
            const currentIndex = selectedItem.currentIndex;
            const adjustedPosition = selectedPosition > currentIndex 
              ? selectedPosition - 1 
              : selectedPosition;
            
            const { ordersToUpdate, newItemOrder } = calculateInsertOrder(
              adjustedPosition,
              selectedItem.id,
              selectedItem.type,
              state.characterProgress,
              state.weaponProgress,
              state.completedCharacters,
              state.completedWeapons
            );

            ordersToUpdate.forEach((update) => {
              state.reorderPlannerItems(update.id, update.type, update.newOrder);
            });

            state.reorderPlannerItems(selectedItem.id, selectedItem.type, newItemOrder);
          }}
        />
      )}
    </div>
  );
}
