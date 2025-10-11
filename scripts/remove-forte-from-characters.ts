import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const charactersDir = join(process.cwd(), 'src', 'data', 'characters');
const files = readdirSync(charactersDir).filter(f => f.endsWith('.ts'));

console.log(`📋 Found ${files.length} character files`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = join(charactersDir, file);
  let content = readFileSync(filePath, 'utf-8');
  
  // Remove any forte block (both correctly and incorrectly positioned)
  content = content.replace(/  forte: \{[\s\S]*?\n  \},\n/g, '');
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Cleaned ${file}`);
  updatedCount++;
});

console.log(`\n✨ Cleaned ${updatedCount} character files`);

