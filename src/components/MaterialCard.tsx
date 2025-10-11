import { useState } from 'react';
import { useInventoryStore } from '@/store/inventory';
import { getMaterialById } from '@/data/materials';
import { MaterialUpdateModal } from '@/components/MaterialUpdateModal';

interface MaterialCardProps {
  materialId: string;
  required: number;
}

export function MaterialCard({ materialId, required }: MaterialCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const owned = useInventoryStore((state) => state.getMaterialQuantity(materialId));
  const material = getMaterialById(materialId);
  
  if (!material) {
    return (
      <div className="text-sm text-gray-400">
        Material no encontrado: {materialId}
      </div>
    );
  }
  
  const hasEnough = owned >= required;
  const progress = Math.min((owned / required) * 100, 100);
  
  // Quality colors: T1=verde, T2=azul, T3=morado, T4=dorado
  const qualityColors = {
    T1: 'from-green-600 to-green-700',
    T2: 'from-blue-600 to-blue-700',
    T3: 'from-purple-600 to-purple-700',
    T4: 'from-amber-600 to-yellow-600',
  };
  
  // Boss = rojo, Overworld = gris con borde
  let bgGradient: string;
  let ringColor: string;
  
  if (material.quality) {
    bgGradient = qualityColors[material.quality];
    ringColor = 'ring-gray-700 group-hover:ring-purple-500';
  } else if (material.category === 'BOSS') {
    bgGradient = 'from-red-600 to-red-700';
    ringColor = 'ring-gray-700 group-hover:ring-purple-500';
  } else {
    // OVERWORLD
    bgGradient = 'from-gray-700 to-gray-800';
    ringColor = 'ring-gray-500 group-hover:ring-gray-400';
  }
  
  return (
    <>
      <MaterialUpdateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        materialId={materialId}
      />
      
      <div 
        className="group relative flex flex-col bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
      {/* Tooltip - nombre del material */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-950 text-gray-100 text-sm font-medium rounded-lg shadow-xl border border-gray-700 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
        {material.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-950"></div>
      </div>
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
        <div 
          className={`h-full transition-all duration-500 ${
            hasEnough ? 'bg-green-500' : 'bg-purple-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex flex-col items-center gap-3 p-4 pt-5">
        {/* Material Icon */}
        <div className={`relative w-20 h-20 bg-gradient-to-br ${bgGradient} rounded-xl flex items-center justify-center ring-1 ${ringColor} transition-all duration-300 group-hover:scale-110`}>
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
            <span className={owned >= required ? 'text-green-400' : 'text-gray-300'}>
              {owned}
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
