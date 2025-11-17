/**
 * Character and Weapon Level Requirements
 * Based on docs/levels.md
 */

/**
 * Cumulative EXP required from level 1 to reach each level
 * Index corresponds to level (e.g., index 0 = level 1, index 89 = level 90)
 */
export const CHARACTER_EXP_TABLE: number[] = [
  0, // Level 1
  1000, // Level 2
  2100, // Level 3
  3300, // Level 4
  4600, // Level 5
  6000, // Level 6
  7500, // Level 7
  9100, // Level 8
  10800, // Level 9
  12600, // Level 10
  14500, // Level 11
  16500, // Level 12
  18600, // Level 13
  20800, // Level 14
  23100, // Level 15
  25500, // Level 16
  28000, // Level 17
  30600, // Level 18
  33300, // Level 19
  37500, // Level 20
  41800, // Level 21
  46200, // Level 22
  50700, // Level 23
  55300, // Level 24
  60000, // Level 25
  64800, // Level 26
  69700, // Level 27
  74700, // Level 28
  79800, // Level 29
  85000, // Level 30
  90300, // Level 31
  95700, // Level 32
  101200, // Level 33
  107000, // Level 34
  113100, // Level 35
  119500, // Level 36
  126200, // Level 37
  131800, // Level 38
  137500, // Level 39
  143300, // Level 40
  149300, // Level 41
  155500, // Level 42
  161900, // Level 43
  168500, // Level 44
  175300, // Level 45
  182300, // Level 46
  189500, // Level 47
  196900, // Level 48
  204500, // Level 49
  212300, // Level 50
  220300, // Level 51
  228500, // Level 52
  236800, // Level 53
  245200, // Level 54
  253800, // Level 55
  262600, // Level 56
  271600, // Level 57
  280800, // Level 58
  290200, // Level 59
  299800, // Level 60
  309600, // Level 61
  319700, // Level 62
  330100, // Level 63
  340800, // Level 64
  351800, // Level 65
  363100, // Level 66
  374700, // Level 67
  386600, // Level 68
  398800, // Level 69
  411300, // Level 70
  424100, // Level 71
  436600, // Level 72
  449250, // Level 73
  462050, // Level 74
  475350, // Level 75
  489150, // Level 76
  503450, // Level 77
  518250, // Level 78
  533550, // Level 79
  549350, // Level 80
  565650, // Level 81
  583950, // Level 82
  604250, // Level 83
  626550, // Level 84
  650850, // Level 85
  677150, // Level 86
  705450, // Level 87
  735750, // Level 88
  768050, // Level 89
  802350, // Level 90
];

/**
 * Calculate EXP needed to go from one level to another for characters
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
 * Calculate EXP needed to go from one level to another for weapons
 * @param fromLevel Starting level (1-90)
 * @param toLevel Target level (1-90)
 * @param rarity Weapon rarity (1-5 stars)
 */
export function calculateWeaponExpNeeded(
  fromLevel: number,
  toLevel: number,
  rarity: 1 | 2 | 3 | 4 | 5
): number {
  if (fromLevel >= toLevel || fromLevel < 1 || toLevel > 90) {
    return 0;
  }

  const expTable = getWeaponExpTable(rarity);
  const fromIndex = fromLevel - 1;
  const toIndex = toLevel - 1;

  return expTable[toIndex] - expTable[fromIndex];
}

/**
 * Weapon EXP increments by rarity - EXP needed to go from level X to X+1
 * These are the "To Next" values from the game
 * Index corresponds to level (e.g., index 0 = EXP to go from 1→2, index 89 = EXP to go from 89→90)
 */

// 5-Star Weapon EXP Increments (Verified from game data - "To Next" column)
const WEAPON_EXP_INCREMENTS_5STAR: number[] = [
  600, // 1 → 2
  700, // 2 → 3
  800, // 3 → 4
  900, // 4 → 5
  1000, // 5 → 6
  1100, // 6 → 7
  1300, // 7 → 8
  1400, // 8 → 9
  1600, // 9 → 10
  1800, // 10 → 11
  2000, // 11 → 12
  2200, // 12 → 13
  2500, // 13 → 14
  2700, // 14 → 15
  3000, // 15 → 16
  3300, // 16 → 17
  3600, // 17 → 18
  3900, // 18 → 19
  4300, // 19 → 20
  4600, // 20 → 21
  5000, // 21 → 22
  5400, // 22 → 23
  5800, // 23 → 24
  6300, // 24 → 25
  6700, // 25 → 26
  7200, // 26 → 27
  7700, // 27 → 28
  8200, // 28 → 29
  8700, // 29 → 30
  9300, // 30 → 31
  9900, // 31 → 32
  10500, // 32 → 33
  11100, // 33 → 34
  11800, // 34 → 35
  12400, // 35 → 36
  13100, // 36 → 37
  13800, // 37 → 38
  14600, // 38 → 39
  15300, // 39 → 40
  16100, // 40 → 41
  16900, // 41 → 42
  17700, // 42 → 43
  18600, // 43 → 44
  19400, // 44 → 45
  20300, // 45 → 46
  21300, // 46 → 47
  22200, // 47 → 48
  23200, // 48 → 49
  24200, // 49 → 50
  25200, // 50 → 51
  26300, // 51 → 52
  27300, // 52 → 53
  28400, // 53 → 54
  29600, // 54 → 55
  30700, // 55 → 56
  31900, // 56 → 57
  33100, // 57 → 58
  34300, // 58 → 59
  35600, // 59 → 60
  36900, // 60 → 61
  38200, // 61 → 62
  39600, // 62 → 63
  41000, // 63 → 64
  42400, // 64 → 65
  43800, // 65 → 66
  45300, // 66 → 67
  46800, // 67 → 68
  48300, // 68 → 69
  49800, // 69 → 70
  51400, // 70 → 71
  53000, // 71 → 72
  54700, // 72 → 73
  56400, // 73 → 74
  58100, // 74 → 75
  59800, // 75 → 76
  61600, // 76 → 77
  63400, // 77 → 78
  65200, // 78 → 79
  67100, // 79 → 80
  71600, // 80 → 81
  73900, // 81 → 82
  76900, // 82 → 83
  80600, // 83 → 84
  85300, // 84 → 85
  91400, // 85 → 86
  99000, // 86 → 87
  108400, // 87 → 88
  120000, // 88 → 89
  134100, // 89 → 90
];

// 4-Star Weapon EXP Increments (Verified from game data - "To Next" column)
const WEAPON_EXP_INCREMENTS_4STAR: number[] = [
  400, // 1 → 2
  500, // 2 → 3
  700, // 3 → 4
  800, // 4 → 5
  1000, // 5 → 6
  1100, // 6 → 7
  1300, // 7 → 8
  1500, // 8 → 9
  1600, // 9 → 10
  1800, // 10 → 11
  2000, // 11 → 12
  2200, // 12 → 13
  2400, // 13 → 14
  2700, // 14 → 15
  2900, // 15 → 16
  3100, // 16 → 17
  3400, // 17 → 18
  3600, // 18 → 19
  3900, // 19 → 20
  4200, // 20 → 21
  4400, // 21 → 22
  4700, // 22 → 23
  5000, // 23 → 24
  5400, // 24 → 25
  5700, // 25 → 26
  6000, // 26 → 27
  6400, // 27 → 28
  6700, // 28 → 29
  7100, // 29 → 30
  7500, // 30 → 31
  7900, // 31 → 32
  8300, // 32 → 33
  8800, // 33 → 34
  9200, // 34 → 35
  9700, // 35 → 36
  10200, // 36 → 37
  10700, // 37 → 38
  11200, // 38 → 39
  11700, // 39 → 40
  12300, // 40 → 41
  12800, // 41 → 42
  13400, // 42 → 43
  14000, // 43 → 44
  14700, // 44 → 45
  15300, // 45 → 46
  16000, // 46 → 47
  16700, // 47 → 48
  17400, // 48 → 49
  18200, // 49 → 50
  18900, // 50 → 51
  19700, // 51 → 52
  20500, // 52 → 53
  21400, // 53 → 54
  22200, // 54 → 55
  23100, // 55 → 56
  24100, // 56 → 57
  25000, // 57 → 58
  26000, // 58 → 59
  27000, // 59 → 60
  28100, // 60 → 61
  29200, // 61 → 62
  30300, // 62 → 63
  31400, // 63 → 64
  32600, // 64 → 65
  33800, // 65 → 66
  35100, // 66 → 67
  36400, // 67 → 68
  37700, // 68 → 69
  39000, // 69 → 70
  40500, // 70 → 71
  41900, // 71 → 72
  43400, // 72 → 73
  44900, // 73 → 74
  46500, // 74 → 75
  48100, // 75 → 76
  49800, // 76 → 77
  51500, // 77 → 78
  53200, // 78 → 79
  55000, // 79 → 80
  60500, // 80 → 81
  63200, // 81 → 82
  67000, // 82 → 83
  72100, // 83 → 84
  78700, // 84 → 85
  87200, // 85 → 86
  97900, // 86 → 87
  111400, // 87 → 88
  128000, // 88 → 89
  148400, // 89 → 90
];

// 3-Star Weapon EXP Increments (Verified from game data - "To Next" column)
const WEAPON_EXP_INCREMENTS_3STAR: number[] = [
  240, // 1 → 2
  300, // 2 → 3
  420, // 3 → 4
  480, // 4 → 5
  600, // 5 → 6
  660, // 6 → 7
  780, // 7 → 8
  900, // 8 → 9
  960, // 9 → 10
  1080, // 10 → 11
  1200, // 11 → 12
  1320, // 12 → 13
  1440, // 13 → 14
  1620, // 14 → 15
  1740, // 15 → 16
  1860, // 16 → 17
  2040, // 17 → 18
  2160, // 18 → 19
  2340, // 19 → 20
  2520, // 20 → 21
  2640, // 21 → 22
  2820, // 22 → 23
  3000, // 23 → 24
  3240, // 24 → 25
  3420, // 25 → 26
  3600, // 26 → 27
  3840, // 27 → 28
  4020, // 28 → 29
  4260, // 29 → 30
  4500, // 30 → 31
  4740, // 31 → 32
  4980, // 32 → 33
  5280, // 33 → 34
  5520, // 34 → 35
  5820, // 35 → 36
  6120, // 36 → 37
  6420, // 37 → 38
  6720, // 38 → 39
  7020, // 39 → 40
  7380, // 40 → 41
  7680, // 41 → 42
  8040, // 42 → 43
  8400, // 43 → 44
  8820, // 44 → 45
  9180, // 45 → 46
  9600, // 46 → 47
  10020, // 47 → 48
  10440, // 48 → 49
  10920, // 49 → 50
  11340, // 50 → 51
  11820, // 51 → 52
  12300, // 52 → 53
  12840, // 53 → 54
  13320, // 54 → 55
  13860, // 55 → 56
  14460, // 56 → 57
  15000, // 57 → 58
  15600, // 58 → 59
  16200, // 59 → 60
  16860, // 60 → 61
  17520, // 61 → 62
  18180, // 62 → 63
  18840, // 63 → 64
  19560, // 64 → 65
  20280, // 65 → 66
  21060, // 66 → 67
  21840, // 67 → 68
  22620, // 68 → 69
  23400, // 69 → 70
  24300, // 70 → 71
  25140, // 71 → 72
  26040, // 72 → 73
  26940, // 73 → 74
  27900, // 74 → 75
  28860, // 75 → 76
  29880, // 76 → 77
  30900, // 77 → 78
  31920, // 78 → 79
  33000, // 79 → 80
  36300, // 80 → 81
  37920, // 81 → 82
  40200, // 82 → 83
  43260, // 83 → 84
  47220, // 84 → 85
  52320, // 85 → 86
  58740, // 86 → 87
  66840, // 87 → 88
  76800, // 88 → 89
  89040, // 89 → 90
];

// 2-Star Weapon EXP Increments (Verified from game data - "To Next" column)
const WEAPON_EXP_INCREMENTS_2STAR: number[] = [
  200, // 1 → 2
  250, // 2 → 3
  350, // 3 → 4
  400, // 4 → 5
  500, // 5 → 6
  550, // 6 → 7
  650, // 7 → 8
  750, // 8 → 9
  800, // 9 → 10
  900, // 10 → 11
  1000, // 11 → 12
  1100, // 12 → 13
  1200, // 13 → 14
  1350, // 14 → 15
  1450, // 15 → 16
  1550, // 16 → 17
  1700, // 17 → 18
  1800, // 18 → 19
  1950, // 19 → 20
  2100, // 20 → 21
  2200, // 21 → 22
  2350, // 22 → 23
  2500, // 23 → 24
  2700, // 24 → 25
  2850, // 25 → 26
  3000, // 26 → 27
  3200, // 27 → 28
  3350, // 28 → 29
  3550, // 29 → 30
  3750, // 30 → 31
  3950, // 31 → 32
  4150, // 32 → 33
  4400, // 33 → 34
  4600, // 34 → 35
  4850, // 35 → 36
  5100, // 36 → 37
  5350, // 37 → 38
  5600, // 38 → 39
  5850, // 39 → 40
  6150, // 40 → 41
  6400, // 41 → 42
  6700, // 42 → 43
  7000, // 43 → 44
  7350, // 44 → 45
  7650, // 45 → 46
  8000, // 46 → 47
  8350, // 47 → 48
  8700, // 48 → 49
  9100, // 49 → 50
  9450, // 50 → 51
  9850, // 51 → 52
  10250, // 52 → 53
  10700, // 53 → 54
  11100, // 54 → 55
  11550, // 55 → 56
  12050, // 56 → 57
  12500, // 57 → 58
  13000, // 58 → 59
  13500, // 59 → 60
  14050, // 60 → 61
  14600, // 61 → 62
  15150, // 62 → 63
  15700, // 63 → 64
  16300, // 64 → 65
  16900, // 65 → 66
  17550, // 66 → 67
  18200, // 67 → 68
  18850, // 68 → 69
  19500, // 69 → 70
  20250, // 70 → 71
  20950, // 71 → 72
  21700, // 72 → 73
  22450, // 73 → 74
  23250, // 74 → 75
  24050, // 75 → 76
  24900, // 76 → 77
  25750, // 77 → 78
  26600, // 78 → 79
  27500, // 79 → 80
  30250, // 80 → 81
  31600, // 81 → 82
  33500, // 82 → 83
  36050, // 83 → 84
  39350, // 84 → 85
  43600, // 85 → 86
  48950, // 86 → 87
  55700, // 87 → 88
  64000, // 88 → 89
  74200, // 89 → 90
];

// 1-Star Weapon EXP Increments (Verified from game data - "To Next" column)
const WEAPON_EXP_INCREMENTS_1STAR: number[] = [
  160, // 1 → 2
  200, // 2 → 3
  280, // 3 → 4
  320, // 4 → 5
  400, // 5 → 6
  440, // 6 → 7
  520, // 7 → 8
  600, // 8 → 9
  640, // 9 → 10
  720, // 10 → 11
  800, // 11 → 12
  880, // 12 → 13
  960, // 13 → 14
  1080, // 14 → 15
  1160, // 15 → 16
  1240, // 16 → 17
  1360, // 17 → 18
  1440, // 18 → 19
  1560, // 19 → 20
  1680, // 20 → 21
  1760, // 21 → 22
  1880, // 22 → 23
  2000, // 23 → 24
  2160, // 24 → 25
  2280, // 25 → 26
  2400, // 26 → 27
  2560, // 27 → 28
  2680, // 28 → 29
  2840, // 29 → 30
  3000, // 30 → 31
  3160, // 31 → 32
  3320, // 32 → 33
  3520, // 33 → 34
  3680, // 34 → 35
  3880, // 35 → 36
  4080, // 36 → 37
  4280, // 37 → 38
  4480, // 38 → 39
  4680, // 39 → 40
  4920, // 40 → 41
  5120, // 41 → 42
  5360, // 42 → 43
  5600, // 43 → 44
  5880, // 44 → 45
  6120, // 45 → 46
  6400, // 46 → 47
  6680, // 47 → 48
  6960, // 48 → 49
  7280, // 49 → 50
  7560, // 50 → 51
  7880, // 51 → 52
  8200, // 52 → 53
  8560, // 53 → 54
  8880, // 54 → 55
  9240, // 55 → 56
  9640, // 56 → 57
  10000, // 57 → 58
  10400, // 58 → 59
  10800, // 59 → 60
  11240, // 60 → 61
  11680, // 61 → 62
  12120, // 62 → 63
  12560, // 63 → 64
  13040, // 64 → 65
  13520, // 65 → 66
  14040, // 66 → 67
  14560, // 67 → 68
  15080, // 68 → 69
  15600, // 69 → 70
  16200, // 70 → 71
  16760, // 71 → 72
  17360, // 72 → 73
  17960, // 73 → 74
  18600, // 74 → 75
  19240, // 75 → 76
  19920, // 76 → 77
  20600, // 77 → 78
  21280, // 78 → 79
  22000, // 79 → 80
  24200, // 80 → 81
  25280, // 81 → 82
  26800, // 82 → 83
  28840, // 83 → 84
  31480, // 84 → 85
  34880, // 85 → 86
  39160, // 86 → 87
  44560, // 87 → 88
  51200, // 88 → 89
  59360, // 89 → 90
];

/**
 * Helper function to convert incremental EXP to cumulative EXP table
 */
function generateCumulativeExpTable(increments: number[]): number[] {
  const cumulative = [0]; // Level 1 has 0 total EXP
  let total = 0;
  for (const increment of increments) {
    total += increment;
    cumulative.push(total);
  }
  return cumulative;
}

// Generate cumulative tables from increments for efficient lookups
export const WEAPON_EXP_TABLE_5STAR = generateCumulativeExpTable(WEAPON_EXP_INCREMENTS_5STAR);
export const WEAPON_EXP_TABLE_4STAR = generateCumulativeExpTable(WEAPON_EXP_INCREMENTS_4STAR);
export const WEAPON_EXP_TABLE_3STAR = generateCumulativeExpTable(WEAPON_EXP_INCREMENTS_3STAR);
export const WEAPON_EXP_TABLE_2STAR = generateCumulativeExpTable(WEAPON_EXP_INCREMENTS_2STAR);
export const WEAPON_EXP_TABLE_1STAR = generateCumulativeExpTable(WEAPON_EXP_INCREMENTS_1STAR);

/**
 * Get weapon EXP table by rarity
 */
export function getWeaponExpTable(rarity: 1 | 2 | 3 | 4 | 5): number[] {
  switch (rarity) {
    case 5:
      return WEAPON_EXP_TABLE_5STAR;
    case 4:
      return WEAPON_EXP_TABLE_4STAR;
    case 3:
      return WEAPON_EXP_TABLE_3STAR;
    case 2:
      return WEAPON_EXP_TABLE_2STAR;
    case 1:
      return WEAPON_EXP_TABLE_1STAR;
    default:
      return WEAPON_EXP_TABLE_5STAR;
  }
}

/**
 * @deprecated Use WEAPON_EXP_TABLE_5STAR instead. This is kept for backwards compatibility.
 */
export const WEAPON_EXP_TABLE = WEAPON_EXP_TABLE_5STAR;

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
 * Shell Credits needed for leveling characters from one level to another
 * Formula: 250 Shell Credits per 10,000 EXP (0.025 per EXP)
 */
export function calculateLevelingShellCredits(expNeeded: number): number {
  return Math.floor((expNeeded / 10000) * 250);
}

/**
 * Shell Credits needed for leveling weapons from one level to another
 * Formula: 0.4 Shell Credits per 1 EXP
 */
export function calculateWeaponLevelingShellCredits(expNeeded: number): number {
  return Math.floor(expNeeded * 0.4);
}
