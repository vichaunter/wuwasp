import { useInventoryStore } from '@/store/inventory';
import { Modal } from '@/components/Modal';

interface RemoveFromPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'character' | 'weapon';
  itemId: string;
  itemName: string;
}

export function RemoveFromPlannerModal({ isOpen, onClose, itemType, itemId, itemName }: RemoveFromPlannerModalProps) {
  const toggleCharacterEnabled = useInventoryStore(state => state.toggleCharacterEnabled);
  const toggleWeaponEnabled = useInventoryStore(state => state.toggleWeaponEnabled);
  
  const handleConfirm = () => {
    if (itemType === 'character') {
      toggleCharacterEnabled(itemId, false);
    } else {
      toggleWeaponEnabled(itemId, false);
    }
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleConfirm}
      title="Quitar del Planificador"
      acceptText="Quitar"
      acceptButtonClass="bg-red-600 hover:bg-red-700"
    >
      <p className="text-gray-300 mb-4">
        ¿Estás seguro de que deseas quitar <span className="font-semibold text-purple-400">{itemName}</span> del planificador?
      </p>
      
      <p className="text-sm text-gray-400">
        La configuración de niveles se mantendrá guardada por si deseas volver a añadirlo más tarde.
      </p>
    </Modal>
  );
}
