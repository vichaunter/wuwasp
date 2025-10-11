import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ExtractedMaterial {
  name: string;
  imageUrl: string;
}

/**
 * Extrae TODOS los materiales de un HTML
 * Busca el patrón: <a>...<img data-src="URL/show">...Material Name</a>
 */
function extractMaterialsFromHTML(htmlContent: string): ExtractedMaterial[] {
  const materials: ExtractedMaterial[] = [];
  
  // Pattern: <a href="..."><img ... data-src="URL/show" ...> Material Name</a>
  const linkRegex = /<a[^>]*href="[^"]*"[^>]*><img[^>]*data-src="([^"]*\/show)"[^>]*>\s*([^<]+)<\/a>/g;
  
  let match;
  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const imageUrl = match[1];
    const materialName = match[2].trim();
    
    // Filtrar Shell Credit
    if (!materialName.includes('Shell Credit')) {
      materials.push({ name: materialName, imageUrl });
    }
  }
  
  return materials;
}

describe('Material Extraction from HTML Cache', () => {
  const htmlCacheDir = path.join(__dirname, 'html-cache');
  
  it('html-cache directory should exist', () => {
    expect(fs.existsSync(htmlCacheDir)).toBe(true);
  });
  
  it('should have HTML files in cache', () => {
    const files = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    expect(files.length).toBeGreaterThan(0);
    console.log(`Found ${files.length} HTML files in cache`);
  });
  
  it('should extract materials from all HTML files', () => {
    const htmlFiles = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    
    for (const htmlFile of htmlFiles) {
      const htmlContent = fs.readFileSync(path.join(htmlCacheDir, htmlFile), 'utf-8');
      const materials = extractMaterialsFromHTML(htmlContent);
      
      expect(materials.length).toBeGreaterThan(0);
      console.log(`${htmlFile}: ${materials.length} materials`);
    }
  });
  
  it('should extract materials with valid image URLs', () => {
    const htmlFiles = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    const firstFile = htmlFiles[0];
    const htmlContent = fs.readFileSync(path.join(htmlCacheDir, firstFile), 'utf-8');
    const materials = extractMaterialsFromHTML(htmlContent);
    
    for (const material of materials) {
      expect(material.imageUrl).toMatch(/^https:\/\/(img|j-img)\.game8\.co\/.*\/show$/);
      expect(material.name.length).toBeGreaterThan(0);
    }
  });
  
  it('should extract all material types from the entire cache', () => {
    const htmlFiles = fs.readdirSync(htmlCacheDir).filter(f => f.endsWith('.html'));
    const allMaterials = new Set<string>();
    
    for (const htmlFile of htmlFiles) {
      const htmlContent = fs.readFileSync(path.join(htmlCacheDir, htmlFile), 'utf-8');
      const materials = extractMaterialsFromHTML(htmlContent);
      
      materials.forEach(m => allMaterials.add(m.name));
    }
    
    console.log(`\nTotal unique materials found: ${allMaterials.size}`);
    
    // Verificar que tenemos materiales de cada tipo
    const materialsList = Array.from(allMaterials);
    
    // Common materials (LF, MF, HF, FF prefix)
    const commonMaterials = materialsList.filter(m => /^(LF|MF|HF|FF)\s/.test(m));
    expect(commonMaterials.length).toBeGreaterThan(0);
    console.log(`Common materials (LF/MF/HF/FF): ${commonMaterials.length}`);
    
    // Forgery materials (should have variants like Lento Helix, Adagio Helix, etc.)
    const forgeryWithNumbers = materialsList.filter(m => /\s(210|226|235|239)$/.test(m));
    const forgeryWithNames = materialsList.filter(m => 
      m.includes('Helix') || m.includes('Phlogiston') || m.includes('Metallic Drip') || 
      m.includes('Cadence') || m.includes('Residue')
    );
    const totalForgery = new Set([...forgeryWithNumbers, ...forgeryWithNames]).size;
    expect(totalForgery).toBeGreaterThan(0);
    console.log(`Forgery materials: ${totalForgery} (numbers: ${forgeryWithNumbers.length}, names: ${forgeryWithNames.length})`);
    
    // Boss materials (should have specific names)
    const bossMaterials = materialsList.filter(m => 
      m.includes('Stare') || m.includes('Dagger') || m.includes('Pearl') || 
      m.includes('Bloom') || m.includes('Crown') || m.includes('Bell')
    );
    expect(bossMaterials.length).toBeGreaterThan(0);
    console.log(`Boss materials: ${bossMaterials.length}`);
    
    // Overworld/Collectible materials
    const overworldMaterials = materialsList.filter(m => 
      m.includes('Pecok') || m.includes('Coriolus') || m.includes('Calendula') || 
      m.includes('Violet') || m.includes('Lanternberry') || m.includes('Lampylumen')
    );
    expect(overworldMaterials.length).toBeGreaterThan(0);
    console.log(`Overworld materials: ${overworldMaterials.length}`);
    
    // Print some examples
    console.log('\nExamples:');
    console.log('Common:', commonMaterials.slice(0, 3));
    console.log('Forgery:', [...forgeryWithNumbers.slice(0, 2), ...forgeryWithNames.slice(0, 2)]);
    console.log('Boss:', bossMaterials.slice(0, 3));
    console.log('Overworld:', overworldMaterials.slice(0, 3));
  });
});

