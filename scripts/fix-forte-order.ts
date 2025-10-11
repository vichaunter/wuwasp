import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const charactersDir = join(process.cwd(), 'src', 'data', 'characters');
const files = readdirSync(charactersDir).filter(f => f.endsWith('.ts'));

console.log(`📋 Found ${files.length} character files`);

// Correct forte data with proper order: Crit.Rate+, ATK+, Inherent Skills, ATK+, Crit.Rate+
const correctForteData = `  forte: {
    statBonuses: ['Crit. Rate+', 'ATK+', 'ATK+', 'Crit. Rate+'],
    inherentSkills: 'Inherent Skills',
  },`;

let updatedCount = 0;

files.forEach(file => {
  const filePath = join(charactersDir, file);
  let content = readFileSync(filePath, 'utf-8');
  
  // Check if file has forte field
  if (!content.includes('forte:')) {
    console.log(`  ⏭️  Skipping ${file} (no forte field)`);
    return;
  }
  
  // Replace existing forte block
  const forteRegex = /  forte: \{[\s\S]*?\n  \},/;
  
  if (forteRegex.test(content)) {
    content = content.replace(forteRegex, correctForteData);
    writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ Updated ${file}`);
    updatedCount++;
  } else {
    console.log(`  ⚠️  Skipping ${file} (couldn't find forte block)`);
  }
});

console.log(`\n✨ Updated ${updatedCount} character files`);

