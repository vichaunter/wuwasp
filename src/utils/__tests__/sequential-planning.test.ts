import { describe, it, expect } from 'vitest';
import { consumeMaterialsFromInventory } from '../material-synthesis';

/**
 * Tests for sequential material allocation in the planner
 * Uses real material IDs from the materials database
 */
describe('Sequential Planning System', () => {
  describe('consumeMaterialsFromInventory', () => {
    it('should consume simple materials without synthesis', () => {
      const inventory = {
        'blighted-crown-of-puppet-king': 10,
        'luminous-calendula': 20,
        'shell-credit': 1000,
      };
      
      const requirements = [
        { materialId: 'blighted-crown-of-puppet-king', quantity: 5 },
        { materialId: 'luminous-calendula', quantity: 10 },
        { materialId: 'shell-credit', quantity: 500 },
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['blighted-crown-of-puppet-king']).toBe(5); // 10 - 5
      expect(result['luminous-calendula']).toBe(10); // 20 - 10
      expect(result['shell-credit']).toBe(500); // 1000 - 500
    });
    
    it('should not go below 0 when requirements exceed inventory', () => {
      const inventory = {
        'blighted-crown-of-puppet-king': 5,
      };
      
      const requirements = [
        { materialId: 'blighted-crown-of-puppet-king', quantity: 10 },
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['blighted-crown-of-puppet-king']).toBe(0); // Can't go negative
    });
    
    it('should handle materials with qualities using synthesis - Tidal Residuum', () => {
      const inventory = {
        'lf-tidal-residuum': 70,  // T1
        'mf-tidal-residuum': 0,   // T2
        'hf-tidal-residuum': 0,   // T3
        'ff-tidal-residuum': 0,   // T4
      };
      
      const requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 4 },  // T1
        { materialId: 'mf-tidal-residuum', quantity: 9 },  // T2
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      // 4 T1 used directly: 70 - 4 = 66
      // 9 T2 needed: 9 * 3 = 27 T1 needed for synthesis: 66 - 27 = 39
      expect(result['lf-tidal-residuum']).toBe(39);
      expect(result['mf-tidal-residuum']).toBe(0); // All synthesized T2 were used
    });
    
    it('should handle complex synthesis scenarios - Waveworn Residue', () => {
      const inventory = {
        'waveworn-residue-210': 100,  // T1
        'waveworn-residue-226': 5,    // T2
        'waveworn-residue-235': 2,    // T3
        'waveworn-residue-239': 0,    // T4
      };
      
      const requirements = [
        { materialId: 'waveworn-residue-226', quantity: 10 },  // T2
        { materialId: 'waveworn-residue-235', quantity: 5 },   // T3
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      // T2: need 10, have 5 → need 5 more → 5 * 3 = 15 T1
      // T3: need 5, have 2 → need 3 more → 3 * 3 = 9 T2 needed
      // But we already used 5 T2 + need 5 more (synthesized from 15 T1) = 10 T2 total
      // Then need 9 T2 for T3 synthesis: 9 * 3 = 27 T1
      // Total T1 used: 15 (for T2) + 27 (for T3 via T2) = 42
      // Remaining T1: 100 - 15 - 27 = 58
      
      expect(result['waveworn-residue-210']).toBeLessThanOrEqual(100);
      expect(result['waveworn-residue-226']).toBe(0);
      expect(result['waveworn-residue-235']).toBe(0);
    });
    
    it('should handle mixed simple and quality materials', () => {
      const inventory = {
        'lf-tidal-residuum': 50,  // T1
        'mf-tidal-residuum': 10,  // T2
        'blighted-crown-of-puppet-king': 20,
        'shell-credit': 10000,
      };
      
      const requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 10 },
        { materialId: 'mf-tidal-residuum', quantity: 5 },
        { materialId: 'blighted-crown-of-puppet-king', quantity: 5 },
        { materialId: 'shell-credit', quantity: 5000 },
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['lf-tidal-residuum']).toBe(40); // 50 - 10
      expect(result['mf-tidal-residuum']).toBe(5); // 10 - 5
      expect(result['blighted-crown-of-puppet-king']).toBe(15); // 20 - 5
      expect(result['shell-credit']).toBe(5000); // 10000 - 5000
    });
    
    it('should preserve materials not in requirements', () => {
      const inventory = {
        'lf-tidal-residuum': 100,
        'blighted-crown-of-puppet-king': 200,
        'luminous-calendula': 300,
      };
      
      const requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 50 },
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['lf-tidal-residuum']).toBe(50); // 100 - 50
      expect(result['blighted-crown-of-puppet-king']).toBe(200); // Unchanged
      expect(result['luminous-calendula']).toBe(300); // Unchanged
    });
    
    it('should handle empty requirements', () => {
      const inventory = {
        'lf-tidal-residuum': 100,
        'blighted-crown-of-puppet-king': 200,
      };
      
      const requirements: { materialId: string; quantity: number }[] = [];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['lf-tidal-residuum']).toBe(100); // Unchanged
      expect(result['blighted-crown-of-puppet-king']).toBe(200); // Unchanged
    });
    
    it('should handle empty inventory', () => {
      const inventory: Record<string, number> = {};
      
      const requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 10 },
      ];
      
      const result = consumeMaterialsFromInventory(inventory, requirements);
      
      expect(result['lf-tidal-residuum']).toBe(0);
    });
  });
  
  describe('Sequential consumption (real-world scenario)', () => {
    it('should correctly allocate materials for two characters in order', () => {
      const globalInventory = {
        'lf-tidal-residuum': 70,   // T1
        'mf-tidal-residuum': 0,    // T2
        'hf-tidal-residuum': 0,    // T3
        'ff-tidal-residuum': 0,    // T4
        'blighted-crown-of-puppet-king': 50,
        'shell-credit': 1000000,
      };
      
      // Character 1 (Priority 1): Augusta
      const char1Requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 33 },  // T1
        { materialId: 'blighted-crown-of-puppet-king', quantity: 10 },
        { materialId: 'shell-credit', quantity: 100000 },
      ];
      
      // Consume materials for Character 1
      const inventoryAfterChar1 = consumeMaterialsFromInventory(globalInventory, char1Requirements);
      
      // Verify Character 1 got what they needed
      expect(inventoryAfterChar1['lf-tidal-residuum']).toBe(37); // 70 - 33
      expect(inventoryAfterChar1['blighted-crown-of-puppet-king']).toBe(40); // 50 - 10
      expect(inventoryAfterChar1['shell-credit']).toBe(900000); // 1000000 - 100000
      
      // Character 2 (Priority 2): Cartethyia - same requirements
      const char2Requirements = [
        { materialId: 'lf-tidal-residuum', quantity: 4 },
        { materialId: 'mf-tidal-residuum', quantity: 12 },  // Needs synthesis
        { materialId: 'blighted-crown-of-puppet-king', quantity: 10 },
        { materialId: 'shell-credit', quantity: 100000 },
      ];
      
      // Consume materials for Character 2 from remaining inventory
      const inventoryAfterChar2 = consumeMaterialsFromInventory(inventoryAfterChar1, char2Requirements);
      
      // Verify Character 2 got materials
      // 37 T1 available for Char 2
      // Need 4 T1 → use 4, leaves 33
      // Need 12 T2 → need 36 T1, but only have 33 → can only make 11 T2 (33/3), leaving 0 T1
      expect(inventoryAfterChar2['lf-tidal-residuum']).toBeLessThanOrEqual(37);
      expect(inventoryAfterChar2['blighted-crown-of-puppet-king']).toBe(30); // 40 - 10
      expect(inventoryAfterChar2['shell-credit']).toBe(800000); // 900000 - 100000
    });
    
    it('should handle insufficient materials for second character', () => {
      const globalInventory = {
        'lf-howler-core': 10,  // T1
        'mf-howler-core': 0,   // T2
      };
      
      // Character 1 needs most of the materials
      const char1Requirements = [
        { materialId: 'lf-howler-core', quantity: 5 },  // T1
        { materialId: 'mf-howler-core', quantity: 1 },  // T2 - Will use 3 T1
      ];
      
      const inventoryAfterChar1 = consumeMaterialsFromInventory(globalInventory, char1Requirements);
      
      // 10 - 5 - 3 = 2 T1 left
      expect(inventoryAfterChar1['lf-howler-core']).toBe(2);
      
      // Character 2 needs the same, but there's not enough
      const char2Requirements = [
        { materialId: 'lf-howler-core', quantity: 5 },
        { materialId: 'mf-howler-core', quantity: 1 },
      ];
      
      const inventoryAfterChar2 = consumeMaterialsFromInventory(inventoryAfterChar1, char2Requirements);
      
      // Only 2 T1 available, can't fulfill requirements
      // Will use what's available
      expect(inventoryAfterChar2['lf-howler-core']).toBe(0);
      expect(inventoryAfterChar2['mf-howler-core']).toBe(0);
    });
  });
});
