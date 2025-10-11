import type { MaterialQualityTier } from "@/types";

// Standard ascension requirements for all characters
export interface AscensionRequirement {
  rank: number;
  level: string;
  common: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity
  boss?: number;
  overworld?: number;
  currency: number; // Shell Credits
}

export const ascensionRequirements: AscensionRequirement[] = [
  {
    rank: 1,
    level: "20 → 40",
    common: {
      T1: 4,
    },
    boss: 0,
    overworld: 0,
    currency: 5000,
  },
  {
    rank: 2,
    level: "40 → 50",
    common: {
      T2: 4,
    },
    boss: 3,
    overworld: 4,
    currency: 10000,
  },
  {
    rank: 3,
    level: "50 → 60",
    common: {
      T2: 8,
    },
    boss: 6,
    overworld: 8,
    currency: 15000,
  },
  {
    rank: 4,
    level: "60 → 70",
    common: {
      T3: 4,
    },
    boss: 9,
    overworld: 12,
    currency: 20000,
  },
  {
    rank: 5,
    level: "70 → 80",
    common: {
      T3: 8,
    },
    boss: 12,
    overworld: 16,
    currency: 40000,
  },
  {
    rank: 6,
    level: "80 → 90",
    common: {
      T4: 4,
    },
    boss: 16,
    overworld: 20,
    currency: 80000,
  },
];

// Total materials needed for full ascension (1-90)
export const totalAscensionRequirements = {
  common: { T1: 4, T2: 12, T3: 12, T4: 4 },
  boss: 46, // 0+3+6+9+12+16
  overworld: 60, // 0+4+8+12+16+20
  currency: 170000,
};
