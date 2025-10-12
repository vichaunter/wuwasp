import { it } from "vitest";
import { calculateExpMaterials } from "@/data/exp-requirements";
import { consumeMaterialsFromInventory } from "../materialSynthesis";
import {
  getAvailableExpFromInventory,
  getAvailableShellCredits,
} from "@/utils/plannerHelpers";

it("debug planner sequential allocation - prints trace", () => {
  const inventory: Record<string, number> = {
    "premium-resonance-potion": 10, // 200k
    "advanced-resonance-potion": 10, // 100k
    "medium-resonance-potion": 100, // 400k
    "basic-resonance-potion": 1000, // 1M
    "shell-credit": 5000000,
  };

  // Two items requiring small EXP to check cascading
  const items = [
    { id: "a", type: "character" as const, expNeed: 1000, shellNeed: 100000 },
    { id: "b", type: "character" as const, expNeed: 1000, shellNeed: 200000 },
  ];

  let current = { ...inventory };

  console.log("INITIAL INVENTORY", JSON.stringify(current, null, 2));

  for (const it of items) {
    console.log(
      "\n--- Item",
      it.id,
      "needs EXP",
      it.expNeed,
      "shell",
      it.shellNeed
    );

    // Expand EXP into potions
    const expMap = calculateExpMaterials(it.expNeed, "resonance-potion");
    console.log("Expanded EXP->potions:", expMap);

    const requirements = [
      ...Object.entries(expMap).map(([materialId, quantity]) => ({
        materialId,
        quantity,
      })),
      { materialId: "shell-credit-leveling", quantity: it.shellNeed },
    ];

    console.log(
      "Before consume: total EXP available =",
      getAvailableExpFromInventory(current, it.type)
    );
    console.log(
      "Before consume: shell credits =",
      getAvailableShellCredits(current)
    );

    const after = consumeMaterialsFromInventory(current, requirements, it.type);

    console.log(
      "After consume: total EXP available =",
      getAvailableExpFromInventory(after, it.type)
    );
    console.log(
      "After consume: shell credits =",
      getAvailableShellCredits(after)
    );
    console.log("Inventory delta:");
    for (const key of Object.keys(current)) {
      const before = current[key] || 0;
      const afterVal = after[key] || 0;
      if (before !== afterVal)
        console.log(`  ${key}: ${before} -> ${afterVal}`);
    }

    current = after;
  }
});
