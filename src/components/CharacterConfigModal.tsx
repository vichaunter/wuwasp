import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { useInventoryStore } from '@/store/inventory';
import type { Character, CharacterProgress } from '@/types';

interface CharacterConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  progress: CharacterProgress;
}

export function CharacterConfigModal({ isOpen, onClose, character, progress }: CharacterConfigModalProps) {
  const updateAscension = useInventoryStore(state => state.updateCharacterAscension);
  const updateForte = useInventoryStore(state => state.updateCharacterForte);

  // Local state for the form
  const [ascensionCurrent, setAscensionCurrent] = useState(progress?.ascension.current ?? 0);
  const [ascensionTarget, setAscensionTarget] = useState(progress?.ascension.target ?? 6);
  const [forteValues, setForteValues] = useState({
    basic: { current: progress?.forte.basic.current ?? 1, target: progress?.forte.basic.target ?? 10 },
    skill: { current: progress?.forte.skill.current ?? 1, target: progress?.forte.skill.target ?? 10 },
    liberation: { current: progress?.forte.liberation.current ?? 1, target: progress?.forte.liberation.target ?? 10 },
    intro: { current: progress?.forte.intro.current ?? 1, target: progress?.forte.intro.target ?? 10 },
    outro: { current: progress?.forte.outro.current ?? 1, target: progress?.forte.outro.target ?? 10 },
    passive1: { current: 0, target: progress?.forte.passive1.target ?? 0 },
    passive2: { current: 0, target: progress?.forte.passive2.target ?? 0 },
    bonusPassive: { current: 0, target: progress?.forte.bonusPassive.target ?? 0 },
  });

  // Update local state when modal opens
  useEffect(() => {
    if (isOpen && progress) {
      setAscensionCurrent(progress.ascension.current);
      setAscensionTarget(progress.ascension.target);
      setForteValues({
        basic: { current: progress.forte.basic.current, target: progress.forte.basic.target },
        skill: { current: progress.forte.skill.current, target: progress.forte.skill.target },
        liberation: { current: progress.forte.liberation.current, target: progress.forte.liberation.target },
        intro: { current: progress.forte.intro.current, target: progress.forte.intro.target },
        outro: { current: progress.forte.outro.current, target: progress.forte.outro.target },
        passive1: { current: 0, target: progress.forte.passive1.target },
        passive2: { current: 0, target: progress.forte.passive2.target },
        bonusPassive: { current: 0, target: progress.forte.bonusPassive.target },
      });
    }
  }, [isOpen, progress]);

  const handleSave = () => {
    updateAscension(character.id, ascensionCurrent, ascensionTarget);
    
    // Update all forte nodes
    (['basic', 'skill', 'liberation', 'intro', 'outro', 'passive1', 'passive2', 'bonusPassive'] as const).forEach(node => {
      updateForte(character.id, node, forteValues[node].current, forteValues[node].target);
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleSave}
      title={`Configurar ${character.name}`}
      acceptText="Guardar"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Ascension Section */}
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

        {/* Forte Nodes Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-sm font-semibold text-gray-300 mb-3">Forte - Nodos Principales</div>
          <div className="grid grid-cols-2 gap-4">
            {(['basic', 'skill', 'liberation', 'intro', 'outro'] as const).map(node => {
              const nodeNames = {
                basic: 'Básico',
                skill: 'Habilidad',
                liberation: 'Liberación',
                intro: 'Intro',
                outro: 'Outro',
              };
              
              return (
                <div key={node} className="space-y-2">
                  <div className="text-xs text-gray-400">{nodeNames[node]}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={forteValues[node].current}
                      onChange={(e) => setForteValues(prev => ({
                        ...prev,
                        [node]: { ...prev[node], current: Number(e.target.value) }
                      }))}
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                        <option key={level} value={level}>Lv. {level}</option>
                      ))}
                    </select>
                    <select
                      value={forteValues[node].target}
                      onChange={(e) => setForteValues(prev => ({
                        ...prev,
                        [node]: { ...prev[node], target: Number(e.target.value) }
                      }))}
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                        <option key={level} value={level}>Lv. {level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Passives Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-sm font-semibold text-gray-300 mb-3">Pasivas</div>
          <div className="space-y-3">
            {(['passive1', 'passive2', 'bonusPassive'] as const).map(passive => {
              const passiveNames = {
                passive1: 'Pasiva 1',
                passive2: 'Pasiva 2',
                bonusPassive: 'Pasiva Bonus',
              };
              
              return (
                <div key={passive} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                  <span className="text-sm text-gray-300">{passiveNames[passive]}</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={forteValues[passive].target === 1}
                      onChange={(e) => setForteValues(prev => ({
                        ...prev,
                        [passive]: { current: 0, target: e.target.checked ? 1 : 0 }
                      }))}
                      className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

