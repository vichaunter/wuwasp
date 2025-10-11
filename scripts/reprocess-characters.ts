import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔄 Este script reprocesará los personajes desde los HTML guardados en cache.');
console.log('📝 Útil cuando cambies la lógica de extracción de datos.\n');

const HTML_CACHE_DIR = path.join(__dirname, 'html-cache');

if (!fs.existsSync(HTML_CACHE_DIR)) {
  console.log('❌ No se encontró la carpeta de cache HTML.');
  console.log('   Ejecuta primero: pnpm scrape:characters\n');
  process.exit(1);
}

const htmlFiles = fs.readdirSync(HTML_CACHE_DIR).filter(f => f.endsWith('.html'));

console.log(`📦 Encontrados ${htmlFiles.length} archivos HTML en cache.`);
console.log('💡 Para reprocesar, modifica el script scrape-characters.ts');
console.log('   y añade una función que tome el HTML como parámetro.\n');

// List all cached files
htmlFiles.forEach(file => {
  console.log(`  - ${file}`);
});

