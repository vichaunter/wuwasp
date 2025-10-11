import type { MaterialRequirement } from './material-calculator';
import { getMaterialById } from '@/data/materials';

/**
 * Group materials by their base name
 * This is needed for synthesis calculations
 */
export function groupMaterialsByBaseName(materials: MaterialRequirement[]): Map<string, MaterialRequirement[]> {
  const groups = new Map<string, MaterialRequirement[]>();
  
  for (const mat of materials) {
    const material = getMaterialById(mat.materialId);
    if (!material) continue;
    
    // Use baseName if available, otherwise use material name
    const key = material.baseName || material.name;
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(mat);
  }
  
  return groups;
}

/**
 * Get all materials of the same base for a specific material ID
 */
export function getMaterialsOfSameBase(
  materialId: string,
  allMaterials: MaterialRequirement[]
): MaterialRequirement[] | undefined {
  const material = getMaterialById(materialId);
  if (!material) return undefined;
  
  const baseName = material.baseName || material.name;
  
  return allMaterials.filter(mat => {
    const m = getMaterialById(mat.materialId);
    return m && (m.baseName === baseName || m.name === baseName);
  });
}

