import type { MaterialRequirement } from "./materialCalculator";
import { EXP_VALUES } from "@/data/exp-requirements";

/**
 * Extended material requirement with isEmpty flag
 */
export interface MaterialRequirementWithEmpty extends MaterialRequirement {
  isEmpty?: boolean;
}

/**
 * Sort materials by requirement status (needed first), preserving original order
 * Materials with quantity > 0 are considered "needed"
 *
 * @param materials - Array of materials to sort
 * @returns Sorted array with needed materials first, preserving T1→T4 order within groups
 */
export function sortMaterialsByRequirement(
  materials: MaterialRequirementWithEmpty[]
): MaterialRequirementWithEmpty[] {
  // Add index for stable sort
  const materialsWithIndex = materials.map((mat, index) => ({
    ...mat,
    originalIndex: index,
  }));

  return materialsWithIndex
    .sort((a, b) => {
      // Material is needed if quantity > 0 (regardless of inventory)
      const aNeedsIt = a.quantity > 0;
      const bNeedsIt = b.quantity > 0;

      // Both need it or both don't need it: keep original order
      if (aNeedsIt === bNeedsIt) return a.originalIndex - b.originalIndex;
      // a needs it, b doesn't: a comes first
      if (aNeedsIt) return -1;
      // b needs it, a doesn't: b comes first
      return 1;
    })
    .map(({ originalIndex, ...mat }) => mat);
}

/**
 * Get the EXP requirement for a character or weapon
 *
 * @param materials - Array of material requirements
 * @param type - Either "character" or "weapon"
 * @returns The EXP requirement or undefined if not found
 */
export function getExpRequirement(
  materials: MaterialRequirement[],
  type: "character" | "weapon"
): MaterialRequirement | undefined {
  const expMaterialId = type === "character" ? "character-exp" : "weapon-exp";
  return materials.find((m) => m.materialId === expMaterialId);
}

// Use canonical EXP values from data/exp-requirements (single source of truth)

/**
 * Compute total available EXP from an inventory map for character or weapon.
 * inventory: Record<materialId, quantity>
 */
export function getAvailableExpFromInventory(
  inventory: Record<string, number> | undefined,
  type: "character" | "weapon"
): number {
  if (!inventory) return 0;

  if (type === "character") {
    return (
      (inventory["basic-resonance-potion"] || 0) *
        (EXP_VALUES["basic-resonance-potion"] || 0) +
      (inventory["medium-resonance-potion"] || 0) *
        (EXP_VALUES["medium-resonance-potion"] || 0) +
      (inventory["advanced-resonance-potion"] || 0) *
        (EXP_VALUES["advanced-resonance-potion"] || 0) +
      (inventory["premium-resonance-potion"] || 0) *
        (EXP_VALUES["premium-resonance-potion"] || 0)
    );
  }

  // weapon
  return (
    (inventory["basic-energy-core"] || 0) *
      (EXP_VALUES["basic-energy-core"] || 0) +
    (inventory["advanced-energy-core"] || 0) *
      (EXP_VALUES["advanced-energy-core"] || 0) +
    (inventory["premium-energy-core"] || 0) *
      (EXP_VALUES["premium-energy-core"] || 0)
  );
}

/**
 * Compute available shell credits from inventory map.
 */
export function getAvailableShellCredits(
  inventory: Record<string, number> | undefined
): number {
  if (!inventory) return 0;
  return inventory["shell-credit"] || 0;
}

/**
 * Shell credit requirements result
 */
export interface ShellCreditRequirements {
  leveling: MaterialRequirement | undefined;
  other: MaterialRequirement | undefined;
  total: number;
}

/**
 * Get all shell credit requirements (leveling and other)
 *
 * @param materials - Array of material requirements
 * @returns Object with leveling, other, and total shell credits
 */
export function getShellCreditRequirements(
  materials: MaterialRequirement[]
): ShellCreditRequirements {
  const leveling = materials.find(
    (m) => m.materialId === "shell-credit-leveling"
  );
  const other = materials.find((m) => m.materialId === "shell-credit");
  const total = (leveling?.quantity || 0) + (other?.quantity || 0);

  return { leveling, other, total };
}

/**
 * Filter out special materials (EXP and Shell Credits) from material list
 *
 * @param materials - Array of material requirements
 * @param type - Either "character" or "weapon"
 * @returns Filtered array without special materials
 */
export function filterSpecialMaterials<T extends MaterialRequirement>(
  materials: T[],
  type: "character" | "weapon"
): T[] {
  const expMaterialId = type === "character" ? "character-exp" : "weapon-exp";

  return materials.filter(
    (m) =>
      m.materialId !== expMaterialId &&
      m.materialId !== "shell-credit-leveling" &&
      m.materialId !== "shell-credit"
  );
}
