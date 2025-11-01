import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CharacterProgress, WeaponProgress } from "@/types";
import {
  applyMigrations,
  CURRENT_STORAGE_VERSION,
} from "@/utils/storage-migrations";
import { calculateInsertOrder } from "@/utils/plannerOrdering";

interface InventoryState {
  version?: number; // Storage version for migrations
  inventory: Record<string, number>; // materialId -> quantity
  characterProgress: Record<string, CharacterProgress>; // characterId -> progress
  weaponProgress: Record<string, WeaponProgress>; // weaponId -> progress
  collapsedSections: Record<string, boolean>; // itemId -> isCollapsed
  completedWeapons: Record<string, boolean>; // weaponId -> isCompleted
  completedCharacters: Record<string, boolean>; // characterId -> isCompleted

  // Completion methods
  markCharacterAsCompleted: (characterId: string) => void;
  markWeaponAsCompleted: (weaponId: string) => void;

  // Material methods
  getMaterialQuantity: (materialId: string) => number;
  setMaterialQuantity: (materialId: string, quantity: number) => void;
  updateMaterialQuantity: (materialId: string, delta: number) => void;
  clearInventory: () => void;
  setInventory: (newInventory: Record<string, number>) => void;

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
  removeCharacter: (characterId: string) => void;

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
  removeWeapon: (weaponId: string) => void;

  // Reordering methods
  reorderPlannerItems: (
    itemId: string,
    itemType: "character" | "weapon",
    newOrder: number
  ) => void;

  // UI state methods
  isCollapsed: (itemId: string) => boolean;
  toggleCollapsed: (itemId: string) => void;

  // Completed weapons methods
  isWeaponCompleted: (weaponId: string) => boolean;
  toggleWeaponCompleted: (weaponId: string) => void;

  // Completed characters methods
  isCharacterCompleted: (characterId: string) => boolean;
  toggleCharacterCompleted: (characterId: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    immer((set, get) => ({
      version: CURRENT_STORAGE_VERSION,
      inventory: {},
      characterProgress: {},
      weaponProgress: {},
      collapsedSections: {},
      completedWeapons: {},
      completedCharacters: {},

      // Completion methods
      markCharacterAsCompleted: (characterId: string) => {
        set((state) => {
          state.completedCharacters[characterId] = true;
        });
      },

      markWeaponAsCompleted: (weaponId: string) => {
        set((state) => {
          state.completedWeapons[weaponId] = true;
        });
      },

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

      setInventory: (newInventory: Record<string, number>) => {
        set(() => ({
          inventory: newInventory,
        }));
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

          if (order !== undefined) {
            const { ordersToUpdate, newItemOrder } = calculateInsertOrder(
              order,
              characterId,
              "character",
              state.characterProgress,
              state.weaponProgress,
              state.completedCharacters,
              state.completedWeapons
            );

            const progress = state.characterProgress[characterId];
            progress.order = newItemOrder;

            for (const update of ordersToUpdate) {
              if (update.type === "character") {
                state.characterProgress[update.id].order = update.newOrder;
              } else {
                state.weaponProgress[update.id].order = update.newOrder;
              }
            }
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

      removeCharacter: (characterId: string) => {
        set((state) => {
          delete state.characterProgress[characterId];
          delete state.collapsedSections[characterId];
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

          if (order !== undefined) {
            const { ordersToUpdate, newItemOrder } = calculateInsertOrder(
              order,
              weaponId,
              "weapon",
              state.characterProgress,
              state.weaponProgress,
              state.completedCharacters,
              state.completedWeapons
            );

            const progress = state.weaponProgress[weaponId];
            progress.order = newItemOrder;

            for (const update of ordersToUpdate) {
              if (update.type === "character") {
                state.characterProgress[update.id].order = update.newOrder;
              } else {
                state.weaponProgress[update.id].order = update.newOrder;
              }
            }
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

      removeWeapon: (weaponId: string) => {
        set((state) => {
          delete state.weaponProgress[weaponId];
          delete state.collapsedSections[weaponId];
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

      // Completed weapons methods
      isWeaponCompleted: (weaponId: string) => {
        return get().completedWeapons[weaponId] ?? false;
      },

      toggleWeaponCompleted: (weaponId: string) => {
        set((state) => ({
          completedWeapons: {
            ...state.completedWeapons,
            [weaponId]: !state.completedWeapons[weaponId],
          },
        }));
      },

      // Completed characters methods
      isCharacterCompleted: (characterId: string) => {
        return get().completedCharacters[characterId] ?? false;
      },

      toggleCharacterCompleted: (characterId: string) => {
        set((state) => ({
          completedCharacters: {
            ...state.completedCharacters,
            [characterId]: !state.completedCharacters[characterId],
          },
        }));
      },
    })),
    {
      name: "wuwa-planner-inventory",
      version: CURRENT_STORAGE_VERSION,
      migrate: (persistedState: any, version: number) => {
        const isProduction = process.env.NODE_ENV === "production";
        
        if (!isProduction) {
          console.log(`🔧 Storage migration triggered from version ${version}`);
        }

        // Zustand persist wraps the state in a 'state' property
        // If persistedState already has state, use it; otherwise assume it's the raw state
        const rawState = persistedState?.state || persistedState || {};

        // Apply migrations to bring data to current version
        const migratedState = applyMigrations(rawState) as any;

        // Extract inventory from UserInventory format if needed
        let inventory: Record<string, number> = {};
        if (migratedState.inventory) {
          if (typeof migratedState.inventory === 'object' && 'materials' in migratedState.inventory) {
            // Old format with UserInventory wrapper
            inventory = migratedState.inventory.materials || {};
          } else {
            // Direct format (Record<string, number>)
            inventory = migratedState.inventory as Record<string, number>;
          }
        }

        // Ensure all required fields exist with defaults
        const validatedState = {
          version: migratedState.version ?? CURRENT_STORAGE_VERSION,
          inventory: inventory,
          characterProgress: migratedState.characterProgress || {},
          weaponProgress: migratedState.weaponProgress || {},
          collapsedSections: migratedState.collapsedSections || {},
          completedWeapons: migratedState.completedWeapons || {},
          completedCharacters: migratedState.completedCharacters || {},
        };

        if (!isProduction && (
          !rawState.completedCharacters ||
          !rawState.completedWeapons ||
          Object.keys(rawState).length !== Object.keys(validatedState).length - 1 // -1 for methods
        )) {
          console.log('✅ State validated and fixed during migration');
        }

        return validatedState;
      },
      // Validate state after hydration (when data is loaded from localStorage)
      partialize: (state: InventoryState) => ({
        inventory: state.inventory,
        characterProgress: state.characterProgress,
        weaponProgress: state.weaponProgress,
        collapsedSections: state.collapsedSections,
        completedWeapons: state.completedWeapons,
        completedCharacters: state.completedCharacters,
        version: state.version,
      }),
    }
  )
);
