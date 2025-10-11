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
  
  // Check if forte is currently misplaced
  if (content.includes('  forte: {')) {
    // Already correctly positioned
    console.log(`  ⏭️  Skipping ${file} (forte already correctly positioned)`);
    return;
  }
  
  // Remove misplaced forte block and materials closing brace
  content = content.replace(/  forte: \{\s+statBonuses:.*?\n.*?inherentSkills:.*?\n  \},\n  image:/s, '  image:');
  
  // Add forte in the correct position (after materials block)
  content = content.replace(
    /(  },\n)(  image:)/,
    '$1  forte: {\n    statBonuses: [\'Crit. Rate+\', \'ATK+\', \'ATK+\', \'Crit. Rate+\'],\n    inherentSkills: \'Inherent Skills\',\n  },\n$2'
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Fixed ${file}`);
  updatedCount++;
});

console.log(`\n✨ Fixed ${updatedCount} character files`);

