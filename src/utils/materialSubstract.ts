/**
 * Subtract materials from inventory
 *
 * This function subtracts materials from inventory based on requirements.
 * One material type at a time, from T1 to T4, and can be 0 or more.
 * docs/matherial-syntesys-chatgpt.md
 * docs/matherial-sintesys-gemini.md
 *
 * @param inventory - Inventory to subtract from [T1, T2, T3, T4]
 * @param requirements - Requirements to subtract [T1, T2, T3, T4]
 */
function getAvailableAndConsumeRecursive(
  currentTierIndex: number,
  initialAmountNeededForCurrentTier: number, // The total amount of this tier needed
  inventory: number[]
): {
  inventory: number[];
  error: {
    type: string;
    amount: number;
    tier: number;
    currentTier?: number;
    lowerTier?: number;
    rootCauseAmount?: number;
  } | null;
} {
  let deficit = initialAmountNeededForCurrentTier;
  let newInventory = [...inventory]; // Work on a copy initially

  // Consume from direct stock first
  const canTakeDirectly = Math.min(deficit, newInventory[currentTierIndex]);
  newInventory[currentTierIndex] -= canTakeDirectly;
  deficit -= canTakeDirectly;

  if (deficit <= 0) {
    return { inventory: newInventory, error: null }; // All fulfilled at this tier
  }

  // If we still have a deficit and are at T1, we cannot synthesize further
  if (currentTierIndex === 0) {
    return {
      inventory: inventory, // Revert to original inventory on error
      error: {
        type: "T1_SUBTRACT",
        amount: deficit,
        tier: currentTierIndex + 1,
        rootCauseAmount: deficit,
      }, // Add rootCauseAmount
    };
  }

  // Calculate the amount of the lower tier needed to cover the current deficit
  const lowerTierAmountToSynthesize = deficit * 3;

  const recursiveResult = getAvailableAndConsumeRecursive(
    currentTierIndex - 1,
    lowerTierAmountToSynthesize,
    newInventory
  );

  if (recursiveResult.error) {
    return {
      inventory: inventory, // Revert to original inventory on error
      error: {
        type: "SYNTHESIZE",
        amount: initialAmountNeededForCurrentTier, // Amount for this tier's error, based on its initial request
        tier: currentTierIndex + 1, // Added to satisfy type requirement
        currentTier: currentTierIndex + 1,
        lowerTier: currentTierIndex,
        rootCauseAmount:
          recursiveResult.error.rootCauseAmount ||
          initialAmountNeededForCurrentTier, // Propagate rootCauseAmount from lower tier, or use current tier's initial amount if no lower root cause
      },
    };
  } else {
    newInventory = recursiveResult.inventory;
    deficit = 0; // It's now fully covered by synthesis from lower tiers
    return { inventory: newInventory, error: null };
  }
}

export default function materialSubstract(
  inventory: number[],
  requirements: number[]
): number[] {
  let newInventory = [...inventory];
  let currentRequirements = [...requirements];

  // --- Preliminary check for direct T1 subtraction requirements ---
  if (currentRequirements[0] > 0) {
    const neededT1 = currentRequirements[0];
    if (newInventory[0] < neededT1) {
      throw new Error(`Not enough materials to subtract ${neededT1}x T1`);
    }
    newInventory[0] -= neededT1;
    currentRequirements[0] = 0;
  }
  // --- End preliminary check ---

  for (let i = 3; i >= 0; i--) {
    let needed = currentRequirements[i];

    if (needed > 0) {
      const result = getAvailableAndConsumeRecursive(i, needed, newInventory);
      if (result.error) {
        const error = result.error;

        if (error.type === "T1_SUBTRACT") {
          throw new Error(
            `Not enough materials to subtract ${error.amount}x T${error.tier}`
          );
        } else if (error.type === "SYNTHESIZE") {
          // For synthesis errors, use rootCauseAmount if available and it's a T2 from T1 synthesis
          // Otherwise, use the error.amount (initialAmountNeededForCurrentTier).
          const amountToReport =
            error.currentTier === 2 &&
            error.lowerTier === 1 &&
            error.rootCauseAmount !== undefined
              ? error.rootCauseAmount / 3 // Convert T1 rootCauseAmount back to T2 equivalent
              : error.amount;

          throw new Error(
            `Not enough materials to synthesize ${amountToReport}x T${error.currentTier} from T${error.lowerTier}`
          );
        }

        throw new Error("An unexpected error occurred.");
      } else {
        newInventory = result.inventory;
      }
    }
  }

  return newInventory;
}
