/**
 * Character and Weapon Level Requirements
 * Based on docs/levels.md
 */

/**
 * Cumulative EXP required from level 1 to reach each level
 * Index corresponds to level (e.g., index 0 = level 1, index 89 = level 90)
 */
export const CHARACTER_EXP_TABLE: number[] = [
  0,       // Level 1
  1000,    // Level 2
  2100,    // Level 3
  3300,    // Level 4
  4600,    // Level 5
  6000,    // Level 6
  7500,    // Level 7
  9100,    // Level 8
  10800,   // Level 9
  12600,   // Level 10
  14500,   // Level 11
  16500,   // Level 12
  18600,   // Level 13
  20800,   // Level 14
  23100,   // Level 15
  25500,   // Level 16
  28000,   // Level 17
  30600,   // Level 18
  33300,   // Level 19
  37500,   // Level 20
  41800,   // Level 21
  46200,   // Level 22
  50700,   // Level 23
  55300,   // Level 24
  60000,   // Level 25
  64800,   // Level 26
  69700,   // Level 27
  74700,   // Level 28
  79800,   // Level 29
  85000,   // Level 30
  90300,   // Level 31
  95700,   // Level 32
  101200,  // Level 33
  107000,  // Level 34
  113100,  // Level 35
  119500,  // Level 36
  126200,  // Level 37
  131800,  // Level 38
  137500,  // Level 39
  143300,  // Level 40
  149300,  // Level 41
  155500,  // Level 42
  161900,  // Level 43
  168500,  // Level 44
  175300,  // Level 45
  182300,  // Level 46
  189500,  // Level 47
  196900,  // Level 48
  204500,  // Level 49
  212300,  // Level 50
  220300,  // Level 51
  228500,  // Level 52
  236800,  // Level 53
  245200,  // Level 54
  253800,  // Level 55
  262600,  // Level 56
  271600,  // Level 57
  280800,  // Level 58
  290200,  // Level 59
  299800,  // Level 60
  309600,  // Level 61
  319700,  // Level 62
  330100,  // Level 63
  340800,  // Level 64
  351800,  // Level 65
  363100,  // Level 66
  374700,  // Level 67
  386600,  // Level 68
  398800,  // Level 69
  411300,  // Level 70
  424100,  // Level 71
  436600,  // Level 72
  449250,  // Level 73
  462050,  // Level 74
  475350,  // Level 75
  489150,  // Level 76
  503450,  // Level 77
  518250,  // Level 78
  533550,  // Level 79
  549350,  // Level 80
  565650,  // Level 81
  583950,  // Level 82
  604250,  // Level 83
  626550,  // Level 84
  650850,  // Level 85
  677150,  // Level 86
  705450,  // Level 87
  735750,  // Level 88
  768050,  // Level 89
  802350,  // Level 90
];

/**
 * Calculate EXP needed to go from one level to another
 */
export function calculateExpNeeded(fromLevel: number, toLevel: number): number {
  if (fromLevel >= toLevel || fromLevel < 1 || toLevel > 90) {
    return 0;
  }
  
  const fromIndex = fromLevel - 1;
  const toIndex = toLevel - 1;
  
  return CHARACTER_EXP_TABLE[toIndex] - CHARACTER_EXP_TABLE[fromIndex];
}

/**
 * Weapon EXP table (same as character for now, can be adjusted if needed)
 */
export const WEAPON_EXP_TABLE = CHARACTER_EXP_TABLE;

/**
 * Get the maximum level allowed for a given ascension rank
 */
export function getMaxLevelForAscension(ascensionRank: number): number {
  const maxLevels = [20, 40, 50, 60, 70, 80, 90];
  return maxLevels[ascensionRank] || 90;
}

/**
 * Get the minimum level required for a given ascension rank
 */
export function getMinLevelForAscension(ascensionRank: number): number {
  if (ascensionRank === 0) return 1;
  const minLevels = [1, 20, 40, 50, 60, 70, 80];
  return minLevels[ascensionRank] || 1;
}

/**
 * Shell Credits needed for leveling from one level to another
 * Formula: 250 Shell Credits per 10,000 EXP
 */
export function calculateLevelingShellCredits(expNeeded: number): number {
  return Math.floor((expNeeded / 10000) * 250);
}

