import type { Character, Weapon, MaterialQualityTier } from "@/types";
import { materials } from "@/data/materials";

/**
 * Get all possible material IDs for a character (all qualities included)
 * Returns them in a consistent order
 */
export function getAllCharacterMaterialIds(character: Character): string[] {
  const materialIds: string[] = [];

  // Get common material IDs (ascension + forte, T1-T4)
  const commonBaseName = character.materials.ascension.common;
  const commonMaterials = materials
    .filter((m) => m.category === "COMMON" && m.baseName === commonBaseName)
    .sort((a, b) => {
      const qualityOrder: Record<MaterialQualityTier, number> = {
        T1: 1,
        T2: 2,
        T3: 3,
        T4: 4,
      };
      return (qualityOrder[a.quality!] || 0) - (qualityOrder[b.quality!] || 0);
    });

  materialIds.push(...commonMaterials.map((m) => m.id));

  // Get forgery material IDs (T1-T4)
  const forgeryBaseName = character.materials.forte.forgery;
  const forgeryMaterials = materials
    .filter((m) => m.category === "FORGERY" && m.baseName === forgeryBaseName)
    .sort((a, b) => {
      const qualityOrder: Record<MaterialQualityTier, number> = {
        T1: 1,
        T2: 2,
        T3: 3,
        T4: 4,
      };
      return (qualityOrder[a.quality!] || 0) - (qualityOrder[b.quality!] || 0);
    });

  materialIds.push(...forgeryMaterials.map((m) => m.id));

  // Get ascension boss material
  const ascensionBoss = materials.find(
    (m) =>
      m.category === "BOSS" && m.name === character.materials.ascension.boss
  );
  if (ascensionBoss) materialIds.push(ascensionBoss.id);

  // Get forte boss material (weekly)
  const forteBoss = materials.find(
    (m) => m.category === "BOSS" && m.name === character.materials.forte.boss
  );
  if (forteBoss) materialIds.push(forteBoss.id);

  // Get overworld material
  const overworld = materials.find(
    (m) =>
      m.category === "OVERWORLD" &&
      m.name === character.materials.ascension.overworld
  );
  if (overworld) materialIds.push(overworld.id);

  return materialIds;
}

/**
 * Get all possible material IDs for a weapon (all qualities included)
 * Returns them in a consistent order
 */
export function getAllWeaponMaterialIds(weapon: Weapon): string[] {
  const materialIds: string[] = [];

  // Get common material IDs (T1-T4)
  const commonBaseName = weapon.materials.common;
  const commonMaterials = materials
    .filter((m) => m.category === "COMMON" && m.baseName === commonBaseName)
    .sort((a, b) => {
      const qualityOrder: Record<MaterialQualityTier, number> = {
        T1: 1,
        T2: 2,
        T3: 3,
        T4: 4,
      };
      return (qualityOrder[a.quality!] || 0) - (qualityOrder[b.quality!] || 0);
    });

  materialIds.push(...commonMaterials.map((m) => m.id));

  // Get forgery material IDs (T1-T4)
  const forgeryBaseName = weapon.materials.forgery;
  const forgeryMaterials = materials
    .filter((m) => m.category === "FORGERY" && m.baseName === forgeryBaseName)
    .sort((a, b) => {
      const qualityOrder: Record<MaterialQualityTier, number> = {
        T1: 1,
        T2: 2,
        T3: 3,
        T4: 4,
      };
      return (qualityOrder[a.quality!] || 0) - (qualityOrder[b.quality!] || 0);
    });

  materialIds.push(...forgeryMaterials.map((m) => m.id));

  return materialIds;
}

/**
 * Merge required materials with all possible materials
 * Materials with 0 quantity will be included
 */
export function mergeWithAllMaterials(
  allMaterialIds: string[],
  requiredMaterials: { materialId: string; quantity: number }[]
): {
  materialId: string;
  materialName: string;
  quantity: number;
  isEmpty: boolean;
}[] {
  const requiredMap = new Map(
    requiredMaterials.map((m) => [m.materialId, m.quantity])
  );

  return allMaterialIds.map((id) => {
    const material = materials.find((m) => m.id === id);
    return {
      materialId: id,
      materialName: material?.name || id,
      quantity: requiredMap.get(id) || 0,
      isEmpty: !requiredMap.has(id) || requiredMap.get(id) === 0,
    };
  });
}
