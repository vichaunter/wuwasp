import { useInventoryStore } from '@/store/inventory';
import { getMaterialById } from '@/data/materials';
import { useState, useEffect } from 'react';

interface MaterialInputProps {
  materialId: string;
}

export function MaterialInput({ materialId }: MaterialInputProps) {
  const owned = useInventoryStore((state) => state.getMaterialQuantity(materialId));
  const setMaterialQuantity = useInventoryStore((state) => state.setMaterialQuantity);
  const material = getMaterialById(materialId);
  
  const [localValue, setLocalValue] = useState(owned.toString());
  
  useEffect(() => {
    setLocalValue(owned.toString());
  }, [owned]);
  
  if (!material) {
    return (
      <div className="text-sm text-gray-400">
        Material no encontrado: {materialId}
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setMaterialQuantity(materialId, numValue);
    }
  };
  
  const handleIncrement = () => {
    setMaterialQuantity(materialId, owned + 1);
  };
  
  const handleDecrement = () => {
    if (owned > 0) {
      setMaterialQuantity(materialId, owned - 1);
    }
  };
  
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
    ringColor = 'ring-gray-700';
  } else if (material.category === 'BOSS') {
    bgGradient = 'from-red-600 to-red-700';
    ringColor = 'ring-gray-700';
  } else {
    // OVERWORLD
    bgGradient = 'from-gray-700 to-gray-800';
    ringColor = 'ring-gray-500';
  }
  
  return (
    <div className="group/item flex flex-col items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-200">
      {/* Material Icon with Tooltip */}
      <div className="relative">
        <div className={`w-16 h-16 bg-gradient-to-br ${bgGradient} rounded-lg flex items-center justify-center ring-1 ${ringColor}`}>
          {material.image ? (
            <img 
              src={material.image} 
              alt={material.name} 
              className="w-14 h-14 object-contain drop-shadow-lg" 
            />
          ) : (
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              {material.name.charAt(0)}
            </span>
          )}
        </div>
        
        {/* Tooltip for material name */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-950 text-gray-100 text-sm font-medium rounded-lg shadow-xl border border-gray-700 whitespace-nowrap opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 pointer-events-none z-50">
          {material.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-950"></div>
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center gap-1.5 w-full">
        <button
          onClick={handleDecrement}
          disabled={owned === 0}
          className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-gray-200 rounded font-bold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
        >
          −
        </button>
        
        <input
          type="number"
          value={localValue}
          onChange={handleChange}
          min="0"
          className="w-12 px-2 py-1 text-center text-sm font-semibold bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 transition-all"
        />
        
        <button
          onClick={handleIncrement}
          className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-200 rounded font-bold transition-all duration-200 hover:scale-105 active:scale-95 text-base"
        >
          +
        </button>
      </div>
    </div>
  );
}
