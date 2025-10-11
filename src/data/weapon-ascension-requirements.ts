// Weapon ascension requirements by level range
// Based on official documentation: docs/manual-progresion-armas.md
// Same structure for all weapons, varies by rarity

export interface WeaponAscensionRequirement {
  level: string; // e.g., "1 → 40" (after A1 ascension)
  materials: {
    common: { quality: 'T1' | 'T2' | 'T3' | 'T4'; quantity: number }; // MAT_BASE (enemy drops)
    forgery: { quality: 'T1' | 'T2' | 'T3' | 'T4'; quantity: number }; // MAT_ARMA (domain materials)
    ascension?: { quantity: number }; // Weapon-specific material (only for 4★ and 5★)
    shellCredits: number;
  };
}

// 5-Star Weapons Ascension Requirements
// Total: 6V, 16A, 18M, 6D (common) + 3V, 15A, 15M, 4D (forgery) = 170,000 Shell
export const fiveStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 40', // A1
    materials: {
      common: { quality: 'T1', quantity: 6 },
      forgery: { quality: 'T1', quantity: 3 },
      shellCredits: 5000,
    },
  },
  {
    level: '40 → 50', // A2
    materials: {
      common: { quality: 'T2', quantity: 6 },
      forgery: { quality: 'T2', quantity: 6 },
      shellCredits: 10000,
    },
  },
  {
    level: '50 → 60', // A3
    materials: {
      common: { quality: 'T2', quantity: 10 },
      forgery: { quality: 'T2', quantity: 9 },
      shellCredits: 15000,
    },
  },
  {
    level: '60 → 70', // A4
    materials: {
      common: { quality: 'T3', quantity: 6 },
      forgery: { quality: 'T3', quantity: 6 },
      shellCredits: 20000,
    },
  },
  {
    level: '70 → 80', // A5
    materials: {
      common: { quality: 'T3', quantity: 12 },
      forgery: { quality: 'T3', quantity: 9 },
      shellCredits: 40000,
    },
  },
  {
    level: '80 → 90', // A6
    materials: {
      common: { quality: 'T4', quantity: 6 },
      forgery: { quality: 'T4', quantity: 4 },
      shellCredits: 80000,
    },
  },
];

// 4-Star Weapons Ascension Requirements (same materials as 5★, just different EXP requirements)
export const fourStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 40', // A1
    materials: {
      common: { quality: 'T1', quantity: 6 },
      forgery: { quality: 'T1', quantity: 3 },
      shellCredits: 5000,
    },
  },
  {
    level: '40 → 50', // A2
    materials: {
      common: { quality: 'T2', quantity: 6 },
      forgery: { quality: 'T2', quantity: 6 },
      shellCredits: 10000,
    },
  },
  {
    level: '50 → 60', // A3
    materials: {
      common: { quality: 'T2', quantity: 10 },
      forgery: { quality: 'T2', quantity: 9 },
      shellCredits: 15000,
    },
  },
  {
    level: '60 → 70', // A4
    materials: {
      common: { quality: 'T3', quantity: 6 },
      forgery: { quality: 'T3', quantity: 6 },
      shellCredits: 20000,
    },
  },
  {
    level: '70 → 80', // A5
    materials: {
      common: { quality: 'T3', quantity: 12 },
      forgery: { quality: 'T3', quantity: 9 },
      shellCredits: 40000,
    },
  },
  {
    level: '80 → 90', // A6
    materials: {
      common: { quality: 'T4', quantity: 6 },
      forgery: { quality: 'T4', quantity: 4 },
      shellCredits: 80000,
    },
  },
];

// 3-Star Weapons Ascension Requirements (no weapon-specific material, reduced quantities)
// Estimated at approximately 70% of 4★/5★ requirements
export const threeStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    level: '1 → 40', // A1
    materials: {
      common: { quality: 'T1', quantity: 4 },
      forgery: { quality: 'T1', quantity: 2 },
      shellCredits: 3500,
    },
  },
  {
    level: '40 → 50', // A2
    materials: {
      common: { quality: 'T2', quantity: 4 },
      forgery: { quality: 'T2', quantity: 4 },
      shellCredits: 7000,
    },
  },
  {
    level: '50 → 60', // A3
    materials: {
      common: { quality: 'T2', quantity: 7 },
      forgery: { quality: 'T2', quantity: 6 },
      shellCredits: 10500,
    },
  },
  {
    level: '60 → 70', // A4
    materials: {
      common: { quality: 'T3', quantity: 4 },
      forgery: { quality: 'T3', quantity: 4 },
      shellCredits: 14000,
    },
  },
  {
    level: '70 → 80', // A5
    materials: {
      common: { quality: 'T3', quantity: 8 },
      forgery: { quality: 'T3', quantity: 6 },
      shellCredits: 28000,
    },
  },
  {
    level: '80 → 90', // A6
    materials: {
      common: { quality: 'T4', quantity: 4 },
      forgery: { quality: 'T4', quantity: 3 },
      shellCredits: 56000,
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
