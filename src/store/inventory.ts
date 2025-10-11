import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CharacterProgress, WeaponProgress } from "@/types";
import {
  applyMigrations,
  CURRENT_STORAGE_VERSION,
} from "@/utils/storage-migrations";

interface InventoryState {
  version?: number; // Storage version for migrations
  inventory: Record<string, number>; // materialId -> quantity
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
  setCharacterProgress: (
    characterId: string,
    progress: CharacterProgress
  ) => void;
  updateCharacterLevel: (
    characterId: string,
    current: number,
    target: number
  ) => void;
  updateCharacterAscension: (
    characterId: string,
    current: number,
    target: number,
    order?: number
  ) => void;
  updateCharacterForte: (
    characterId: string,
    node: keyof CharacterProgress["forte"],
    current: number,
    target: number
  ) => void;
  toggleCharacterEnabled: (characterId: string, enabled: boolean) => void;

  // Weapon progress methods
  getWeaponProgress: (weaponId: string) => WeaponProgress | null;
  setWeaponProgress: (weaponId: string, progress: WeaponProgress) => void;
  updateWeaponLevel: (
    weaponId: string,
    current: number,
    target: number
  ) => void;
  updateWeaponAscension: (
    weaponId: string,
    current: number,
    target: number,
    order?: number
  ) => void;
  toggleWeaponEnabled: (weaponId: string, enabled: boolean) => void;

  // Reordering methods
  reorderPlannerItems: (
    itemId: string,
    itemType: "character" | "weapon",
    newOrder: number
  ) => void;

  // UI state methods
  isCollapsed: (itemId: string) => boolean;
  toggleCollapsed: (itemId: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    immer((set, get) => ({
      version: CURRENT_STORAGE_VERSION,
      inventory: {},
      characterProgress: {},
      weaponProgress: {},
      collapsedSections: {},

      // Material methods
      getMaterialQuantity: (materialId: string) => {
        return get().inventory[materialId] || 0;
      },

      setMaterialQuantity: (materialId: string, quantity: number) => {
        set((state) => ({
          inventory: {
            ...state.inventory,
            [materialId]: Math.max(0, quantity),
          },
        }));
      },

      updateMaterialQuantity: (materialId: string, delta: number) => {
        const current = get().getMaterialQuantity(materialId);
        get().setMaterialQuantity(materialId, current + delta);
      },

      clearInventory: () => {
        set({ inventory: {} });
      },

      // Character progress methods
      getCharacterProgress: (characterId: string) => {
        return get().characterProgress[characterId] || null;
      },

      setCharacterProgress: (
        characterId: string,
        progress: CharacterProgress
      ) => {
        set((state) => ({
          characterProgress: {
            ...state.characterProgress,
            [characterId]: progress,
          },
        }));
      },

      updateCharacterLevel: (
        characterId: string,
        current: number,
        target: number
      ) => {
        set((state) => {
          const existing = state.characterProgress[characterId];
          if (!existing) return;

          existing.level = { current, target };
        });
      },

      updateCharacterAscension: (
        characterId: string,
        current: number,
        target: number,
        order?: number
      ) => {
        set((state) => {
          const existing = state.characterProgress[characterId];

          // Calculate default order: count ALL enabled items (characters + weapons)
          const defaultOrder =
            order ??
            Object.values(state.characterProgress).filter((p) => p.enabled)
              .length +
              Object.values(state.weaponProgress).filter((p) => p.enabled)
                .length;

          // Create or update progress
          if (!existing) {
            state.characterProgress[characterId] = {
              characterId,
              enabled: true,
              order: defaultOrder,
              level: { current: 1, target: 90 },
              ascension: { current, target },
              forte: {
                basic: { current: 1, target: 10 },
                skill: { current: 1, target: 10 },
                liberation: { current: 1, target: 10 },
                intro: { current: 1, target: 10 },
                outro: { current: 1, target: 10 },
                statBonus1: { current: 0, target: 2 },
                statBonus2: { current: 0, target: 2 },
                statBonus3: { current: 0, target: 2 },
                statBonus4: { current: 0, target: 2 },
                inherentSkill1: { current: 0, target: 2 },
                inherentSkill2: { current: 0, target: 2 },
              },
            };
          } else {
            existing.enabled = true;
            existing.ascension = { current, target };
            // Initialize level if it doesn't exist (migration)
            if (!existing.level) {
              existing.level = { current: 1, target: 90 };
            }
          }

          // Handle ordering
          if (order !== undefined) {
            const progress = state.characterProgress[characterId];
            progress.order = order;

            // Reorder ALL enabled items (characters AND weapons) if necessary
            Object.values(state.characterProgress).forEach((p) => {
              if (
                p.characterId !== characterId &&
                p.enabled &&
                p.order >= order
              ) {
                p.order++;
              }
            });

            Object.values(state.weaponProgress).forEach((p) => {
              if (p.enabled && p.order >= order) {
                p.order++;
              }
            });
          }
        });
      },

      updateCharacterForte: (
        characterId: string,
        node: keyof CharacterProgress["forte"],
        current: number,
        target: number
      ) => {
        set((state) => {
          const existing = state.characterProgress[characterId];
          if (!existing) return;

          existing.forte[node] = { current, target };
        });
      },

      toggleCharacterEnabled: (characterId: string, enabled: boolean) => {
        set((state) => {
          const existing = state.characterProgress[characterId];
          if (!existing) return;

          existing.enabled = enabled;
        });
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

      updateWeaponLevel: (
        weaponId: string,
        current: number,
        target: number
      ) => {
        set((state) => {
          const existing = state.weaponProgress[weaponId];
          if (!existing) return;

          existing.level = { current, target };
        });
      },

      updateWeaponAscension: (
        weaponId: string,
        current: number,
        target: number,
        order?: number
      ) => {
        set((state) => {
          const existing = state.weaponProgress[weaponId];

          // Calculate default order: count ALL enabled items (characters + weapons)
          const defaultOrder =
            order ??
            Object.values(state.characterProgress).filter((p) => p.enabled)
              .length +
              Object.values(state.weaponProgress).filter((p) => p.enabled)
                .length;

          // Create or update progress
          if (!existing) {
            state.weaponProgress[weaponId] = {
              weaponId,
              enabled: true,
              order: defaultOrder,
              level: { current: 1, target: 90 },
              ascension: { current, target },
            };
          } else {
            existing.enabled = true;
            existing.ascension = { current, target };
            // Initialize level if it doesn't exist (migration)
            if (!existing.level) {
              existing.level = { current: 1, target: 90 };
            }
          }

          // Handle ordering
          if (order !== undefined) {
            const progress = state.weaponProgress[weaponId];
            progress.order = order;

            // Reorder ALL enabled items (characters AND weapons) if necessary
            Object.values(state.characterProgress).forEach((p) => {
              if (p.enabled && p.order >= order) {
                p.order++;
              }
            });

            Object.values(state.weaponProgress).forEach((p) => {
              if (p.weaponId !== weaponId && p.enabled && p.order >= order) {
                p.order++;
              }
            });
          }
        });
      },

      toggleWeaponEnabled: (weaponId: string, enabled: boolean) => {
        set((state) => {
          const existing = state.weaponProgress[weaponId];
          if (!existing) return;

          existing.enabled = enabled;
        });
      },

      // Reordering methods
      reorderPlannerItems: (
        itemId: string,
        itemType: "character" | "weapon",
        newOrder: number
      ) => {
        set((state) => {
          // Get the item to move
          const item =
            itemType === "character"
              ? state.characterProgress[itemId]
              : state.weaponProgress[itemId];

          if (!item || !item.enabled) return;

          const oldOrder = item.order;

          // If the order hasn't changed, do nothing
          if (oldOrder === newOrder) return;

          // Update orders for all items
          const allItems = [
            ...Object.values(state.characterProgress).filter((p) => p.enabled),
            ...Object.values(state.weaponProgress).filter((p) => p.enabled),
          ];

          // If moving down (increasing order)
          if (newOrder > oldOrder) {
            allItems.forEach((p) => {
              if (p.order > oldOrder && p.order <= newOrder) {
                p.order -= 1;
              }
            });
          }
          // If moving up (decreasing order)
          else {
            allItems.forEach((p) => {
              if (p.order >= newOrder && p.order < oldOrder) {
                p.order += 1;
              }
            });
          }

          // Set the new order for the moved item
          item.order = newOrder;
        });
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
    })),
    {
      name: "wuwa-planner-inventory",
      version: CURRENT_STORAGE_VERSION,
      migrate: (persistedState: any, version: number) => {
        console.log(`🔧 Storage migration triggered from version ${version}`);

        // Apply migrations to bring data to current version
        const migratedState = applyMigrations(persistedState);

        return migratedState;
      },
    }
  )
);
