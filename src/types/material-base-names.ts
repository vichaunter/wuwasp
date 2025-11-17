/**
 * Material Base Names
 * 
 * This const object contains all unique base material names in the game.
 * Using this prevents typos and makes it easier to maintain consistency
 * across weapons, characters, and the materials database.
 */

export const MaterialBaseName = {
  // COMMON Materials (Enemy drops)
  HOWLER_CORE: "Howler Core",
  TIDAL_RESIDUUM: "Tidal Residuum",
  RING: "Ring",
  WHISPERIN_CORE: "Whisperin Core",
  POLYGON_CORE: "Polygon Core",
  MASK: "Mask",
  MYSTERIOUS_CODE: "Mysterious Code",
  WAVE_CUTTING_TOOTH: "Wave-Cutting Tooth",

  // FORGERY Materials (Domain materials)
  IMPURE_PHLOGISTON: "Impure Phlogiston",
  WAVEWORN_RESIDUE: "Waveworn Residue",
  LENTO_HELIX: "Lento Helix",
  INERT_METALLIC_DRIP: "Inert Metallic Drip",
  CADENCE_SEED: "Cadence Seed",

  // BOSS Materials (World bosses)
  ROARING_ROCK_FIST: "Roaring Rock Fist",
  MONUMENT_BELL: "Monument Bell",
  BLIGHTED_CROWN_OF_PUPPET_KING: "Blighted Crown of Puppet King",
  WHEN_IRISES_BLOOM: "When Irises Bloom",
  SOUND_KEEPING_TACET_CORE: "Sound-Keeping Tacet Core",
  BLAZING_BONE: "Blazing Bone",
  THE_NETHERWORLDS_STARE: "The Netherworld's Stare",
  THUNDERING_TACET_CORE: "Thundering Tacet Core",
  TOPOLOGICAL_CONFINEMENT: "Topological Confinement",
  DREAMLESS_FEATHER: "Dreamless Feather",
  CLEANSING_CONCH: "Cleansing Conch",
  UNFADING_GLORY: "Unfading Glory",
  RAGE_TACET_CORE: "Rage Tacet Core",
  SENTINELS_DAGGER: "Sentinel's Dagger",
  STRIFE_TACET_CORE: "Strife Tacet Core",
  UNENDING_DESTRUCTION: "Unending Destruction",
  CURSE_OF_THE_ABYSS: "Curse of the Abyss",
  ABYSSAL_HUSK: "Abyssal Husk",
  ELEGY_TACET_CORE: "Elegy Tacet Core",
  TRUTH_IN_LIES: "Truth in Lies",
  GOLD_DISSOLVING_FEATHER: "Gold-Dissolving Feather",
  HIDDEN_THUNDER_TACET_CORE: "Hidden Thunder Tacet Core",
  GROUP_ABOMINATION_TACET_CORE: "Group Abomination Tacet Core",
  PLATINUM_CORE: "Platinum Core",
  WINTRY_BELL: "Wintry Bell",

  // OVERWORLD Materials (Collectibles/flowers)
  LUMINOUS_CALENDULA: "Luminous Calendula",
  LANTERNBERRY: "Lanternberry",
  GOLDEN_FLEECE: "Golden Fleece",
  IRIS: "Iris",
  NOVA: "Nova",
  SEASIDE_CENDRELIS: "Seaside Cendrelis",
  BAMBOO_IRIS: "Bamboo Iris",
  PAVO_PLUM: "Pavo Plum",
  BELLE_POPPY: "Belle Poppy",
  PECOK_FLOWER: "Pecok Flower",
  STONE_ROSE: "Stone Rose",
  SILVERGLOW_BLOOM: "Silverglow Bloom",
  LOONGS_PEARL: "Loong's Pearl",
  CORIOLUS: "Coriolus",
  TERRASPAWN_FUNGUS: "Terraspawn Fungus",
  BLOODLEAF_VIBURNUM: "Bloodleaf Viburnum",
  FIRECRACKER_JEWELWEED: "Firecracker Jewelweed",
  AFTERLIFE: "Afterlife",
  VIOLET_CORAL: "Violet Coral",
  SWORD_ACORUS: "Sword Acorus",

  // EXP Materials
  RESONANCE_POTION: "Resonance Potion",
  ENERGY_CORE: "Energy Core",

  // CURRENCY
  SHELL_CREDIT: "Shell Credit",
} as const;

export type MaterialBaseNameType = typeof MaterialBaseName[keyof typeof MaterialBaseName];

