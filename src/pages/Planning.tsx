import { useMemo, useState } from "react";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";
import { CharacterCard } from "@/components/CharacterCard";
import { WeaponCard } from "@/components/WeaponCard";
import { useInventoryStore } from "@/store/inventory";
import { consumeMaterialsFromInventory } from "@/utils/material-synthesis";
import {
  calculateCharacterTotalMaterials,
  calculateWeaponTotalMaterials,
} from "@/utils/material-calculator";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

// Sortable Item wrapper component
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  index: number;
  isDraggingGlobal: boolean;
}

function SortableItem({
  id,
  children,
  index,
  isDraggingGlobal,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, isDragging, isOver } = useSortable(
    {
      id,
      transition: null, // Disable transition animations
    }
  );

  // Only change opacity, don't apply transform to prevent cards from moving during drag
  const style = {
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative h-full">
      {/* Drop indicator - white dashed line on the left side */}
      {isOver && isDraggingGlobal && !isDragging && (
        <div
          className="absolute -left-3 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white z-30"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))",
          }}
        />
      )}

      {/* Priority Badge with Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-2 -left-2 z-20 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-gray-900 cursor-grab active:cursor-grabbing hover:bg-purple-500 transition-colors"
      >
        {index + 1}
      </div>

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
  const reorderPlannerItems = useInventoryStore(
    (state) => state.reorderPlannerItems
  );

  // Track the active dragging item
  const [activeId, setActiveId] = useState<string | null>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Combine all enabled items and sort by global order
  const allEnabledItems = useMemo(() => {
    const enabledChars = characters
      .filter((c) => characterProgress[c.id]?.enabled)
      .map((c) => ({
        type: "character" as const,
        data: c,
        order: characterProgress[c.id]?.order ?? 999,
      }));

    const enabledWeapons = weapons
      .filter((w) => weaponProgress[w.id]?.enabled)
      .map((w) => ({
        type: "weapon" as const,
        data: w,
        order: weaponProgress[w.id]?.order ?? 999,
      }));

    return [...enabledChars, ...enabledWeapons].sort(
      (a, b) => a.order - b.order
    );
  }, [characterProgress, weaponProgress]);

  // Calculate sequential inventory for each item
  const itemsWithInventory = useMemo(() => {
    let currentInventory = { ...globalInventory };

    return allEnabledItems.map((item) => {
      // Store the inventory available for this item
      const availableInventory = { ...currentInventory };

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

      // Consume materials from inventory for next item
      currentInventory = consumeMaterialsFromInventory(
        currentInventory,
        requirements
      );

      return {
        ...item,
        availableInventory,
      };
    });
  }, [allEnabledItems, characterProgress, weaponProgress, globalInventory]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    // Find the items
    const oldIndex = itemsWithInventory.findIndex(
      (item) => `${item.type}-${item.data.id}` === active.id
    );
    const newIndex = itemsWithInventory.findIndex(
      (item) => `${item.type}-${item.data.id}` === over.id
    );

    if (oldIndex === -1 || newIndex === -1) return;

    const item = itemsWithInventory[oldIndex];

    // Update the order in the store
    reorderPlannerItems(item.data.id, item.type, newIndex);
  };

  // Get the active item for the DragOverlay
  const activeItem = activeId
    ? itemsWithInventory.find(
        (item) => `${item.type}-${item.data.id}` === activeId
      )
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Planificación
        </h1>
        <p className="text-xl text-gray-400">
          Gestiona la prioridad de ascensión (arrastra para reordenar)
        </p>
      </div>

      {/* Content - Responsive Grid */}
      {itemsWithInventory.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={itemsWithInventory.map(
              (item) => `${item.type}-${item.data.id}`
            )}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {itemsWithInventory.map((item, index) => (
                <SortableItem
                  key={`${item.type}-${item.data.id}`}
                  id={`${item.type}-${item.data.id}`}
                  index={index}
                  isDraggingGlobal={!!activeId}
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
                </SortableItem>
              ))}
            </div>
          </SortableContext>

          {/* Drag Overlay - shows the item being dragged */}
          <DragOverlay dropAnimation={null}>
            {activeItem && (
              <div className="opacity-90 scale-105 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400">
                {activeItem.type === "character" ? (
                  <CharacterCard
                    character={activeItem.data}
                    plannerMode={true}
                    effectiveInventory={activeItem.availableInventory}
                  />
                ) : (
                  <WeaponCard
                    weapon={activeItem.data}
                    plannerMode={true}
                    effectiveInventory={activeItem.availableInventory}
                  />
                )}
              </div>
            )}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No hay items en el planificador</p>
          <p className="text-sm">
            Añade personajes o armas desde sus páginas respectivas
          </p>
        </div>
      )}
    </div>
  );
}
