import { useState, useEffect, useMemo } from "react";
import { Modal } from "@/components/Modal";
import { useInventoryStore } from "@/store/inventory";
import type { Character, CharacterProgress } from "@/types";
import {
  FORTE_STAT_BONUSES,
  FORTE_INHERENT_SKILLS,
} from "@/data/forte-requirements";
import {
  getMinLevelForAscension,
  getMaxLevelForAscension,
} from "@/data/level-requirements";

interface CharacterConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  progress: CharacterProgress;
}

export function CharacterConfigModal({
  isOpen,
  onClose,
  character,
  progress,
}: CharacterConfigModalProps) {
  const updateAscension = useInventoryStore(
    (state) => state.updateCharacterAscension
  );
  const updateLevel = useInventoryStore((state) => state.updateCharacterLevel);
  const updateForte = useInventoryStore((state) => state.updateCharacterForte);

  // Local state for the form
  const [ascensionCurrent, setAscensionCurrent] = useState(
    progress?.ascension.current ?? 0
  );
  const [ascensionTarget, setAscensionTarget] = useState(
    progress?.ascension.target ?? 6
  );
  const [levelCurrent, setLevelCurrent] = useState(
    progress?.level.current ?? 1
  );
  const [levelTarget, setLevelTarget] = useState(
    progress?.level.target ?? 90
  );
  const [forteValues, setForteValues] = useState({
    basic: {
      current: progress?.forte.basic.current ?? 1,
      target: progress?.forte.basic.target ?? 10,
    },
    skill: {
      current: progress?.forte.skill.current ?? 1,
      target: progress?.forte.skill.target ?? 10,
    },
    liberation: {
      current: progress?.forte.liberation.current ?? 1,
      target: progress?.forte.liberation.target ?? 10,
    },
    intro: {
      current: progress?.forte.intro.current ?? 1,
      target: progress?.forte.intro.target ?? 10,
    },
    outro: {
      current: progress?.forte.outro.current ?? 1,
      target: progress?.forte.outro.target ?? 10,
    },
    statBonus1: {
      current: progress?.forte.statBonus1?.current ?? 0,
      target: progress?.forte.statBonus1?.target ?? 2,
    },
    statBonus2: {
      current: progress?.forte.statBonus2?.current ?? 0,
      target: progress?.forte.statBonus2?.target ?? 2,
    },
    statBonus3: {
      current: progress?.forte.statBonus3?.current ?? 0,
      target: progress?.forte.statBonus3?.target ?? 2,
    },
    statBonus4: {
      current: progress?.forte.statBonus4?.current ?? 0,
      target: progress?.forte.statBonus4?.target ?? 2,
    },
    inherentSkill1: {
      current: 0,
      target: progress?.forte.inherentSkill1?.target ?? 2,
    },
    inherentSkill2: {
      current: 0,
      target: progress?.forte.inherentSkill2?.target ?? 2,
    },
  });

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
      setForteValues({
        basic: {
          current: progress.forte.basic.current,
          target: progress.forte.basic.target,
        },
        skill: {
          current: progress.forte.skill.current,
          target: progress.forte.skill.target,
        },
        liberation: {
          current: progress.forte.liberation.current,
          target: progress.forte.liberation.target,
        },
        intro: {
          current: progress.forte.intro.current,
          target: progress.forte.intro.target,
        },
        outro: {
          current: progress.forte.outro.current,
          target: progress.forte.outro.target,
        },
        statBonus1: {
          current: progress.forte.statBonus1.current,
          target: progress.forte.statBonus1.target,
        },
        statBonus2: {
          current: progress.forte.statBonus2.current,
          target: progress.forte.statBonus2.target,
        },
        statBonus3: {
          current: progress.forte.statBonus3.current,
          target: progress.forte.statBonus3.target,
        },
        statBonus4: {
          current: progress.forte.statBonus4.current,
          target: progress.forte.statBonus4.target,
        },
        inherentSkill1: {
          current: 0,
          target: progress.forte.inherentSkill1.target,
        },
        inherentSkill2: {
          current: 0,
          target: progress.forte.inherentSkill2.target,
        },
      });
    }
  }, [isOpen, progress]);

  const handleSave = () => {
    updateAscension(character.id, ascensionCurrent, ascensionTarget);
    updateLevel(character.id, levelCurrent, levelTarget);

    // Update all forte nodes
    (
      [
        "basic",
        "skill",
        "liberation",
        "intro",
        "outro",
        "statBonus1",
        "statBonus2",
        "statBonus3",
        "statBonus4",
        "inherentSkill1",
        "inherentSkill2",
      ] as const
    ).forEach((node) => {
      updateForte(
        character.id,
        node,
        forteValues[node].current,
        forteValues[node].target
      );
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
                  { length: maxLevelForCurrentAscension - minLevelForCurrentAscension + 1 },
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
                  { length: maxLevelForTargetAscension - minLevelForTargetAscension + 1 },
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

        {/* Forte Main Nodes Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-sm font-semibold text-gray-300 mb-3">
            Forte - Main Nodes
          </div>
          <div className="flex justify-between gap-3">
            {(["basic", "skill", "liberation", "intro", "outro"] as const).map(
              (node) => {
                const nodeNames = {
                  basic: "Basic Attack",
                  skill: "Resonance Skill",
                  liberation: "Reso Liberation",
                  intro: "Intro Skill",
                  outro: "Outro Skill",
                };

                return (
                  <div
                    key={node}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                      {nodeNames[node]}
                    </div>
                    <select
                      value={forteValues[node].current}
                      onChange={(e) =>
                        setForteValues((prev) => ({
                          ...prev,
                          [node]: {
                            ...prev[node],
                            current: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <option key={level} value={level}>
                          Lv. {level}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <select
                      value={forteValues[node].target}
                      onChange={(e) =>
                        setForteValues((prev) => ({
                          ...prev,
                          [node]: {
                            ...prev[node],
                            target: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <option key={level} value={level}>
                          Lv. {level}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Skills and Stats Section */}
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-gray-300">
              Skills and Stats
            </div>
            <button
              onClick={() => {
                setForteValues((prev) => ({
                  ...prev,
                  statBonus1: { current: 0, target: 0 },
                  statBonus2: { current: 0, target: 0 },
                  statBonus3: { current: 0, target: 0 },
                  statBonus4: { current: 0, target: 0 },
                  inherentSkill1: { current: 0, target: 0 },
                  inherentSkill2: { current: 0, target: 0 },
                }));
              }}
              className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex justify-between gap-3">
            {/* Stat Bonus 1 - Crit. Rate+ */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                {FORTE_STAT_BONUSES[0]}
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L2</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus1.target >= 2}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 2 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus1: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L1</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus1.target >= 1}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 1 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus1: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
            </div>

            {/* Stat Bonus 2 - ATK+ */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                {FORTE_STAT_BONUSES[1]}
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L2</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus2.target >= 2}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 2 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus2: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L1</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus2.target >= 1}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 1 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus2: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
            </div>

            {/* Inherent Skills - Middle column */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                {FORTE_INHERENT_SKILLS}
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L2</span>
                <input
                  type="checkbox"
                  checked={
                    forteValues.inherentSkill1.target >= 2 ||
                    forteValues.inherentSkill2.target >= 2
                  }
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 2 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      inherentSkill1: { current: 0, target: newTarget },
                      inherentSkill2: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L1</span>
                <input
                  type="checkbox"
                  checked={
                    forteValues.inherentSkill1.target >= 1 ||
                    forteValues.inherentSkill2.target >= 1
                  }
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 1 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      inherentSkill1: { current: 0, target: newTarget },
                      inherentSkill2: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
            </div>

            {/* Stat Bonus 3 - ATK+ */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                {FORTE_STAT_BONUSES[2]}
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L2</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus3.target >= 2}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 2 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus3: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L1</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus3.target >= 1}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 1 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus3: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
            </div>

            {/* Stat Bonus 4 - Crit. Rate+ */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-300 text-center min-h-[2rem] flex items-center justify-center">
                {FORTE_STAT_BONUSES[3]}
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L2</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus4.target >= 2}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 2 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus4: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <span className="text-xs text-gray-400">L1</span>
                <input
                  type="checkbox"
                  checked={forteValues.statBonus4.target >= 1}
                  onChange={(e) => {
                    const newTarget = e.target.checked ? 1 : 0;
                    setForteValues((prev) => ({
                      ...prev,
                      statBonus4: { current: 0, target: newTarget },
                    }));
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
