import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  
  // Extract materials
  const materials = {
    common: '',
    forgery: '',
    ascension: '',
  };
  
  $('h2, h3').each((_, heading) => {
    const headingText = $(heading).text().trim();
    if (headingText.includes('Ascension') || headingText.includes('Materials')) {
      const section = $(heading).nextAll().first();
      const materialLinks = section.find('a');
      
      materialLinks.each((_, link) => {
        const materialName = $(link).text().trim();
        const materialLower = materialName.toLowerCase();
        
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
  
  // Get weapon name from h1
  let name = $('h1.p-archiveHeader__title').text().trim();
  // Extract just the weapon name (remove additional text)
  name = name
    .split(' Best ')[0]
    .split(' How to ')[0]
    .split(' Stats and ')[0]
    .split(' Effect')[0]
    .split(' (')[0]  // Remove parenthetical info like "(Shorekeeper Weapon)"
    .trim();
  
  return {
    id: slug,
    name: name || slug,
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
  const filePath = path.join(__dirname, '../src/data/weapons', `${weapon.slug}.ts`);
  const content = await generateWeaponFile(weapon);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Updated ${weapon.name}`);
}

async function main() {
  console.log('🔄 Reprocesando armas desde HTML cache...\n');
  
  if (!fs.existsSync(HTML_CACHE_DIR)) {
    console.error('❌ El directorio weapons-cache no existe');
    return;
  }
  
  const htmlFiles = fs.readdirSync(HTML_CACHE_DIR).filter(f => f.endsWith('.html'));
  
  console.log(`📦 Encontrados ${htmlFiles.length} archivos HTML en cache\n`);
  
  let processed = 0;
  let errors = 0;
  
  // We need to get the weapon images from the main list
  // For now, we'll just use empty strings and they can be manually added
  const weaponImages = new Map<string, string>();
  
  for (const htmlFile of htmlFiles) {
    const slug = htmlFile.replace('.html', '');
    const htmlPath = path.join(HTML_CACHE_DIR, htmlFile);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    try {
      const weapon = processHtml(html, slug, weaponImages.get(slug) || '');
      
      if (weapon) {
        await saveWeapon(weapon);
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

