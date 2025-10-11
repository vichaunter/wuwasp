import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CharacterProgress, WeaponProgress } from '@/types';

interface InventoryState {
  materials: Record<string, number>; // materialId -> quantity
  characterProgress: Record<string, CharacterProgress>; // characterId -> progress
  weaponProgress: Record<string, WeaponProgress>; // weaponId -> progress
  collapsedSections: Record<string, boolean>; // itemId -> isCollapsed
  
  // Material methods
  getMaterialQuantity: (materialId: string) => number;
  setMaterialQuantity: (materialId: string, quantity: number) => void;
  updateMaterialQuantity: (materialId: string, delta: number) => void;
  clearInventory: () => void;
  
  // Character progress methods
  getCharacterProgress: (characterId: string) => CharacterProgress | null;
  setCharacterProgress: (characterId: string, progress: CharacterProgress) => void;
  updateCharacterAscension: (characterId: string, current: number, target: number, order?: number) => void;
  updateCharacterForte: (characterId: string, node: keyof CharacterProgress['forte'], current: number, target: number) => void;
  toggleCharacterEnabled: (characterId: string, enabled: boolean) => void;
  
  // Weapon progress methods
  getWeaponProgress: (weaponId: string) => WeaponProgress | null;
  setWeaponProgress: (weaponId: string, progress: WeaponProgress) => void;
  updateWeaponAscension: (weaponId: string, current: number, target: number, order?: number) => void;
  toggleWeaponEnabled: (weaponId: string, enabled: boolean) => void;
  
  // UI state methods
  isCollapsed: (itemId: string) => boolean;
  toggleCollapsed: (itemId: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      materials: {},
      characterProgress: {},
      weaponProgress: {},
      collapsedSections: {},
      
      // Material methods
      getMaterialQuantity: (materialId: string) => {
        return get().materials[materialId] || 0;
      },
      
      setMaterialQuantity: (materialId: string, quantity: number) => {
        set((state) => ({
          materials: {
            ...state.materials,
            [materialId]: Math.max(0, quantity),
          },
        }));
      },
      
      updateMaterialQuantity: (materialId: string, delta: number) => {
        const current = get().getMaterialQuantity(materialId);
        get().setMaterialQuantity(materialId, current + delta);
      },
      
      clearInventory: () => {
        set({ materials: {} });
      },
      
      // Character progress methods
      getCharacterProgress: (characterId: string) => {
        return get().characterProgress[characterId] || null;
      },
      
      setCharacterProgress: (characterId: string, progress: CharacterProgress) => {
        set((state) => ({
          characterProgress: {
            ...state.characterProgress,
            [characterId]: progress,
          },
        }));
      },
      
      updateCharacterAscension: (characterId: string, current: number, target: number, order?: number) => {
        const existing = get().getCharacterProgress(characterId);
        
        // Calculate default order: count ALL enabled items (characters + weapons)
        const defaultOrder = order ?? (
          Object.values(get().characterProgress).filter(p => p.enabled).length +
          Object.values(get().weaponProgress).filter(p => p.enabled).length
        );
        
        const progress: CharacterProgress = existing || {
          characterId,
          enabled: true,
          order: defaultOrder,
          ascension: { current: 0, target: 6 },
          forte: {
            basic: { current: 1, target: 10 },
            skill: { current: 1, target: 10 },
            liberation: { current: 1, target: 10 },
            intro: { current: 1, target: 10 },
            outro: { current: 1, target: 10 },
            passive1: { current: 0, target: 1 },
            passive2: { current: 0, target: 1 },
            bonusPassive: { current: 0, target: 1 },
          },
        };
        
        // Always enable when updating ascension (used when adding to planner)
        progress.enabled = true;
        
        if (order !== undefined) {
          progress.order = order;
          // Reorder ALL enabled items (characters AND weapons) if necessary
          const allCharProgress = get().characterProgress;
          const allWeaponProgress = get().weaponProgress;
          
          Object.values(allCharProgress).forEach(p => {
            if (p.characterId !== characterId && p.enabled && p.order >= order) {
              p.order++;
            }
          });
          
          Object.values(allWeaponProgress).forEach(p => {
            if (p.enabled && p.order >= order) {
              p.order++;
            }
          });
        }
        
        progress.ascension = { current, target };
        get().setCharacterProgress(characterId, progress);
      },
      
      updateCharacterForte: (characterId: string, node: keyof CharacterProgress['forte'], current: number, target: number) => {
        const existing = get().getCharacterProgress(characterId);
        if (!existing) return;
        
        existing.forte[node] = { current, target };
        get().setCharacterProgress(characterId, existing);
      },
      
      toggleCharacterEnabled: (characterId: string, enabled: boolean) => {
        const existing = get().getCharacterProgress(characterId);
        if (!existing) return;
        
        existing.enabled = enabled;
        get().setCharacterProgress(characterId, existing);
      },
      
      // Weapon progress methods
      getWeaponProgress: (weaponId: string) => {
        return get().weaponProgress[weaponId] || null;
      },
      
      setWeaponProgress: (weaponId: string, progress: WeaponProgress) => {
        set((state) => ({
          weaponProgress: {
            ...state.weaponProgress,
            [weaponId]: progress,
          },
        }));
      },
      
      updateWeaponAscension: (weaponId: string, current: number, target: number, order?: number) => {
        const existing = get().getWeaponProgress(weaponId);
        
        // Calculate default order: count ALL enabled items (characters + weapons)
        const defaultOrder = order ?? (
          Object.values(get().characterProgress).filter(p => p.enabled).length +
          Object.values(get().weaponProgress).filter(p => p.enabled).length
        );
        
        const progress: WeaponProgress = existing || {
          weaponId,
          enabled: true,
          order: defaultOrder,
          ascension: { current: 0, target: 7 },
        };
        
        // Always enable when updating ascension (used when adding to planner)
        progress.enabled = true;
        
        if (order !== undefined) {
          progress.order = order;
          // Reorder ALL enabled items (characters AND weapons) if necessary
          const allCharProgress = get().characterProgress;
          const allWeaponProgress = get().weaponProgress;
          
          Object.values(allCharProgress).forEach(p => {
            if (p.enabled && p.order >= order) {
              p.order++;
            }
          });
          
          Object.values(allWeaponProgress).forEach(p => {
            if (p.weaponId !== weaponId && p.enabled && p.order >= order) {
              p.order++;
            }
          });
        }
        
        progress.ascension = { current, target };
        get().setWeaponProgress(weaponId, progress);
      },
      
      toggleWeaponEnabled: (weaponId: string, enabled: boolean) => {
        const existing = get().getWeaponProgress(weaponId);
        if (!existing) return;
        
        existing.enabled = enabled;
        get().setWeaponProgress(weaponId, existing);
      },
      
      // UI state methods
      isCollapsed: (itemId: string) => {
        return get().collapsedSections[itemId] ?? true; // Default to collapsed
      },
      
      toggleCollapsed: (itemId: string) => {
        set((state) => ({
          collapsedSections: {
            ...state.collapsedSections,
            [itemId]: !state.collapsedSections[itemId],
          },
        }));
      },
    }),
    {
      name: 'wuwa-planner-inventory',
    }
  )
);

