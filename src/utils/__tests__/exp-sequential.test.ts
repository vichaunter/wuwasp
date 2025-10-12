import { describe, it, expect } from "vitest";
import { consumeMaterialsFromInventory } from "../materialSynthesis";
import { calculateExpMaterials } from "@/data/exp-requirements";

describe("EXP sequential consumption", () => {
  it("first item consumes only what it needs and remaining cascades", () => {
    const globalInventory: Record<string, number> = {
      "premium-resonance-potion": 5, // 20k each => 100k total
      "advanced-resonance-potion": 2, // 10k each => 20k
      "medium-resonance-potion": 10, // 4k each => 40k
      "basic-resonance-potion": 100, // 1k each => 100k
    };

    // First item needs 58,000 EXP -> should be satisfied by 2 premium (40k) + 1 advanced (10k) + 2 medium (8k)
    const firstExp = 58000;
    const firstReq = [{ materialId: "character-exp", quantity: firstExp }];

    // Expand and consume for first item
    const afterFirst = consumeMaterialsFromInventory(
      globalInventory,
      firstReq,
      "character"
    );

    // Calculate expected potion usage via calculateExpMaterials
    const expectedUsage = calculateExpMaterials(firstExp, "resonance-potion");

    // Verify inventory decreased by expected usage (or to zero if not enough)
    for (const id of Object.keys(expectedUsage)) {
      const used = expectedUsage[id];
      const before = globalInventory[id] || 0;
      const after = afterFirst[id] || 0;
      const expectedAfter = Math.max(0, before - used);
      expect(after).toBe(expectedAfter);
    }

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
