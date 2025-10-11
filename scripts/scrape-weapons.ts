import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://game8.co';
const WEAPONS_LIST_URL = 'https://game8.co/games/Wuthering-Waves/archives/452490';
const DELAY_MS = 2000; // 2 seconds delay between requests
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Save/load HTML cache
function saveHtmlCache(slug: string, html: string): void {
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    fs.mkdirSync(HTML_CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(HTML_CACHE_DIR, `${slug}.html`), html, 'utf-8');
}

function loadHtmlCache(slug: string): string | null {
  const filePath = path.join(HTML_CACHE_DIR, `${slug}.html`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

// Get list of already scraped weapons
function getExistingWeapons(): Set<string> {
  const weaponsDir = path.join(__dirname, '../src/data/weapons');
  if (!fs.existsSync(weaponsDir)) {
    return new Set();
  }
  const files = fs.readdirSync(weaponsDir).filter(f => f.endsWith('.ts'));
  return new Set(files.map(f => f.replace('.ts', '')));
}

async function scrapeWeaponsList(): Promise<Array<{ name: string; url: string }>> {
  console.log('📋 Scraping weapons list...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(WEAPONS_LIST_URL, { waitUntil: 'networkidle' });
  const html = await page.content();
  await browser.close();
  
  const $ = cheerio.load(html);
  const weapons: Array<{ name: string; url: string }> = [];
  
  // Find weapons in the table
  $('table tbody tr').each((_, row) => {
    const $row = $(row);
    const link = $row.find('td:first-child a').first();
    const name = link.text().trim();
    let url = link.attr('href');
    
    if (name && url) {
      url = url.startsWith('http') ? url : BASE_URL + url;
      weapons.push({ name, url });
    }
  });
  
  console.log(`  ✅ Found ${weapons.length} weapons`);
  return weapons;
}

async function scrapeWeaponDetails(url: string, name: string, useCache = false): Promise<ScrapedWeapon | null> {
  console.log(`  📄 Scraping ${name}...`);
  
  const slug = slugify(name);
  let html: string;
  
  if (useCache) {
    const cached = loadHtmlCache(slug);
    if (cached) {
      console.log(`  💾 Using cached HTML for ${name}`);
      html = cached;
    } else {
      return null;
    }
  } else {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      html = await page.content();
      
      saveHtmlCache(slug, html);
      console.log(`  💾 Saved HTML cache for ${name}`);
      
      await browser.close();
    } catch (error) {
      console.error(`  ❌ Error scraping ${name}:`, error);
      await browser.close();
      return null;
    }
  }
  
  // Parse the HTML
  const $ = cheerio.load(html);
  
  // Extract basic info
  let rarity: 3 | 4 | 5 = 5;
  let type = '';
  let baseAtk = 0;
  let subStat = '';
  let skill = '';
  let skillDescription = '';
  let image = '';
  
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
  
  // Find skill (look for bolded skill name in "Base Weapon Skill" or "Skill" table row)
  $('table tr').each((_, row) => {
    const $row = $(row);
    const thText = $row.find('th').text().trim();
    if (thText.includes('Base Weapon Skill') || thText === 'Skill') {
      const td = $row.find('td');
      const boldText = td.find('strong').first().text().trim();
      if (boldText) {
        skill = boldText.replace(':', '');
        // Get description (text after the bold skill name)
        skillDescription = td.text().replace(boldText, '').replace(/^:\s*/, '').trim();
      }
    }
  });
  
  // Find weapon image
  const imgElem = $('table img').first();
  const imgSrc = imgElem.attr('data-src') || imgElem.attr('src');
  if (imgSrc && !imgSrc.startsWith('data:image')) {
    image = imgSrc.startsWith('http') ? imgSrc : BASE_URL + imgSrc;
  }
  
  // Extract materials (we'll need to look for material sections in the page)
  // For now, set empty strings - we'll enhance this later
  const materials = {
    common: '',
    forgery: '',
    ascension: '',
  };
  
  // Try to extract materials from "Ascension Materials" or similar sections
  $('h2, h3').each((_, heading) => {
    const headingText = $(heading).text().trim();
    if (headingText.includes('Ascension') || headingText.includes('Materials')) {
      // Look for material links/images after this heading
      const section = $(heading).nextAll().first();
      const materialLinks = section.find('a');
      
      materialLinks.each((_, link) => {
        const materialName = $(link).text().trim();
        const materialLower = materialName.toLowerCase();
        
        // Classify material by name patterns
        if (materialLower.includes('core') || materialLower.includes('ring') || 
            materialLower.includes('residuum') || materialLower.includes('polygon')) {
          materials.common = materialName;
        } else if (materialLower.includes('helix') || materialLower.includes('phlogiston') ||
                   materialLower.includes('metallic drip') || materialLower.includes('residue') ||
                   materialLower.includes('seed') || materialLower.includes('bud')) {
          materials.forgery = materialName;
        } else if (materialLower.includes('bell') || materialLower.includes('dagger') ||
                   materialLower.includes('tacet core') || materialLower.includes('feather')) {
          materials.ascension = materialName;
        }
      });
    }
  });
  
  return {
    id: slug,
    name: name,
    slug,
    url,
    rarity,
    type,
    baseAtk,
    subStat,
    skill,
    skillDescription,
    materials,
    image,
  };
}

async function generateWeaponFile(weapon: ScrapedWeapon): Promise<string> {
  const varName = weapon.slug.replace(/-/g, '_');
  
  // Escape single quotes
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
  const filePath = path.join(__dirname, '../src/data/weapons', `${weapon.slug}.ts`);
  const content = await generateWeaponFile(weapon);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Saved ${weapon.name} to ${weapon.slug}.ts`);
}

async function main() {
  console.log('🗡️  Starting weapons scraper...\n');
  
  // Get existing weapons
  const existing = getExistingWeapons();
  console.log(`📦 Found ${existing.size} existing weapons\n`);
  
  // Get weapons list
  const weaponsList = await scrapeWeaponsList();
  
  // Filter out existing
  const newWeapons = weaponsList.filter(w => !existing.has(slugify(w.name)));
  
  console.log(`\n🆕 ${newWeapons.length} new weapons to scrape\n`);
  
  if (newWeapons.length === 0) {
    console.log('✅ All weapons already scraped!');
    return;
  }
  
  const scrapedWeapons: ScrapedWeapon[] = [];
  
  for (const wpn of newWeapons) {
    const details = await scrapeWeaponDetails(wpn.url, wpn.name, false);
    
    if (details) {
      await saveWeapon(details);
      scrapedWeapons.push(details);
    }
    
    // Delay between requests
    await delay(DELAY_MS);
  }
  
  console.log(`\n✅ Scraped ${scrapedWeapons.length} weapons!`);
}

main().catch(console.error);

