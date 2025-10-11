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
  
  // Remove the forte block that was incorrectly placed inside materials.forte
  const incorrectForteRegex = /    forte: \{\s+statBonuses:.*?\n.*?inherentSkills:.*?\n  \},\n/s;
  
  if (incorrectForteRegex.test(content)) {
    content = content.replace(incorrectForteRegex, '');
    writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ Cleaned ${file}`);
    updatedCount++;
  } else {
    console.log(`  ⏭️  Skipping ${file} (no incorrect forte block found)`);
  }
});

console.log(`\n✨ Cleaned ${updatedCount} character files`);

