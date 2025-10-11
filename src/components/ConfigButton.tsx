import { useState } from 'react';
import type { CharacterProgress, WeaponProgress } from '@/types';

interface ConfigButtonProps {
  onClick: () => void;
  progress: CharacterProgress | WeaponProgress;
  type: 'character' | 'weapon';
}

export function ConfigButton({ onClick, progress, type }: ConfigButtonProps) {
  const [showPopover, setShowPopover] = useState(false);

  const getAscensionLabel = (rank: number): string => {
    const labels = [
      'A0 (Max Lv.20)',
      'A1 (Max Lv.40)',
      'A2 (Max Lv.50)',
      'A3 (Max Lv.60)',
      'A4 (Max Lv.70)',
      'A5 (Max Lv.80)',
      'A6 (Max Lv.90)',
    ];
    return labels[rank] || `A${rank}`;
  };

  const renderCharacterPreview = (prog: CharacterProgress) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Ascensión:</span>
        <span className="text-xs text-purple-300 font-semibold">
          {getAscensionLabel(prog.ascension.current)} → {getAscensionLabel(prog.ascension.target)}
        </span>
      </div>
      <div className="border-t border-gray-600 pt-2">
        <div className="text-xs text-gray-400 mb-1">Forte:</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Básico:</span>
            <span className="text-xs text-blue-300">{prog.forte.basic.current}→{prog.forte.basic.target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Habilidad:</span>
            <span className="text-xs text-blue-300">{prog.forte.skill.current}→{prog.forte.skill.target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Liberación:</span>
            <span className="text-xs text-blue-300">{prog.forte.liberation.current}→{prog.forte.liberation.target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Intro:</span>
            <span className="text-xs text-blue-300">{prog.forte.intro.current}→{prog.forte.intro.target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Outro:</span>
            <span className="text-xs text-blue-300">{prog.forte.outro.current}→{prog.forte.outro.target}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-2">
        <div className="text-xs text-gray-400 mb-1">Skills and Stats:</div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-500">Stat Bonuses:</span>
            <span className="text-purple-300">
              {[prog.forte.statBonus1.target, prog.forte.statBonus2.target, prog.forte.statBonus3.target, prog.forte.statBonus4.target]
                .filter(v => v > 0)
                .length} / 8 levels
            </span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-gray-500">Inherent Skills:</span>
            <span className="text-purple-300">
              {prog.forte.inherentSkill1.target} / 2 levels
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeaponPreview = (prog: WeaponProgress) => (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">Ascensión:</span>
      <span className="text-xs text-purple-300 font-semibold">
        Lv.{prog.ascension.current === 0 ? 1 : prog.ascension.current * 10 + 10} → Lv.{prog.ascension.target === 0 ? 1 : prog.ascension.target * 10 + 10}
      </span>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className="w-full py-2 px-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm font-medium text-gray-300 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Configurar
      </button>

      {/* Popover */}
      {showPopover && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-3">
            {type === 'character' 
              ? renderCharacterPreview(progress as CharacterProgress)
              : renderWeaponPreview(progress as WeaponProgress)
            }
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}

