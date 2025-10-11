import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InventoryState {
  materials: Record<string, number>; // materialId -> quantity
  getMaterialQuantity: (materialId: string) => number;
  setMaterialQuantity: (materialId: string, quantity: number) => void;
  updateMaterialQuantity: (materialId: string, delta: number) => void;
  clearInventory: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      materials: {},
      
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
    }),
    {
      name: 'wuwa-planner-inventory',
    }
  )
);

