import { describe, it, expect } from 'vitest';
import {
  calculateMaterialSynthesis,
  calculateEffectiveAvailability,
  formatMaterialAvailability,
  calculateSynthesisPlan,
} from '../material-synthesis';

describe('Material Synthesis System', () => {
  describe('calculateMaterialSynthesis', () => {
    it('should use owned materials first before synthesizing', () => {
      const required = { T1: 4, T2: 9, T3: 9 };
      const owned = { T1: 70, T2: 0, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Should use 4 T1 directly
      // Should synthesize 9 T2 from 27 T1 (9*3)
      // Remaining T1: 70 - 4 - 27 = 39
      // Should synthesize 9 T3 from 27 T2... but we only have 0 T2 left
      // So need to synthesize T2 first from the 39 remaining T1
      // 39 / 3 = 13 T2, use 9 T2, leaves 4 T2
      // Then synthesize T3 from those 4 T2: 4/3 = 1 T3 (not enough for 9)
      
      expect(result.canFulfill).toBe(false); // Cannot fulfill all T3 requirements
    });

    it('should handle the exact example from user: 70 T1, need 4/9/9', () => {
      const required = { T1: 4, T2: 9, T3: 9 };
      const owned = { T1: 70, T2: 0, T3: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Manual calculation:
      // T3: need 9, have 0
      //   - Try to synthesize from T2: have 0 T2
      //   - Need to get T2 first from T1
      //   - Need 9 T3, which needs 27 T2 (9*3)
      //   - To get 27 T2, need 81 T1 (27*3)
      //   - But we only have 70 T1 total, so can't fulfill
      
      expect(result.canFulfill).toBe(false);
    });

    it('should correctly calculate when there are enough materials total', () => {
      const required = { T1: 4, T2: 9 };
      const owned = { T1: 70, T2: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // T2: need 9, have 0
      //   - Synthesize from T1: need 27 T1 (9*3)
      //   - Have 70 T1, use 27, leaves 43
      // T1: need 4, have 43 remaining
      //   - Use 4, leaves 39
      
      expect(result.canFulfill).toBe(true);
      expect(result.remainingAfterUse.T1).toBe(39); // 70 - 27 (for T2) - 4 (for T1) = 39
    });

    it('should work with existing higher quality materials', () => {
      const required = { T2: 9, T3: 9 };
      const owned = { T1: 30, T2: 5, T3: 2 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // T3: need 9, have 2
      //   - Use 2, need 7 more
      //   - Try to synthesize 7 T3 from T2: need 21 T2
      // T2: need 9 + 21 = 30 total, have 5
      //   - Use 5, need 25 more
      //   - Synthesize from T1: need 75 T1 (25*3), but only have 30
      //   - Can only synthesize 10 T2 (30/3), not enough
      
      expect(result.canFulfill).toBe(false);
    });

    it('should handle exact quantities perfectly', () => {
      const required = { T1: 4, T2: 3 };
      const owned = { T1: 13, T2: 0 }; // 13 = 4 + (3*3)
      
      const result = calculateMaterialSynthesis(required, owned);
      
      expect(result.canFulfill).toBe(true);
      expect(result.remainingAfterUse.T1).toBe(0); // Used all
      expect(result.remainingAfterUse.T2).toBe(0);
    });
  });

  describe('calculateEffectiveAvailability', () => {
    it('should show effective availability considering synthesis', () => {
      const required = { T1: 4, T2: 9 };
      const owned = { T1: 70, T2: 0 };
      
      const effective = calculateEffectiveAvailability(required, owned);
      
      // Can use 4 T1 directly
      // Can synthesize 9 T2 from 27 T1
      expect(effective.T1).toBeGreaterThanOrEqual(4);
      expect(effective.T2).toBeGreaterThanOrEqual(9);
    });

    it('should handle user example: 70 T1 with requirements 4/9/9', () => {
      const required = { T1: 4, T2: 9, T3: 9 };
      const owned = { T1: 70, T2: 0, T3: 0 };
      
      const effective = calculateEffectiveAvailability(required, owned);
      
      // With 70 T1:
      // - Can provide 4 T1 directly
      // - Remaining: 66 T1
      // - Can synthesize 22 T2 (66/3), use 9, leaves 13
      // - Can synthesize 4 T3 (13/3), but need 9
      
      expect(effective.T1).toBe(4); // Can fulfill T1 requirement
      expect(effective.T2).toBe(9); // Can fulfill T2 requirement
      expect(effective.T3).toBeLessThan(9); // Cannot fully fulfill T3
    });
  });

  describe('formatMaterialAvailability', () => {
    it('should format availability as available/required', () => {
      const allRequired = { T1: 4, T2: 9 };
      const owned = { T1: 70, T2: 0 };
      
      const t1Display = formatMaterialAvailability('T1', 4, owned, allRequired);
      const t2Display = formatMaterialAvailability('T2', 9, owned, allRequired);
      
      expect(t1Display.available).toBe(4);
      expect(t1Display.required).toBe(4);
      expect(t1Display.hasEnough).toBe(true);
      
      expect(t2Display.available).toBe(9);
      expect(t2Display.required).toBe(9);
      expect(t2Display.hasEnough).toBe(true);
    });

    it('should show partial availability when not enough', () => {
      const allRequired = { T1: 4, T2: 9, T3: 9 };
      const owned = { T1: 70, T2: 0, T3: 0 };
      
      const t3Display = formatMaterialAvailability('T3', 9, owned, allRequired);
      
      expect(t3Display.available).toBeLessThan(9);
      expect(t3Display.required).toBe(9);
      expect(t3Display.hasEnough).toBe(false);
    });
  });

  describe('calculateSynthesisPlan', () => {
    it('should generate a synthesis plan', () => {
      const required = { T1: 4, T2: 9 };
      const owned = { T1: 70, T2: 0 };
      
      const { canFulfill, plan } = calculateSynthesisPlan(required, owned);
      
      expect(canFulfill).toBe(true);
      expect(plan).toHaveLength(2);
      
      // T1 plan
      const t1Plan = plan.find(p => p.quality === 'T1');
      expect(t1Plan?.use).toBe(4);
      expect(t1Plan?.synthesizeFrom).toBeUndefined(); // No synthesis needed for T1
      
      // T2 plan
      const t2Plan = plan.find(p => p.quality === 'T2');
      expect(t2Plan?.use).toBe(0); // None owned
      expect(t2Plan?.synthesizeFrom).toBeDefined();
      expect(t2Plan?.synthesizeFrom?.quality).toBe('T1');
      expect(t2Plan?.synthesizeFrom?.amount).toBe(27); // 9 * 3
    });

    it('should handle mixed owned and synthesized', () => {
      const required = { T2: 9 };
      const owned = { T1: 18, T2: 5 };
      
      const { canFulfill, plan } = calculateSynthesisPlan(required, owned);
      
      expect(canFulfill).toBe(true);
      
      const t2Plan = plan.find(p => p.quality === 'T2');
      expect(t2Plan?.use).toBe(5); // Use 5 owned
      expect(t2Plan?.synthesizeFrom).toBeDefined();
      expect(t2Plan?.synthesizeFrom?.amount).toBe(12); // Need 4 more T2, so 4*3=12 T1
    });
  });

  describe('Real-world scenarios', () => {
    it('scenario: Full character ascension 0-6 with limited materials', () => {
      // Full ascension requires: T1=4, T2=9, T3=9, T4=4
      const required = { T1: 4, T2: 9, T3: 9, T4: 4 };
      
      // Player has mostly T1
      const owned = { T1: 100, T2: 0, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Need to calculate if 100 T1 is enough
      // T4: 4 * 3 = 12 T3 needed → 12 * 3 = 36 T2 needed → 36 * 3 = 108 T1 needed
      // But we also need T3: 9 * 3 = 27 T2
      // And T2: 9 T2
      // Total T2 needed: 36 + 27 + 9 = 72 T2 → 216 T1
      // Plus T1: 4
      // Total: 220 T1 needed, only have 100
      
      expect(result.canFulfill).toBe(false);
    });

    it('scenario: Player has mixed quality materials from farming', () => {
      const required = { T1: 25, T2: 28, T3: 40, T4: 57 }; // Forte requirements
      const owned = { T1: 50, T2: 30, T3: 20, T4: 10 };
      
      // Check if can fulfill (this is a complex calculation)
      const effective = calculateEffectiveAvailability(required, owned);
      
      // At minimum, should use what's owned directly
      expect(effective.T1).toBeGreaterThanOrEqual(25);
      expect(effective.T2).toBeGreaterThanOrEqual(28);
    });

    it('scenario: Exact math - 70 T1, need 4 T1 + 9 T2', () => {
      const required = { T1: 4, T2: 9 };
      const owned = { T1: 70 };
      
      const { canFulfill } = calculateSynthesisPlan(required, owned);
      
      expect(canFulfill).toBe(true);
      
      // Should use: 4 T1 + (9*3=27) T1 = 31 T1 total
      // Remaining: 70 - 31 = 39 T1
      const result = calculateMaterialSynthesis(required, owned);
      expect(result.remainingAfterUse.T1).toBe(39);
    });

    it('scenario: Sequential planning - two characters from same pool', () => {
      // Character 1 needs
      const char1Required = { T1: 4, T2: 9 };
      const initialOwned = { T1: 70 };
      
      const char1Result = calculateMaterialSynthesis(char1Required, initialOwned);
      expect(char1Result.canFulfill).toBe(true);
      
      // Character 2 needs (using remaining from char 1)
      const char2Required = { T1: 4, T2: 9 };
      const char2Result = calculateMaterialSynthesis(char2Required, char1Result.remainingAfterUse);
      
      // Should still have enough: 39 T1 remaining
      // Need 4 + (9*3) = 31 T1
      // 39 >= 31, so should be able to fulfill
      expect(char2Result.canFulfill).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero requirements', () => {
      const required = {};
      const owned = { T1: 10 };
      
      const result = calculateMaterialSynthesis(required, owned);
      expect(result.canFulfill).toBe(true);
      expect(result.remainingAfterUse.T1).toBe(10);
    });

    it('should handle zero owned', () => {
      const required = { T1: 4 };
      const owned = {};
      
      const result = calculateMaterialSynthesis(required, owned);
      expect(result.canFulfill).toBe(false);
    });

    it('should handle fractional synthesis (not enough to synthesize one)', () => {
      const required = { T2: 1 };
      const owned = { T1: 2, T2: 0 }; // 2 T1 is not enough to make 1 T2 (need 3)
      
      const result = calculateMaterialSynthesis(required, owned);
      expect(result.canFulfill).toBe(false);
    });

    it('should not synthesize if higher quality already available', () => {
      const required = { T2: 5 };
      const owned = { T1: 100, T2: 10 }; // Already have enough T2
      
      const result = calculateMaterialSynthesis(required, owned);
      
      expect(result.canFulfill).toBe(true);
      expect(result.synthesisNeeded).toHaveLength(0); // No synthesis needed
      expect(result.remainingAfterUse.T1).toBe(100); // T1 untouched
      expect(result.remainingAfterUse.T2).toBe(5); // Used 5, leaves 5
    });
  });
});

