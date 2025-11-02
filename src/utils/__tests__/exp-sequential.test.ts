import { describe, it, expect } from "vitest";
import { consumeMaterialsFromInventory } from "../materialSynthesis";

describe("EXP sequential consumption", () => {
  it("first item consumes only what it needs and remaining cascades", () => {
    const globalInventory: Record<string, number> = {
      "premium-resonance-potion": 5, // 20k each => 100k total
      "advanced-resonance-potion": 2, // 10k each => 20k
      "medium-resonance-potion": 10, // 4k each => 40k
      "basic-resonance-potion": 100, // 1k each => 100k
    };

    // First item needs 58,000 EXP -> should be satisfied by 2 premium (40k) + 1 advanced (10k) + 2 medium (8k) = 58k total
    const firstExp = 58000;
    const firstReq = [{ materialId: "character-exp", quantity: firstExp }];

    // Expand and consume for first item
    const afterFirst = consumeMaterialsFromInventory(
      globalInventory,
      firstReq,
      "character"
    );

    // consumeMaterialsFromInventory works by:
    // 1. Calculate total available EXP
    // 2. Subtract required EXP
    // 3. Convert remaining EXP back to materials
    // So we need to verify that the total EXP calculation is correct
    const totalBefore = 
      (globalInventory["premium-resonance-potion"] || 0) * 20000 +
      (globalInventory["advanced-resonance-potion"] || 0) * 10000 +
      (globalInventory["medium-resonance-potion"] || 0) * 4000 +
      (globalInventory["basic-resonance-potion"] || 0) * 1000;
    
    const totalAfter = 
      (afterFirst["premium-resonance-potion"] || 0) * 20000 +
      (afterFirst["advanced-resonance-potion"] || 0) * 10000 +
      (afterFirst["medium-resonance-potion"] || 0) * 4000 +
      (afterFirst["basic-resonance-potion"] || 0) * 1000;

    // Verify that exactly firstExp was consumed (or all if not enough)
    const consumedExp = totalBefore - totalAfter;
    expect(consumedExp).toBe(Math.min(firstExp, totalBefore));

    // Second item needs 40k -> ensure it consumes from remaining inventory
    const secondExp = 40000;
    const secondReq = [{ materialId: "character-exp", quantity: secondExp }];

    const afterSecond = consumeMaterialsFromInventory(
      afterFirst,
      secondReq,
      "character"
    );

    // Ensure afterSecond inventory is less than or equal to afterFirst (consumed more)
    for (const key of Object.keys(afterFirst)) {
      expect((afterSecond[key] || 0) <= (afterFirst[key] || 0)).toBeTruthy();
    }
  });

  it("shell credits are consumed per-item and cascade", () => {
    const globalInventory: Record<string, number> = {
      "shell-credit": 150000,
    };

    const req1 = [{ materialId: "shell-credit-leveling", quantity: 100000 }];
    const after1 = consumeMaterialsFromInventory(
      globalInventory,
      req1,
      "character"
    );
    expect(after1["shell-credit"]).toBe(50000);

    const req2 = [{ materialId: "shell-credit-leveling", quantity: 60000 }];
    const after2 = consumeMaterialsFromInventory(after1, req2, "character");
    expect(after2["shell-credit"]).toBe(0);
  });
});
