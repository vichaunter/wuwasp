import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Descarga una imagen desde una URL y la guarda localmente
 */
async function downloadImage(url: string, outputPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Si ya existe, no descargar de nuevo
    if (fs.existsSync(outputPath)) {
      resolve(true);
      return;
    }

    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`    ❌ Error descargando ${url}: ${response.statusCode}`);
        fs.unlinkSync(outputPath);
        resolve(false);
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`    ❌ Error descargando ${url}:`, err.message);
      fs.unlinkSync(outputPath);
      resolve(false);
    });
  });
}

interface MaterialWithImage {
  name: string;
  images: Map<string, string>; // quality/variant -> image URL (external)
  localImages: Map<string, string>; // quality/variant -> local path
  variants: Map<string, string>; // quality -> full material name
}

async function extractMaterialsFromCharacters(): Promise<{
  common: Map<string, MaterialWithImage>;
  forgery: Map<string, MaterialWithImage>;
  boss: Map<string, MaterialWithImage>;
  overworld: Map<string, MaterialWithImage>;
}> {
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

    // Helper to unescape JavaScript strings (remove backslash escapes)
    const unescapeString = (str: string) => str.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    if (commonMatch && commonMatch[1]) {
      const name = unescapeString(commonMatch[1]);
      if (!materials.common.has(name)) {
        materials.common.set(name, { name, images: new Map(), localImages: new Map(), variants: new Map() });
      }
    }
    if (bossMatch && bossMatch[1]) {
      const name = unescapeString(bossMatch[1]);
      if (!materials.boss.has(name)) {
        materials.boss.set(name, { name, images: new Map(), localImages: new Map(), variants: new Map() });
      }
    }
    if (overworldMatch && overworldMatch[1]) {
      const name = unescapeString(overworldMatch[1]);
      if (!materials.overworld.has(name)) {
        materials.overworld.set(name, { name, images: new Map(), localImages: new Map(), variants: new Map() });
      }
    }
    if (forgeryMatch && forgeryMatch[1]) {
      const name = unescapeString(forgeryMatch[1]);
      if (!materials.forgery.has(name)) {
        materials.forgery.set(name, { name, images: new Map(), localImages: new Map(), variants: new Map() });
      }
    }
    if (forteBossMatch && forteBossMatch[1]) {
      const name = unescapeString(forteBossMatch[1]);
      if (!materials.boss.has(name)) {
        materials.boss.set(name, { name, images: new Map(), localImages: new Map(), variants: new Map() });
      }
    }
  }

  // Extract images from HTML cache
  const htmlCacheDir = path.join(__dirname, 'html-cache');
  if (fs.existsSync(htmlCacheDir)) {
    const htmlFiles = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    console.log(`\n📸 Extrayendo imágenes de ${htmlFiles.length} archivos HTML...`);
    
    // Extraer TODOS los materiales del HTML con el patrón simple
    const allMaterialImages = new Map<string, string>(); // material name -> image URL
    
    for (const htmlFile of htmlFiles) {
      const htmlContent = fs.readFileSync(path.join(htmlCacheDir, htmlFile), 'utf-8');
      
      // Pattern: <a href="..."><img ... data-src="URL/show" ...> Material Name</a>
      const linkRegex = /<a[^>]*href="[^"]*"[^>]*><img[^>]*data-src="([^"]*\/show)"[^>]*>\s*([^<]+)<\/a>/g;
      
      let match;
      while ((match = linkRegex.exec(htmlContent)) !== null) {
        const imgUrl = match[1];
        const materialName = match[2].trim();
        
        if (materialName && imgUrl && !materialName.includes('Shell Credit')) {
          allMaterialImages.set(materialName, imgUrl);
        }
      }
    }
    
    console.log(`  📦 ${allMaterialImages.size} imágenes de materiales encontradas en cache`);
    
    // Helper: buscar imagen por nombre exacto
    const findImage = (name: string): string => {
      return allMaterialImages.get(name) || '';
    };
    
    // Common materials: buscar LF/MF/HF/FF por nombre directo
    for (const [baseName, material] of materials.common.entries()) {
      const qualityPrefixes = ['LF', 'MF', 'HF', 'FF'];
      
      // Try with LF/MF/HF/FF prefix first
      for (const prefix of qualityPrefixes) {
        const fullName = `${prefix} ${baseName}`;
        const img = findImage(fullName);
        if (img) {
          material.images.set(prefix, img);
        }
      }
      
      // If no images found, try adjective pattern (Crude/Basic/Improved/Tailored)
      if (material.images.size === 0) {
        const adjectiveMap = {
          'LF': 'Crude',
          'MF': 'Basic',
          'HF': 'Improved',
          'FF': 'Tailored',
        };
        
        // Remove adjective from baseName if it starts with one
        let cleanBaseName = baseName;
        const baseWords = baseName.split(' ');
        const firstWord = baseWords[0];
        
        // If the first word is an adjective, remove it
        if (['Crude', 'Basic', 'Improved', 'Tailored'].includes(firstWord)) {
          cleanBaseName = baseWords.slice(1).join(' ');
        }
        
        // Try each adjective with the cleaned baseName
        for (const [prefix, adjective] of Object.entries(adjectiveMap)) {
          const fullName = `${adjective} ${cleanBaseName}`;
          const img = findImage(fullName);
          if (img) {
            material.images.set(prefix, img);
          }
        }
      }
    }
    
    // Forgery materials: buscar variantes por palabras clave compartidas
    for (const [baseName, material] of materials.forgery.entries()) {
      // Extraer palabras significativas del baseName (>4 letras)
      const baseWords = baseName.toLowerCase().split(' ').filter(w => w.length > 4);
      
      // Buscar materiales que contengan alguna de estas palabras
      for (const [materialName, imgUrl] of allMaterialImages.entries()) {
        const materialLower = materialName.toLowerCase();
        
        // ¿Comparte alguna palabra significativa?
        const hasCommonWord = baseWords.some(word => materialLower.includes(word));
        if (!hasCommonWord) continue;
        
        // Determinar quality tier
        let tier = '';
        const firstWord = materialName.split(' ')[0].toLowerCase();
        
        // Patterns for quality determination
        if (materialName.endsWith(' 210') || firstWord === 'lento' || firstWord === 'impure' || 
            firstWord === 'inert' || materialName.toLowerCase().includes(' seed')) {
          tier = 'T1';
        } else if (materialName.endsWith(' 226') || firstWord === 'adagio' || firstWord === 'extracted' || 
                   firstWord === 'reactive' || materialName.toLowerCase().includes(' bud')) {
          tier = 'T2';
        } else if (materialName.endsWith(' 235') || firstWord === 'andante' || firstWord === 'refined' || 
                   firstWord === 'polarized' || materialName.toLowerCase().includes(' leaf')) {
          tier = 'T3';
        } else if (materialName.endsWith(' 239') || firstWord === 'presto' || firstWord === 'flawless' || 
                   firstWord === 'heterized' || materialName.toLowerCase().includes(' blossom')) {
          tier = 'T4';
        }
        
        if (tier && !material.variants.has(tier)) {
          material.variants.set(tier, materialName);
          material.images.set(tier, imgUrl);
        }
      }
    }
    
    // Boss and Overworld: búsqueda exacta por nombre
    for (const [baseName, material] of materials.boss.entries()) {
      const img = findImage(baseName);
      if (img) {
        material.images.set('default', img);
      }
    }
    
    for (const [baseName, material] of materials.overworld.entries()) {
      const img = findImage(baseName);
      if (img) {
        material.images.set('default', img);
      }
    }
    
    // Count materials with images
    let commonWithImages = 0;
    materials.common.forEach(m => { if (m.images.size > 0) commonWithImages++; });
    let forgeryWithImages = 0;
    materials.forgery.forEach(m => { if (m.images.size > 0) forgeryWithImages++; });
    let bossWithImages = 0;
    materials.boss.forEach(m => { if (m.images.size > 0) bossWithImages++; });
    let overworldWithImages = 0;
    materials.overworld.forEach(m => { if (m.images.size > 0) overworldWithImages++; });
    
    console.log(`  ✅ Imágenes asignadas:`);
    console.log(`     Common: ${commonWithImages}/${materials.common.size}`);
    console.log(`     Forgery: ${forgeryWithImages}/${materials.forgery.size}`);
    console.log(`     Boss: ${bossWithImages}/${materials.boss.size}`);
    console.log(`     Overworld: ${overworldWithImages}/${materials.overworld.size}`);
    
    // Download images to public/materials/
    console.log(`\n📥 Descargando imágenes localmente...`);
    const publicMaterialsDir = path.join(__dirname, '../public/materials');
    if (!fs.existsSync(publicMaterialsDir)) {
      fs.mkdirSync(publicMaterialsDir, { recursive: true });
    }
    
    let downloaded = 0;
    let skipped = 0;
    
    // Helper to download and get local path
    const downloadAndGetPath = async (materialId: string, imgUrl: string): Promise<string> => {
      const fileExt = '.png';
      const fileName = `${materialId}${fileExt}`;
      const localPath = path.join(publicMaterialsDir, fileName);
      const relativePath = `/materials/${fileName}`;
      
      const existed = fs.existsSync(localPath);
      const success = await downloadImage(imgUrl, localPath);
      
      if (success) {
        if (!existed) downloaded++;
        else skipped++;
        return relativePath;
      }
      
      return ''; // Failed to download
    };
    
    // Download common materials - use the material ID as filename
    for (const [baseName, material] of materials.common.entries()) {
      for (const [quality, imgUrl] of material.images.entries()) {
        // Generate the same ID that will be used in materials.ts
        const materialId = slugify(`${quality} ${baseName}`);
        const localPath = await downloadAndGetPath(materialId, imgUrl);
        if (localPath) {
          material.localImages.set(quality, localPath);
        }
      }
    }
    
    // Download forgery materials - use the material ID as filename
    for (const [baseName, material] of materials.forgery.entries()) {
      for (const [quality, imgUrl] of material.images.entries()) {
        const variantName = material.variants.get(quality) || baseName;
        // Generate the same ID that will be used in materials.ts
        const materialId = slugify(variantName);
        const localPath = await downloadAndGetPath(materialId, imgUrl);
        if (localPath) {
          material.localImages.set(quality, localPath);
        }
      }
    }
    
    // Download boss materials - use the material ID as filename
    for (const [baseName, material] of materials.boss.entries()) {
      const imgUrl = material.images.get('default');
      if (imgUrl) {
        const materialId = slugify(baseName);
        const localPath = await downloadAndGetPath(materialId, imgUrl);
        if (localPath) {
          material.localImages.set('default', localPath);
        }
      }
    }
    
    // Download overworld materials - use the material ID as filename
    for (const [baseName, material] of materials.overworld.entries()) {
      const imgUrl = material.images.get('default');
      if (imgUrl) {
        const materialId = slugify(baseName);
        const localPath = await downloadAndGetPath(materialId, imgUrl);
        if (localPath) {
          material.localImages.set('default', localPath);
        }
      }
    }
    
    console.log(`  ✅ Descargadas: ${downloaded} nuevas, ${skipped} ya existían`);
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
        const image = material.localImages.get(prefix) || material.images.get(prefix) || '';
        
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

  // Forgery materials - use actual variant names from HTML
  const forgeryTiers = ['T1', 'T2', 'T3', 'T4'];

  materials.forgery.forEach((material, baseName) => {
    if (!baseName) return;
    const escapedBaseName = escapeString(baseName);
    
      forgeryTiers.forEach((tier) => {
        // Use the real variant name if we have it
        const variantName = material.variants.get(tier);
        const image = material.localImages.get(tier) || material.images.get(tier) || '';
        
        // Only generate entry if we found the variant
        if (variantName) {
          const id = slugify(variantName);
          
          allMaterials.push(`  {
    id: '${id}',
    name: '${escapeString(variantName)}',
    baseName: '${escapedBaseName}',
    category: 'FORGERY',
    quality: '${tier}',
    image: '${escapeString(image)}',
  }`);
      }
    });
  });

  // Boss materials (unique - no qualities)
  materials.boss.forEach((material, name) => {
    if (!name) return;
    const id = slugify(name);
    const escapedName = escapeString(name);
    const image = material.localImages.get('default') || material.images.get('default') || '';
    
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
    const image = material.localImages.get('default') || material.images.get('default') || '';
    
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

async function main() {
  console.log('🔍 Extrayendo materiales de personajes...\n');
  
  const materials = await extractMaterialsFromCharacters();
  
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
