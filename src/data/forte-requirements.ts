import type { MaterialQualityTier } from '@/types';

// Forte requirements for characters
// Based on official documentation: docs/manual-progresión-resonador.md

// Forte circuit layout - same for all characters
export const FORTE_STAT_BONUSES = ['Crit. Rate+', 'ATK+', 'ATK+', 'Crit. Rate+'] as const;
export const FORTE_INHERENT_SKILLS = 'Inherent Skills';

export interface ForteNodeRequirement {
  level?: number; // Target level (e.g., 2 for 1→2 upgrade)
  description: string;
  common?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity (MAT_BASE)
  forgery?: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity (MAT_FORTE)
  boss?: number; // Weekly boss material (MAT_BOSS_SEMANAL)
  currency: number; // Shell Credits
}

export interface ForteRequirements {
  mainNodes: ForteNodeRequirement[]; // Array indexed by level (0-8 for levels 1→2, 2→3, ..., 9→10)
  statBonusLevel1: ForteNodeRequirement; // Stat Bonus Level 1 (for any of the 4 stat bonuses)
  statBonusLevel2: ForteNodeRequirement; // Stat Bonus Level 2 (for any of the 4 stat bonuses)
  inherentSkillLevel1: ForteNodeRequirement; // Inherent Skill Level 1 (0->1, for any of the 2 inherent skills)
  inherentSkillLevel2: ForteNodeRequirement; // Inherent Skill Level 2 (1->2, for any of the 2 inherent skills)
}

// Forte level requirements PER LEVEL (for one node: Basic, Skill, Liberation, Intro, or Outro)
// Each entry represents the materials needed to upgrade from level N to level N+1
export const forteRequirements: ForteRequirements = {
  "mainNodes": [
    // Level 1→2
    {
      "level": 2,
      "description": "Main Node Level 1 → 2",
      "common": { "T1": 2 },
      "forgery": { "T1": 2 },
      "currency": 1500
    },
    // Level 2→3
    {
      "level": 3,
      "description": "Main Node Level 2 → 3",
      "common": { "T1": 3 },
      "forgery": { "T1": 3 },
      "currency": 2000
    },
    // Level 3→4
    {
      "level": 4,
      "description": "Main Node Level 3 → 4",
      "common": { "T2": 2 },
      "forgery": { "T2": 2 },
      "currency": 4500
    },
    // Level 4→5
    {
      "level": 5,
      "description": "Main Node Level 4 → 5",
      "common": { "T2": 3 },
      "forgery": { "T2": 3 },
      "currency": 6000
    },
    // Level 5→6
    {
      "level": 6,
      "description": "Main Node Level 5 → 6",
      "common": { "T3": 2 },
      "forgery": { "T3": 3 },
      "currency": 16000
    },
    // Level 6→7
    {
      "level": 7,
      "description": "Main Node Level 6 → 7",
      "common": { "T3": 3 },
      "forgery": { "T3": 5 },
      "boss": 1,
      "currency": 30000
    },
    // Level 7→8
    {
      "level": 8,
      "description": "Main Node Level 7 → 8",
      "common": { "T4": 2 },
      "forgery": { "T4": 2 },
      "boss": 1,
      "currency": 50000
    },
    // Level 8→9
    {
      "level": 9,
      "description": "Main Node Level 8 → 9",
      "common": { "T4": 3 },
      "forgery": { "T4": 3 },
      "boss": 1,
      "currency": 70000
    },
    // Level 9→10
    {
      "level": 10,
      "description": "Main Node Level 9 → 10",
      "common": { "T4": 4 },
      "forgery": { "T4": 6 },
      "boss": 1,
      "currency": 100000
    }
  ],
  "statBonusLevel1": {
    "description": "Stat Bonus Level 1 (for any of the 4 stat bonuses)",
    "common": {
      "T3": 3
    },
    "forgery": {
      "T3": 3
    },
    "currency": 50000
  },
  "statBonusLevel2": {
    "description": "Stat Bonus Level 2 (for any of the 4 stat bonuses)",
    "common": {
      "T4": 3
    },
    "forgery": {
      "T4": 3
    },
    "boss": 1,
    "currency": 100000
  },
  "inherentSkillLevel1": {
    "description": "Inherent Skill Level 1 (0->1, for any of the 2 inherent skills)",
    "common": {
      "T2": 3
    },
    "forgery": {
      "T2": 3
    },
    "boss": 1,
    "currency": 10000
  },
  "inherentSkillLevel2": {
    "description": "Inherent Skill Level 2 (1->2, for any of the 2 inherent skills)",
    "common": {
      "T3": 3
    },
    "forgery": {
      "T3": 3
    },
    "boss": 1,
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

