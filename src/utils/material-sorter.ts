import type { MaterialRequirement } from '@/utils/material-calculator';
import { getMaterialById } from '@/data/materials';

// Define el orden de categorías y cualidades
const categoryOrder = {
  COMMON: 1,
  CURRENCY: 2,
  FORGERY: 3,
  BOSS: 4,
  OVERWORLD: 5,
};

const qualityOrder = {
  T1: 1,
  T2: 2,
  T3: 3,
  T4: 4,
};

export function sortMaterialsByCategory(materials: MaterialRequirement[]): MaterialRequirement[] {
  return materials.sort((a, b) => {
    const matA = getMaterialById(a.materialId);
    const matB = getMaterialById(b.materialId);
    
    if (!matA || !matB) return 0;
    
    // Primero ordenar por categoría
    const catOrderA = categoryOrder[matA.category] || 999;
    const catOrderB = categoryOrder[matB.category] || 999;
    
    if (catOrderA !== catOrderB) {
      return catOrderA - catOrderB;
    }
    
    // Dentro de la misma categoría, ordenar por baseName (para agrupar calidades)
    if (matA.baseName !== matB.baseName) {
      return matA.baseName.localeCompare(matB.baseName);
    }
    
    // Si es el mismo baseName, ordenar por calidad (T1 < T2 < T3 < T4)
    const qualityA = matA.quality ? qualityOrder[matA.quality] : 0;
    const qualityB = matB.quality ? qualityOrder[matB.quality] : 0;
    
    return qualityA - qualityB;
  });
}

