import { describe, it, expect } from 'vitest';
import { forteRequirements } from '../forte-requirements';

describe('Forte Requirements', () => {
  describe('Main Nodes', () => {
    it('should have exactly 9 level entries (1→2 through 9→10)', () => {
      expect(forteRequirements.mainNodes).toHaveLength(9);
    });

    it('should have correct level values', () => {
      expect(forteRequirements.mainNodes[0].level).toBe(2);
      expect(forteRequirements.mainNodes[1].level).toBe(3);
      expect(forteRequirements.mainNodes[2].level).toBe(4);
      expect(forteRequirements.mainNodes[3].level).toBe(5);
      expect(forteRequirements.mainNodes[4].level).toBe(6);
      expect(forteRequirements.mainNodes[5].level).toBe(7);
      expect(forteRequirements.mainNodes[6].level).toBe(8);
      expect(forteRequirements.mainNodes[7].level).toBe(9);
      expect(forteRequirements.mainNodes[8].level).toBe(10);
    });

    it('should have correct materials for level 1→2', () => {
      const req = forteRequirements.mainNodes[0];
      expect(req.common?.T1).toBe(2);
      expect(req.forgery?.T1).toBe(2);
      expect(req.boss).toBeUndefined();
      expect(req.currency).toBe(1500);
    });

    it('should have correct materials for level 2→3', () => {
      const req = forteRequirements.mainNodes[1];
      expect(req.common?.T1).toBe(3);
      expect(req.forgery?.T1).toBe(3);
      expect(req.boss).toBeUndefined();
      expect(req.currency).toBe(2000);
    });

    it('should have correct materials for level 3→4', () => {
      const req = forteRequirements.mainNodes[2];
      expect(req.common?.T2).toBe(2);
      expect(req.forgery?.T2).toBe(2);
      expect(req.boss).toBeUndefined();
      expect(req.currency).toBe(4500);
    });

    it('should have correct materials for level 4→5', () => {
      const req = forteRequirements.mainNodes[3];
      expect(req.common?.T2).toBe(3);
      expect(req.forgery?.T2).toBe(3);
      expect(req.boss).toBeUndefined();
      expect(req.currency).toBe(6000);
    });

    it('should have correct materials for level 5→6', () => {
      const req = forteRequirements.mainNodes[4];
      expect(req.common?.T3).toBe(2);
      expect(req.forgery?.T3).toBe(3);
      expect(req.boss).toBeUndefined();
      expect(req.currency).toBe(16000);
    });

    it('should have correct materials for level 6→7 (first with boss)', () => {
      const req = forteRequirements.mainNodes[5];
      expect(req.common?.T3).toBe(3);
      expect(req.forgery?.T3).toBe(5);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(30000);
    });

    it('should have correct materials for level 7→8', () => {
      const req = forteRequirements.mainNodes[6];
      expect(req.common?.T4).toBe(2);
      expect(req.forgery?.T4).toBe(2);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(50000);
    });

    it('should have correct materials for level 8→9', () => {
      const req = forteRequirements.mainNodes[7];
      expect(req.common?.T4).toBe(3);
      expect(req.forgery?.T4).toBe(3);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(70000);
    });

    it('should have correct materials for level 9→10', () => {
      const req = forteRequirements.mainNodes[8];
      expect(req.common?.T4).toBe(4);
      expect(req.forgery?.T4).toBe(6);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(100000);
    });

    it('should have boss materials starting from level 6→7', () => {
      // Levels 1-5 should not have boss materials
      for (let i = 0; i < 5; i++) {
        expect(forteRequirements.mainNodes[i].boss).toBeUndefined();
      }
      
      // Levels 6-10 should have boss materials
      for (let i = 5; i < 9; i++) {
        expect(forteRequirements.mainNodes[i].boss).toBe(1);
      }
    });

    it('should calculate correct total materials for full upgrade (1→10)', () => {
      let totalT1Common = 0, totalT2Common = 0, totalT3Common = 0, totalT4Common = 0;
      let totalT1Forgery = 0, totalT2Forgery = 0, totalT3Forgery = 0, totalT4Forgery = 0;
      let totalBoss = 0, totalCurrency = 0;

      forteRequirements.mainNodes.forEach(req => {
        totalT1Common += req.common?.T1 || 0;
        totalT2Common += req.common?.T2 || 0;
        totalT3Common += req.common?.T3 || 0;
        totalT4Common += req.common?.T4 || 0;
        totalT1Forgery += req.forgery?.T1 || 0;
        totalT2Forgery += req.forgery?.T2 || 0;
        totalT3Forgery += req.forgery?.T3 || 0;
        totalT4Forgery += req.forgery?.T4 || 0;
        totalBoss += req.boss || 0;
        totalCurrency += req.currency;
      });

      // Common materials totals
      expect(totalT1Common).toBe(5); // 2 + 3
      expect(totalT2Common).toBe(5); // 2 + 3
      expect(totalT3Common).toBe(5); // 2 + 3
      expect(totalT4Common).toBe(9); // 2 + 3 + 4

      // Forgery materials totals
      expect(totalT1Forgery).toBe(5); // 2 + 3
      expect(totalT2Forgery).toBe(5); // 2 + 3
      expect(totalT3Forgery).toBe(8); // 3 + 5
      expect(totalT4Forgery).toBe(11); // 2 + 3 + 6

      // Boss materials (from level 6→7 onwards: 4 upgrades)
      expect(totalBoss).toBe(4);

      // Total currency
      expect(totalCurrency).toBe(280000);
    });
  });

  describe('Stat Bonuses', () => {
    it('should have correct materials for statBonusLevel1 (0→1)', () => {
      const req = forteRequirements.statBonusLevel1;
      expect(req.common?.T3).toBe(3);
      expect(req.forgery?.T3).toBe(3);
      expect(req.boss).toBeUndefined(); // Level 1 does not require boss material
      expect(req.currency).toBe(50000);
    });

    it('should have correct materials for statBonusLevel2 (1→2)', () => {
      const req = forteRequirements.statBonusLevel2;
      expect(req.common?.T4).toBe(3);
      expect(req.forgery?.T4).toBe(3);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(100000);
    });

    it('should calculate correct total materials for all 4 stat bonuses (0→2)', () => {
      const level1 = forteRequirements.statBonusLevel1;
      const level2 = forteRequirements.statBonusLevel2;

      // For 4 stat bonuses, each with 2 levels
      const totalT3Common = (level1.common?.T3 || 0) * 4;
      const totalT4Common = (level2.common?.T4 || 0) * 4;
      const totalT3Forgery = (level1.forgery?.T3 || 0) * 4;
      const totalT4Forgery = (level2.forgery?.T4 || 0) * 4;
      const totalBoss = ((level1.boss || 0) + (level2.boss || 0)) * 4;
      const totalCurrency = (level1.currency + level2.currency) * 4;

      expect(totalT3Common).toBe(12); // 3 × 4
      expect(totalT4Common).toBe(12); // 3 × 4
      expect(totalT3Forgery).toBe(12); // 3 × 4
      expect(totalT4Forgery).toBe(12); // 3 × 4
      expect(totalBoss).toBe(4); // (0 + 1) × 4 (only level 2 has boss material)
      expect(totalCurrency).toBe(600000); // (50000 + 100000) × 4
    });
  });

  describe('Inherent Skills', () => {
    it('should have correct materials for inherentSkillLevel1 (0→1)', () => {
      const req = forteRequirements.inherentSkillLevel1;
      expect(req.common?.T2).toBe(3);
      expect(req.forgery?.T2).toBe(3);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(10000);
    });

    it('should have correct materials for inherentSkillLevel2 (1→2)', () => {
      const req = forteRequirements.inherentSkillLevel2;
      expect(req.common?.T3).toBe(3);
      expect(req.forgery?.T3).toBe(3);
      expect(req.boss).toBe(1);
      expect(req.currency).toBe(20000);
    });

    it('should calculate correct total materials for inherent skills (0→2)', () => {
      const level1 = forteRequirements.inherentSkillLevel1;
      const level2 = forteRequirements.inherentSkillLevel2;

      // Inherent skills is 1 branch with 2 levels (not 2 separate branches)
      const totalT2Common = level1.common?.T2 || 0;
      const totalT3Common = level2.common?.T3 || 0;
      const totalT2Forgery = level1.forgery?.T2 || 0;
      const totalT3Forgery = level2.forgery?.T3 || 0;
      const totalBoss = (level1.boss || 0) + (level2.boss || 0);
      const totalCurrency = level1.currency + level2.currency;

      expect(totalT2Common).toBe(3); // Level 0→1
      expect(totalT3Common).toBe(3); // Level 1→2
      expect(totalT2Forgery).toBe(3); // Level 0→1
      expect(totalT3Forgery).toBe(3); // Level 1→2
      expect(totalBoss).toBe(2); // 1 + 1
      expect(totalCurrency).toBe(30000); // 10000 + 20000
    });
  });

  describe('Total Forte System', () => {
    it('should calculate correct grand total for complete forte maxing (5 main nodes + 4 stat bonuses + inherent skills)', () => {
      // Main nodes (5 nodes from 1→10 each)
      let mainNodesT1Common = 0, mainNodesT2Common = 0, mainNodesT3Common = 0, mainNodesT4Common = 0;
      let mainNodesT1Forgery = 0, mainNodesT2Forgery = 0, mainNodesT3Forgery = 0, mainNodesT4Forgery = 0;
      let mainNodesBoss = 0, mainNodesCurrency = 0;

      forteRequirements.mainNodes.forEach(req => {
        mainNodesT1Common += req.common?.T1 || 0;
        mainNodesT2Common += req.common?.T2 || 0;
        mainNodesT3Common += req.common?.T3 || 0;
        mainNodesT4Common += req.common?.T4 || 0;
        mainNodesT1Forgery += req.forgery?.T1 || 0;
        mainNodesT2Forgery += req.forgery?.T2 || 0;
        mainNodesT3Forgery += req.forgery?.T3 || 0;
        mainNodesT4Forgery += req.forgery?.T4 || 0;
        mainNodesBoss += req.boss || 0;
        mainNodesCurrency += req.currency;
      });

      // Multiply by 5 nodes
      const totalMainNodesT1Common = mainNodesT1Common * 5;
      const totalMainNodesT2Common = mainNodesT2Common * 5;
      const totalMainNodesT3Common = mainNodesT3Common * 5;
      const totalMainNodesT4Common = mainNodesT4Common * 5;
      const totalMainNodesT1Forgery = mainNodesT1Forgery * 5;
      const totalMainNodesT2Forgery = mainNodesT2Forgery * 5;
      const totalMainNodesT3Forgery = mainNodesT3Forgery * 5;
      const totalMainNodesT4Forgery = mainNodesT4Forgery * 5;
      const totalMainNodesBoss = mainNodesBoss * 5;
      const totalMainNodesCurrency = mainNodesCurrency * 5;

      // Stat bonuses (4 bonuses, 2 levels each)
      const totalStatBonusesT3Common = 3 * 4;
      const totalStatBonusesT4Common = 3 * 4;
      const totalStatBonusesBoss = 1 * 4; // Only level 2 has boss material
      const totalStatBonusesCurrency = (50000 + 100000) * 4; // 150000 × 4 = 600000

      // Inherent skills (1 branch with 2 levels)
      const totalInherentSkillsT2Common = 3; // Level 0→1
      const totalInherentSkillsT3Common = 3; // Level 1→2
      const totalInherentSkillsBoss = 2; // 1 + 1
      const totalInherentSkillsCurrency = 30000; // 10000 + 20000

      // Grand totals
      expect(totalMainNodesT1Common).toBe(25);
      expect(totalMainNodesT2Common).toBe(25);
      expect(totalMainNodesT3Common).toBe(25);
      expect(totalMainNodesT4Common).toBe(45);

      expect(totalMainNodesT1Forgery).toBe(25);
      expect(totalMainNodesT2Forgery).toBe(25);
      expect(totalMainNodesT3Forgery).toBe(40);
      expect(totalMainNodesT4Forgery).toBe(55);

      expect(totalMainNodesBoss).toBe(20);
      expect(totalMainNodesCurrency).toBe(1400000);

      // Verify totals include all components
      expect(totalStatBonusesT3Common).toBe(12);
      expect(totalStatBonusesT4Common).toBe(12);
      expect(totalInherentSkillsT2Common).toBe(3);
      expect(totalInherentSkillsT3Common).toBe(3);

      // Total boss materials: 20 (main) + 4 (stat) + 2 (inherent) = 26
      const grandTotalBoss = totalMainNodesBoss + totalStatBonusesBoss + totalInherentSkillsBoss;
      expect(grandTotalBoss).toBe(26);

      // Total currency: 1,400,000 (main) + 600,000 (stat) + 30,000 (inherent) = 2,030,000
      const grandTotalCurrency = totalMainNodesCurrency + totalStatBonusesCurrency + totalInherentSkillsCurrency;
      expect(grandTotalCurrency).toBe(2030000);
    });
  });
});

