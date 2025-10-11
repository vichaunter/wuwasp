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
  materials: CharacterMaterials;
  image?: string;
}

// User data
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
}
