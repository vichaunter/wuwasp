import type { Character, Weapon, Material } from "@/types";
import { WeaponType, Element, MaterialCategory, MaterialQualityTier } from "@/types";

export function filterCharacters(
  characters: Character[],
  searchQuery: string,
  selectedElement: Element | "ALL",
  selectedWeapon: WeaponType | "ALL",
  selectedRarity: 4 | 5 | "ALL"
): Character[] {
  let filtered = characters;

  if (selectedElement !== "ALL") {
    filtered = filtered.filter((c) => c.element === selectedElement);
  }

  if (selectedWeapon !== "ALL") {
    filtered = filtered.filter((c) => c.weapon === selectedWeapon);
  }

  if (selectedRarity !== "ALL") {
    filtered = filtered.filter((c) => c.rarity === selectedRarity);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => {
    if (a.rarity !== b.rarity) {
      return b.rarity - a.rarity;
    }
    return a.name.localeCompare(b.name);
  });
}

export function filterWeapons(
  weapons: Weapon[],
  searchQuery: string,
  selectedType: WeaponType | "ALL",
  selectedRarity: 3 | 4 | 5 | "ALL"
): Weapon[] {
  let filtered = weapons;

  if (selectedType !== "ALL") {
    filtered = filtered.filter((w) => w.type === selectedType);
  }

  if (selectedRarity !== "ALL") {
    filtered = filtered.filter((w) => w.rarity === selectedRarity);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (w) =>
        w.name.toLowerCase().includes(query) ||
        w.id.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => {
    if (a.rarity !== b.rarity) {
      return b.rarity - a.rarity;
    }
    return a.name.localeCompare(b.name);
  });
}

export function getCharacterElements(characters: Character[]): Element[] {
  const elements = new Set<Element>();
  characters.forEach((c) => elements.add(c.element));
  return Array.from(elements).sort();
}

export function getCharacterWeapons(characters: Character[]): WeaponType[] {
  const weapons = new Set<WeaponType>();
  characters.forEach((c) => {
    weapons.add(c.weapon);
  });
  return Array.from(weapons).sort();
}

export function countByElement(
  characters: Character[]
): Record<string, number> {
  const counts: Record<string, number> = { ALL: characters.length };
  characters.forEach((c) => {
    counts[c.element] = (counts[c.element] || 0) + 1;
  });
  return counts;
}

export function countByWeapon(characters: Character[]): Record<string, number> {
  const counts: Record<string, number> = { ALL: characters.length };
  characters.forEach((c) => {
    counts[c.weapon] = (counts[c.weapon] || 0) + 1;
  });
  return counts;
}

export function countByRarity(characters: Character[]): Record<string, number> {
  const counts: Record<string, number> = { ALL: characters.length };
  characters.forEach((c) => {
    counts[c.rarity] = (counts[c.rarity] || 0) + 1;
  });
  return counts;
}

export function countWeaponsByType(weapons: Weapon[]): Record<string, number> {
  const counts: Record<string, number> = { ALL: weapons.length };
  weapons.forEach((w) => {
    counts[w.type] = (counts[w.type] || 0) + 1;
  });
  return counts;
}

export function countWeaponsByRarity(
  weapons: Weapon[]
): Record<string, number> {
  const counts: Record<string, number> = { ALL: weapons.length };
  weapons.forEach((w) => {
    counts[w.rarity] = (counts[w.rarity] || 0) + 1;
  });
  return counts;
}

export function filterMaterials(
  materials: Material[],
  searchQuery: string,
  selectedCategory: MaterialCategory | "ALL",
  groupBySet: boolean = false
): Material[] {
  let filtered = materials;

  if (selectedCategory !== "ALL") {
    filtered = filtered.filter((m) => m.category === selectedCategory);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.baseName.toLowerCase().includes(query) ||
        m.id.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => {
    if (groupBySet) {
      const categoryOrder: Record<string, number> = {
        [MaterialCategory.BOSS]: 1,
        [MaterialCategory.FORGERY]: 2,
        [MaterialCategory.COMMON]: 3,
        [MaterialCategory.OVERWORLD]: 4,
        [MaterialCategory.EXP]: 5,
        [MaterialCategory.CURRENCY]: 6,
      };

      const aCategoryOrder = categoryOrder[a.category] || 999;
      const bCategoryOrder = categoryOrder[b.category] || 999;

      if (aCategoryOrder !== bCategoryOrder) {
        return aCategoryOrder - bCategoryOrder;
      }

      if (a.baseName !== b.baseName) {
        return a.baseName.localeCompare(b.baseName);
      }

      if (a.quality && b.quality) {
        const qualityOrder = {
          [MaterialQualityTier.T1]: 1,
          [MaterialQualityTier.T2]: 2,
          [MaterialQualityTier.T3]: 3,
          [MaterialQualityTier.T4]: 4,
        };
        const aQuality = qualityOrder[a.quality] || 0;
        const bQuality = qualityOrder[b.quality] || 0;
        if (aQuality !== bQuality) {
          return aQuality - bQuality;
        }
      }

      return a.name.localeCompare(b.name);
    } else {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }

      if (a.quality && b.quality) {
        const qualityOrder = {
          [MaterialQualityTier.T4]: 4,
          [MaterialQualityTier.T3]: 3,
          [MaterialQualityTier.T2]: 2,
          [MaterialQualityTier.T1]: 1,
        };
        const aQuality = qualityOrder[a.quality] || 0;
        const bQuality = qualityOrder[b.quality] || 0;
        if (aQuality !== bQuality) {
          return bQuality - aQuality;
        }
      }

      return a.name.localeCompare(b.name);
    }
  });
}

export function countMaterialsByCategory(
  materials: Material[]
): Record<string, number> {
  const counts: Record<string, number> = { ALL: materials.length };
  materials.forEach((m) => {
    counts[m.category] = (counts[m.category] || 0) + 1;
  });
  return counts;
}
