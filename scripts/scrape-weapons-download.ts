import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://game8.co';
const WEAPONS_LIST_URL = 'https://game8.co/games/Wuthering-Waves/archives/452490';
const DELAY_MS = 2000; // 2 seconds delay between requests
const HTML_CACHE_DIR = path.join(__dirname, 'weapons-cache');

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getExistingCache(): Set<string> {
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    fs.mkdirSync(HTML_CACHE_DIR, { recursive: true });
    return new Set();
  }
  const files = fs.readdirSync(HTML_CACHE_DIR);
  return new Set(files.map(file => file.replace('.html', '')));
}

function saveHtmlCache(slug: string, html: string): void {
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    fs.mkdirSync(HTML_CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(HTML_CACHE_DIR, `${slug}.html`), html, 'utf-8');
}

async function scrapeWeaponsList(): Promise<Array<{ name: string; url: string; image: string }>> {
  console.log('📋 Scraping weapons list...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(WEAPONS_LIST_URL, { waitUntil: 'networkidle' });
  const html = await page.content();
  await browser.close();
  
  const $ = cheerio.load(html);
  const weapons: Array<{ name: string; url: string; image: string }> = [];
  
  // Find weapons in the table
  $('table tbody tr').each((_, row) => {
    const $row = $(row);
    const link = $row.find('td:first-child a').first();
    const name = link.text().trim();
    let url = link.attr('href');
    
    // Extract image from the link
    const img = link.find('img');
    const imgSrc = img.attr('data-src') || img.attr('src');
    const image = imgSrc && !imgSrc.startsWith('data:image') 
      ? (imgSrc.startsWith('http') ? imgSrc : BASE_URL + imgSrc)
      : '';
    
    if (name && url) {
      url = url.startsWith('http') ? url : BASE_URL + url;
      weapons.push({ name, url, image });
    }
  });
  
  console.log(`  ✅ Found ${weapons.length} weapons`);
  return weapons;
}

async function downloadWeaponHtml(url: string, name: string): Promise<boolean> {
  console.log(`  📄 Downloading ${name}...`);
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const html = await page.content();
    
    const slug = slugify(name);
    saveHtmlCache(slug, html);
    console.log(`  💾 Saved HTML cache for ${name}`);
    
    await browser.close();
    return true;
  } catch (error) {
    console.error(`  ❌ Error downloading ${name}:`, error);
    await browser.close();
    return false;
  }
}

async function main() {
  console.log('⬇️  Starting weapons HTML downloader...\n');

  const existingCache = getExistingCache();
  console.log(`📦 Found ${existingCache.size} cached HTML files`);

  // Scrape the weapons list
  const weaponsList = await scrapeWeaponsList();
  
  // Filter out weapons that already have cache
  const weaponsToDownload = weaponsList.filter(w => !existingCache.has(slugify(w.name)));
  
  console.log(`\n🆕 ${weaponsToDownload.length} weapons need HTML download`);
  
  if (weaponsToDownload.length === 0) {
    console.log('\n✅ All weapons already have cached HTML!');
    return;
  }
  
  let downloaded = 0;
  let errors = 0;
  
  for (const weapon of weaponsToDownload) {
    const success = await downloadWeaponHtml(weapon.url, weapon.name);
    
    if (success) {
      downloaded++;
    } else {
      errors++;
    }
    
    // Delay between requests
    await delay(DELAY_MS);
  }
  
  console.log(`\n✅ HTML download completed!`);
  console.log(`   Downloaded: ${downloaded}`);
  console.log(`   Total cached: ${existingCache.size + downloaded}`);
  if (errors > 0) {
    console.log(`   Errors: ${errors}`);
  }
}

main().catch(console.error);

