// Material quality tiers (generic)
export type MaterialQualityTier = 'T1' | 'T2' | 'T3' | 'T4';

// Material categories
export type MaterialCategory = 'COMMON' | 'FORGERY' | 'BOSS' | 'OVERWORLD' | 'CURRENCY';

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
    common: string;      // e.g., "Tidal Residuum" (has 4 qualities: LF, MF, HF, FF)
    boss: string;        // e.g., "Blighted Crown of Puppet King" (unique)
    overworld: string;   // e.g., "Luminous Calendula" (flower/collectible, unique)
  };
  forte: {
    common: string;      // e.g., "Tidal Residuum" (same as ascension common)
    forgery: string;     // e.g., "Waveworn Residue" (has 4 qualities: 210, 226, 235, 239)
    boss: string;        // e.g., "Blighted Crown of Puppet King" (same as ascension boss)
  };
}

export interface Character {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 4 | 5;
  element: string;
  weapon: string;
  tier?: string; // e.g., "S", "A", "B", "C"
  materials: CharacterMaterials;
  image?: string;
}

// Weapon types
export type WeaponType = 'Sword' | 'Broadblade' | 'Pistol' | 'Gauntlet' | 'Rectifier';

// Weapon material references
export interface WeaponMaterials {
  common: string;      // e.g., "Howler Core" (has 4 qualities: LF, MF, HF, FF)
  forgery: string;     // e.g., "Waveworn Residue" (has 4 qualities: 210, 226, 235, 239)
  ascension: string;   // e.g., "Monument Bell" (weapon-specific ascension material, unique)
}

export interface Weapon {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 3 | 4 | 5;
  type: WeaponType;
  baseAtk: number;
  subStat: string;        // e.g., "ATK+8.1%", "Crit Rate+5.4%"
  skill: string;          // Skill name
  skillDescription: string;
  materials: WeaponMaterials;
  image?: string;
}

// User data - Progress tracking
export interface CharacterProgress {
  characterId: string;
  enabled: boolean; // If this character is part of the planning
  order: number; // Position in the planning list
  ascension: {
    current: number; // 0-6
    target: number;  // 0-6
  };
  forte: {
    basic: { current: number; target: number }; // 1-10
    skill: { current: number; target: number }; // 1-10
    liberation: { current: number; target: number }; // 1-10
    intro: { current: number; target: number }; // 1-10
    outro: { current: number; target: number }; // 1-10
    passive1: { current: number; target: number }; // 0-1 (unlocked or not)
    passive2: { current: number; target: number }; // 0-1 (unlocked or not)
    bonusPassive: { current: number; target: number }; // 0-1 (unlocked or not)
  };
}

export interface WeaponProgress {
  weaponId: string;
  enabled: boolean; // If this weapon is part of the planning
  order: number; // Position in the planning list
  ascension: {
    current: number; // 0-5 (weapons have 5 ranks)
    target: number;  // 0-5
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
  inventory: UserInventory;
  priorities: CharacterPriority[];
  characterProgress: Record<string, CharacterProgress>; // characterId -> progress
  weaponProgress: Record<string, WeaponProgress>; // weaponId -> progress
}
