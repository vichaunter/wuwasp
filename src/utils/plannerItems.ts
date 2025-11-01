import type { Character, Weapon, CharacterProgress, WeaponProgress } from "@/types";

/**
 * Represents an active item in the planner (not completed)
 */
export interface PlannerItem {
  id: string;
  name: string;
  type: "character" | "weapon";
  order: number;
}

/**
 * Get all active items in the planner (enabled and not completed)
 *
 * Active items are those that:
 * - Are enabled in their progress (enabled: true)
 * - Are not marked as completed
 * - Are sorted by their order
 *
 * @param characterProgress - All character progress from the store
 * @param weaponProgress - All weapon progress from the store
 * @param completedCharacters - Map of completed character IDs
 * @param completedWeapons - Map of completed weapon IDs
 * @param characters - List of all characters
 * @param weapons - List of all weapons
 * @returns Array of active planner items sorted by order
 */
export function getActivePlannerItems(
  characterProgress: Record<string, CharacterProgress>,
  weaponProgress: Record<string, WeaponProgress>,
  completedCharacters: Record<string, boolean>,
  completedWeapons: Record<string, boolean>,
  characters: Character[],
  weapons: Weapon[]
): PlannerItem[] {
  // Get active characters (enabled and not completed)
  const activeCharacters = characters
    .filter((c) => {
      const progress = characterProgress[c.id];
      return (
        progress?.enabled &&
        !(completedCharacters[c.id] ?? false)
      );
    })
    .map((c) => ({
      id: c.id,
      name: c.name,
      type: "character" as const,
      order: characterProgress[c.id]?.order ?? 999,
    }));

  // Get active weapons (enabled and not completed)
  const activeWeapons = weapons
    .filter((w) => {
      const progress = weaponProgress[w.id];
      return progress?.enabled && !(completedWeapons[w.id] ?? false);
    })
    .map((w) => ({
      id: w.id,
      name: w.name,
      type: "weapon" as const,
      order: weaponProgress[w.id]?.order ?? 999,
    }));

  // Combine and sort by order
  return [...activeCharacters, ...activeWeapons].sort(
    (a, b) => a.order - b.order
  );
}

/**
 * Check if an item is active in the planner
 *
 * @param itemId - The ID of the item
 * @param itemType - Type of item ("character" or "weapon")
 * @param characterProgress - All character progress from the store
 * @param weaponProgress - All weapon progress from the store
 * @param completedCharacters - Map of completed character IDs
 * @param completedWeapons - Map of completed weapon IDs
 * @returns true if the item is active (enabled and not completed)
 */
export function isItemActiveInPlanner(
  itemId: string,
  itemType: "character" | "weapon",
  characterProgress: Record<string, CharacterProgress>,
  weaponProgress: Record<string, WeaponProgress>,
  completedCharacters: Record<string, boolean>,
  completedWeapons: Record<string, boolean>
): boolean {
  if (itemType === "character") {
    const progress = characterProgress[itemId];
    return (
      progress?.enabled === true &&
      !(completedCharacters[itemId] ?? false)
    );
  } else {
    const progress = weaponProgress[itemId];
    return (
      progress?.enabled === true &&
      !(completedWeapons[itemId] ?? false)
    );
  }
}

