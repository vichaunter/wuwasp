import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_CACHE_DIR = path.join(__dirname, 'html-cache');
const PUBLIC_CHARACTERS_DIR = path.join(__dirname, '../public/characters');

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
      fs.unlinkSync(outputPath);
      resolve(false);
    });
  });
}

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
  
  // Find rarity (count star characters ★)
  let rarityText = '';
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText === 'Rarity') {
      const tdText = $row.find('td').text().trim();
      if (tdText.includes('★')) {
        rarityText = tdText;
        return false; // break the loop
      }
    }
  });
  const starCount = (rarityText.match(/★/g) || []).length;
  if (starCount === 4) rarity = 4;
  else if (starCount === 5) rarity = 5;
  
  // Find element
  const elementCell = $('table:contains("Element") td').last();
  element = elementCell.text().trim() || '';
  
  // Find weapon
  const weaponCell = $('table:contains("Weapon") td').last();
  weapon = weaponCell.text().trim() || '';
  
  // Find character image (use data-src for lazy-loaded images)
  const imgElem = $('table:contains("Resonator Information") img').first();
  const imgSrc = imgElem.attr('data-src') || imgElem.attr('src');
  if (imgSrc && !imgSrc.startsWith('data:image')) {
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

async function generateCharacterFile(character: ScrapedCharacter): Promise<string> {
  const varName = character.slug.replace(/-/g, '_');
  
  // Escape single quotes in strings
  const escape = (str: string) => str.replace(/'/g, "\\'");
  
  // Download character image locally
  let localImagePath = '';
  if (character.image) {
    if (!fs.existsSync(PUBLIC_CHARACTERS_DIR)) {
      fs.mkdirSync(PUBLIC_CHARACTERS_DIR, { recursive: true });
    }
    
    const imageFileName = `${character.id}.png`;
    const imagePath = path.join(PUBLIC_CHARACTERS_DIR, imageFileName);
    const success = await downloadImage(character.image, imagePath);
    
    if (success) {
      localImagePath = `/characters/${imageFileName}`;
    }
  }
  
  return `import type { Character } from '@/types';

export const ${varName}: Character = {
  id: '${escape(character.id)}',
  name: '${escape(character.name)}',
  slug: '${escape(character.slug)}',
  url: '${escape(character.url)}',
  rarity: ${character.rarity},
  element: '${escape(character.element)}',
  weapon: '${escape(character.weapon)}',
  materials: {
    ascension: {
      common: '${escape(character.materials.ascension.common)}',
      boss: '${escape(character.materials.ascension.boss)}',
      overworld: '${escape(character.materials.ascension.overworld)}',
    },
    forte: {
      common: '${escape(character.materials.forte.common)}',
      forgery: '${escape(character.materials.forte.forgery)}',
      boss: '${escape(character.materials.forte.boss)}',
    },
  },
  image: '${escape(localImagePath)}',
};
`;
}

async function saveCharacter(character: ScrapedCharacter): Promise<void> {
  const filePath = path.join(__dirname, '../src/data/characters', `${character.slug}.ts`);
  const content = await generateCharacterFile(character);
  
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
        await saveCharacter(character);
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

