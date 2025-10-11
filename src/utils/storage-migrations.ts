/**
 * Storage Migrations System
 * 
 * This system handles automatic migrations of localStorage data when
 * the data structure changes between versions.
 */

import type { UserData } from '@/types';

// Current version of the data structure
export const CURRENT_STORAGE_VERSION = 3;

// Migration from version 1 to version 2
// Migrates old forte structure (passive1, passive2, bonusPassive) 
// to new structure (statBonus1-4, inherentSkill1-2)
function migrateV1toV2(data: any): any {
  console.log('🔄 Migrating storage from v1 to v2...');
  
  // Migrate character progress
  if (data.characterProgress) {
    Object.keys(data.characterProgress).forEach(characterId => {
      const progress = data.characterProgress[characterId];
      
      if (progress.forte) {
        const oldForte = progress.forte;
        
        // If old structure exists, migrate it
        if ('passive1' in oldForte || 'passive2' in oldForte || 'bonusPassive' in oldForte) {
          // Remove old fields
          delete oldForte.passive1;
          delete oldForte.passive2;
          delete oldForte.bonusPassive;
          
          // Add new fields with default values
          progress.forte.statBonus1 = { current: 0, target: 2 };
          progress.forte.statBonus2 = { current: 0, target: 2 };
          progress.forte.statBonus3 = { current: 0, target: 2 };
          progress.forte.statBonus4 = { current: 0, target: 2 };
          progress.forte.inherentSkill1 = { current: 0, target: 2 };
          progress.forte.inherentSkill2 = { current: 0, target: 2 };
          
          console.log(`  ✓ Migrated character: ${characterId}`);
        }
      }
    });
  }
  
  return data;
}

// Migration from version 2 to version 3
// Adds level tracking separate from ascension
function migrateV2toV3(data: any): any {
  console.log('🔄 Migrating storage from v2 to v3...');
  
  // Migrate character progress: add level field
  if (data.characterProgress) {
    Object.keys(data.characterProgress).forEach(characterId => {
      const progress = data.characterProgress[characterId];
      
      if (!progress.level) {
        // Default to level 1 to 90
        progress.level = { current: 1, target: 90 };
        console.log(`  ✓ Added level tracking to character: ${characterId}`);
      }
    });
  }
  
  // Migrate weapon progress: add level field
  if (data.weaponProgress) {
    Object.keys(data.weaponProgress).forEach(weaponId => {
      const progress = data.weaponProgress[weaponId];
      
      if (!progress.level) {
        // Default to level 1 to 90
        progress.level = { current: 1, target: 90 };
        console.log(`  ✓ Added level tracking to weapon: ${weaponId}`);
      }
    });
  }
  
  return data;
}

// Registry of all migration functions
const migrations: Record<number, (data: any) => any> = {
  1: migrateV1toV2,
  2: migrateV2toV3,
  // Add future migrations here:
  // 3: migrateV3toV4,
};

/**
 * Apply all necessary migrations to bring data to the current version
 */
export function applyMigrations(data: any): UserData {
  // Get current version from data, default to 0 if not present
  const dataVersion = data.version || 0;
  
  // If data is already at current version, no migration needed
  if (dataVersion >= CURRENT_STORAGE_VERSION) {
    return data as UserData;
  }
  
  console.log(`📦 Storage version: ${dataVersion} (current: ${CURRENT_STORAGE_VERSION})`);
  
  let migratedData = { ...data };
  
  // Apply each migration in sequence
  for (let version = dataVersion; version < CURRENT_STORAGE_VERSION; version++) {
    const migrationFn = migrations[version];
    
    if (migrationFn) {
      try {
        migratedData = migrationFn(migratedData);
        migratedData.version = version + 1;
        console.log(`  ✓ Migrated to version ${version + 1}`);
      } catch (error) {
        console.error(`  ✗ Migration failed at version ${version}:`, error);
        // If migration fails, we might want to clear storage and start fresh
        throw new Error(`Migration failed at version ${version}`);
      }
    } else {
      // No migration function for this version, just increment
      migratedData.version = version + 1;
    }
  }
  
  console.log('✅ Migrations completed successfully');
  return migratedData as UserData;
}

/**
 * Load data from localStorage and apply migrations if needed
 */
export function loadMigratedData(storageKey: string): UserData | null {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return null;
    }
    
    const data = JSON.parse(stored);
    
    // Apply migrations if needed
    const migratedData = applyMigrations(data);
    
    // Save the migrated data back to localStorage
    if (migratedData.version !== data.version) {
      localStorage.setItem(storageKey, JSON.stringify(migratedData));
      console.log('💾 Migrated data saved to localStorage');
    }
    
    return migratedData;
  } catch (error) {
    console.error('Error loading or migrating data:', error);
    return null;
  }
}

/**
 * Save data to localStorage with current version
 */
export function saveMigratedData(storageKey: string, data: UserData): void {
  const dataWithVersion = {
    ...data,
    version: CURRENT_STORAGE_VERSION,
  };
  
  localStorage.setItem(storageKey, JSON.stringify(dataWithVersion));
}

/**
 * Clear all data and reset to defaults (useful for debugging or major breaking changes)
 */
export function resetStorage(storageKey: string): void {
  console.warn('⚠️ Resetting storage to defaults');
  localStorage.removeItem(storageKey);
}

