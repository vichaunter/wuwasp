import { useState, useMemo, useEffect } from 'react';
import { useInventoryStore } from '@/store/inventory';
import { Modal } from '@/components/Modal';
import { characters } from '@/data/characters';
import { weapons } from '@/data/weapons';

interface AddToPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'character' | 'weapon';
  itemId: string;
  itemName: string;
}

export function AddToPlannerModal({ isOpen, onClose, itemType, itemId, itemName }: AddToPlannerModalProps) {
  const updateCharacterAscension = useInventoryStore(state => state.updateCharacterAscension);
  const updateWeaponAscension = useInventoryStore(state => state.updateWeaponAscension);
  const characterProgress = useInventoryStore(state => state.characterProgress);
  const weaponProgress = useInventoryStore(state => state.weaponProgress);
  
  // Get ordered list of ALL items in the planner (both characters and weapons)
  const orderedItems = useMemo(() => {
    const enabledChars = characters
      .filter(c => characterProgress[c.id]?.enabled)
      .map(c => ({
        id: c.id,
        name: c.name,
        type: 'character' as const,
        order: characterProgress[c.id].order,
      }));
    
    const enabledWeapons = weapons
      .filter(w => weaponProgress[w.id]?.enabled)
      .map(w => ({
        id: w.id,
        name: w.name,
        type: 'weapon' as const,
        order: weaponProgress[w.id].order,
      }));
    
    // Combine both and sort by order
    return [...enabledChars, ...enabledWeapons].sort((a, b) => a.order - b.order);
  }, [characterProgress, weaponProgress]);
  
  const currentCount = orderedItems.length;
  
  // Default position is at the end
  const [selectedPosition, setSelectedPosition] = useState(currentCount);
  
  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPosition(currentCount);
    }
  }, [isOpen, currentCount]);
  
  const handleConfirm = () => {
    if (itemType === 'character') {
      // Ascension will default to 0->6, forte to 1->10, passives to 0->1
      updateCharacterAscension(itemId, 0, 6, selectedPosition);
    } else {
      // Weapon ascension will default to 0->6 (A1-A6 to reach level 90)
      updateWeaponAscension(itemId, 0, 6, selectedPosition);
    }
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleConfirm}
      title="Añadir al Planificador"
      acceptText="Añadir"
      acceptButtonClass="bg-green-600 hover:bg-green-700"
    >
      <p className="text-gray-300 mb-4">
        ¿Deseas añadir <span className="font-semibold text-purple-400">{itemName}</span> al planificador?
      </p>
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Posición en la lista:
        </label>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {currentCount === 0 ? (
            <option value={0}>Al principio (posición 1)</option>
          ) : (
            Array.from({ length: currentCount + 1 }, (_, i) => {
              if (i === 0) {
                const firstItem = orderedItems[0];
                const itemLabel = firstItem ? `${firstItem.name} (${firstItem.type === 'character' ? 'Personaje' : 'Arma'})` : '';
                return (
                  <option key={i} value={i}>
                    Al principio (encima de: {itemLabel})
                  </option>
                );
              } else if (i === currentCount) {
                return (
                  <option key={i} value={i}>
                    Al final (posición {currentCount + 1})
                  </option>
                );
              } else {
                const item = orderedItems[i];
                const itemLabel = item ? `${item.name} (${item.type === 'character' ? 'Personaje' : 'Arma'})` : '';
                return (
                  <option key={i} value={i}>
                    {i + 1} - {itemLabel} (insertar encima)
                  </option>
                );
              }
            })
          )}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          {currentCount === 0 
            ? 'Será el primer item en tu planificador.'
            : selectedPosition === currentCount
            ? 'Se añadirá al final de la lista.'
            : selectedPosition === 0
            ? `Se insertará al principio, antes de "${orderedItems[0]?.name}".`
            : `Se insertará encima de "${orderedItems[selectedPosition]?.name}" en la posición ${selectedPosition + 1}.`}
        </p>
      </div>
    </Modal>
  );
}

