// Material types
export type MaterialQuality = 'LF' | 'MF' | 'HF' | 'FF' | 'UNIQUE';
export type MaterialCategory = 'ASCENSION' | 'FORTE' | 'BOSS' | 'OVERWORLD' | 'CURRENCY';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  quality?: MaterialQuality;
  image?: string;
}

// Material requirements by ascension/forte level
export interface MaterialRequirementByLevel {
  level: number; // 1-10 for ascension, 1-10 for forte
  type: 'ASCENSION' | 'FORTE' | 'STAT_BONUS' | 'INHERENT_SKILL';
  requirements: {
    quality: MaterialQuality | 'UNIQUE' | 'CURRENCY';
    quantity: number;
  }[];
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
