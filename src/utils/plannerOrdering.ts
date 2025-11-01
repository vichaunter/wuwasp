import type { CharacterProgress, WeaponProgress } from "@/types";

export interface OrderUpdate {
  id: string;
  type: "character" | "weapon";
  newOrder: number;
}

export function calculateInsertOrder(
  insertPosition: number,
  itemId: string,
  itemType: "character" | "weapon",
  characterProgress: Record<string, CharacterProgress>,
  weaponProgress: Record<string, WeaponProgress>,
  completedCharacters: Record<string, boolean>,
  completedWeapons: Record<string, boolean>
): {
  ordersToUpdate: OrderUpdate[];
  newItemOrder: number;
} {
  const activeItems: Array<{
    id: string;
    type: "character" | "weapon";
    currentOrder: number;
  }> = [];

  for (const [id, progress] of Object.entries(characterProgress)) {
    if (
      progress.enabled &&
      !(completedCharacters[id] ?? false) &&
      !(itemType === "character" && id === itemId)
    ) {
      activeItems.push({ id, type: "character", currentOrder: progress.order });
    }
  }

  for (const [id, progress] of Object.entries(weaponProgress)) {
    if (
      progress.enabled &&
      !(completedWeapons[id] ?? false) &&
      !(itemType === "weapon" && id === itemId)
    ) {
      activeItems.push({ id, type: "weapon", currentOrder: progress.order });
    }
  }

  activeItems.sort((a, b) => a.currentOrder - b.currentOrder);

  let newItemOrder: number;
  const ordersToUpdate: OrderUpdate[] = [];

  if (insertPosition === 0) {
    newItemOrder = activeItems.length > 0 ? activeItems[0].currentOrder : 0;
    for (const item of activeItems) {
      if (item.currentOrder >= newItemOrder) {
        ordersToUpdate.push({
          id: item.id,
          type: item.type,
          newOrder: item.currentOrder + 1,
        });
      }
    }
  } else if (insertPosition >= activeItems.length) {
    const maxOrder =
      activeItems.length > 0
        ? Math.max(...activeItems.map((item) => item.currentOrder))
        : -1;
    newItemOrder = maxOrder + 1;
  } else {
    const targetItem = activeItems[insertPosition];
    newItemOrder = targetItem.currentOrder;

    for (const item of activeItems) {
      if (item.currentOrder >= newItemOrder) {
        ordersToUpdate.push({
          id: item.id,
          type: item.type,
          newOrder: item.currentOrder + 1,
        });
      }
    }
  }

  return { ordersToUpdate, newItemOrder };
}
