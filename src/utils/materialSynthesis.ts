import type { MaterialQualityTier } from "@/types";
import { getMaterialById, materials } from "@/data/materials";
import { calculateExpMaterials } from "@/data/exp-requirements";

/**
 * Material synthesis system
 * Rule: 3 materials of lower quality → 1 material of higher quality
 * T1 (3x) → T2 (1x)
 * T2 (3x) → T3 (1x)
 * T3 (3x) → T4 (1x)
 */

const SYNTHESIS_RATIO = 3;
const QUALITY_ORDER: MaterialQualityTier[] = ["T1", "T2", "T3", "T4"];

export interface MaterialRequirement {
  [quality: string]: number; // Quality tier -> quantity needed
}

export interface MaterialInventory {
  [quality: string]: number; // Quality tier -> quantity owned
}

export interface SynthesisResult {
  canFulfill: boolean;
  available: MaterialInventory; // What you effectively have per quality
  remainingAfterUse: MaterialInventory; // What remains after fulfilling requirements
  synthesisNeeded: {
    from: MaterialQualityTier;
    to: MaterialQualityTier;
    quantity: number;
  }[];
}

/**
 * Get the previous quality tier (for downgrading)
 */
function getPreviousQuality(
  quality: MaterialQualityTier
): MaterialQualityTier | null {
  const index = QUALITY_ORDER.indexOf(quality);
  if (index === -1 || index === 0) return null;
  return QUALITY_ORDER[index - 1];
}

/**
 * Smart material synthesis calculation (RECURSIVE MULTI-LEVEL)
 *
 * This function calculates if you can fulfill material requirements considering synthesis.
 * It uses existing materials first, then synthesizes from lower tiers RECURSIVELY.
 * For example, if you need T4 but only have T1, it will synthesize T1->T2->T3->T4.
 *
 * @param required - Materials needed by quality tier
 * @param owned - Materials owned by quality tier
 * @returns SynthesisResult with availability and synthesis plan
 */
export function calculateMaterialSynthesis(
  required: MaterialRequirement,
  owned: MaterialInventory
): SynthesisResult {
  // Create working copies
  const available: MaterialInventory = { ...owned };
  const remaining: MaterialInventory = { ...owned };
  const synthesisNeeded: {
    from: MaterialQualityTier;
    to: MaterialQualityTier;
    quantity: number;
  }[] = [];

  let canFulfill = true;

  // Helper function to recursively synthesize a material
  const synthesizeMaterial = (
    targetQuality: MaterialQualityTier,
    quantity: number
  ): number => {
    if (quantity <= 0) return 0;

    // Check if we have enough at this quality
    const directAvailable = remaining[targetQuality] || 0;
    if (directAvailable >= quantity) {
      remaining[targetQuality] = directAvailable - quantity;
      return quantity;
    }

    // Use what we have
    let fulfilled = directAvailable;
    remaining[targetQuality] = 0;
    let stillNeeded = quantity - fulfilled;

    if (stillNeeded > 0) {
      // Try to synthesize from lower quality
      const lowerQuality = getPreviousQuality(targetQuality);
      if (lowerQuality) {
        // We need stillNeeded * SYNTHESIS_RATIO of the lower quality
        const lowerNeeded = stillNeeded * SYNTHESIS_RATIO;

        // Recursively get the lower quality (which might also need synthesis)
        const lowerObtained = synthesizeMaterial(lowerQuality, lowerNeeded);

        // How many of target quality can we make?
        const canMake = Math.floor(lowerObtained / SYNTHESIS_RATIO);
        fulfilled += canMake;

        // Track synthesis
        if (canMake > 0) {
          synthesisNeeded.push({
            from: lowerQuality,
            to: targetQuality,
            quantity: canMake,
          });
        }

        // Return excess lower materials back to inventory
        const excess = lowerObtained % SYNTHESIS_RATIO;
        if (excess > 0) {
          remaining[lowerQuality] = (remaining[lowerQuality] || 0) + excess;
        }
      }
    }

    return fulfilled;
  };

  // Process from lowest to highest quality (T1 → T4)
  // This ensures we fulfill direct requirements first before synthesizing
  for (let i = 0; i < QUALITY_ORDER.length; i++) {
    const quality = QUALITY_ORDER[i];
    const requiredQty = required[quality] || 0;

    if (requiredQty === 0) continue;

    const fulfilled = synthesizeMaterial(quality, requiredQty);
    available[quality] = fulfilled;

    if (fulfilled < requiredQty) {
      canFulfill = false;
    }
  }

  return {
    canFulfill,
    available,
    remainingAfterUse: remaining,
    synthesisNeeded,
  };
}

/**
 * Calculate effective availability for display
 *
 * This shows how many materials you "have" at each quality level,
 * considering you could synthesize from lower tiers.
 *
 * @param required - Materials needed by quality tier
 * @param owned - Materials owned by quality tier
 * @returns Available quantity per quality tier (what you can fulfill)
 */
export function calculateEffectiveAvailability(
  required: MaterialRequirement,
  owned: MaterialInventory
): MaterialInventory {
  const result = calculateMaterialSynthesis(required, owned);
  const effective: MaterialInventory = {};

  for (const quality of QUALITY_ORDER) {
    const requiredQty = required[quality] || 0;
    const ownedQty = owned[quality] || 0;

    if (requiredQty === 0) {
      effective[quality] = ownedQty;
      continue;
    }

    // Calculate how much we can actually use for this requirement
    const usedFromOwned = Math.min(ownedQty, requiredQty);
    const synthesized = result.synthesisNeeded
      .filter((s) => s.to === quality)
      .reduce((sum, s) => sum + s.quantity, 0);

    effective[quality] = usedFromOwned + synthesized;
  }

  return effective;
}

/**
 * Format material availability for display
 *
 * Uses the synthesis system to calculate how much of each tier can be fulfilled
 * considering all requirements together.
 *
 * @param quality - The quality tier we want to check availability for
 * @param required - How many of this quality we need
 * @param owned - How many of each quality we currently own
 * @param allRequired - All requirements for this base material (all qualities)
 * @returns Object with available quantity and whether we have enough
 */
export function formatMaterialAvailability(
  quality: MaterialQualityTier,
  required: number,
  owned: MaterialInventory,
  allRequired: MaterialRequirement
): { available: number; required: number; hasEnough: boolean } {
  // Use the full synthesis calculation to see what can be fulfilled
  const result = calculateMaterialSynthesis(allRequired, owned);

  // The 'available' field in the result shows what we effectively have after synthesis
  const effectiveAvailable = result.available[quality] || 0;

  // Compare with what we need
  const canFulfill = Math.min(effectiveAvailable, required);

  return {
    available: canFulfill,
    required,
    hasEnough: result.canFulfill && effectiveAvailable >= required,
  };
}

/**
 * Calculate materials needed for synthesis to meet requirements
 *
 * This is the "smart" function that tells you exactly what to synthesize
 */
export function calculateSynthesisPlan(
  required: MaterialRequirement,
  owned: MaterialInventory
): {
  canFulfill: boolean;
  plan: {
    quality: MaterialQualityTier;
    use: number;
    synthesizeFrom?: { quality: MaterialQualityTier; amount: number };
  }[];
} {
  const result = calculateMaterialSynthesis(required, owned);
  const plan: {
    quality: MaterialQualityTier;
    use: number;
    synthesizeFrom?: { quality: MaterialQualityTier; amount: number };
  }[] = [];

  for (const quality of QUALITY_ORDER) {
    const requiredQty = required[quality] || 0;
    if (requiredQty === 0) continue;

    const ownedQty = owned[quality] || 0;
    const usedFromOwned = Math.min(ownedQty, requiredQty);

    const synthesisInfo = result.synthesisNeeded.find((s) => s.to === quality);

    plan.push({
      quality,
      use: usedFromOwned,
      synthesizeFrom: synthesisInfo
        ? {
            quality: synthesisInfo.from,
            amount: synthesisInfo.quantity * SYNTHESIS_RATIO,
          }
        : undefined,
    });
  }

  return {
    canFulfill: result.canFulfill,
    plan,
  };
}

/**
 * Consume materials from inventory for a given set of requirements
 *
 * This function takes a full inventory (all materials, not just one base)
 * and returns the inventory after consuming materials for the requirements.
 * It handles synthesis automatically.
 *
 * @param currentInventory - Full inventory { materialId: quantity }
 * @param requirements - Requirements from MaterialCalculator { materialId, materialName, quantity }
 * @returns New inventory after consuming materials
 */
export function consumeMaterialsFromInventory(
  currentInventory: Record<string, number>,
  requirements: { materialId: string; quantity: number }[],
  // Optional context to expand EXP requirements correctly
  contextType?: "character" | "weapon"
): Record<string, number> {
  const newInventory = { ...currentInventory };

  // Preprocess requirements: expand special aggregated requirements
  // (character-exp / weapon-exp -> concrete potion/core IDs) and
  // shell-credit-leveling -> shell-credit so they can be consumed from inventory
  const expandedRequirements: { materialId: string; quantity: number }[] = [];

  for (const req of requirements) {
    if (req.materialId === "character-exp" && contextType === "character") {
      const map = calculateExpMaterials(req.quantity, "resonance-potion");
      for (const id of Object.keys(map)) {
        expandedRequirements.push({ materialId: id, quantity: map[id] });
      }
      // Also ensure any shell-credit-leveling handled separately by its own req
      continue;
    }

    if (req.materialId === "weapon-exp" && contextType === "weapon") {
      const map = calculateExpMaterials(req.quantity, "energy-core");
      for (const id of Object.keys(map)) {
        expandedRequirements.push({ materialId: id, quantity: map[id] });
      }
      continue;
    }

    if (req.materialId === "shell-credit-leveling") {
      // Inventory stores credits under 'shell-credit'
      expandedRequirements.push({
        materialId: "shell-credit",
        quantity: req.quantity,
      });
      continue;
    }

    expandedRequirements.push(req);
  }

  // Replace requirements for further processing
  requirements = expandedRequirements;

  // Group requirements by base material (materials with same baseName but different qualities)
  const groupedRequirements = new Map<
    string,
    Map<MaterialQualityTier, { materialId: string; quantity: number }>
  >();
  const simpleRequirements: { materialId: string; quantity: number }[] = [];

  for (const req of requirements) {
    const material = getMaterialById(req.materialId);

    if (!material) {
      console.warn(`Material not found: ${req.materialId}`);
      continue;
    }

    // Check if this material has qualities
    if (material.quality && material.baseName) {
      // Material with quality - group by base name
      if (!groupedRequirements.has(material.baseName)) {
        groupedRequirements.set(material.baseName, new Map());
      }
      groupedRequirements.get(material.baseName)!.set(material.quality, {
        materialId: req.materialId,
        quantity: req.quantity,
      });
    } else {
      // Simple material without qualities (boss, overworld, currency)
      simpleRequirements.push(req);
    }
  }

  // Process materials with qualities (using synthesis)
  for (const [baseName, qualityRequirements] of groupedRequirements) {
    const required: MaterialRequirement = {};
    const owned: MaterialInventory = {};
    const materialIdsByQuality = new Map<MaterialQualityTier, string>();

    // Build required and owned objects for synthesis calculation
    for (const quality of QUALITY_ORDER) {
      const reqData = qualityRequirements.get(quality);
      if (reqData) {
        required[quality] = reqData.quantity;
        materialIdsByQuality.set(quality, reqData.materialId);
        owned[quality] = newInventory[reqData.materialId] || 0;
      } else {
        // Still need to check if we have materials of this quality for synthesis
        // Find the material ID for this quality
        const mat = materials.find(
          (m) => m.baseName === baseName && m.quality === quality
        );
        if (mat) {
          materialIdsByQuality.set(quality, mat.id);
          owned[quality] = newInventory[mat.id] || 0;
        }
      }
    }

    // Calculate synthesis and get remaining inventory
    const result = calculateMaterialSynthesis(required, owned);

    // Update inventory with remaining materials
    for (const quality of QUALITY_ORDER) {
      const materialId = materialIdsByQuality.get(quality);
      if (materialId) {
        newInventory[materialId] = result.remainingAfterUse[quality] || 0;
      }
    }
  }

  // Process simple materials (direct subtraction)
  for (const req of simpleRequirements) {
    const owned = newInventory[req.materialId] || 0;
    newInventory[req.materialId] = Math.max(0, owned - req.quantity);
  }

  return newInventory;
}
