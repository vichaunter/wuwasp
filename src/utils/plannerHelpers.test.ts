import { describe, it, expect } from "vitest";
import {
  sortMaterialsByRequirement,
  getExpRequirement,
  getShellCreditRequirements,
  filterSpecialMaterials,
  type MaterialRequirementWithEmpty,
} from "@/utils/plannerHelpers";
import type { MaterialRequirement } from "@/utils/materialCalculator";

describe("plannerHelpers", () => {
  describe("sortMaterialsByRequirement", () => {
    it("should put materials with quantity > 0 first", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 0 },
        { materialId: "mat-2", materialName: "Material 2", quantity: 5 },
        { materialId: "mat-3", materialName: "Material 3", quantity: 0 },
        { materialId: "mat-4", materialName: "Material 4", quantity: 10 },
      ];

      const result = sortMaterialsByRequirement(materials);

      expect(result[0].materialId).toBe("mat-2"); // quantity: 5
      expect(result[1].materialId).toBe("mat-4"); // quantity: 10
      expect(result[2].materialId).toBe("mat-1"); // quantity: 0
      expect(result[3].materialId).toBe("mat-3"); // quantity: 0
    });

    it("should preserve original order within same group (needed materials)", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 5 },
        { materialId: "mat-2", materialName: "Material 2", quantity: 10 },
        { materialId: "mat-3", materialName: "Material 3", quantity: 3 },
        { materialId: "mat-4", materialName: "Material 4", quantity: 7 },
      ];

      const result = sortMaterialsByRequirement(materials);

      // All have quantity > 0, so original order should be preserved
      expect(result[0].materialId).toBe("mat-1");
      expect(result[1].materialId).toBe("mat-2");
      expect(result[2].materialId).toBe("mat-3");
      expect(result[3].materialId).toBe("mat-4");
    });

    it("should preserve original order within same group (not needed materials)", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 0 },
        { materialId: "mat-2", materialName: "Material 2", quantity: 0 },
        { materialId: "mat-3", materialName: "Material 3", quantity: 0 },
      ];

      const result = sortMaterialsByRequirement(materials);

      // All have quantity = 0, so original order should be preserved
      expect(result[0].materialId).toBe("mat-1");
      expect(result[1].materialId).toBe("mat-2");
      expect(result[2].materialId).toBe("mat-3");
    });

    it("should preserve T1→T4 order when mixed needed and not needed", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 5,
        }, // T1 - needed
        {
          materialId: "mf-tidal-residuum",
          materialName: "MF Tidal Residuum",
          quantity: 0,
        }, // T2 - not needed
        {
          materialId: "hf-tidal-residuum",
          materialName: "HF Tidal Residuum",
          quantity: 0,
        }, // T3 - not needed
        {
          materialId: "ff-tidal-residuum",
          materialName: "FF Tidal Residuum",
          quantity: 12,
        }, // T4 - needed
      ];

      const result = sortMaterialsByRequirement(materials);

      // Needed first (preserving T1, T4 order), then not needed (preserving T2, T3 order)
      expect(result[0].materialId).toBe("lf-tidal-residuum"); // T1 - needed
      expect(result[1].materialId).toBe("ff-tidal-residuum"); // T4 - needed
      expect(result[2].materialId).toBe("mf-tidal-residuum"); // T2 - not needed
      expect(result[3].materialId).toBe("hf-tidal-residuum"); // T3 - not needed
    });

    it("should handle empty array", () => {
      const materials: MaterialRequirementWithEmpty[] = [];
      const result = sortMaterialsByRequirement(materials);
      expect(result).toEqual([]);
    });

    it("should handle single material with quantity > 0", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 10 },
      ];

      const result = sortMaterialsByRequirement(materials);

      expect(result).toHaveLength(1);
      expect(result[0].materialId).toBe("mat-1");
    });

    it("should handle single material with quantity = 0", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 0 },
      ];

      const result = sortMaterialsByRequirement(materials);

      expect(result).toHaveLength(1);
      expect(result[0].materialId).toBe("mat-1");
    });

    it("should preserve isEmpty flag in sorted materials", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        {
          materialId: "mat-1",
          materialName: "Material 1",
          quantity: 0,
          isEmpty: true,
        },
        {
          materialId: "mat-2",
          materialName: "Material 2",
          quantity: 5,
          isEmpty: false,
        },
      ];

      const result = sortMaterialsByRequirement(materials);

      expect(result[0].isEmpty).toBe(false); // mat-2
      expect(result[1].isEmpty).toBe(true); // mat-1
    });

    it("should not mutate original array", () => {
      const materials: MaterialRequirementWithEmpty[] = [
        { materialId: "mat-1", materialName: "Material 1", quantity: 0 },
        { materialId: "mat-2", materialName: "Material 2", quantity: 5 },
      ];

      const originalOrder = materials.map((m) => m.materialId);
      sortMaterialsByRequirement(materials);

      // Original array should not be modified
      expect(materials.map((m) => m.materialId)).toEqual(originalOrder);
    });
  });

  describe("getExpRequirement", () => {
    it("should find character-exp for character type", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 500,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
      ];

      const result = getExpRequirement(materials, "character");

      expect(result).toBeDefined();
      expect(result?.materialId).toBe("character-exp");
      expect(result?.quantity).toBe(1000);
    });

    it("should find weapon-exp for weapon type", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 300,
        },
        {
          materialId: "waveworn-residue-210",
          materialName: "Waveworn Residue",
          quantity: 5,
        },
      ];

      const result = getExpRequirement(materials, "weapon");

      expect(result).toBeDefined();
      expect(result?.materialId).toBe("weapon-exp");
      expect(result?.quantity).toBe(2000);
    });

    it("should return undefined when character-exp not found", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 500,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
      ];

      const result = getExpRequirement(materials, "character");

      expect(result).toBeUndefined();
    });

    it("should return undefined when weapon-exp not found", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 300,
        },
        {
          materialId: "waveworn-residue-210",
          materialName: "Waveworn Residue",
          quantity: 5,
        },
      ];

      const result = getExpRequirement(materials, "weapon");

      expect(result).toBeUndefined();
    });

    it("should return undefined for empty array", () => {
      const materials: MaterialRequirement[] = [];

      const resultCharacter = getExpRequirement(materials, "character");
      const resultWeapon = getExpRequirement(materials, "weapon");

      expect(resultCharacter).toBeUndefined();
      expect(resultWeapon).toBeUndefined();
    });

    it("should not confuse character-exp with weapon-exp", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
      ];

      const resultCharacter = getExpRequirement(materials, "character");
      const resultWeapon = getExpRequirement(materials, "weapon");

      expect(resultCharacter?.materialId).toBe("character-exp");
      expect(resultCharacter?.quantity).toBe(1000);
      expect(resultWeapon?.materialId).toBe("weapon-exp");
      expect(resultWeapon?.quantity).toBe(2000);
    });
  });

  describe("getShellCreditRequirements", () => {
    it("should find both leveling and other shell credits", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 1000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 5000,
        },
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 2000,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeDefined();
      expect(result.leveling?.quantity).toBe(1000);
      expect(result.other).toBeDefined();
      expect(result.other?.quantity).toBe(5000);
      expect(result.total).toBe(6000); // 1000 + 5000
    });

    it("should handle only leveling shell credits", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 1500,
        },
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 2000,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeDefined();
      expect(result.leveling?.quantity).toBe(1500);
      expect(result.other).toBeUndefined();
      expect(result.total).toBe(1500);
    });

    it("should handle only other shell credits", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 3000,
        },
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 1000,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeUndefined();
      expect(result.other).toBeDefined();
      expect(result.other?.quantity).toBe(3000);
      expect(result.total).toBe(3000);
    });

    it("should return zero total when no shell credits found", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 2000,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeUndefined();
      expect(result.other).toBeUndefined();
      expect(result.total).toBe(0);
    });

    it("should handle empty array", () => {
      const materials: MaterialRequirement[] = [];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeUndefined();
      expect(result.other).toBeUndefined();
      expect(result.total).toBe(0);
    });

    it("should handle zero quantities", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 0,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 0,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.leveling).toBeDefined();
      expect(result.other).toBeDefined();
      expect(result.total).toBe(0);
    });

    it("should calculate correct total with large numbers", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 999999,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 888888,
        },
      ];

      const result = getShellCreditRequirements(materials);

      expect(result.total).toBe(1888887); // 999999 + 888888
    });
  });

  describe("filterSpecialMaterials", () => {
    it("should filter out character-exp and shell credits for character type", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 500,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 2000,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
        {
          materialId: "blighted-crown-of-puppet-king",
          materialName: "Blighted Crown",
          quantity: 5,
        },
      ];

      const result = filterSpecialMaterials(materials, "character");

      expect(result).toHaveLength(2);
      expect(result[0].materialId).toBe("lf-tidal-residuum");
      expect(result[1].materialId).toBe("blighted-crown-of-puppet-king");
    });

    it("should filter out weapon-exp and shell credits for weapon type", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 300,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 1500,
        },
        {
          materialId: "waveworn-residue-210",
          materialName: "Waveworn Residue",
          quantity: 8,
        },
        {
          materialId: "whisperin-core",
          materialName: "Whisperin Core",
          quantity: 12,
        },
      ];

      const result = filterSpecialMaterials(materials, "weapon");

      expect(result).toHaveLength(2);
      expect(result[0].materialId).toBe("waveworn-residue-210");
      expect(result[1].materialId).toBe("whisperin-core");
    });

    it("should return all materials when no special materials present", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
        {
          materialId: "mf-tidal-residuum",
          materialName: "MF Tidal Residuum",
          quantity: 5,
        },
        {
          materialId: "blighted-crown-of-puppet-king",
          materialName: "Blighted Crown",
          quantity: 3,
        },
      ];

      const resultCharacter = filterSpecialMaterials(materials, "character");
      const resultWeapon = filterSpecialMaterials(materials, "weapon");

      expect(resultCharacter).toHaveLength(3);
      expect(resultWeapon).toHaveLength(3);
      expect(resultCharacter).toEqual(materials);
      expect(resultWeapon).toEqual(materials);
    });

    it("should return empty array when only special materials present (character)", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 500,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 2000,
        },
      ];

      const result = filterSpecialMaterials(materials, "character");

      expect(result).toHaveLength(0);
    });

    it("should return empty array when only special materials present (weapon)", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 300,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 1500,
        },
      ];

      const result = filterSpecialMaterials(materials, "weapon");

      expect(result).toHaveLength(0);
    });

    it("should handle empty array", () => {
      const materials: MaterialRequirement[] = [];

      const resultCharacter = filterSpecialMaterials(materials, "character");
      const resultWeapon = filterSpecialMaterials(materials, "weapon");

      expect(resultCharacter).toEqual([]);
      expect(resultWeapon).toEqual([]);
    });

    it("should not filter character-exp when type is weapon", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 500,
        },
      ];

      const result = filterSpecialMaterials(materials, "weapon");

      expect(result).toHaveLength(1);
      expect(result[0].materialId).toBe("character-exp");
    });

    it("should not filter weapon-exp when type is character", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 2000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 500,
        },
      ];

      const result = filterSpecialMaterials(materials, "character");

      expect(result).toHaveLength(1);
      expect(result[0].materialId).toBe("weapon-exp");
    });

    it("should preserve isEmpty flag when filtering", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
      ];

      const result = filterSpecialMaterials(materials, "character");

      expect(result).toHaveLength(1);
      expect(result[0].materialId).toBe("lf-tidal-residuum");
      expect(result[0].quantity).toBe(10);
    });

    it("should not mutate original array", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
      ];

      const originalLength = materials.length;
      filterSpecialMaterials(materials, "character");

      expect(materials).toHaveLength(originalLength);
    });

    it("should preserve material order after filtering", () => {
      const materials: MaterialRequirement[] = [
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 10,
        },
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 1000,
        },
        {
          materialId: "mf-tidal-residuum",
          materialName: "MF Tidal Residuum",
          quantity: 5,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 500,
        },
        {
          materialId: "hf-tidal-residuum",
          materialName: "HF Tidal Residuum",
          quantity: 3,
        },
      ];

      const result = filterSpecialMaterials(materials, "character");

      expect(result).toHaveLength(3);
      expect(result[0].materialId).toBe("lf-tidal-residuum");
      expect(result[1].materialId).toBe("mf-tidal-residuum");
      expect(result[2].materialId).toBe("hf-tidal-residuum");
    });
  });

  describe("Integration tests", () => {
    it("should work with typical character planner workflow", () => {
      const allMaterials: MaterialRequirement[] = [
        {
          materialId: "character-exp",
          materialName: "Character EXP",
          quantity: 50000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 10000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 25000,
        },
        {
          materialId: "lf-tidal-residuum",
          materialName: "LF Tidal Residuum",
          quantity: 33,
        },
        {
          materialId: "mf-tidal-residuum",
          materialName: "MF Tidal Residuum",
          quantity: 41,
        },
        {
          materialId: "hf-tidal-residuum",
          materialName: "HF Tidal Residuum",
          quantity: 0,
        },
        {
          materialId: "ff-tidal-residuum",
          materialName: "FF Tidal Residuum",
          quantity: 49,
        },
        {
          materialId: "blighted-crown-of-puppet-king",
          materialName: "Blighted Crown",
          quantity: 16,
        },
      ];

      // Filter special materials
      const normalMaterials = filterSpecialMaterials(allMaterials, "character");

      // Get EXP and Credits
      const exp = getExpRequirement(allMaterials, "character");
      const credits = getShellCreditRequirements(allMaterials);

      // Sort materials
      const sorted = sortMaterialsByRequirement(
        normalMaterials as MaterialRequirementWithEmpty[]
      );

      expect(normalMaterials).toHaveLength(5);
      expect(exp?.quantity).toBe(50000);
      expect(credits.total).toBe(35000);
      expect(sorted[0].quantity).toBeGreaterThan(0); // First should be needed
      expect(sorted[sorted.length - 1].quantity).toBe(0); // Last should be not needed
    });

    it("should work with typical weapon planner workflow", () => {
      const allMaterials: MaterialRequirement[] = [
        {
          materialId: "weapon-exp",
          materialName: "Weapon EXP",
          quantity: 80000,
        },
        {
          materialId: "shell-credit-leveling",
          materialName: "Shell Credit (Leveling)",
          quantity: 5000,
        },
        {
          materialId: "shell-credit",
          materialName: "Shell Credit",
          quantity: 15000,
        },
        {
          materialId: "waveworn-residue-210",
          materialName: "Waveworn Residue T1",
          quantity: 6,
        },
        {
          materialId: "waveworn-residue-226",
          materialName: "Waveworn Residue T2",
          quantity: 8,
        },
        {
          materialId: "waveworn-residue-235",
          materialName: "Waveworn Residue T3",
          quantity: 8,
        },
        {
          materialId: "waveworn-residue-239",
          materialName: "Waveworn Residue T4",
          quantity: 0,
        },
        {
          materialId: "whisperin-core",
          materialName: "Whisperin Core T1",
          quantity: 6,
        },
      ];

      // Filter special materials
      const normalMaterials = filterSpecialMaterials(allMaterials, "weapon");

      // Get EXP and Credits
      const exp = getExpRequirement(allMaterials, "weapon");
      const credits = getShellCreditRequirements(allMaterials);

      // Sort materials
      const sorted = sortMaterialsByRequirement(
        normalMaterials as MaterialRequirementWithEmpty[]
      );

      expect(normalMaterials).toHaveLength(5);
      expect(exp?.quantity).toBe(80000);
      expect(credits.total).toBe(20000);
      expect(sorted.filter((m) => m.quantity > 0)).toHaveLength(4); // 4 needed materials
      expect(sorted.filter((m) => m.quantity === 0)).toHaveLength(1); // 1 not needed
    });
  });
});
