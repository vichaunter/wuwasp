import type {
  Character,
  Weapon,
  CharacterProgress,
  WeaponProgress,
  MaterialQualityTier,
} from "@/types";
import { ascensionRequirements } from "@/data/ascension-requirements";
import { forteRequirements } from "@/data/forte-requirements";
import { getWeaponAscensionRequirements } from "@/data/weapon-ascension-requirements";
import { getMaterialByNameAndQuality } from "@/data/materials";
import {
  characterExpRequirements,
  EXP_VALUES,
  weaponExpRequirements,
} from "@/data/exp-requirements";

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
    const req = ascensionRequirements.find((r) => r.rank === rank);
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
      const bossId = character.materials.ascension.boss
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[bossId]) {
        materials[bossId] = {
          name: character.materials.ascension.boss,
          quantity: 0,
        };
      }
      materials[bossId].quantity += req.boss;
    }

    // Overworld material
    if (req.overworld) {
      const overworldId = character.materials.ascension.overworld
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[overworldId]) {
        materials[overworldId] = {
          name: character.materials.ascension.overworld,
          quantity: 0,
        };
      }
      materials[overworldId].quantity += req.overworld;
    }

    // Shell Credits
    if (req.currency) {
      if (!materials["shell-credit"]) {
        materials["shell-credit"] = { name: "Shell Credit", quantity: 0 };
      }
      materials["shell-credit"].quantity += req.currency;
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
  _nodeType: "basic" | "skill" | "liberation" | "intro" | "outro",
  currentLevel: number,
  targetLevel: number
): MaterialRequirement[] {
  if (currentLevel >= targetLevel) return [];

  const materials: Record<string, { name: string; quantity: number }> = {};

  // Sum materials for each level upgrade
  // Iterate over destination levels (currentLevel+1 to targetLevel)
  for (
    let destLevel = currentLevel + 1;
    destLevel <= targetLevel;
    destLevel++
  ) {
    // Find the requirement for this destination level
    const req = forteRequirements.mainNodes.find((n) => n.level === destLevel);
    if (!req) continue;

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
      const bossId = character.materials.forte.boss
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[bossId]) {
        materials[bossId] = {
          name: character.materials.forte.boss,
          quantity: 0,
        };
      }
      materials[bossId].quantity += req.boss;
    }

    // Shell Credits
    if (req.currency) {
      const shellCreditId = "shell-credit";
      if (!materials[shellCreditId]) {
        materials[shellCreditId] = { name: "Shell Credit", quantity: 0 };
      }
      materials[shellCreditId].quantity += req.currency;
    }
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
/**
 * Calculate materials for stat bonus levels (0->1, 1->2)
 */
export function calculateCharacterStatBonusMaterials(
  character: Character,
  currentLevel: number,
  targetLevel: number
): MaterialRequirement[] {
  if (currentLevel >= targetLevel) return [];

  const materials: Record<string, { name: string; quantity: number }> = {};

  // For each level upgrade, add the materials
  for (let level = currentLevel; level < targetLevel; level++) {
    const req =
      level === 0
        ? forteRequirements.statBonusLevel1
        : forteRequirements.statBonusLevel2;

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
      const bossId = character.materials.forte.boss
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[bossId]) {
        materials[bossId] = {
          name: character.materials.forte.boss,
          quantity: 0,
        };
      }
      materials[bossId].quantity += req.boss;
    }

    // Shell Credits
    if (req.currency) {
      const shellCreditId = "shell-credit";
      if (!materials[shellCreditId]) {
        materials[shellCreditId] = { name: "Shell Credit", quantity: 0 };
      }
      materials[shellCreditId].quantity += req.currency;
    }
  }

  return Object.entries(materials).map(([id, { name, quantity }]) => ({
    materialId: id,
    materialName: name,
    quantity,
  }));
}

/**
 * Calculate materials for inherent skills (2 skills, each with 0->1, 1->2 levels)
 */
export function calculateCharacterInherentSkillMaterials(
  character: Character,
  currentLevel: number,
  targetLevel: number
): MaterialRequirement[] {
  if (currentLevel >= targetLevel) return [];

  const materials: Record<string, { name: string; quantity: number }> = {};

  // For each level upgrade, add the materials
  for (let level = currentLevel; level < targetLevel; level++) {
    const req =
      level === 0
        ? forteRequirements.inherentSkillLevel1
        : forteRequirements.inherentSkillLevel2;

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
      const bossId = character.materials.forte.boss
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[bossId]) {
        materials[bossId] = {
          name: character.materials.forte.boss,
          quantity: 0,
        };
      }
      materials[bossId].quantity += req.boss;
    }

    // Shell Credits
    if (req.currency) {
      const shellCreditId = "shell-credit";
      if (!materials[shellCreditId]) {
        materials[shellCreditId] = { name: "Shell Credit", quantity: 0 };
      }
      materials[shellCreditId].quantity += req.currency;
    }
  }

  return Object.entries(materials).map(([id, { name, quantity }]) => ({
    materialId: id,
    materialName: name,
    quantity,
  }));
}

/**
 * Calculate EXP materials (Resonance Potions) for character leveling
 *
 * Returns the TOTAL EXP needed and Shell Credits for leveling,
 * NOT individual potions. The UI will display these as separate rows
 * below the config button, showing total EXP and total Shell Credits.
 */
export function calculateCharacterExpMaterials(
  currentRank: number,
  targetRank: number
): MaterialRequirement[] {
  let totalExp = 0;
  let totalShellCreditsForLeveling = 0;

  // Sum up EXP for each ascension rank
  for (let rank = currentRank; rank < targetRank; rank++) {
    if (rank >= 0 && rank < characterExpRequirements.length) {
      totalExp += characterExpRequirements[rank].exp;
      totalShellCreditsForLeveling +=
        characterExpRequirements[rank].shellCredits;
    }
  }

  if (totalExp === 0 && totalShellCreditsForLeveling === 0) {
    return [];
  }

  const requirements: MaterialRequirement[] = [];

  // Add total EXP requirement (not individual potions)
  if (totalExp > 0) {
    requirements.push({
      materialId: "character-exp",
      materialName: "Character EXP",
      quantity: totalExp,
    });
  }

  // Add Shell Credits cost for leveling (separate from ascension costs)
  if (totalShellCreditsForLeveling > 0) {
    requirements.push({
      materialId: "shell-credit-leveling",
      materialName: "Shell Credit (Leveling)",
      quantity: totalShellCreditsForLeveling,
    });
  }

  return requirements;
}

/**
 * Calculate EXP materials (Energy Cores) for weapon leveling
 *
 * Returns the TOTAL EXP needed and Shell Credits for leveling,
 * NOT individual cores. The UI will display these as separate rows
 * below the config button, showing total EXP and total Shell Credits.
 */
export function calculateWeaponExpMaterials(
  currentRank: number,
  targetRank: number
): MaterialRequirement[] {
  let totalExp = 0;
  let totalShellCreditsForLeveling = 0;

  // Sum up EXP for each ascension rank
  for (let rank = currentRank; rank < targetRank; rank++) {
    if (rank >= 0 && rank < weaponExpRequirements.length) {
      totalExp += weaponExpRequirements[rank].exp;
      totalShellCreditsForLeveling += weaponExpRequirements[rank].shellCredits;
    }
  }

  if (totalExp === 0 && totalShellCreditsForLeveling === 0) {
    return [];
  }

  const requirements: MaterialRequirement[] = [];

  // Add total EXP requirement (not individual cores)
  if (totalExp > 0) {
    requirements.push({
      materialId: "weapon-exp",
      materialName: "Weapon EXP",
      quantity: totalExp,
    });
  }

  // Add Shell Credits cost for leveling (separate from ascension costs)
  if (totalShellCreditsForLeveling > 0) {
    requirements.push({
      materialId: "shell-credit-leveling",
      materialName: "Shell Credit (Leveling)",
      quantity: totalShellCreditsForLeveling,
    });
  }

  return requirements;
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
  allMaterials.push(
    ...calculateCharacterAscensionMaterials(
      character,
      progress.ascension.current,
      progress.ascension.target
    )
  );

  // Forte node materials
  const forteNodes: Array<keyof CharacterProgress["forte"]> = [
    "basic",
    "skill",
    "liberation",
    "intro",
    "outro",
  ];

  for (const node of forteNodes) {
    const nodeProgress = progress.forte[node];
    if (nodeProgress.current < nodeProgress.target) {
      allMaterials.push(
        ...calculateCharacterForteMaterials(
          character,
          node as any,
          nodeProgress.current,
          nodeProgress.target
        )
      );
    }
  }

  // Stat Bonus materials (4 bonuses, each with 0-2 levels)
  const statBonuses: Array<
    keyof Pick<
      CharacterProgress["forte"],
      "statBonus1" | "statBonus2" | "statBonus3" | "statBonus4"
    >
  > = ["statBonus1", "statBonus2", "statBonus3", "statBonus4"];

  for (const bonus of statBonuses) {
    const bonusProgress = progress.forte[bonus];
    if (bonusProgress.current < bonusProgress.target) {
      allMaterials.push(
        ...calculateCharacterStatBonusMaterials(
          character,
          bonusProgress.current,
          bonusProgress.target
        )
      );
    }
  }

  // Inherent Skill materials (1 branch with 2 levels: 0->1, 1->2)
  // Note: We only use inherentSkill1 as inherentSkills is a single branch, not two separate ones
  const inherentSkills: Array<
    keyof Pick<CharacterProgress["forte"], "inherentSkill1">
  > = ["inherentSkill1"];

  for (const skill of inherentSkills) {
    const skillProgress = progress.forte[skill];
    if (skillProgress.current < skillProgress.target) {
      allMaterials.push(
        ...calculateCharacterInherentSkillMaterials(
          character,
          skillProgress.current,
          skillProgress.target
        )
      );
    }
  }

  // EXP materials (Resonance Potions)
  if (progress.ascension.current < progress.ascension.target) {
    allMaterials.push(
      ...calculateCharacterExpMaterials(
        progress.ascension.current,
        progress.ascension.target
      )
    );
  }

  // Merge duplicate materials
  return mergeMaterialRequirements(allMaterials);
}

/**
 * Process experience materials from inventory, handling subtraction and overflow conversion.
 * It returns materials to subtract and materials to add (from overflow conversion).
 */
export function processExpMaterials(
  expNeeded: number,
  currentInventory: Record<string, number>,
  materialType: "energy-core" | "resonance-potion"
): {
  materialsToSubtract: Record<string, number>;
  materialsToAdd: Record<string, number>;
} {
  const materialsToSubtract: Record<string, number> = {};
  const materialsToAdd: Record<string, number> = {};
  let remainingExp = expNeeded;

  // Get EXP values for the specific material type, sorted by EXP value (lowest to highest)
  const expMaterialKeys = Object.keys(EXP_VALUES).filter((key) =>
    key.includes(materialType)
  );

  const sortedExpMaterials = expMaterialKeys
    .map((materialId) => ({
      materialId,
      expValue: EXP_VALUES[materialId as keyof typeof EXP_VALUES],
    }))
    .sort((a, b) => a.expValue - b.expValue);

  const sortedExpMaterialsDescending = [...sortedExpMaterials].reverse();

  // First pass: Iterate from largest EXP material to smallest to consume from inventory
  for (const mat of sortedExpMaterialsDescending) {
    if (remainingExp <= 0) break;

    const available = currentInventory[mat.materialId] || 0;
    if (available > 0) {
      const neededToFill = Math.ceil(remainingExp / mat.expValue);
      const toUse = Math.min(available, neededToFill);

      if (toUse > 0) {
        materialsToSubtract[mat.materialId] = toUse;
        remainingExp -= toUse * mat.expValue;
      }
    }
  }

  // Handle potential remaining positive exp (shouldn't happen if enough materials)
  // Or negative exp (overflow) that needs to be converted back
  if (remainingExp < 0) {
    let overflowExp = Math.abs(remainingExp);

    // Convert overflow back to lower-tier materials
    for (const mat of sortedExpMaterialsDescending) {
      if (overflowExp <= 0) break;

      const numMaterials = Math.floor(overflowExp / mat.expValue);
      if (numMaterials > 0) {
        materialsToAdd[mat.materialId] =
          (materialsToAdd[mat.materialId] || 0) + numMaterials;
        overflowExp -= numMaterials * mat.expValue;
      }
    }
  }

  return { materialsToSubtract, materialsToAdd };
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
        materials[commonMaterial.id] = {
          name: commonMaterial.name,
          quantity: 0,
        };
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
        materials[forgeryMaterial.id] = {
          name: forgeryMaterial.name,
          quantity: 0,
        };
      }
      materials[forgeryMaterial.id].quantity += req.materials.forgery.quantity;
    }

    // Ascension material (weapon-specific, only for 4★ and 5★)
    if (req.materials.ascension && weapon.materials.ascension) {
      const ascensionId = weapon.materials.ascension
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/'/g, "");
      if (!materials[ascensionId]) {
        materials[ascensionId] = {
          name: weapon.materials.ascension,
          quantity: 0,
        };
      }
      materials[ascensionId].quantity += req.materials.ascension.quantity;
    }

    // Shell Credits
    if (req.materials.shellCredits) {
      if (!materials["shell-credit"]) {
        materials["shell-credit"] = { name: "Shell Credit", quantity: 0 };
      }
      materials["shell-credit"].quantity += req.materials.shellCredits;
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
  const allMaterials: MaterialRequirement[] = [];

  // Ascension materials
  allMaterials.push(
    ...calculateWeaponAscensionMaterials(
      weapon,
      progress.ascension.current,
      progress.ascension.target
    )
  );

  // EXP materials (Energy Cores)
  if (progress.ascension.current < progress.ascension.target) {
    allMaterials.push(
      ...calculateWeaponExpMaterials(
        progress.ascension.current,
        progress.ascension.target
      )
    );
  }

  // Merge duplicate materials
  return mergeMaterialRequirements(allMaterials);
}

/**
 * Merge duplicate material requirements
 */
function mergeMaterialRequirements(
  requirements: MaterialRequirement[]
): MaterialRequirement[] {
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
