// Material quality tiers (generic)
export type MaterialQualityTier = "T1" | "T2" | "T3" | "T4";

export const MaterialQualityTier = {
  T1: "T1" as MaterialQualityTier,
  T2: "T2" as MaterialQualityTier,
  T3: "T3" as MaterialQualityTier,
  T4: "T4" as MaterialQualityTier,
} as const;

// Material categories
export type MaterialCategory =
  | "COMMON"
  | "FORGERY"
  | "BOSS"
  | "OVERWORLD"
  | "CURRENCY"
  | "EXP";

export const MaterialCategory = {
  COMMON: "COMMON" as MaterialCategory,
  FORGERY: "FORGERY" as MaterialCategory,
  BOSS: "BOSS" as MaterialCategory,
  OVERWORLD: "OVERWORLD" as MaterialCategory,
  CURRENCY: "CURRENCY" as MaterialCategory,
  EXP: "EXP" as MaterialCategory,
} as const;

// Material Base Names (unique material names)
export { MaterialBaseName } from './material-base-names';

// Weapon Ascension Ranks
export { WeaponAscensionRank, type WeaponAscensionRankType } from './weapon-ascension-rank';

// Weapon types
export type WeaponType =
  | "Sword"
  | "Broadblade"
  | "Pistol"
  | "Gauntlet"
  | "Rectifier";

export const WeaponType = {
  Sword: "Sword" as WeaponType,
  Broadblade: "Broadblade" as WeaponType,
  Pistol: "Pistol" as WeaponType,
  Gauntlet: "Gauntlet" as WeaponType,
  Rectifier: "Rectifier" as WeaponType,
} as const;

// Character elements
export type Element =
  | "Glacio"
  | "Fusion"
  | "Electro"
  | "Aero"
  | "Spectro"
  | "Havoc";

export const Element = {
  Glacio: "Glacio" as Element,
  Fusion: "Fusion" as Element,
  Electro: "Electro" as Element,
  Aero: "Aero" as Element,
  Spectro: "Spectro" as Element,
  Havoc: "Havoc" as Element,
} as const;

export interface Material {
  id: string; // e.g., "lf-tidal-residuum" or "tidal-residuum" (for non-quality materials)
  name: string; // Full display name, e.g., "LF Tidal Residuum" or "Tidal Residuum"
  baseName: string; // Base name without quality, e.g., "Tidal Residuum"
  category: MaterialCategory;
  quality?: MaterialQualityTier; // undefined for unique materials (boss, overworld, currency)
  image?: string;
}

// Character material references (just IDs/names, not quantities)
export interface CharacterMaterials {
  ascension: {
    common: string; // e.g., "Tidal Residuum" (has 4 qualities: LF, MF, HF, FF)
    boss: string; // e.g., "Blighted Crown of Puppet King" (unique)
    overworld: string; // e.g., "Luminous Calendula" (flower/collectible, unique)
  };
  forte: {
    common: string; // e.g., "Tidal Residuum" (same as ascension common)
    forgery: string; // e.g., "Waveworn Residue" (has 4 qualities: 210, 226, 235, 239)
    boss: string; // e.g., "Blighted Crown of Puppet King" (same as ascension boss)
  };
}

export interface Character {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 4 | 5;
  element: Element;
  weapon: WeaponType;
  tier?: string;
  materials: CharacterMaterials;
  image?: string;
}

// Weapon material references
export interface WeaponMaterials {
  common: string; // e.g., "Howler Core" (has 4 qualities: LF, MF, HF, FF)
  forgery: string; // e.g., "Waveworn Residue" (has 4 qualities: 210, 226, 235, 239)
  ascension: string; // e.g., "Monument Bell" (weapon-specific ascension material, unique)
}

export interface Weapon {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 3 | 4 | 5;
  type: WeaponType;
  baseAtk: number;
  subStat: string; // e.g., "ATK+8.1%", "Crit Rate+5.4%"
  skill: string; // Skill name
  skillDescription: string;
  materials: WeaponMaterials;
  image?: string;
}

// User data - Progress tracking
export interface CharacterProgress {
  characterId: string;
  enabled: boolean; // If this character is part of the planning
  order: number; // Position in the planning list
  level: {
    current: number; // 1-90
    target: number; // 1-90
  };
  ascension: {
    current: number; // 0-6
    target: number; // 0-6
  };
  forte: {
    // Main nodes (1-10 each)
    basic: { current: number; target: number }; // 1-10
    skill: { current: number; target: number }; // 1-10
    liberation: { current: number; target: number }; // 1-10
    intro: { current: number; target: number }; // 1-10
    outro: { current: number; target: number }; // 1-10
    // Stat bonuses (0-2 each, 4 stat bonuses with 2 levels each = 8 total)
    statBonus1: { current: number; target: number }; // 0-2
    statBonus2: { current: number; target: number }; // 0-2
    statBonus3: { current: number; target: number }; // 0-2
    statBonus4: { current: number; target: number }; // 0-2
    // Inherent skills (0-2 each, 2 levels)
    inherentSkill1: { current: number; target: number }; // 0-2
    inherentSkill2: { current: number; target: number }; // 0-2
  };
}

export interface WeaponProgress {
  weaponId: string;
  enabled: boolean; // If this weapon is part of the planning
  order: number; // Position in the planning list
  level: {
    current: number; // 1-90
    target: number; // 1-90
  };
  ascension: {
    current: number; // 0-6 (weapons also have 6 ranks)
    target: number; // 0-6
  };
}

export interface CharacterPriority {
  characterId: string;
  priority: number;
}

export interface UserInventory {
  materials: Record<string, number>; // materialId -> quantity
}

export interface UserData {
  version?: number; // Storage version for migrations
  inventory: UserInventory;
  priorities: CharacterPriority[];
  characterProgress: Record<string, CharacterProgress>; // characterId -> progress
  weaponProgress: Record<string, WeaponProgress>; // weaponId -> progress
}
