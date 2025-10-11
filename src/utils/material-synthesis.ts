import type { MaterialQualityTier } from '@/types';

/**
 * Material synthesis system
 * Rule: 3 materials of lower quality → 1 material of higher quality
 * T1 (3x) → T2 (1x)
 * T2 (3x) → T3 (1x)
 * T3 (3x) → T4 (1x)
 */

const SYNTHESIS_RATIO = 3;
const QUALITY_ORDER: MaterialQualityTier[] = ['T1', 'T2', 'T3', 'T4'];

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
  synthesisNeeded: { from: MaterialQualityTier; to: MaterialQualityTier; quantity: number }[];
}

/**
 * Calculate how many materials of higher quality can be synthesized from lower quality
 */
function canSynthesize(lowerQtyAvailable: number): number {
  return Math.floor(lowerQtyAvailable / SYNTHESIS_RATIO);
}

/**
 * Get the previous quality tier (for downgrading)
 */
function getPreviousQuality(quality: MaterialQualityTier): MaterialQualityTier | null {
  const index = QUALITY_ORDER.indexOf(quality);
  if (index === -1 || index === 0) return null;
  return QUALITY_ORDER[index - 1];
}

/**
 * Smart material synthesis calculation
 * 
 * This function calculates if you can fulfill material requirements considering synthesis.
 * It uses existing materials first, then synthesizes from lower tiers only when needed.
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
  const synthesisNeeded: { from: MaterialQualityTier; to: MaterialQualityTier; quantity: number }[] = [];
  
  let canFulfill = true;
  
  // Process from highest to lowest quality (T4 → T1)
  // This ensures we only synthesize when necessary
  for (let i = QUALITY_ORDER.length - 1; i >= 0; i--) {
    const quality = QUALITY_ORDER[i];
    const requiredQty = required[quality] || 0;
    const ownedQty = remaining[quality] || 0;
    
    if (requiredQty === 0) continue;
    
    // First, use what we already have at this quality
    const usedFromOwned = Math.min(ownedQty, requiredQty);
    remaining[quality] = ownedQty - usedFromOwned;
    let stillNeeded = requiredQty - usedFromOwned;
    
    // If we still need more, try to synthesize from lower quality
    if (stillNeeded > 0) {
      const lowerQuality = getPreviousQuality(quality);
      
      if (lowerQuality) {
        const lowerQtyAvailable = remaining[lowerQuality] || 0;
        const canSynthesizeQty = canSynthesize(lowerQtyAvailable);
        const toSynthesize = Math.min(canSynthesizeQty, stillNeeded);
        
        if (toSynthesize > 0) {
          const materialsUsed = toSynthesize * SYNTHESIS_RATIO;
          remaining[lowerQuality] = lowerQtyAvailable - materialsUsed;
          remaining[quality] = (remaining[quality] || 0); // Don't add synthesized, we're using them
          available[quality] = (available[quality] || 0) + toSynthesize;
          
          synthesisNeeded.push({
            from: lowerQuality,
            to: quality,
            quantity: toSynthesize,
          });
          
          stillNeeded -= toSynthesize;
        }
      }
      
      // If still not enough, mark as cannot fulfill
      if (stillNeeded > 0) {
        canFulfill = false;
      }
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
      .filter(s => s.to === quality)
      .reduce((sum, s) => sum + s.quantity, 0);
    
    effective[quality] = usedFromOwned + synthesized;
  }
  
  return effective;
}

/**
 * Format material availability for display
 * 
 * Returns a string like "4/4" or "3/9" showing available vs required
 */
export function formatMaterialAvailability(
  quality: MaterialQualityTier,
  required: number,
  owned: MaterialInventory,
  allRequired: MaterialRequirement
): { available: number; required: number; hasEnough: boolean } {
  const effective = calculateEffectiveAvailability(allRequired, owned);
  const available = Math.min(effective[quality] || 0, required);
  
  return {
    available,
    required,
    hasEnough: available >= required,
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
  plan: { quality: MaterialQualityTier; use: number; synthesizeFrom?: { quality: MaterialQualityTier; amount: number } }[];
} {
  const result = calculateMaterialSynthesis(required, owned);
  const plan: { quality: MaterialQualityTier; use: number; synthesizeFrom?: { quality: MaterialQualityTier; amount: number } }[] = [];
  
  for (const quality of QUALITY_ORDER) {
    const requiredQty = required[quality] || 0;
    if (requiredQty === 0) continue;
    
    const ownedQty = owned[quality] || 0;
    const usedFromOwned = Math.min(ownedQty, requiredQty);
    
    const synthesisInfo = result.synthesisNeeded.find(s => s.to === quality);
    
    plan.push({
      quality,
      use: usedFromOwned,
      synthesizeFrom: synthesisInfo ? {
        quality: synthesisInfo.from,
        amount: synthesisInfo.quantity * SYNTHESIS_RATIO,
      } : undefined,
    });
  }
  
  return {
    canFulfill: result.canFulfill,
    plan,
  };
}

