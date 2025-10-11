import type { MaterialQualityTier } from '@/types';

// Standard forte requirements for all characters
export interface ForteNodeRequirement {
  description: string;
  common?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity
  forgery?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity
  boss?: number;
  currency: number; // Shell Credits
}

export interface ForteRequirements {
  mainNodes: ForteNodeRequirement;
  statBonus1: ForteNodeRequirement;
  statBonus2: ForteNodeRequirement;
  inherentSkill1: ForteNodeRequirement;
  inherentSkill2: ForteNodeRequirement;
}

export const forteRequirements: ForteRequirements = {
  "mainNodes": {
    "description": "Main Nodes (Lv. 1 → 10)",
    "common": {
      "T1": 25,
      "T2": 28,
      "T3": 40,
      "T4": 57
    },
    "forgery": {
      "T1": 25,
      "T2": 28,
      "T3": 55,
      "T4": 67
    },
    "boss": 26,
    "currency": 2030000
  },
  "statBonus1": {
    "description": "Stat Bonus 1 (Total)",
    "forgery": {
      "T3": 12
    },
    "boss": 12,
    "currency": 200000
  },
  "statBonus2": {
    "description": "Stat Bonus 2 (Total)",
    "forgery": {
      "T4": 12
    },
    "boss": 4,
    "currency": 400000
  },
  "inherentSkill1": {
    "description": "Inherent Skill 1",
    "forgery": {
      "T2": 3
    },
    "boss": 1,
    "currency": 10000
  },
  "inherentSkill2": {
    "description": "Inherent Skill 2",
    "forgery": {
      "T3": 3
    },
    "boss": 1,
    "currency": 20000
  }
};

// Total materials needed for full forte
export const totalForteRequirements = {
  common: { T1: 25, T2: 28, T3: 40, T4: 57 },
  forgery: { T1: 25, T2: 31, T3: 70, T4: 79 },
  boss: 44,
  currency: 2660000,
};
