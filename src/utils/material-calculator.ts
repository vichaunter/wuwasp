import type { Character, Weapon, CharacterProgress, WeaponProgress, MaterialQualityTier } from '@/types';
import { ascensionRequirements } from '@/data/ascension-requirements';
import { forteRequirements } from '@/data/forte-requirements';
import { getWeaponAscensionRequirements } from '@/data/weapon-ascension-requirements';
import { getMaterialByNameAndQuality } from '@/data/materials';

export interface MaterialRequirement {
  materialId: string;
  materialName: string;
  quantity: number;
}

/**
 * Calculate ascension materials needed for a character between two ranks
 */
export function calculateCharacterAscensionMaterials(
  character: Character,
  currentRank: number,
  targetRank: number
): MaterialRequirement[] {
  if (currentRank >= targetRank) return [];
  
  const materials: Record<string, { name: string; quantity: number }> = {};
  
  // Add materials for each rank from current+1 to target
  for (let rank = currentRank + 1; rank <= targetRank; rank++) {
    const req = ascensionRequirements.find(r => r.rank === rank);
    if (!req) continue;
    
    // Common materials (with qualities)
    Object.entries(req.common).forEach(([quality, quantity]) => {
      if (!quantity) return;
      
      const material = getMaterialByNameAndQuality(
        character.materials.ascension.common,
        quality as MaterialQualityTier
      );
      
      if (material) {
        if (!materials[material.id]) {
          materials[material.id] = { name: material.name, quantity: 0 };
        }
        materials[material.id].quantity += quantity;
      }
    });
    
    // Boss material
    if (req.boss) {
      const bossId = character.materials.ascension.boss.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
      if (!materials[bossId]) {
        materials[bossId] = { name: character.materials.ascension.boss, quantity: 0 };
      }
      materials[bossId].quantity += req.boss;
    }
    
    // Overworld material
    if (req.overworld) {
      const overworldId = character.materials.ascension.overworld.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
      if (!materials[overworldId]) {
        materials[overworldId] = { name: character.materials.ascension.overworld, quantity: 0 };
      }
      materials[overworldId].quantity += req.overworld;
    }
    
    // Shell Credits
    if (req.currency) {
      if (!materials['shell-credit']) {
        materials['shell-credit'] = { name: 'Shell Credit', quantity: 0 };
      }
      materials['shell-credit'].quantity += req.currency;
    }
  }
  
  return Object.entries(materials).map(([id, data]) => ({
    materialId: id,
    materialName: data.name,
    quantity: data.quantity,
  }));
}

/**
 * Calculate forte materials needed for a character node between two levels
 */
export function calculateCharacterForteMaterials(
  character: Character,
  _nodeType: 'basic' | 'skill' | 'liberation' | 'intro' | 'outro',
  currentLevel: number,
  targetLevel: number
): MaterialRequirement[] {
  if (currentLevel >= targetLevel) return [];
  
  const materials: Record<string, { name: string; quantity: number }> = {};
  const req = forteRequirements.mainNodes;
  
  // Calculate the fraction of materials needed based on levels
  // Each node goes from 1 to 10, so we need (targetLevel - currentLevel) / 9 of the total
  const levelDiff = targetLevel - currentLevel;
  const fraction = levelDiff / 9; // 9 total upgrades (1→2, 2→3, ..., 9→10)
  
  // Common materials
  if (req.common) {
    Object.entries(req.common).forEach(([quality, totalQuantity]) => {
      if (!totalQuantity) return;
      
      const quantity = Math.ceil(totalQuantity * fraction);
      const material = getMaterialByNameAndQuality(
        character.materials.forte.common,
        quality as MaterialQualityTier
      );
      
      if (material) {
        if (!materials[material.id]) {
          materials[material.id] = { name: material.name, quantity: 0 };
        }
        materials[material.id].quantity += quantity;
      }
    });
  }
  
  // Forgery materials
  if (req.forgery) {
    Object.entries(req.forgery).forEach(([quality, totalQuantity]) => {
      if (!totalQuantity) return;
      
      const quantity = Math.ceil(totalQuantity * fraction);
      const material = getMaterialByNameAndQuality(
        character.materials.forte.forgery,
        quality as MaterialQualityTier
      );
      
      if (material) {
        if (!materials[material.id]) {
          materials[material.id] = { name: material.name, quantity: 0 };
        }
        materials[material.id].quantity += quantity;
      }
    });
  }
  
  // Boss material
  if (req.boss) {
    const quantity = Math.ceil(req.boss * fraction);
    const bossId = character.materials.forte.boss.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    if (!materials[bossId]) {
      materials[bossId] = { name: character.materials.forte.boss, quantity: 0 };
    }
    materials[bossId].quantity += quantity;
  }
  
  // Shell Credits
  if (req.currency) {
    const quantity = Math.ceil(req.currency * fraction);
    if (!materials['shell-credit']) {
      materials['shell-credit'] = { name: 'Shell Credit', quantity: 0 };
    }
    materials['shell-credit'].quantity += quantity;
  }
  
  return Object.entries(materials).map(([id, data]) => ({
    materialId: id,
    materialName: data.name,
    quantity: data.quantity,
  }));
}

/**
 * Calculate passive unlock materials for a character
 */
export function calculateCharacterPassiveMaterials(
  character: Character,
  passiveType: 'passive1' | 'passive2' | 'bonusPassive',
  unlock: boolean
): MaterialRequirement[] {
  if (!unlock) return [];
  
  const reqMap: Record<typeof passiveType, keyof typeof forteRequirements> = {
    passive1: 'inherentSkill1',
    passive2: 'inherentSkill2',
    bonusPassive: 'statBonus1', // Assuming stat bonuses for this
  };
  
  const req = forteRequirements[reqMap[passiveType]];
  const materials: Record<string, { name: string; quantity: number }> = {};
  
  // Common materials
  if (req.common) {
    Object.entries(req.common).forEach(([quality, quantity]) => {
      if (!quantity) return;
      
      const material = getMaterialByNameAndQuality(
        character.materials.forte.common,
        quality as MaterialQualityTier
      );
      
      if (material) {
        if (!materials[material.id]) {
          materials[material.id] = { name: material.name, quantity: 0 };
        }
        materials[material.id].quantity += quantity;
      }
    });
  }
  
  // Forgery materials
  if (req.forgery) {
    Object.entries(req.forgery).forEach(([quality, quantity]) => {
      if (!quantity) return;
      
      const material = getMaterialByNameAndQuality(
        character.materials.forte.forgery,
        quality as MaterialQualityTier
      );
      
      if (material) {
        if (!materials[material.id]) {
          materials[material.id] = { name: material.name, quantity: 0 };
        }
        materials[material.id].quantity += quantity;
      }
    });
  }
  
  // Boss material
  if (req.boss) {
    const bossId = character.materials.forte.boss.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    if (!materials[bossId]) {
      materials[bossId] = { name: character.materials.forte.boss, quantity: 0 };
    }
    materials[bossId].quantity += req.boss;
  }
  
  // Shell Credits
  if (req.currency) {
    if (!materials['shell-credit']) {
      materials['shell-credit'] = { name: 'Shell Credit', quantity: 0 };
    }
    materials['shell-credit'].quantity += req.currency;
  }
  
  return Object.entries(materials).map(([id, data]) => ({
    materialId: id,
    materialName: data.name,
    quantity: data.quantity,
  }));
}

/**
 * Calculate total materials needed for a character based on progress
 */
export function calculateCharacterTotalMaterials(
  character: Character,
  progress: CharacterProgress
): MaterialRequirement[] {
  const allMaterials: MaterialRequirement[] = [];
  
  // Ascension materials
  allMaterials.push(...calculateCharacterAscensionMaterials(
    character,
    progress.ascension.current,
    progress.ascension.target
  ));
  
  // Forte node materials
  const forteNodes: Array<keyof CharacterProgress['forte']> = [
    'basic', 'skill', 'liberation', 'intro', 'outro'
  ];
  
  for (const node of forteNodes) {
    const nodeProgress = progress.forte[node];
    if (nodeProgress.current < nodeProgress.target) {
      allMaterials.push(...calculateCharacterForteMaterials(
        character,
        node as any,
        nodeProgress.current,
        nodeProgress.target
      ));
    }
  }
  
  // Passive materials
  if (progress.forte.passive1.target > progress.forte.passive1.current) {
    allMaterials.push(...calculateCharacterPassiveMaterials(character, 'passive1', true));
  }
  if (progress.forte.passive2.target > progress.forte.passive2.current) {
    allMaterials.push(...calculateCharacterPassiveMaterials(character, 'passive2', true));
  }
  if (progress.forte.bonusPassive.target > progress.forte.bonusPassive.current) {
    allMaterials.push(...calculateCharacterPassiveMaterials(character, 'bonusPassive', true));
  }
  
  // Merge duplicate materials
  return mergeMaterialRequirements(allMaterials);
}

/**
 * Calculate ascension materials needed for a weapon between two ranks
 */
export function calculateWeaponAscensionMaterials(
  weapon: Weapon,
  currentRank: number,
  targetRank: number
): MaterialRequirement[] {
  if (currentRank >= targetRank) return [];
  
  const requirements = getWeaponAscensionRequirements(weapon.rarity);
  const materials: Record<string, { name: string; quantity: number }> = {};
  
  // Add materials for each rank from current to target-1
  for (let i = currentRank; i < targetRank; i++) {
    const req = requirements[i];
    if (!req) continue;
    
    // Common material
    const commonMaterial = getMaterialByNameAndQuality(
      weapon.materials.common,
      req.materials.common.quality
    );
    if (commonMaterial) {
      if (!materials[commonMaterial.id]) {
        materials[commonMaterial.id] = { name: commonMaterial.name, quantity: 0 };
      }
      materials[commonMaterial.id].quantity += req.materials.common.quantity;
    }
    
    // Forgery material
    const forgeryMaterial = getMaterialByNameAndQuality(
      weapon.materials.forgery,
      req.materials.forgery.quality
    );
    if (forgeryMaterial) {
      if (!materials[forgeryMaterial.id]) {
        materials[forgeryMaterial.id] = { name: forgeryMaterial.name, quantity: 0 };
      }
      materials[forgeryMaterial.id].quantity += req.materials.forgery.quantity;
    }
    
    // Ascension material (weapon-specific, only for 4★ and 5★)
    if (req.materials.ascension && weapon.materials.ascension) {
      const ascensionId = weapon.materials.ascension.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
      if (!materials[ascensionId]) {
        materials[ascensionId] = { name: weapon.materials.ascension, quantity: 0 };
      }
      materials[ascensionId].quantity += req.materials.ascension.quantity;
    }
    
    // Shell Credits
    if (req.materials.shellCredits) {
      if (!materials['shell-credit']) {
        materials['shell-credit'] = { name: 'Shell Credit', quantity: 0 };
      }
      materials['shell-credit'].quantity += req.materials.shellCredits;
    }
  }
  
  return Object.entries(materials).map(([id, data]) => ({
    materialId: id,
    materialName: data.name,
    quantity: data.quantity,
  }));
}

/**
 * Calculate total materials needed for a weapon based on progress
 */
export function calculateWeaponTotalMaterials(
  weapon: Weapon,
  progress: WeaponProgress
): MaterialRequirement[] {
  return calculateWeaponAscensionMaterials(
    weapon,
    progress.ascension.current,
    progress.ascension.target
  );
}

/**
 * Merge duplicate material requirements
 */
function mergeMaterialRequirements(requirements: MaterialRequirement[]): MaterialRequirement[] {
  const merged: Record<string, MaterialRequirement> = {};
  
  for (const req of requirements) {
    if (merged[req.materialId]) {
      merged[req.materialId].quantity += req.quantity;
    } else {
      merged[req.materialId] = { ...req };
    }
  }
  
  return Object.values(merged);
}

