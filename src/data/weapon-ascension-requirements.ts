// Weapon ascension requirements by rank
// Based on official documentation: docs/manual-progresion-armas.md
// Same structure for all weapons, varies by rarity

import { MaterialQualityTier, WeaponAscensionRank, type WeaponAscensionRankType } from "@/types";

export interface WeaponAscensionRequirement {
  rank: WeaponAscensionRankType; // A1, A2, A3, A4, A5, A6
  materials: {
    common: { quality: MaterialQualityTier; quantity: number }; // MAT_BASE (enemy drops)
    forgery: { quality: MaterialQualityTier; quantity: number }; // MAT_ARMA (domain materials)
    ascension?: { quantity: number }; // Weapon-specific material (only for 4★ and 5★)
    shellCredits: number;
  };
}

// 5-Star Weapons Ascension Requirements
export const fiveStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    rank: WeaponAscensionRank.A1,
    materials: {
      common: { quality: MaterialQualityTier.T1, quantity: 6 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 0 },
      shellCredits: 10000,
    },
  },
  {
    rank: WeaponAscensionRank.A2,
    materials: {
      common: { quality: MaterialQualityTier.T2, quantity: 6 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 6 },
      shellCredits: 20000,
    },
  },
  {
    rank: WeaponAscensionRank.A3,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T2, quantity: 8 },
      shellCredits: 40000,
    },
  },
  {
    rank: WeaponAscensionRank.A4,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 6 },
      forgery: { quality: MaterialQualityTier.T3, quantity: 6 },
      shellCredits: 60000,
    },
  },
  {
    rank: WeaponAscensionRank.A5,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 8 },
      shellCredits: 80000,
    },
  },
  {
    rank: WeaponAscensionRank.A6,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 8 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 12 },
      shellCredits: 120000,
    },
  },
];

// 4-Star Weapons Ascension Requirements
export const fourStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    rank: WeaponAscensionRank.A1,
    materials: {
      common: { quality: MaterialQualityTier.T1, quantity: 5 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 0 },
      shellCredits: 8000,
    },
  },
  {
    rank: WeaponAscensionRank.A2,
    materials: {
      common: { quality: MaterialQualityTier.T2, quantity: 5 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 5 },
      shellCredits: 16000,
    },
  },
  {
    rank: WeaponAscensionRank.A3,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T2, quantity: 7 },
      shellCredits: 32000,
    },
  },
  {
    rank: WeaponAscensionRank.A4,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 5 },
      forgery: { quality: MaterialQualityTier.T3, quantity: 5 },
      shellCredits: 48000,
    },
  },
  {
    rank: WeaponAscensionRank.A5,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 7 },
      shellCredits: 64000,
    },
  },
  {
    rank: WeaponAscensionRank.A6,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 7 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 10 },
      shellCredits: 96000,
    },
  },
];

// 3-Star Weapons Ascension Requirements
export const threeStarWeaponAscension: WeaponAscensionRequirement[] = [
  {
    rank: WeaponAscensionRank.A1,
    materials: {
      common: { quality: MaterialQualityTier.T1, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 0 },
      shellCredits: 6000,
    },
  },
  {
    rank: WeaponAscensionRank.A2,
    materials: {
      common: { quality: MaterialQualityTier.T2, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T1, quantity: 4 },
      shellCredits: 12000,
    },
  },
  {
    rank: WeaponAscensionRank.A3,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 3 },
      forgery: { quality: MaterialQualityTier.T2, quantity: 6 },
      shellCredits: 24000,
    },
  },
  {
    rank: WeaponAscensionRank.A4,
    materials: {
      common: { quality: MaterialQualityTier.T3, quantity: 4 },
      forgery: { quality: MaterialQualityTier.T3, quantity: 4 },
      shellCredits: 36000,
    },
  },
  {
    rank: WeaponAscensionRank.A5,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 3 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 5 },
      shellCredits: 48000,
    },
  },
  {
    rank: WeaponAscensionRank.A6,
    materials: {
      common: { quality: MaterialQualityTier.T4, quantity: 5 },
      forgery: { quality: MaterialQualityTier.T4, quantity: 8 },
      shellCredits: 72000,
    },
  },
];

// Helper to get requirements by rarity
export function getWeaponAscensionRequirements(
  rarity: 3 | 4 | 5
): WeaponAscensionRequirement[] {
  switch (rarity) {
    case 5:
      return fiveStarWeaponAscension;
    case 4:
      return fourStarWeaponAscension;
    case 3:
      return threeStarWeaponAscension;
  }
}
