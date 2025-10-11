import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_CACHE_DIR = path.join(__dirname, 'html-cache');

interface ScrapedCharacter {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 4 | 5;
  element: string;
  weapon: string;
  materials: {
    ascension: {
      common: string;
      boss: string;
      overworld: string;
    };
    forte: {
      common: string;
      forgery: string;
      boss: string;
    };
  };
  image?: string;
}

function normalizeMaterialName(text: string): string {
  let cleaned = text
    .replace(/\s*x?\d+\s*$/i, '')
    .replace(/^(LF|MF|HF|FF)\s+/, '')
    .replace(/\s+\d{3,}$/, '')
    .trim();
  
  return cleaned;
}

function processHtml(html: string, slug: string): ScrapedCharacter | null {
  const $ = cheerio.load(html);
  
  // Extract basic info
  let rarity = 5;
  let element = '';
  let weapon = '';
  let image = '';
  let name = '';
  let url = '';
  
  // Find name from h1 or title
  name = $('h1.a-header--1').first().text().trim().replace(' Character Overview', '');
  
  // Find URL from canonical link
  const canonical = $('link[rel="canonical"]').attr('href');
  if (canonical) {
    url = canonical;
  }
  
  // Find rarity
  const rarityStars = $('table:contains("Rarity") td img[alt*="star"]').length;
  if (rarityStars === 4) rarity = 4;
  
  // Find element
  const elementCell = $('table:contains("Element") td').last();
  element = elementCell.text().trim() || '';
  
  // Find weapon
  const weaponCell = $('table:contains("Weapon") td').last();
  weapon = weaponCell.text().trim() || '';
  
  // Find character image
  const imgSrc = $('table:contains("Resonator Information") img').first().attr('src');
  if (imgSrc) {
    image = imgSrc.startsWith('http') ? imgSrc : 'https://game8.co' + imgSrc;
  }
  
  // Extract materials
  const materials: {
    ascension: { common: string; boss: string; overworld: string };
    forte: { common: string; forgery: string; boss: string };
  } = {
    ascension: { common: '', boss: '', overworld: '' },
    forte: { common: '', forgery: '', boss: '' },
  };
  
  // Find Character Ascension Materials section
  const ascensionSection = $('h4:contains("Character Ascension Materials")').next('table');
  
  ascensionSection.find('tbody tr').each((_, row) => {
    const $row = $(row);
    const category = $row.find('th').first().text().trim();
    
    if (category === 'Normal Enemies') {
      const firstMaterial = $row.find('td a').first().text().trim();
      if (firstMaterial) {
        materials.ascension.common = normalizeMaterialName(firstMaterial);
      }
    } else if (category === 'World Boss') {
      const bossMaterial = $row.find('td a').first().text().trim();
      if (bossMaterial) {
        materials.ascension.boss = normalizeMaterialName(bossMaterial);
      }
    } else if (category === 'Overworld Material') {
      const overworldMaterial = $row.find('td a').first().text().trim();
      if (overworldMaterial) {
        materials.ascension.overworld = normalizeMaterialName(overworldMaterial);
      }
    }
  });
  
  // Find Forte Materials section
  const forteSection = $('h4:contains("Forte Materials")').next('table');
  
  forteSection.find('tbody tr').each((_, row) => {
    const $row = $(row);
    const category = $row.find('th').first().text().trim();
    
    if (category === 'Normal Enemies') {
      const firstMaterial = $row.find('td a').first().text().trim();
      if (firstMaterial) {
        materials.forte.common = normalizeMaterialName(firstMaterial);
      }
    } else if (category === 'Forgery Challenge') {
      const forgeryMaterial = $row.find('td a').first().text().trim();
      if (forgeryMaterial) {
        materials.forte.forgery = normalizeMaterialName(forgeryMaterial);
      }
    } else if (category === 'Weekly Boss') {
      const bossMaterial = $row.find('td a').first().text().trim();
      if (bossMaterial) {
        materials.forte.boss = normalizeMaterialName(bossMaterial);
      }
    }
  });
  
  // If forte boss is empty, use ascension boss
  if (!materials.forte.boss && materials.ascension.boss) {
    materials.forte.boss = materials.ascension.boss;
  }
  
  return {
    id: slug,
    name: name || slug,
    slug,
    url: url || `https://game8.co/games/Wuthering-Waves/archives/${slug}`,
    rarity: rarity as 4 | 5,
    element,
    weapon,
    materials,
    image,
  };
}

function generateCharacterFile(character: ScrapedCharacter): string {
  const varName = character.slug.replace(/-/g, '_');
  
  return `import type { Character } from '@/types';

export const ${varName}: Character = {
  id: '${character.id}',
  name: '${character.name}',
  slug: '${character.slug}',
  url: '${character.url}',
  rarity: ${character.rarity},
  element: '${character.element}',
  weapon: '${character.weapon}',
  materials: {
    ascension: {
      common: '${character.materials.ascension.common}',
      boss: '${character.materials.ascension.boss}',
      overworld: '${character.materials.ascension.overworld}',
    },
    forte: {
      common: '${character.materials.forte.common}',
      forgery: '${character.materials.forte.forgery}',
      boss: '${character.materials.forte.boss}',
    },
  },
  image: '${character.image || ''}',
};
`;
}

function saveCharacter(character: ScrapedCharacter): void {
  const filePath = path.join(__dirname, '../src/data/characters', `${character.slug}.ts`);
  const content = generateCharacterFile(character);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Updated ${character.name}`);
}

async function main() {
  console.log('🔄 Reprocesando personajes desde HTML cache...\n');
  
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    console.log('❌ No se encontró la carpeta de cache HTML.');
    console.log('   Ejecuta primero: pnpm scrape:characters\n');
    process.exit(1);
  }
  
  const htmlFiles = fs.readdirSync(HTML_CACHE_DIR).filter(f => f.endsWith('.html'));
  
  if (htmlFiles.length === 0) {
    console.log('❌ No hay archivos HTML en el cache.');
    console.log('   Ejecuta primero: pnpm scrape:characters\n');
    process.exit(1);
  }
  
  console.log(`📦 Encontrados ${htmlFiles.length} archivos HTML en cache\n`);
  
  let processed = 0;
  let errors = 0;
  
  for (const file of htmlFiles) {
    const slug = file.replace('.html', '');
    const htmlPath = path.join(HTML_CACHE_DIR, file);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    try {
      const character = processHtml(html, slug);
      
      if (character) {
        saveCharacter(character);
        processed++;
      } else {
        console.log(`  ⚠️  No se pudo procesar ${slug}`);
        errors++;
      }
    } catch (error) {
      console.error(`  ❌ Error procesando ${slug}:`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Completado!`);
  console.log(`   Procesados: ${processed}`);
  if (errors > 0) {
    console.log(`   Errores: ${errors}`);
  }
}

main().catch(console.error);

