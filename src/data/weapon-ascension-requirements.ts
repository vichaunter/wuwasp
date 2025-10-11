// Weapon ascension requirements by level range
// Same for all weapons, varies by rarity

export interface WeaponAscensionRequirement {
  level: string; // e.g., "20 → 40"
  materials: {
    common: { quality: 'T1' | 'T2' | 'T3' | 'T4'; quantity: number };
    forgery: { quality: 'T1' | 'T2' | 'T3' | 'T4'; quantity: number };
    ascension?: { quantity: number }; // Weapon-specific material (only for 4★ and 5★)
    shellCredits: number;
  };
}

// 5-Star Weapons Ascension Requirements
export const fiveStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 20',
    materials: {
      common: { quality: 'T1', quantity: 4 },
      forgery: { quality: 'T1', quantity: 4 },
      shellCredits: 5000,
    },
  },
  {
    level: '20 → 40',
    materials: {
      common: { quality: 'T2', quantity: 8 },
      forgery: { quality: 'T1', quantity: 8 },
      ascension: { quantity: 2 },
      shellCredits: 10000,
    },
  },
  {
    level: '40 → 50',
    materials: {
      common: { quality: 'T2', quantity: 8 },
      forgery: { quality: 'T2', quantity: 8 },
      ascension: { quantity: 3 },
      shellCredits: 15000,
    },
  },
  {
    level: '50 → 60',
    materials: {
      common: { quality: 'T3', quantity: 8 },
      forgery: { quality: 'T2', quantity: 8 },
      ascension: { quantity: 4 },
      shellCredits: 20000,
    },
  },
  {
    level: '60 → 70',
    materials: {
      common: { quality: 'T3', quantity: 12 },
      forgery: { quality: 'T3', quantity: 8 },
      ascension: { quantity: 8 },
      shellCredits: 40000,
    },
  },
  {
    level: '70 → 80',
    materials: {
      common: { quality: 'T4', quantity: 16 },
      forgery: { quality: 'T3', quantity: 12 },
      ascension: { quantity: 12 },
      shellCredits: 80000,
    },
  },
  {
    level: '80 → 90',
    materials: {
      common: { quality: 'T4', quantity: 20 },
      forgery: { quality: 'T4', quantity: 16 },
      ascension: { quantity: 16 },
      shellCredits: 120000,
    },
  },
];

// 4-Star Weapons Ascension Requirements
export const fourStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 20',
    materials: {
      common: { quality: 'T1', quantity: 3 },
      forgery: { quality: 'T1', quantity: 3 },
      shellCredits: 4000,
    },
  },
  {
    level: '20 → 40',
    materials: {
      common: { quality: 'T2', quantity: 6 },
      forgery: { quality: 'T1', quantity: 6 },
      ascension: { quantity: 2 },
      shellCredits: 8000,
    },
  },
  {
    level: '40 → 50',
    materials: {
      common: { quality: 'T2', quantity: 6 },
      forgery: { quality: 'T2', quantity: 6 },
      ascension: { quantity: 3 },
      shellCredits: 12000,
    },
  },
  {
    level: '50 → 60',
    materials: {
      common: { quality: 'T3', quantity: 6 },
      forgery: { quality: 'T2', quantity: 6 },
      ascension: { quantity: 4 },
      shellCredits: 16000,
    },
  },
  {
    level: '60 → 70',
    materials: {
      common: { quality: 'T3', quantity: 9 },
      forgery: { quality: 'T3', quantity: 6 },
      ascension: { quantity: 6 },
      shellCredits: 32000,
    },
  },
  {
    level: '70 → 80',
    materials: {
      common: { quality: 'T4', quantity: 12 },
      forgery: { quality: 'T3', quantity: 9 },
      ascension: { quantity: 9 },
      shellCredits: 64000,
    },
  },
  {
    level: '80 → 90',
    materials: {
      common: { quality: 'T4', quantity: 16 },
      forgery: { quality: 'T4', quantity: 12 },
      ascension: { quantity: 12 },
      shellCredits: 96000,
    },
  },
];

// 3-Star Weapons Ascension Requirements (no weapon-specific material)
export const threeStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 20',
    materials: {
      common: { quality: 'T1', quantity: 2 },
      forgery: { quality: 'T1', quantity: 2 },
      shellCredits: 2000,
    },
  },
  {
    level: '20 → 40',
    materials: {
      common: { quality: 'T2', quantity: 4 },
      forgery: { quality: 'T1', quantity: 4 },
      shellCredits: 4000,
    },
  },
  {
    level: '40 → 50',
    materials: {
      common: { quality: 'T2', quantity: 4 },
      forgery: { quality: 'T2', quantity: 4 },
      shellCredits: 6000,
    },
  },
  {
    level: '50 → 60',
    materials: {
      common: { quality: 'T3', quantity: 4 },
      forgery: { quality: 'T2', quantity: 4 },
      shellCredits: 8000,
    },
  },
  {
    level: '60 → 70',
    materials: {
      common: { quality: 'T3', quantity: 6 },
      forgery: { quality: 'T3', quantity: 4 },
      shellCredits: 16000,
    },
  },
  {
    level: '70 → 80',
    materials: {
      common: { quality: 'T4', quantity: 8 },
      forgery: { quality: 'T3', quantity: 6 },
      shellCredits: 32000,
    },
  },
  {
    level: '80 → 90',
    materials: {
      common: { quality: 'T4', quantity: 12 },
      forgery: { quality: 'T4', quantity: 8 },
      shellCredits: 48000,
    },
  },
];

// Helper to get requirements by rarity
export function getWeaponAscensionRequirements(rarity: 3 | 4 | 5): WeaponAscensionRequirement[] {
  switch (rarity) {
    case 5:
      return fiveStarWeaponAscension;
    case 4:
      return fourStarWeaponAscension;
    case 3:
      return threeStarWeaponAscension;
  }
}

