import { useState, useMemo } from 'react';
import type { Weapon } from '@/types';
import { useInventoryStore } from '@/store/inventory';
import { AddButton, RemoveButton } from '@/components/buttons';
import { AddToPlannerModal } from '@/components/AddToPlannerModal';
import { RemoveFromPlannerModal } from '@/components/RemoveFromPlannerModal';
import { WeaponConfigModal } from '@/components/WeaponConfigModal';
import { ConfigButton } from '@/components/ConfigButton';
import { MaterialCard } from '@/components/MaterialCard';
import { calculateWeaponTotalMaterials } from '@/utils/material-calculator';
import { sortMaterialsByCategory } from '@/utils/material-sorter';

interface WeaponCardProps {
  weapon: Weapon;
  plannerMode?: boolean;
}

export function WeaponCard({ weapon, plannerMode = false }: WeaponCardProps) {
  const progress = useInventoryStore(state => state.getWeaponProgress(weapon.id));
  const isInPlanner = progress?.enabled ?? false;
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  // Calculate required materials
  const requiredMaterials = useMemo(() => {
    if (!plannerMode || !isInPlanner || !progress) return [];
    const materials = calculateWeaponTotalMaterials(weapon, progress);
    return sortMaterialsByCategory(materials);
  }, [plannerMode, isInPlanner, progress, weapon]);
  
  const rarityColors = {
    3: 'from-blue-600 to-blue-700',
    4: 'from-purple-600 to-purple-700',
    5: 'from-amber-600 to-yellow-600',
  };

  const getStars = (rarity: number) => {
    return '★'.repeat(rarity);
  };
  
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddModal(true);
  };
  
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRemoveModal(true);
  };

  const weaponName = weapon.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      return (
        <>
          <div className="h-full flex flex-col">
            <div className={`group relative bg-gray-800 rounded-xl border ${isInPlanner ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-gray-700 hover:border-purple-500'} overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}>
            {/* Add/Remove Button */}
            {isInPlanner ? (
              <RemoveButton onClick={handleRemoveClick} />
            ) : (
              <AddButton onClick={handleAddClick} />
            )}
            
            {/* Top section: Image and Info side by side */}
            <div className="flex">
              {/* Weapon Image */}
              <div className={`relative w-24 h-32 flex-shrink-0 bg-gradient-to-br ${rarityColors[weapon.rarity]} rounded-tl-xl flex items-center justify-center ring-1 ring-gray-700 group-hover:ring-purple-500 transition-all duration-300`}>
                {weapon.image ? (
                  <img 
                    src={weapon.image} 
                    alt={weapon.name} 
                    className="w-20 h-28 object-contain drop-shadow-lg"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    {weapon.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Weapon Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            {weaponName}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold text-sm">
              {getStars(weapon.rarity)}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">{weapon.type}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">ATK</span>
            <span className="text-gray-100 font-semibold">{weapon.baseAtk}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500">Sub Stat</span>
            <span className="text-gray-100 font-semibold">{weapon.subStat}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Planner Section - Inside the card */}
        {plannerMode && isInPlanner && progress && (
          <div className="px-4 pb-4 border-t border-gray-700 pt-4">
            {/* Configuration Button */}
            <div className="mb-4">
              <ConfigButton 
                onClick={() => setShowConfigModal(true)}
                progress={progress}
                type="weapon"
              />
            </div>
            
            {/* Materials Needed */}
            {requiredMaterials.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-300 mb-3">Materiales Necesarios</div>
                <div className="grid grid-cols-4 gap-2">
                  {requiredMaterials.map(mat => (
                    <MaterialCard
                      key={mat.materialId}
                      materialId={mat.materialId}
                      required={mat.quantity}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
      
      {/* Modals */}
      <AddToPlannerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        itemType="weapon"
        itemId={weapon.id}
        itemName={weapon.name}
      />
      
      <RemoveFromPlannerModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        itemType="weapon"
        itemId={weapon.id}
        itemName={weapon.name}
      />
      
      {progress && (
        <WeaponConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          weapon={weapon}
          progress={progress}
        />
      )}
    </>
  );
}

