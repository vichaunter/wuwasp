import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://game8.co';
const WEAPONS_LIST_URL = 'https://game8.co/games/Wuthering-Waves/archives/452490';
const HTML_CACHE_DIR = path.join(__dirname, 'weapons-cache');
const PUBLIC_WEAPONS_DIR = path.join(__dirname, '../public/weapons');

/**
 * Descarga una imagen desde una URL y la guarda localmente
 */
async function downloadImage(url: string, outputPath: string): Promise<boolean> {
  return new Promise((resolve) => {
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

interface ScrapedWeapon {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 3 | 4 | 5;
  type: string;
  baseAtk: number;
  subStat: string;
  skill: string;
  skillDescription: string;
  materials: {
    common: string;
    forgery: string;
    ascension: string;
  };
  image?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeMaterialName(name: string): string {
  // Remove quality prefixes like "LF", "MF", "HF", "FF" or "(T1)", "(T2)", etc.
  return name
    .replace(/^(LF|MF|HF|FF)\s+/i, '') // Remove LF/MF/HF/FF prefix
    .replace(/\s+\d{3}$/, '') // Remove numeric suffix like " 210"
    .replace(/\s+\(T\d\)$/g, '') // Remove (T1), (T2), etc.
    .trim();
}

function formatWeaponName(name: string): string {
  // Remove hyphens and capitalize each word
  return name
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function getWeaponsListImages(): Promise<Map<string, string>> {
  console.log('📋 Fetching weapons list for images...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(WEAPONS_LIST_URL, { waitUntil: 'networkidle' });
  const html = await page.content();
  await browser.close();
  
  const $ = cheerio.load(html);
  const imagesMap = new Map<string, string>();
  
  $('table tbody tr').each((_, row) => {
    const $row = $(row);
    const link = $row.find('td:first-child a').first();
    const name = link.text().trim();
    
    const img = link.find('img');
    const imgSrc = img.attr('data-src') || img.attr('src');
    const image = imgSrc && !imgSrc.startsWith('data:image') 
      ? (imgSrc.startsWith('http') ? imgSrc : BASE_URL + imgSrc)
      : '';
    
    if (name && image) {
      const slug = slugify(name);
      imagesMap.set(slug, image);
    }
  });
  
  console.log(`  ✅ Found ${imagesMap.size} weapon images\n`);
  return imagesMap;
}

function processHtml(html: string, slug: string, weaponImage: string): ScrapedWeapon | null {
  const $ = cheerio.load(html);
  
  // Extract basic info
  let rarity: 3 | 4 | 5 = 5;
  let type = '';
  let baseAtk = 0;
  let subStat = '';
  let skill = '';
  let skillDescription = '';
  let url = '';
  
  // Get canonical URL
  const canonical = $('link[rel="canonical"]').attr('href');
  if (canonical) {
    url = canonical;
  }
  
  // Find rarity (count stars)
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText === 'Rarity') {
      const tdText = $row.find('td').text().trim();
      const starCount = (tdText.match(/★/g) || []).length;
      if (starCount === 3) rarity = 3;
      else if (starCount === 4) rarity = 4;
      else if (starCount === 5) rarity = 5;
    }
  });
  
  // Find type
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText === 'Type') {
      type = $row.find('td').text().trim();
    }
  });
  
  // Find base ATK
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText.includes('Base ATK')) {
      const atkText = $row.find('td').text().trim();
      baseAtk = parseInt(atkText) || 0;
    }
  });
  
  // Find sub stat
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText.includes('Base 2nd Stat')) {
      subStat = $row.find('td').text().trim();
    }
  });
  
  // Find skill
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText.includes('Base Weapon Skill') || thText === 'Skill') {
      const td = $row.find('td');
      const boldText = td.find('strong').first().text().trim();
      if (boldText) {
        skill = boldText.replace(':', '');
        skillDescription = td.text().replace(boldText, '').replace(/^:\s*/, '').trim();
      }
    }
  });
  
  // Extract materials from the "Total Materials to MAX Level" table
  const materials = {
    common: '',
    forgery: '',
    ascension: '', // Weapons don't have ascension materials
  };
  
  const materialsFound: string[] = [];
  
  // Find the "Total Materials to Max Level" table
  $('h4').each((_, heading) => {
    const headingText = $(heading).text().trim();
    if (headingText.includes('Total Materials') && headingText.toLowerCase().includes('max level')) {
      // Get the next table (could have elements in between)
      let nextElement = $(heading).next();
      let table = null;
      
      // Look for the next table within the next 3 elements
      for (let i = 0; i < 3 && nextElement.length; i++) {
        if (nextElement.is('table')) {
          table = nextElement;
          break;
        }
        nextElement = nextElement.next();
      }
      
      if (table) {
        // Get all material links from the table
        table.find('a').each((_, link) => {
          const materialName = $(link).text().trim();
          if (materialName) {
            materialsFound.push(materialName);
          }
        });
      }
    }
  });
  
  // Process found materials
  // Common materials have LF/MF/HF/FF prefixes
  // Forgery materials have different names per quality
  const uniqueBaseMaterials = new Set<string>();
  
  for (const mat of materialsFound) {
    const normalized = normalizeMaterialName(mat);
    uniqueBaseMaterials.add(normalized);
  }
  
  // Convert to array to analyze
  const uniqueMaterials = Array.from(uniqueBaseMaterials);
  
  // Identify which is common and which is forgery
  // Common materials typically are: Core, Ring, Residuum, Polygon
  // Forgery materials typically are: Helix, Phlogiston, Metallic Drip, Residue, Seed
  for (const mat of uniqueMaterials) {
    const lowerMat = mat.toLowerCase();
    
    if (lowerMat.includes('core') || lowerMat.includes('ring') || 
        lowerMat.includes('residuum') || lowerMat.includes('polygon')) {
      materials.common = mat;
    } else if (lowerMat.includes('helix') || lowerMat.includes('phlogiston') ||
               lowerMat.includes('metallic drip') || lowerMat.includes('residue') ||
               lowerMat.includes('seed') || lowerMat.includes('bud') || 
               lowerMat.includes('leaf') || lowerMat.includes('blossom')) {
      materials.forgery = mat;
    }
  }
  
  // Get weapon name from h1 and format it properly
  const rawName = $('h1.a-header--1').text().trim();
  const name = formatWeaponName(rawName || slug);
  
  return {
    id: slug,
    name,
    slug,
    url,
    rarity,
    type,
    baseAtk,
    subStat,
    skill,
    skillDescription,
    materials,
    image: weaponImage,
  };
}

async function generateWeaponFile(weapon: ScrapedWeapon): Promise<string> {
  const varName = weapon.slug.replace(/-/g, '_');
  
  const escape = (str: string) => str.replace(/'/g, "\\'");
  
  // Download weapon image locally
  let localImagePath = '';
  if (weapon.image) {
    if (!fs.existsSync(PUBLIC_WEAPONS_DIR)) {
      fs.mkdirSync(PUBLIC_WEAPONS_DIR, { recursive: true });
    }
    
    const imageFileName = `${weapon.id}.png`;
    const imagePath = path.join(PUBLIC_WEAPONS_DIR, imageFileName);
    const success = await downloadImage(weapon.image, imagePath);
    
    if (success) {
      localImagePath = `/weapons/${imageFileName}`;
    }
  }
  
  return `import type { Weapon } from '@/types';

export const ${varName}: Weapon = {
  id: '${escape(weapon.id)}',
  name: '${escape(weapon.name)}',
  slug: '${escape(weapon.slug)}',
  url: '${escape(weapon.url)}',
  rarity: ${weapon.rarity},
  type: '${escape(weapon.type)}',
  baseAtk: ${weapon.baseAtk},
  subStat: '${escape(weapon.subStat)}',
  skill: '${escape(weapon.skill)}',
  skillDescription: '${escape(weapon.skillDescription)}',
  materials: {
    common: '${escape(weapon.materials.common)}',
    forgery: '${escape(weapon.materials.forgery)}',
    ascension: '${escape(weapon.materials.ascension)}',
  },
  image: '${escape(localImagePath)}',
};
`;
}

async function saveWeapon(weapon: ScrapedWeapon): Promise<void> {
  const weaponsDir = path.join(__dirname, '../src/data/weapons');
  if (!fs.existsSync(weaponsDir)) {
    fs.mkdirSync(weaponsDir, { recursive: true });
  }
  
  const filePath = path.join(weaponsDir, `${weapon.slug}.ts`);
  const content = await generateWeaponFile(weapon);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Saved ${weapon.name}`);
}

async function main() {
  console.log('⚙️  Starting weapons processor...\n');
  
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    console.error('❌ El directorio weapons-cache no existe. Ejecuta primero scrape-weapons-download');
    return;
  }
  
  const htmlFiles = fs.readdirSync(HTML_CACHE_DIR).filter(f => f.endsWith('.html'));
  
  console.log(`📦 Found ${htmlFiles.length} cached HTML files\n`);
  
  // Get weapon images from the list
  const weaponImages = await getWeaponsListImages();
  
  let processed = 0;
  let errors = 0;
  
  for (const htmlFile of htmlFiles) {
    const slug = htmlFile.replace('.html', '');
    const htmlPath = path.join(HTML_CACHE_DIR, htmlFile);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    try {
      const weaponImage = weaponImages.get(slug) || '';
      const weapon = processHtml(html, slug, weaponImage);
      
      if (weapon) {
        await saveWeapon(weapon);
        processed++;
      } else {
        console.log(`  ⚠️  Could not process ${slug}`);
        errors++;
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${slug}:`, error);
      errors++;
    }
  }
  
  console.log(`\n✅ Processing completed!`);
  console.log(`   Processed: ${processed}`);
  if (errors > 0) {
    console.log(`   Errors: ${errors}`);
  }
}

main().catch(console.error);

