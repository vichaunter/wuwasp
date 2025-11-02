import { useState, useEffect, useMemo } from "react";
import { Modal } from "@/components/Modal";
import { useInventoryStore } from "@/store/inventory";
import type { Weapon, WeaponProgress } from "@/types";
import {
  getMinLevelForAscension,
  getMaxLevelForAscension,
} from "@/data/level-requirements";

interface WeaponConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  weapon: Weapon;
  progress: WeaponProgress;
}

export function WeaponConfigModal({
  isOpen,
  onClose,
  weapon,
  progress,
}: WeaponConfigModalProps) {
  const updateAscension = useInventoryStore(
    (state) => state.updateWeaponAscension
  );
  const updateLevel = useInventoryStore((state) => state.updateWeaponLevel);

  // Local state for the form
  const [ascensionCurrent, setAscensionCurrent] = useState(
    progress?.ascension.current ?? 0
  );
  const [ascensionTarget, setAscensionTarget] = useState(
    progress?.ascension.target ?? 7
  );
  const [levelCurrent, setLevelCurrent] = useState(
    progress?.level.current ?? 1
  );
  const [levelTarget, setLevelTarget] = useState(progress?.level.target ?? 90);

  // Calculate min/max levels based on ascension
  const minLevelForCurrentAscension = useMemo(
    () => getMinLevelForAscension(ascensionCurrent),
    [ascensionCurrent]
  );
  const maxLevelForCurrentAscension = useMemo(
    () => getMaxLevelForAscension(ascensionCurrent),
    [ascensionCurrent]
  );
  const minLevelForTargetAscension = useMemo(
    () => getMinLevelForAscension(ascensionTarget),
    [ascensionTarget]
  );
  const maxLevelForTargetAscension = useMemo(
    () => getMaxLevelForAscension(ascensionTarget),
    [ascensionTarget]
  );

  // Adjust target ascension if current changes
  useEffect(() => {
    if (ascensionTarget < ascensionCurrent) {
      setAscensionTarget(ascensionCurrent);
    }
  }, [ascensionCurrent, ascensionTarget]);

  // Adjust levels when ascension changes
  useEffect(() => {
    if (levelCurrent < minLevelForCurrentAscension) {
      setLevelCurrent(minLevelForCurrentAscension);
    }
    if (levelCurrent > maxLevelForCurrentAscension) {
      setLevelCurrent(maxLevelForCurrentAscension);
    }
    if (levelTarget < minLevelForTargetAscension) {
      setLevelTarget(minLevelForTargetAscension);
    }
    if (levelTarget > maxLevelForTargetAscension) {
      setLevelTarget(maxLevelForTargetAscension);
    }
  }, [
    ascensionCurrent,
    ascensionTarget,
    minLevelForCurrentAscension,
    maxLevelForCurrentAscension,
    minLevelForTargetAscension,
    maxLevelForTargetAscension,
  ]);

  // Update local state when modal opens
  useEffect(() => {
    if (isOpen && progress) {
      setAscensionCurrent(progress.ascension.current);
      setAscensionTarget(progress.ascension.target);
      setLevelCurrent(progress.level.current);
      setLevelTarget(progress.level.target);
    }
  }, [isOpen, progress]);

  const handleSave = () => {
    updateAscension(weapon.id, ascensionCurrent, ascensionTarget);
    updateLevel(weapon.id, levelCurrent, levelTarget);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleSave}
      title={`Configurar ${weapon.name}`}
      acceptText="Guardar"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Ascension Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-sm font-semibold text-gray-300 mb-3">
            Ascensión (Solo Materiales)
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Rango Actual
              </label>
              <select
                value={ascensionCurrent}
                onChange={(e) => setAscensionCurrent(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={0}>A0 (Max Lv.20)</option>
                <option value={1}>A1 (Max Lv.40)</option>
                <option value={2}>A2 (Max Lv.50)</option>
                <option value={3}>A3 (Max Lv.60)</option>
                <option value={4}>A4 (Max Lv.70)</option>
                <option value={5}>A5 (Max Lv.80)</option>
                <option value={6}>A6 (Max Lv.90)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Rango Objetivo
              </label>
              <select
                value={ascensionTarget}
                onChange={(e) => setAscensionTarget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Array.from({ length: 7 }, (_, i) => i)
                  .filter((rank) => rank >= ascensionCurrent)
                  .map((rank) => {
                    const labels = [
                      "A0 (Max Lv.20)",
                      "A1 (Max Lv.40)",
                      "A2 (Max Lv.50)",
                      "A3 (Max Lv.60)",
                      "A4 (Max Lv.70)",
                      "A5 (Max Lv.80)",
                      "A6 (Max Lv.90)",
                    ];
                    return (
                      <option key={rank} value={rank}>
                        {labels[rank]}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        {/* Level Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-sm font-semibold text-gray-300 mb-3">
            Nivel (Solo Experiencia)
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Nivel Actual
              </label>
              <select
                value={levelCurrent}
                onChange={(e) => setLevelCurrent(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Array.from(
                  {
                    length:
                      maxLevelForCurrentAscension -
                      minLevelForCurrentAscension +
                      1,
                  },
                  (_, i) => minLevelForCurrentAscension + i
                ).map((level) => (
                  <option key={level} value={level}>
                    Nivel {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-2">
                Nivel Objetivo
              </label>
              <select
                value={levelTarget}
                onChange={(e) => setLevelTarget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Array.from(
                  {
                    length:
                      maxLevelForTargetAscension -
                      minLevelForTargetAscension +
                      1,
                  },
                  (_, i) => minLevelForTargetAscension + i
                ).map((level) => (
                  <option key={level} value={level}>
                    Nivel {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
