import { useState, useMemo } from 'react';
import { useInventoryStore } from '@/store/inventory';
import { getMaterialById } from '@/data/materials';
import { MaterialUpdateModal } from '@/components/MaterialUpdateModal';
import { formatMaterialAvailability } from '@/utils/material-synthesis';
import type { MaterialRequirement } from '@/utils/material-calculator';

interface MaterialCardProps {
  materialId: string;
  required: number;
  allMaterialsOfSameBase?: MaterialRequirement[]; // All materials with same baseName for synthesis calculation
  effectiveInventory?: Record<string, number>; // Inventory to use instead of global (for sequential planning)
}

export function MaterialCard({ materialId, required, allMaterialsOfSameBase, effectiveInventory }: MaterialCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const getMaterialQuantity = useInventoryStore((state) => state.getMaterialQuantity);
  const material = getMaterialById(materialId);
  
  if (!material) {
    return (
      <div className="text-sm text-gray-400">
        Material no encontrado: {materialId}
      </div>
    );
  }
  
  // Calculate effective availability considering synthesis
  const { available, hasEnough, progress } = useMemo(() => {
    // Use effectiveInventory if provided, otherwise use global inventory
    const getQuantity = (matId: string) => {
      return effectiveInventory !== undefined ? (effectiveInventory[matId] || 0) : getMaterialQuantity(matId);
    };
    
    const ownedQty = getQuantity(materialId);
    
    // If we have quality tiers and all materials of same base, use synthesis calculation
    if (material.quality && material.baseName && allMaterialsOfSameBase && allMaterialsOfSameBase.length > 1) {
      // Build requirements and owned for all qualities of this base material
      const requirements: Record<string, number> = {};
      const ownedByQuality: Record<string, number> = {};
      
      allMaterialsOfSameBase.forEach(mat => {
        const m = getMaterialById(mat.materialId);
        if (m && m.quality) {
          requirements[m.quality] = mat.quantity;
          ownedByQuality[m.quality] = getQuantity(mat.materialId);
        }
      });
      
      // Calculate synthesis
      const result = formatMaterialAvailability(material.quality, required, ownedByQuality, requirements);
      
      return {
        owned: ownedQty,
        available: result.available,
        hasEnough: result.hasEnough,
        progress: Math.min((result.available / required) * 100, 100),
      };
    }
    
    // No synthesis, use direct comparison
    return {
      owned: ownedQty,
      available: ownedQty,
      hasEnough: ownedQty >= required,
      progress: Math.min((ownedQty / required) * 100, 100),
    };
  }, [materialId, required, material.quality, material.baseName, allMaterialsOfSameBase, getMaterialQuantity, effectiveInventory]);
  
  // Determinar el color base según calidad o categoría
  let colorKey: 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'gray';
  let bgGradient: string;
  
  if (material.quality === 'T1') {
    colorKey = 'green';
    bgGradient = 'from-green-600 to-green-700';
  } else if (material.quality === 'T2') {
    colorKey = 'blue';
    bgGradient = 'from-blue-600 to-blue-700';
  } else if (material.quality === 'T3') {
    colorKey = 'purple';
    bgGradient = 'from-purple-600 to-purple-700';
  } else if (material.quality === 'T4') {
    colorKey = 'amber';
    bgGradient = 'from-amber-600 to-yellow-600';
  } else if (material.category === 'BOSS') {
    colorKey = 'red';
    bgGradient = 'from-red-600 to-red-700';
  } else {
    // OVERWORLD
    colorKey = 'gray';
    bgGradient = 'from-gray-700 to-gray-800';
  }
  
  // Clases de hover y progreso basadas en el color
  const borderHoverClass = `hover:border-${colorKey}-${colorKey === 'gray' ? '400' : '500'}`;
  const shadowHoverClass = `hover:shadow-${colorKey}-${colorKey === 'gray' ? '400' : '500'}/20`;
  const ringHoverClass = `hover:ring-${colorKey}-${colorKey === 'gray' ? '400' : '500'}`;
  
  // Color de la barra de progreso (siempre brillante)
  const progressColorClass = `bg-${colorKey}-500`;
  
  return (
    <>
      <MaterialUpdateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        materialId={materialId}
      />
      
      <div 
        className={`group relative flex flex-col bg-gray-800 rounded-xl border border-gray-700 ${borderHoverClass} transition-all duration-300 hover:shadow-lg ${shadowHoverClass} cursor-pointer overflow-hidden`}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
      {/* Tooltip - nombre del material */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-950 text-gray-100 text-sm font-medium rounded-lg shadow-xl border border-gray-700 whitespace-nowrap pointer-events-none z-50">
          {material.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-950"></div>
        </div>
      )}
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
        <div 
          className={`h-full transition-all duration-500 ${progressColorClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex flex-col items-center gap-3 p-4 pt-5">
        {/* Material Icon */}
        <div className={`relative w-20 h-20 bg-gradient-to-br ${bgGradient} rounded-xl flex items-center justify-center ring-1 ring-gray-700 ${ringHoverClass} transition-all duration-300 ${showTooltip ? 'scale-110' : ''}`}>
          {material.image ? (
            <img 
              src={material.image} 
              alt={material.name} 
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
          ) : (
            <span className="text-3xl font-bold text-white drop-shadow-lg">
              {material.name.charAt(0)}
            </span>
          )}
        </div>
        
        {/* Quantity Info */}
        <div className="w-full">
          <div className="flex items-center justify-center gap-2 text-lg font-bold">
            <span className={hasEnough ? 'text-green-400' : 'text-gray-300'}>
              {available}
            </span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">{required}</span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
