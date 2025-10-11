import type { MaterialQualityTier } from '@/types';

// Forte requirements for characters
// Based on official documentation: docs/manual-progresión-resonador.md

export interface ForteNodeRequirement {
  description: string;
  common?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity (MAT_BASE)
  forgery?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity (MAT_FORTE)
  boss?: number; // Weekly boss material (MAT_BOSS_SEMANAL)
  currency: number; // Shell Credits
}

export interface ForteRequirements {
  mainNodes: ForteNodeRequirement; // PER NODE (Basic, Skill, Liberation, Intro, Outro)
  statBonus1: ForteNodeRequirement; // Inherent Skill 1 (Pasivo Menor)
  statBonus2: ForteNodeRequirement; // Inherent Skill 2 (Pasivo Menor)
  inherentSkill1: ForteNodeRequirement; // Pasivo Mayor 1
  inherentSkill2: ForteNodeRequirement; // Pasivo Mayor 2
}

// Forte level requirements PER LEVEL (for one node: Basic, Skill, Liberation, Intro, or Outro)
// Data from manual: 1→10 for ONE node requires: 5V, 5A, 5M, 9D (common) and 5V, 5A, 8M, 11D (forgery), 4 boss, 280000 shell
export const forteRequirements: ForteRequirements = {
  "mainNodes": {
    "description": "Main Nodes (Lv. 1 → 10) - PER SINGLE NODE",
    "common": {
      "T1": 5,   // Verde
      "T2": 5,   // Azul
      "T3": 5,   // Morado
      "T4": 9    // Dorado
    },
    "forgery": {
      "T1": 5,   // Verde
      "T2": 5,   // Azul
      "T3": 8,   // Morado
      "T4": 11   // Dorado
    },
    "boss": 4,         // Weekly boss material (starts from level 6)
    "currency": 280000 // Total shell credits for 1→10
  },
  "statBonus1": {
    "description": "Stat Bonus 1 (Inherent Skill 1 - Pasivo Menor)",
    "common": {
      "T1": 4
    },
    "forgery": {
      "T1": 4
    },
    "currency": 3000
  },
  "statBonus2": {
    "description": "Stat Bonus 2 (Inherent Skill 2 - Pasivo Menor)",
    "common": {
      "T1": 4
    },
    "forgery": {
      "T1": 4
    },
    "currency": 3000
  },
  "inherentSkill1": {
    "description": "Inherent Skill 1 (Pasivo Mayor 1)",
    "common": {
      "T2": 4
    },
    "forgery": {
      "T2": 4
    },
    "currency": 10000
  },
  "inherentSkill2": {
    "description": "Inherent Skill 2 (Pasivo Mayor 2)",
    "common": {
      "T3": 4
    },
    "forgery": {
      "T3": 4
    },
    "currency": 20000
  }
};

// Total materials needed for full forte (all 5 main nodes 1→10 + all passives)
// Main nodes (5x): 25V, 25A, 25M, 45D (common) and 25V, 25A, 40M, 55D (forgery), 20 boss, 1400000 shell
// Passives: 8V, 4A, 4M (common) and 8V, 4A, 4M (forgery), 36000 shell
// TOTAL: 33V, 29A, 29M, 45D (common) and 33V, 29A, 44M, 55D (forgery), 20 boss, 1436000 shell
export const totalForteRequirements = {
  common: { T1: 33, T2: 29, T3: 29, T4: 45 },
  forgery: { T1: 33, T2: 29, T3: 44, T4: 55 },
  boss: 20, // Weekly boss materials
  currency: 1436000, // 1400000 (main nodes) + 36000 (passives)
};
