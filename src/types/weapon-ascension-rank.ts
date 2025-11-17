/**
 * Weapon Ascension Ranks
 * 
 * Represents the 6 possible ascension ranks for weapons.
 * Each ascension unlocks a new maximum level cap.
 */

export const WeaponAscensionRank = {
  A1: "A1",
  A2: "A2",
  A3: "A3",
  A4: "A4",
  A5: "A5",
  A6: "A6",
} as const;

export type WeaponAscensionRankType = typeof WeaponAscensionRank[keyof typeof WeaponAscensionRank];

