// EXP requirements for leveling characters and weapons
// Based on official documentation: docs/manual-progresión-resonador.md and docs/manual-progresion-armas.md

export interface ExpRequirement {
  levelRange: string; // e.g., "1 → 40"
  exp: number; // Total EXP needed for this range
  shellCredits: number; // Shell Credits cost for leveling
}

// EXP values based on official documentation
export const EXP_VALUES = {
  // Resonance Potions (Character EXP) - 4 levels
  "basic-resonance-potion": 1000, // T1 Verde
  "medium-resonance-potion": 4000, // T2 Azul
  "advanced-resonance-potion": 10000, // T3 Morada
  "premium-resonance-potion": 20000, // T4 Dorada

  // Energy Cores (Weapon EXP) - 3 levels
  "basic-energy-core": 1000, // T1 Verde
  "advanced-energy-core": 4000, // T2 Azul
  "premium-energy-core": 8000, // T3 Dorada (CORRECTED)
} as const;

// Character leveling EXP requirements by ascension level
export const characterExpRequirements: ExpRequirement[] = [
  {
    levelRange: "1 → 40",
    exp: 280000,
    shellCredits: 60000,
  },
  {
    levelRange: "40 → 50",
    exp: 270000,
    shellCredits: 40000,
  },
  {
    levelRange: "50 → 60",
    exp: 410000,
    shellCredits: 70000,
  },
  {
    levelRange: "60 → 70",
    exp: 620000,
    shellCredits: 105000,
  },
  {
    levelRange: "70 → 80",
    exp: 960000,
    shellCredits: 175000,
  },
  {
    levelRange: "80 → 90",
    exp: 1585000,
    shellCredits: 315000,
  },
];

// Total character EXP: 4,125,000 EXP + 765,000 Shell Credits
export const totalCharacterExp = {
  exp: 4125000,
  shellCredits: 765000,
};

// Weapon leveling EXP requirements by ascension level (5★ weapons)
export const weaponExpRequirements: ExpRequirement[] = [
  {
    levelRange: "1 → 40",
    exp: 200000,
    shellCredits: 40000,
  },
  {
    levelRange: "40 → 50",
    exp: 200000,
    shellCredits: 30000,
  },
  {
    levelRange: "50 → 60",
    exp: 300000,
    shellCredits: 50000,
  },
  {
    levelRange: "60 → 70",
    exp: 450000,
    shellCredits: 75000,
  },
  {
    levelRange: "70 → 80",
    exp: 680000,
    shellCredits: 135000,
  },
  {
    levelRange: "80 → 90",
    exp: 862000,
    shellCredits: 200000,
  },
];

// Total weapon EXP: 2,692,000 EXP + 530,000 Shell Credits
export const totalWeaponExp = {
  exp: 2692000,
  shellCredits: 530000,
};

/**
 * Calculate optimal EXP material distribution
 * Uses largest materials first (greedy algorithm)
 * Based on official documentation logic
 *
 * @param expNeeded - Total EXP needed
 * @param materialType - 'resonance-potion' or 'energy-core'
 * @returns Object with material IDs and quantities
 */
export function calculateExpMaterials(
  expNeeded: number,
  materialType: "resonance-potion" | "energy-core"
): Record<string, number> {
  const materials: Record<string, number> = {};
  let remaining = expNeeded;

  if (materialType === "resonance-potion") {
    // Character EXP - 4 levels (Verde, Azul, Morada, Dorada)

    // 1. Dorada/Supreme (20,000 EXP)
    const premium = Math.floor(remaining / 20000);
    if (premium > 0) {
      materials["premium-resonance-potion"] = premium;
      remaining = remaining % 20000;
    }

    // 2. Morada/Premium (10,000 EXP)
    const advanced = Math.floor(remaining / 10000);
    if (advanced > 0) {
      materials["advanced-resonance-potion"] = advanced;
      remaining = remaining % 10000;
    }

    // 3. Azul/Advanced (4,000 EXP)
    const medium = Math.floor(remaining / 4000);
    if (medium > 0) {
      materials["medium-resonance-potion"] = medium;
      remaining = remaining % 4000;
    }

    // 4. Verde/Basic (1,000 EXP)
    const basic = Math.ceil(remaining / 1000);
    if (basic > 0) {
      materials["basic-resonance-potion"] = basic;
    }
  } else {
    // Weapon EXP - 3 levels (Verde, Azul, Dorada)

    // 1. Dorada/Premium (8,000 EXP)
    const premium = Math.floor(remaining / 8000);
    if (premium > 0) {
      materials["premium-energy-core"] = premium;
      remaining = remaining % 8000;
    }

    // 2. Azul/Advanced (4,000 EXP)
    const advanced = Math.floor(remaining / 4000);
    if (advanced > 0) {
      materials["advanced-energy-core"] = advanced;
      remaining = remaining % 4000;
    }

    // 3. Verde/Basic (1,000 EXP)
    const basic = Math.ceil(remaining / 1000);
    if (basic > 0) {
      materials["basic-energy-core"] = basic;
    }
  }

  return materials;
}
