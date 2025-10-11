import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MaterialWithImage {
  name: string;
  images: Map<string, string>; // quality/variant -> image URL
}

function extractMaterialsFromCharacters(): {
  common: Map<string, MaterialWithImage>;
  forgery: Map<string, MaterialWithImage>;
  boss: Map<string, MaterialWithImage>;
  overworld: Map<string, MaterialWithImage>;
} {
  const materials = {
    common: new Map<string, MaterialWithImage>(),
    forgery: new Map<string, MaterialWithImage>(),
    boss: new Map<string, MaterialWithImage>(),
    overworld: new Map<string, MaterialWithImage>(),
  };

  const charactersDir = path.join(__dirname, '../src/data/characters');
  const files = fs.readdirSync(charactersDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(charactersDir, file), 'utf-8');
    
    // Extract material names with regex
    const commonMatch = content.match(/ascension:\s*\{[^}]*common:\s*'([^'\\]+(\\.[^'\\]*)*)'/);
    const bossMatch = content.match(/ascension:\s*\{[^}]*boss:\s*'([^'\\]+(\\.[^'\\]*)*)'/);
    const overworldMatch = content.match(/ascension:\s*\{[^}]*overworld:\s*'([^'\\]+(\\.[^'\\]*)*)'/);
    const forgeryMatch = content.match(/forte:\s*\{[^}]*forgery:\s*'([^'\\]+(\\.[^'\\]*)*)'/);
    const forteBossMatch = content.match(/forte:\s*\{[^}]*boss:\s*'([^'\\]+(\\.[^'\\]*)*)'/);

    if (commonMatch && commonMatch[1]) {
      if (!materials.common.has(commonMatch[1])) {
        materials.common.set(commonMatch[1], { name: commonMatch[1], images: new Map() });
      }
    }
    if (bossMatch && bossMatch[1]) {
      if (!materials.boss.has(bossMatch[1])) {
        materials.boss.set(bossMatch[1], { name: bossMatch[1], images: new Map() });
      }
    }
    if (overworldMatch && overworldMatch[1]) {
      if (!materials.overworld.has(overworldMatch[1])) {
        materials.overworld.set(overworldMatch[1], { name: overworldMatch[1], images: new Map() });
      }
    }
    if (forgeryMatch && forgeryMatch[1]) {
      if (!materials.forgery.has(forgeryMatch[1])) {
        materials.forgery.set(forgeryMatch[1], { name: forgeryMatch[1], images: new Map() });
      }
    }
    if (forteBossMatch && forteBossMatch[1]) {
      if (!materials.boss.has(forteBossMatch[1])) {
        materials.boss.set(forteBossMatch[1], { name: forteBossMatch[1], images: new Map() });
      }
    }
  }

  // Extract images from HTML cache
  const htmlCacheDir = path.join(__dirname, 'html-cache');
  if (fs.existsSync(htmlCacheDir)) {
    const htmlFiles = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    
    for (const htmlFile of htmlFiles) {
      const htmlContent = fs.readFileSync(path.join(htmlCacheDir, htmlFile), 'utf-8');
      
      // Extract all material images
      const imgRegex = /img[^>]*alt="([^"]*)"[^>]*data-src="([^"]*)"/g;
      let match;
      
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        const altText = match[1];
        const imgUrl = match[2];
        
        // Try to match with our materials
        for (const [baseName, material] of materials.common.entries()) {
          if (altText.includes(baseName)) {
            // Extract quality prefix
            const qualityMatch = altText.match(/^(LF|MF|HF|FF)\s+/);
            if (qualityMatch) {
              material.images.set(qualityMatch[1], imgUrl);
            }
          }
        }
        
        for (const [baseName, material] of materials.forgery.entries()) {
          if (altText.includes(baseName)) {
            const numberMatch = altText.match(/\s+(210|226|235|239)$/);
            if (numberMatch) {
              material.images.set(numberMatch[1], imgUrl);
            }
          }
        }
        
        for (const [baseName, material] of materials.boss.entries()) {
          if (altText === baseName) {
            material.images.set('default', imgUrl);
          }
        }
        
        for (const [baseName, material] of materials.overworld.entries()) {
          if (altText === baseName) {
            material.images.set('default', imgUrl);
          }
        }
      }
    }
  }

  return materials;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeString(str: string): string {
  // Use double backslash for proper escaping in template literals
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function generateMaterialsFile(materials: ReturnType<typeof extractMaterialsFromCharacters>): void {
  const allMaterials: string[] = [];

  // Common materials - generate 4 entries (T1-T4) for each base material
  const commonQualities = [
    { tier: 'T1', prefix: 'LF' },
    { tier: 'T2', prefix: 'MF' },
    { tier: 'T3', prefix: 'HF' },
    { tier: 'T4', prefix: 'FF' },
  ];

  materials.common.forEach((material, baseName) => {
    if (!baseName) return;
    const escapedBaseName = escapeString(baseName);
    
    commonQualities.forEach(({ tier, prefix }) => {
      const id = slugify(`${prefix} ${baseName}`);
      const fullName = `${prefix} ${baseName}`;
      const image = material.images.get(prefix) || '';
      
      allMaterials.push(`  {
    id: '${id}',
    name: '${escapeString(fullName)}',
    baseName: '${escapedBaseName}',
    category: 'COMMON',
    quality: '${tier}',
    image: '${escapeString(image)}',
  }`);
    });
  });

  // Forgery materials - generate 4 entries (T1-T4) for each base material
  const forgeryQualities = [
    { tier: 'T1', prefix: '210' },
    { tier: 'T2', prefix: '226' },
    { tier: 'T3', prefix: '235' },
    { tier: 'T4', prefix: '239' },
  ];

  materials.forgery.forEach((material, baseName) => {
    if (!baseName) return;
    const escapedBaseName = escapeString(baseName);
    
    forgeryQualities.forEach(({ tier, prefix }) => {
      const id = slugify(`${prefix} ${baseName}`);
      const fullName = `${baseName} ${prefix}`;
      const image = material.images.get(prefix) || '';
      
      allMaterials.push(`  {
    id: '${id}',
    name: '${escapeString(fullName)}',
    baseName: '${escapedBaseName}',
    category: 'FORGERY',
    quality: '${tier}',
    image: '${escapeString(image)}',
  }`);
    });
  });

  // Boss materials (unique - no qualities)
  materials.boss.forEach((material, name) => {
    if (!name) return;
    const id = slugify(name);
    const escapedName = escapeString(name);
    const image = material.images.get('default') || '';
    
    allMaterials.push(`  {
    id: '${id}',
    name: '${escapedName}',
    baseName: '${escapedName}',
    category: 'BOSS',
    image: '${escapeString(image)}',
  }`);
  });

  // Overworld materials (unique - no qualities)
  materials.overworld.forEach((material, name) => {
    if (!name) return;
    const id = slugify(name);
    const escapedName = escapeString(name);
    const image = material.images.get('default') || '';
    
    allMaterials.push(`  {
    id: '${id}',
    name: '${escapedName}',
    baseName: '${escapedName}',
    category: 'OVERWORLD',
    image: '${escapeString(image)}',
  }`);
  });

  // Add Shell Credit
  allMaterials.push(`  {
    id: 'shell-credit',
    name: 'Shell Credit',
    baseName: 'Shell Credit',
    category: 'CURRENCY',
  }`);

  const content = `import type { Material, MaterialCategory, MaterialQualityTier } from '@/types';

// Materials database extracted from characters
// Each quality tier is a separate material entry
export const materials: Material[] = [
${allMaterials.join(',\n')}
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
`;

  const outputPath = path.join(__dirname, '../src/data/materials.ts');
  fs.writeFileSync(outputPath, content, 'utf-8');
}

function generateAscensionRequirements(): void {
  // Standard ascension requirements for all characters
  const requirements = [
    {
      rank: 1,
      level: '20 → 40',
      common: { T1: 4 },
      currency: 5000,
    },
    {
      rank: 2,
      level: '40 → 50',
      common: { T2: 3 },
      boss: 3,
      overworld: 4,
      currency: 10000,
    },
    {
      rank: 3,
      level: '50 → 60',
      common: { T2: 6 },
      boss: 6,
      overworld: 8,
      currency: 15000,
    },
    {
      rank: 4,
      level: '60 → 70',
      common: { T3: 3 },
      boss: 9,
      overworld: 12,
      currency: 20000,
    },
    {
      rank: 5,
      level: '70 → 80',
      common: { T3: 6 },
      boss: 12,
      overworld: 16,
      currency: 40000,
    },
    {
      rank: 6,
      level: '80 → 90',
      common: { T4: 4 },
      boss: 16,
      overworld: 20,
      currency: 80000,
    },
  ];

  const content = `import type { MaterialQualityTier } from '@/types';

// Standard ascension requirements for all characters
export interface AscensionRequirement {
  rank: number;
  level: string;
  common: Partial<Record<MaterialQualityTier, number>>; // Tier -> quantity
  boss?: number;
  overworld?: number;
  currency: number; // Shell Credits
}

export const ascensionRequirements: AscensionRequirement[] = ${JSON.stringify(requirements, null, 2)};

// Total materials needed for full ascension (1-90)
export const totalAscensionRequirements = {
  common: { T1: 4, T2: 9, T3: 9, T4: 4 },
  boss: 46,
  overworld: 60,
  currency: 170000,
};
`;

  const outputPath = path.join(__dirname, '../src/data/ascension-requirements.ts');
  fs.writeFileSync(outputPath, content, 'utf-8');
}

function generateForteRequirements(): void {
  // Standard forte requirements for all characters
  const requirements = {
    mainNodes: {
      description: 'Main Nodes (Lv. 1 → 10)',
      common: { T1: 25, T2: 28, T3: 40, T4: 57 },
      forgery: { T1: 25, T2: 28, T3: 55, T4: 67 },
      boss: 26,
      currency: 2030000,
    },
    statBonus1: {
      description: 'Stat Bonus 1 (Total)',
      forgery: { T3: 12 },
      boss: 12,
      currency: 200000,
    },
    statBonus2: {
      description: 'Stat Bonus 2 (Total)',
      forgery: { T4: 12 },
      boss: 4,
      currency: 400000,
    },
    inherentSkill1: {
      description: 'Inherent Skill 1',
      forgery: { T2: 3 },
      boss: 1,
      currency: 10000,
    },
    inherentSkill2: {
      description: 'Inherent Skill 2',
      forgery: { T3: 3 },
      boss: 1,
      currency: 20000,
    },
  };

  const content = `import type { MaterialQualityTier } from '@/types';

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

export const forteRequirements: ForteRequirements = ${JSON.stringify(requirements, null, 2)};

// Total materials needed for full forte
export const totalForteRequirements = {
  common: { T1: 25, T2: 28, T3: 40, T4: 57 },
  forgery: { T1: 25, T2: 31, T3: 70, T4: 79 },
  boss: 44,
  currency: 2660000,
};
`;

  const outputPath = path.join(__dirname, '../src/data/forte-requirements.ts');
  fs.writeFileSync(outputPath, content, 'utf-8');
}

function main() {
  console.log('🔍 Extrayendo materiales de personajes...\n');
  
  const materials = extractMaterialsFromCharacters();
  
  console.log('📊 Materiales base encontrados:');
  console.log(`  Common: ${materials.common.size}`);
  console.log(`  Forgery: ${materials.forgery.size}`);
  console.log(`  Boss: ${materials.boss.size}`);
  console.log(`  Overworld: ${materials.overworld.size}\n`);
  
  const totalWithQualities = (materials.common.size * 4) + (materials.forgery.size * 4) + materials.boss.size + materials.overworld.size + 1;
  console.log(`📝 Total de entradas de materiales: ${totalWithQualities}\n`);
  
  console.log('📝 Generando archivos...\n');
  
  generateMaterialsFile(materials);
  console.log('  ✅ materials.ts');
  
  generateAscensionRequirements();
  console.log('  ✅ ascension-requirements.ts');
  
  generateForteRequirements();
  console.log('  ✅ forte-requirements.ts');
  
  console.log('\n✅ Base de datos de materiales generada!');
}

main();
