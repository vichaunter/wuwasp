/**
 * Storage Migrations System
 * 
 * This system handles automatic migrations of localStorage data when
 * the data structure changes between versions.
 */

import type { UserData } from '@/types';

// Current version of the data structure
export const CURRENT_STORAGE_VERSION = 4;

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

// Migration from version 3 to version 4
// Ensures completedCharacters and completedWeapons exist and validates data integrity
function migrateV3toV4(data: any): any {
  console.log('🔄 Migrating storage from v3 to v4...');
  
  // Ensure completedCharacters exists
  if (!data.completedCharacters || typeof data.completedCharacters !== 'object') {
    data.completedCharacters = {};
    console.log('  ✓ Initialized completedCharacters');
  }
  
  // Ensure completedWeapons exists
  if (!data.completedWeapons || typeof data.completedWeapons !== 'object') {
    data.completedWeapons = {};
    console.log('  ✓ Initialized completedWeapons');
  }
  
  return data;
}

// Registry of all migration functions
const migrations: Record<number, (data: any) => any> = {
  1: migrateV1toV2,
  2: migrateV2toV3,
  3: migrateV3toV4,
  // Add future migrations here:
  // 4: migrateV4toV5,
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
  
  // After migrations, validate and fix any data inconsistencies
  const validatedData = validateAndFixData(migratedData);
  
  return validatedData as UserData;
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

/**
 * Validates and fixes data inconsistencies
 * This should be called after migrations to ensure data integrity
 * Returns data in the format expected by Zustand persist (without 'state' wrapper)
 */
export function validateAndFixData(data: any): any {
  const fixed = { ...data };
  const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === "production";
  let hasChanges = false;

  // Ensure completedCharacters exists and is an object
  if (!fixed.completedCharacters || typeof fixed.completedCharacters !== 'object') {
    fixed.completedCharacters = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing completedCharacters');
    }
  }

  // Ensure completedWeapons exists and is an object
  if (!fixed.completedWeapons || typeof fixed.completedWeapons !== 'object') {
    fixed.completedWeapons = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing completedWeapons');
    }
  }

  // Ensure inventory exists and is an object
  if (!fixed.inventory || typeof fixed.inventory !== 'object') {
    fixed.inventory = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing inventory');
    }
  }

  // Ensure characterProgress exists and is an object
  if (!fixed.characterProgress || typeof fixed.characterProgress !== 'object') {
    fixed.characterProgress = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing characterProgress');
    }
  }

  // Ensure weaponProgress exists and is an object
  if (!fixed.weaponProgress || typeof fixed.weaponProgress !== 'object') {
    fixed.weaponProgress = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing weaponProgress');
    }
  }

  // Ensure collapsedSections exists and is an object
  if (!fixed.collapsedSections || typeof fixed.collapsedSections !== 'object') {
    fixed.collapsedSections = {};
    hasChanges = true;
    if (!isProduction) {
      console.log('🔧 Fixed: Initialized missing collapsedSections');
    }
  }

  // Validate character progress: if a character is marked as completed,
  // ensure it's properly tracked (but keep enabled state as user preference)
  if (fixed.characterProgress && fixed.completedCharacters) {
    Object.keys(fixed.characterProgress).forEach((characterId) => {
      const progress = fixed.characterProgress[characterId];
      
      // Ensure progress is valid
      if (!progress || typeof progress !== 'object') {
        delete fixed.characterProgress[characterId];
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Removed invalid character progress for ${characterId}`);
        }
        return;
      }

      // Ensure required fields exist
      if (typeof progress.enabled !== 'boolean') {
        progress.enabled = false;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Set default enabled=false for character ${characterId}`);
        }
      }

      if (typeof progress.order !== 'number' || !isFinite(progress.order)) {
        progress.order = 999;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Set default order for character ${characterId}`);
        }
      }

      // Ensure ascension fields exist
      if (!progress.ascension || typeof progress.ascension !== 'object') {
        progress.ascension = { current: 0, target: 6 };
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Added missing ascension for character ${characterId}`);
        }
      }

      // Ensure level fields exist
      if (!progress.level || typeof progress.level !== 'object') {
        progress.level = { current: 1, target: 90 };
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Added missing level for character ${characterId}`);
        }
      }
    });
  }

  // Validate weapon progress: same as characters
  if (fixed.weaponProgress && fixed.completedWeapons) {
    Object.keys(fixed.weaponProgress).forEach((weaponId) => {
      const progress = fixed.weaponProgress[weaponId];
      
      // Ensure progress is valid
      if (!progress || typeof progress !== 'object') {
        delete fixed.weaponProgress[weaponId];
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Removed invalid weapon progress for ${weaponId}`);
        }
        return;
      }

      // Ensure required fields exist
      if (typeof progress.enabled !== 'boolean') {
        progress.enabled = false;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Set default enabled=false for weapon ${weaponId}`);
        }
      }

      if (typeof progress.order !== 'number' || !isFinite(progress.order)) {
        progress.order = 999;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Set default order for weapon ${weaponId}`);
        }
      }

      // Ensure ascension fields exist
      if (!progress.ascension || typeof progress.ascension !== 'object') {
        progress.ascension = { current: 0, target: 7 };
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Added missing ascension for weapon ${weaponId}`);
        }
      }

      // Ensure level fields exist
      if (!progress.level || typeof progress.level !== 'object') {
        progress.level = { current: 1, target: 90 };
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Added missing level for weapon ${weaponId}`);
        }
      }
    });
  }

  // Validate inventory values: ensure all values are numbers >= 0
  if (fixed.inventory) {
    Object.keys(fixed.inventory).forEach((materialId) => {
      const value = fixed.inventory[materialId];
      if (typeof value !== 'number' || value < 0 || !isFinite(value)) {
        fixed.inventory[materialId] = 0;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Invalid inventory value for ${materialId}, set to 0`);
        }
      }
    });
  }

  // Validate completedCharacters and completedWeapons: ensure they're boolean maps
  if (fixed.completedCharacters) {
    Object.keys(fixed.completedCharacters).forEach((characterId) => {
      if (typeof fixed.completedCharacters[characterId] !== 'boolean') {
        fixed.completedCharacters[characterId] = true;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Invalid completedCharacters value for ${characterId}`);
        }
      }
    });
  }

  if (fixed.completedWeapons) {
    Object.keys(fixed.completedWeapons).forEach((weaponId) => {
      if (typeof fixed.completedWeapons[weaponId] !== 'boolean') {
        fixed.completedWeapons[weaponId] = true;
        hasChanges = true;
        if (!isProduction) {
          console.log(`🔧 Fixed: Invalid completedWeapons value for ${weaponId}`);
        }
      }
    });
  }

  if (!isProduction) {
    if (hasChanges) {
      console.log('✅ Data validation completed with fixes');
    } else {
      console.log('✅ Data validation passed - no fixes needed');
    }
  }

  return fixed;
}

