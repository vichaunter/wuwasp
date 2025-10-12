import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Material } from "@/types";
import {
  materials,
  getMaterialByBaseName,
  getMaterialByNameAndQuality,
} from "@/data/materials";

const mockMaterials: Material[] = [
  {
    id: "basic-resonance-potion",
    name: "Basic Resonance Potion",
    baseName: "Resonance Potion",
    category: "EXP",
    quality: "T1",
    image: "/materials/basic-resonance-potion.webp",
  },
  {
    id: "medium-resonance-potion",
    name: "Medium Resonance Potion",
    baseName: "Resonance Potion",
    category: "EXP",
    quality: "T2",
    image: "/materials/medium-resonance-potion.webp",
  },
  {
    id: "advanced-resonance-potion",
    name: "Advanced Resonance Potion",
    baseName: "Resonance Potion",
    category: "EXP",
    quality: "T3",
    image: "/materials/advanced-resonance-potion.webp",
  },
  {
    id: "premium-resonance-potion",
    name: "Premium Resonance Potion",
    baseName: "Resonance Potion",
    category: "EXP",
    quality: "T4",
    image: "/materials/premium-resonance-potion.webp",
  },
  {
    id: "some-other-material",
    name: "Other",
    baseName: "Other",
    category: "COMMON",
    quality: "T1",
    image: "/materials/other.webp",
  },
];

let originalMaterials: Material[] = [];

describe("materials data helpers (mocked)", () => {
  beforeEach(() => {
    originalMaterials = materials.slice();
    materials.splice(0, materials.length, ...mockMaterials);
  });

  afterEach(() => {
    materials.splice(0, materials.length, ...originalMaterials);
  });

  it("getMaterialByBaseName returns array for existing baseName", () => {
    const res = getMaterialByBaseName("Resonance Potion");
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(4);
    const ids = res.map((m) => m.id);
    expect(ids).toEqual([
      "basic-resonance-potion",
      "medium-resonance-potion",
      "advanced-resonance-potion",
      "premium-resonance-potion",
    ]);
  });

  it("getMaterialByBaseName returns empty array for unknown baseName", () => {
    const res = getMaterialByBaseName("Nonexistent Base");
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });

  it("getMaterialByNameAndQuality returns correct material when exists", () => {
    const mat = getMaterialByNameAndQuality("Resonance Potion", "T3");
    expect(mat).toBeDefined();
    expect(mat?.id).toBe("advanced-resonance-potion");
  });

  it("getMaterialByNameAndQuality returns undefined for missing quality", () => {
    const mat = getMaterialByNameAndQuality("Resonance Potion", "T5" as any);
    expect(mat).toBeUndefined();
  });

  it("getMaterialByNameAndQuality returns undefined for unknown baseName", () => {
    const mat = getMaterialByNameAndQuality("Unknown Base", "T1");
    expect(mat).toBeUndefined();
  });
});
