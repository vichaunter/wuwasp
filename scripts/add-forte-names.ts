import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const charactersDir = join(process.cwd(), 'src', 'data', 'characters');
const files = readdirSync(charactersDir).filter(f => f.endsWith('.ts'));

console.log(`📋 Found ${files.length} character files`);

// Default forte data to add
const defaultForteData = `  forte: {
    statBonuses: ['Crit. Rate+', 'ATK+', 'ATK+', 'Crit. Rate+'],
    inherentSkills: 'Inherent Skills',
  },`;

let updatedCount = 0;

files.forEach(file => {
  const filePath = join(charactersDir, file);
  let content = readFileSync(filePath, 'utf-8');
  
  // Check if file already has forte field (with statBonuses)
  if (content.includes('statBonuses:')) {
    console.log(`  ⏭️  Skipping ${file} (already has forte)`);
    return;
  }
  
  // Find the position to insert forte (after materials section, before image)
  const materialsEndIndex = content.lastIndexOf('  },\n  image:');
  
  if (materialsEndIndex === -1) {
    console.log(`  ⚠️  Skipping ${file} (couldn't find insertion point)`);
    return;
  }
  
  // Insert forte data
  const before = content.substring(0, materialsEndIndex + 4); // include '  },\n'
  const after = content.substring(materialsEndIndex + 4);
  
  content = before + '\n' + defaultForteData + after;
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✅ Updated ${file}`);
  updatedCount++;
});

console.log(`\n✨ Updated ${updatedCount} character files`);

