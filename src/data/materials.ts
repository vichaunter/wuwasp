import type { Material, MaterialCategory, MaterialQualityTier } from '@/types';

// Materials database extracted from characters
// Each quality tier is a separate material entry
export const materials: Material[] = [
  {
    id: 'lf-tidal-residuum',
    name: 'LF Tidal Residuum',
    baseName: 'Tidal Residuum',
    category: 'COMMON',
    quality: 'T1',
  },
  {
    id: 'mf-tidal-residuum',
    name: 'MF Tidal Residuum',
    baseName: 'Tidal Residuum',
    category: 'COMMON',
    quality: 'T2',
  },
  {
    id: 'hf-tidal-residuum',
    name: 'HF Tidal Residuum',
    baseName: 'Tidal Residuum',
    category: 'COMMON',
    quality: 'T3',
  },
  {
    id: 'ff-tidal-residuum',
    name: 'FF Tidal Residuum',
    baseName: 'Tidal Residuum',
    category: 'COMMON',
    quality: 'T4',
  },
  {
    id: 'lf-crude-ring',
    name: 'LF Crude Ring',
    baseName: 'Crude Ring',
    category: 'COMMON',
    quality: 'T1',
  },
  {
    id: 'mf-crude-ring',
    name: 'MF Crude Ring',
    baseName: 'Crude Ring',
    category: 'COMMON',
    quality: 'T2',
  },
  {
    id: 'hf-crude-ring',
    name: 'HF Crude Ring',
    baseName: 'Crude Ring',
    category: 'COMMON',
    quality: 'T3',
  },
  {
    id: 'ff-crude-ring',
    name: 'FF Crude Ring',
    baseName: 'Crude Ring',
    category: 'COMMON',
    quality: 'T4',
  },
  {
    id: 'lf-whisperin-core',
    name: 'LF Whisperin Core',
    baseName: 'Whisperin Core',
    category: 'COMMON',
    quality: 'T1',
  },
  {
    id: 'mf-whisperin-core',
    name: 'MF Whisperin Core',
    baseName: 'Whisperin Core',
    category: 'COMMON',
    quality: 'T2',
  },
  {
    id: 'hf-whisperin-core',
    name: 'HF Whisperin Core',
    baseName: 'Whisperin Core',
    category: 'COMMON',
    quality: 'T3',
  },
  {
    id: 'ff-whisperin-core',
    name: 'FF Whisperin Core',
    baseName: 'Whisperin Core',
    category: 'COMMON',
    quality: 'T4',
  },
  {
    id: 'lf-polygon-core',
    name: 'LF Polygon Core',
    baseName: 'Polygon Core',
    category: 'COMMON',
    quality: 'T1',
  },
  {
    id: 'mf-polygon-core',
    name: 'MF Polygon Core',
    baseName: 'Polygon Core',
    category: 'COMMON',
    quality: 'T2',
  },
  {
    id: 'hf-polygon-core',
    name: 'HF Polygon Core',
    baseName: 'Polygon Core',
    category: 'COMMON',
    quality: 'T3',
  },
  {
    id: 'ff-polygon-core',
    name: 'FF Polygon Core',
    baseName: 'Polygon Core',
    category: 'COMMON',
    quality: 'T4',
  },
  {
    id: 'lf-howler-core',
    name: 'LF Howler Core',
    baseName: 'Howler Core',
    category: 'COMMON',
    quality: 'T1',
  },
  {
    id: 'mf-howler-core',
    name: 'MF Howler Core',
    baseName: 'Howler Core',
    category: 'COMMON',
    quality: 'T2',
  },
  {
    id: 'hf-howler-core',
    name: 'HF Howler Core',
    baseName: 'Howler Core',
    category: 'COMMON',
    quality: 'T3',
  },
  {
    id: 'ff-howler-core',
    name: 'FF Howler Core',
    baseName: 'Howler Core',
    category: 'COMMON',
    quality: 'T4',
  },
  {
    id: '210-waveworn-residue',
    name: 'Waveworn Residue 210',
    baseName: 'Waveworn Residue',
    category: 'FORGERY',
    quality: 'T1',
  },
  {
    id: '226-waveworn-residue',
    name: 'Waveworn Residue 226',
    baseName: 'Waveworn Residue',
    category: 'FORGERY',
    quality: 'T2',
  },
  {
    id: '235-waveworn-residue',
    name: 'Waveworn Residue 235',
    baseName: 'Waveworn Residue',
    category: 'FORGERY',
    quality: 'T3',
  },
  {
    id: '239-waveworn-residue',
    name: 'Waveworn Residue 239',
    baseName: 'Waveworn Residue',
    category: 'FORGERY',
    quality: 'T4',
  },
  {
    id: '210-inert-metallic-drip',
    name: 'Inert Metallic Drip 210',
    baseName: 'Inert Metallic Drip',
    category: 'FORGERY',
    quality: 'T1',
  },
  {
    id: '226-inert-metallic-drip',
    name: 'Inert Metallic Drip 226',
    baseName: 'Inert Metallic Drip',
    category: 'FORGERY',
    quality: 'T2',
  },
  {
    id: '235-inert-metallic-drip',
    name: 'Inert Metallic Drip 235',
    baseName: 'Inert Metallic Drip',
    category: 'FORGERY',
    quality: 'T3',
  },
  {
    id: '239-inert-metallic-drip',
    name: 'Inert Metallic Drip 239',
    baseName: 'Inert Metallic Drip',
    category: 'FORGERY',
    quality: 'T4',
  },
  {
    id: '210-lento-helix',
    name: 'Lento Helix 210',
    baseName: 'Lento Helix',
    category: 'FORGERY',
    quality: 'T1',
  },
  {
    id: '226-lento-helix',
    name: 'Lento Helix 226',
    baseName: 'Lento Helix',
    category: 'FORGERY',
    quality: 'T2',
  },
  {
    id: '235-lento-helix',
    name: 'Lento Helix 235',
    baseName: 'Lento Helix',
    category: 'FORGERY',
    quality: 'T3',
  },
  {
    id: '239-lento-helix',
    name: 'Lento Helix 239',
    baseName: 'Lento Helix',
    category: 'FORGERY',
    quality: 'T4',
  },
  {
    id: '210-impure-phlogiston',
    name: 'Impure Phlogiston 210',
    baseName: 'Impure Phlogiston',
    category: 'FORGERY',
    quality: 'T1',
  },
  {
    id: '226-impure-phlogiston',
    name: 'Impure Phlogiston 226',
    baseName: 'Impure Phlogiston',
    category: 'FORGERY',
    quality: 'T2',
  },
  {
    id: '235-impure-phlogiston',
    name: 'Impure Phlogiston 235',
    baseName: 'Impure Phlogiston',
    category: 'FORGERY',
    quality: 'T3',
  },
  {
    id: '239-impure-phlogiston',
    name: 'Impure Phlogiston 239',
    baseName: 'Impure Phlogiston',
    category: 'FORGERY',
    quality: 'T4',
  },
  {
    id: '210-cadence-seed',
    name: 'Cadence Seed 210',
    baseName: 'Cadence Seed',
    category: 'FORGERY',
    quality: 'T1',
  },
  {
    id: '226-cadence-seed',
    name: 'Cadence Seed 226',
    baseName: 'Cadence Seed',
    category: 'FORGERY',
    quality: 'T2',
  },
  {
    id: '235-cadence-seed',
    name: 'Cadence Seed 235',
    baseName: 'Cadence Seed',
    category: 'FORGERY',
    quality: 'T3',
  },
  {
    id: '239-cadence-seed',
    name: 'Cadence Seed 239',
    baseName: 'Cadence Seed',
    category: 'FORGERY',
    quality: 'T4',
  },
  {
    id: 'blighted-crown-of-puppet-king',
    name: 'Blighted Crown of Puppet King',
    baseName: 'Blighted Crown of Puppet King',
    category: 'BOSS',
  },
  {
    id: 'when-irises-bloom',
    name: 'When Irises Bloom',
    baseName: 'When Irises Bloom',
    category: 'BOSS',
  },
  {
    id: 'blazing-bone',
    name: 'Blazing Bone',
    baseName: 'Blazing Bone',
    category: 'BOSS',
  },
  {
    id: 'the-netherworld-s-stare',
    name: 'The Netherworld\\\'s Stare',
    baseName: 'The Netherworld\\\'s Stare',
    category: 'BOSS',
  },
  {
    id: 'thundering-tacet-core',
    name: 'Thundering Tacet Core',
    baseName: 'Thundering Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'monument-bell',
    name: 'Monument Bell',
    baseName: 'Monument Bell',
    category: 'BOSS',
  },
  {
    id: 'topological-confinement',
    name: 'Topological Confinement',
    baseName: 'Topological Confinement',
    category: 'BOSS',
  },
  {
    id: 'dreamless-feather',
    name: 'Dreamless Feather',
    baseName: 'Dreamless Feather',
    category: 'BOSS',
  },
  {
    id: 'cleansing-conch',
    name: 'Cleansing Conch',
    baseName: 'Cleansing Conch',
    category: 'BOSS',
  },
  {
    id: 'unfading-glory',
    name: 'Unfading Glory',
    baseName: 'Unfading Glory',
    category: 'BOSS',
  },
  {
    id: 'rage-tacet-core',
    name: 'Rage Tacet Core',
    baseName: 'Rage Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'sentinel-s-dagger',
    name: 'Sentinel\\\'s Dagger',
    baseName: 'Sentinel\\\'s Dagger',
    category: 'BOSS',
  },
  {
    id: 'unending-destruction',
    name: 'Unending Destruction',
    baseName: 'Unending Destruction',
    category: 'BOSS',
  },
  {
    id: 'curse-of-the-abyss',
    name: 'Curse of the Abyss',
    baseName: 'Curse of the Abyss',
    category: 'BOSS',
  },
  {
    id: 'abyssal-husk',
    name: 'Abyssal Husk',
    baseName: 'Abyssal Husk',
    category: 'BOSS',
  },
  {
    id: 'roaring-rock-fist',
    name: 'Roaring Rock Fist',
    baseName: 'Roaring Rock Fist',
    category: 'BOSS',
  },
  {
    id: 'elegy-tacet-core',
    name: 'Elegy Tacet Core',
    baseName: 'Elegy Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'sound-keeping-tacet-core',
    name: 'Sound-Keeping Tacet Core',
    baseName: 'Sound-Keeping Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'truth-in-lies',
    name: 'Truth in Lies',
    baseName: 'Truth in Lies',
    category: 'BOSS',
  },
  {
    id: 'hidden-thunder-tacet-core',
    name: 'Hidden Thunder Tacet Core',
    baseName: 'Hidden Thunder Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'group-abomination-tacet-core',
    name: 'Group Abomination Tacet Core',
    baseName: 'Group Abomination Tacet Core',
    category: 'BOSS',
  },
  {
    id: 'platinum-core',
    name: 'Platinum Core',
    baseName: 'Platinum Core',
    category: 'BOSS',
  },
  {
    id: 'luminous-calendula',
    name: 'Luminous Calendula',
    baseName: 'Luminous Calendula',
    category: 'OVERWORLD',
  },
  {
    id: 'golden-fleece',
    name: 'Golden Fleece',
    baseName: 'Golden Fleece',
    category: 'OVERWORLD',
  },
  {
    id: 'iris',
    name: 'Iris',
    baseName: 'Iris',
    category: 'OVERWORLD',
  },
  {
    id: 'nova',
    name: 'Nova',
    baseName: 'Nova',
    category: 'OVERWORLD',
  },
  {
    id: 'seaside-cendrelis',
    name: 'Seaside Cendrelis',
    baseName: 'Seaside Cendrelis',
    category: 'OVERWORLD',
  },
  {
    id: 'bamboo-iris',
    name: 'Bamboo Iris',
    baseName: 'Bamboo Iris',
    category: 'OVERWORLD',
  },
  {
    id: 'pavo-plum',
    name: 'Pavo Plum',
    baseName: 'Pavo Plum',
    category: 'OVERWORLD',
  },
  {
    id: 'pecok-flower',
    name: 'Pecok Flower',
    baseName: 'Pecok Flower',
    category: 'OVERWORLD',
  },
  {
    id: 'stone-rose',
    name: 'Stone Rose',
    baseName: 'Stone Rose',
    category: 'OVERWORLD',
  },
  {
    id: 'sliverglow-bloom',
    name: 'Sliverglow Bloom',
    baseName: 'Sliverglow Bloom',
    category: 'OVERWORLD',
  },
  {
    id: 'lanternberry',
    name: 'Lanternberry',
    baseName: 'Lanternberry',
    category: 'OVERWORLD',
  },
  {
    id: 'loong-s-pearl',
    name: 'Loong\\\'s Pearl',
    baseName: 'Loong\\\'s Pearl',
    category: 'OVERWORLD',
  },
  {
    id: 'coriolus',
    name: 'Coriolus',
    baseName: 'Coriolus',
    category: 'OVERWORLD',
  },
  {
    id: 'bloodleaf-viburnum',
    name: 'Bloodleaf Viburnum',
    baseName: 'Bloodleaf Viburnum',
    category: 'OVERWORLD',
  },
  {
    id: 'firecracker-jewelweed',
    name: 'Firecracker Jewelweed',
    baseName: 'Firecracker Jewelweed',
    category: 'OVERWORLD',
  },
  {
    id: 'afterlife',
    name: 'Afterlife',
    baseName: 'Afterlife',
    category: 'OVERWORLD',
  },
  {
    id: 'belle-poppy',
    name: 'Belle Poppy',
    baseName: 'Belle Poppy',
    category: 'OVERWORLD',
  },
  {
    id: 'violet-coral',
    name: 'Violet Coral',
    baseName: 'Violet Coral',
    category: 'OVERWORLD',
  },
  {
    id: 'sword-acorus',
    name: 'Sword Acorus',
    baseName: 'Sword Acorus',
    category: 'OVERWORLD',
  },
  {
    id: 'shell-credit',
    name: 'Shell Credit',
    baseName: 'Shell Credit',
    category: 'CURRENCY',
  }
];

// Helper functions
export function getMaterialById(id: string): Material | undefined {
  return materials.find(m => m.id === id);
}

export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return materials.filter(m => m.category === category);
}

export function getMaterialByBaseName(baseName: string): Material[] {
  return materials.filter(m => m.baseName === baseName);
}

export function getMaterialByNameAndQuality(baseName: string, quality: MaterialQualityTier): Material | undefined {
  return materials.find(m => m.baseName === baseName && m.quality === quality);
}

// Get all unique base materials (without qualities)
export function getUniqueMaterials(): { baseName: string; category: MaterialCategory }[] {
  const unique = new Map<string, MaterialCategory>();
  materials.forEach(m => {
    if (!unique.has(m.baseName)) {
      unique.set(m.baseName, m.category);
    }
  });
  return Array.from(unique.entries()).map(([baseName, category]) => ({ baseName, category }));
}
