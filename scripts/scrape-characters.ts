import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://game8.co';
const CHARACTER_LIST_URL = 'https://game8.co/games/Wuthering-Waves/archives/452489';
const DELAY_MS = 2000; // 2 seconds delay between requests
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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get list of already scraped characters from filesystem
function getExistingCharacters(): Set<string> {
  const charactersDir = path.join(__dirname, '../src/data/characters');
  
  if (!fs.existsSync(charactersDir)) {
    return new Set();
  }

  const files = fs.readdirSync(charactersDir);
  const existing = new Set<string>();

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const content = fs.readFileSync(path.join(charactersDir, file), 'utf-8');
      const urlMatch = content.match(/url:\s*['"]([^'"]+)['"]/);
      if (urlMatch) {
        existing.add(urlMatch[1]);
      }
    }
  }

  return existing;
}

// Check if a URL is likely a real character page (not a category or list page)
function isCharacterUrl(url: string, name: string): boolean {
  const lower = name.toLowerCase();
  const urlLower = url.toLowerCase();
  
  // Exclude category/list pages
  const excludePatterns = [
    'characters',
    'all-',
    'voice',
    'healers',
    'weapons',
    'enemies',
    'quests',
    'star-',
    'male-',
    'female-',
    'tier',
    'builds',
  ];
  
  for (const pattern of excludePatterns) {
    if (lower.includes(pattern) || urlLower.includes(pattern)) {
      return false;
    }
  }
  
  // Elements (single word, not character names)
  const elements = ['aero', 'glacio', 'fusion', 'electro', 'havoc', 'spectro'];
  if (elements.includes(lower)) {
    return false;
  }
  
  // Weapon types
  const weapons = ['sword', 'broadblade', 'gauntlets', 'rectifier', 'pistol'];
  if (weapons.includes(lower)) {
    return false;
  }
  
  return true;
}

// Save HTML to cache
function saveHtmlCache(slug: string, html: string): void {
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    fs.mkdirSync(HTML_CACHE_DIR, { recursive: true });
  }
  
  const filePath = path.join(HTML_CACHE_DIR, `${slug}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
}

// Load HTML from cache
function loadHtmlCache(slug: string): string | null {
  const filePath = path.join(HTML_CACHE_DIR, `${slug}.html`);
  
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  
  return null;
}

async function scrapeCharacterList(): Promise<{ name: string; url: string }[]> {
  console.log('🔍 Scraping character list...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(CHARACTER_LIST_URL, { waitUntil: 'networkidle' });
  
  const html = await page.content();
  const $ = cheerio.load(html);
  
  const characters: { name: string; url: string }[] = [];
  
  // Find the "All Playable Characters" section specifically
  $('table').each((tableIdx, table) => {
    const $table = $(table);
    const headers = $table.find('thead th').map((_, th) => $(th).text().trim()).get();
    
    // Check if this is the playable characters table
    const hasCharacterCol = headers.some(h => h.toLowerCase().includes('character'));
    const hasRarityCol = headers.some(h => h.toLowerCase().includes('rarity'));
    const hasElementCol = headers.some(h => h.toLowerCase().includes('element'));
    const hasWeaponCol = headers.some(h => h.toLowerCase().includes('weapon'));
    
    if (hasCharacterCol && hasRarityCol && hasElementCol && hasWeaponCol) {
      // This is the right table
      $table.find('tbody tr').each((_, row) => {
        const $row = $(row);
        const $link = $row.find('td:first-child a').first();
        
        if ($link.length) {
          const name = $link.text().trim();
          let url = $link.attr('href') || '';
          
          // Make sure URL is absolute
          if (url.startsWith('/')) {
            url = BASE_URL + url;
          }
          
          if (name && url && url.includes('/archives/') && isCharacterUrl(url, name)) {
            characters.push({ name, url });
          }
        }
      });
    }
  });
  
  await browser.close();
  
  console.log(`✅ Found ${characters.length} characters`);
  return characters;
}

function normalizeMaterialName(text: string): string {
  // Remove quality prefixes and numbers, keep base name
  // "LF Tidal Residuum x25" -> "Tidal Residuum"
  // "Waveworn Residue 210 x25" -> "Waveworn Residue"
  // "Blighted Crown of Puppet King x46" -> "Blighted Crown of Puppet King"
  
  let cleaned = text
    .replace(/\s*x?\d+\s*$/i, '') // Remove trailing quantities (x25, x46, etc.)
    .replace(/^(LF|MF|HF|FF)\s+/, '') // Remove quality prefix
    .replace(/\s+\d{3,}$/, '') // Remove trailing numbers like 210, 226, 235, 239
    .trim();
  
  return cleaned;
}

async function scrapeCharacterDetails(url: string, name: string, useCache = false): Promise<ScrapedCharacter | null> {
  console.log(`  📄 Scraping ${name}...`);
  
  const slug = slugify(name);
  let html: string;
  
  // Try to load from cache first
  if (useCache) {
    const cached = loadHtmlCache(slug);
    if (cached) {
      console.log(`  💾 Using cached HTML for ${name}`);
      html = cached;
    } else {
      return null;
    }
  } else {
    // Fetch from web
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      html = await page.content();
      
      // Save to cache
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
  
  // Extract basic info from the overview table
  let rarity = 5;
  let element = '';
  let weapon = '';
  let image = '';
  
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
    image = imgSrc.startsWith('http') ? imgSrc : BASE_URL + imgSrc;
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
      // Extract common material (e.g., "Tidal Residuum")
      const firstMaterial = $row.find('td a').first().text().trim();
      if (firstMaterial) {
        materials.ascension.common = normalizeMaterialName(firstMaterial);
      }
    } else if (category === 'World Boss') {
      // Extract boss material
      const bossMaterial = $row.find('td a').first().text().trim();
      if (bossMaterial) {
        materials.ascension.boss = normalizeMaterialName(bossMaterial);
      }
    } else if (category === 'Overworld Material') {
      // Extract overworld material (flower/collectible)
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
      // Extract common material (usually same as ascension)
      const firstMaterial = $row.find('td a').first().text().trim();
      if (firstMaterial) {
        materials.forte.common = normalizeMaterialName(firstMaterial);
      }
    } else if (category === 'Forgery Challenge') {
      // Extract forgery material (e.g., "Waveworn Residue")
      const forgeryMaterial = $row.find('td a').first().text().trim();
      if (forgeryMaterial) {
        materials.forte.forgery = normalizeMaterialName(forgeryMaterial);
      }
    } else if (category === 'Weekly Boss') {
      // Extract weekly boss material
      const bossMaterial = $row.find('td a').first().text().trim();
      if (bossMaterial) {
        materials.forte.boss = normalizeMaterialName(bossMaterial);
      }
    }
  });
  
  // If forte boss is empty, use ascension boss (they're usually the same)
  if (!materials.forte.boss && materials.ascension.boss) {
    materials.forte.boss = materials.ascension.boss;
  }
  
  const id = slug;
  
  return {
    id,
    name,
    slug,
    url,
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
  console.log(`  ✅ Saved ${character.name} to ${character.slug}.ts`);
}

// characters.ts is now using import.meta.glob, no need to regenerate it
function generateIndexFile(): void {
  console.log('✅ characters.ts uses dynamic imports (import.meta.glob)');
}

async function main() {
  console.log('🚀 Starting character scraper...\n');
  
  // Get existing characters
  const existingUrls = getExistingCharacters();
  console.log(`📋 Found ${existingUrls.size} existing characters\n`);
  
  // Scrape character list
  const characterList = await scrapeCharacterList();
  
  // Filter out existing characters
  const newCharacters = characterList.filter(c => !existingUrls.has(c.url));
  
  if (newCharacters.length === 0) {
    console.log('\n✅ No new characters to scrape!');
    
    // Regenerate index anyway
    generateIndexFile();
    return;
  }
  
  console.log(`\n📥 Scraping ${newCharacters.length} new characters...\n`);
  
  const scrapedCharacters: ScrapedCharacter[] = [];
  
  for (const char of newCharacters) {
    const details = await scrapeCharacterDetails(char.url, char.name, false);
    
    if (details) {
      saveCharacter(details);
      scrapedCharacters.push(details);
    }
    
    // Delay between requests
    await delay(DELAY_MS);
  }
  
  // Regenerate index with all characters
  generateIndexFile();
  
  console.log(`\n✅ Done! Scraped ${scrapedCharacters.length} new characters`);
}

main().catch(console.error);
