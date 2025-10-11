import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { useInventoryStore } from '@/store/inventory';
import type { Weapon, WeaponProgress } from '@/types';

interface WeaponConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  weapon: Weapon;
  progress: WeaponProgress;
}

export function WeaponConfigModal({ isOpen, onClose, weapon, progress }: WeaponConfigModalProps) {
  const updateAscension = useInventoryStore(state => state.updateWeaponAscension);

  // Local state for the form
  const [ascensionCurrent, setAscensionCurrent] = useState(progress?.ascension.current ?? 0);
  const [ascensionTarget, setAscensionTarget] = useState(progress?.ascension.target ?? 7);

  // Update local state when modal opens
  useEffect(() => {
    if (isOpen && progress) {
      setAscensionCurrent(progress.ascension.current);
      setAscensionTarget(progress.ascension.target);
    }
  }, [isOpen, progress]);

  const handleSave = () => {
    updateAscension(weapon.id, ascensionCurrent, ascensionTarget);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleSave}
      title={`Configurar ${weapon.name}`}
      acceptText="Guardar"
      maxWidth="max-w-md"
    >
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="text-sm font-semibold text-gray-300 mb-3">Ascensión</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-2">Nivel Actual</label>
            <select
              value={ascensionCurrent}
              onChange={(e) => setAscensionCurrent(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={0}>Nivel 1 (A0)</option>
              <option value={1}>Nivel 20 → 40 (A1)</option>
              <option value={2}>Nivel 40 → 50 (A2)</option>
              <option value={3}>Nivel 50 → 60 (A3)</option>
              <option value={4}>Nivel 60 → 70 (A4)</option>
              <option value={5}>Nivel 70 → 80 (A5)</option>
              <option value={6}>Nivel 80 → 90 (A6)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-2">Nivel Objetivo</label>
            <select
              value={ascensionTarget}
              onChange={(e) => setAscensionTarget(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={0}>Nivel 1 (A0)</option>
              <option value={1}>Nivel 20 → 40 (A1)</option>
              <option value={2}>Nivel 40 → 50 (A2)</option>
              <option value={3}>Nivel 50 → 60 (A3)</option>
              <option value={4}>Nivel 60 → 70 (A4)</option>
              <option value={5}>Nivel 70 → 80 (A5)</option>
              <option value={6}>Nivel 80 → 90 (A6)</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}

