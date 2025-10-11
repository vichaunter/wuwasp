import { describe, it, expect } from 'vitest';
import { calculateMaterialSynthesis } from '../material-synthesis';

/**
 * Tests para verificar síntesis multinivel (T1 -> T2 -> T3 -> T4)
 * 
 * REGLA: 3 materiales de calidad inferior = 1 material de calidad superior
 * - 3 T1 = 1 T2
 * - 3 T2 = 1 T3
 * - 3 T3 = 1 T4
 * 
 * Por lo tanto:
 * - 9 T1 = 3 T2 = 1 T3
 * - 27 T1 = 9 T2 = 3 T3 = 1 T4
 */
describe('Material Synthesis - Multi-Level (Manual Calculation)', () => {
  
  describe('Scenario 1: Enough T1 to fulfill T1 requirement + 1 extra T2', () => {
    it('should synthesize correctly when given exact T1 for T1 requirement + 1 T2', () => {
      // Requisitos: 4 T1, 0 T2, 0 T3, 0 T4
      // Tenemos: X T1 (CALCULA A MANO: 4 T1 directos + 3 T1 para hacer 1 T2 extra = 7 T1)
      const required = { T1: 4, T2: 0, T3: 0, T4: 0 };
      const owned = { T1: 7, T2: 0, T3: 0, T4: 0 };  // <-- VALOR A CALCULAR
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas (CALCULA A MANO):
      expect(result.available.T1).toBe(4);  // Debe cumplir los 4 T1 requeridos
      expect(result.canFulfill).toBe(true); // Debe poder cumplir todos los requisitos
      
      // Verifica que sobra material para 1 T2
      expect(result.remainingAfterUse.T1).toBe(3); // Deben sobrar 3 T1 (que equivalen a 1 T2)
    });
  });

  describe('Scenario 2: Enough T1 to fulfill T1 + T2 requirements + 1 extra T3', () => {
    it('should synthesize correctly for T1 + T2 requirements + extra T3', () => {
      // Con 40 T1:
      // - 4 T1 directos
      // - 9 T2 = 27 T1
      // - 1 T3 = 9 T1
      // Total: 4 + 27 + 9 = 40 T1 (exacto)
      const required = { T1: 4, T2: 9, T3: 1, T4: 0 };
      const owned = { T1: 40, T2: 0, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas:
      expect(result.available.T1).toBe(4);  // Cumple T1
      expect(result.available.T2).toBe(9);  // Cumple T2
      expect(result.available.T3).toBe(1);  // Cumple T3
      expect(result.canFulfill).toBe(true);
      
      // No debe sobrar nada (usamos exactamente 40 T1)
      expect(result.remainingAfterUse.T1).toBe(0);
      expect(result.remainingAfterUse.T2).toBe(0);
      expect(result.remainingAfterUse.T3).toBe(0);
    });
  });

  describe('Scenario 3: Enough T1 to fulfill T1 + T2 + T3 requirements + 1 extra T4', () => {
    it('should synthesize correctly for T1 + T2 + T3 requirements + extra T4', () => {
      // Requisitos: 4 T1, 9 T2, 9 T3, 0 T4
      // CALCULA A MANO:
      // - 4 T1 directos
      // - 9 T2 = 27 T1
      // - 9 T3 = 27 T2 = 81 T1
      // - 1 T4 extra = 3 T3 = 9 T2 = 27 T1
      // Total: 4 + 27 + 81 + 27 = 139 T1
      const required = { T1: 4, T2: 9, T3: 9, T4: 0 };
      const owned = { T1: 139, T2: 0, T3: 0, T4: 0 };  // <-- VALOR A VERIFICAR
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas:
      expect(result.available.T1).toBe(4);   // Cumple T1
      expect(result.available.T2).toBe(9);   // Cumple T2
      expect(result.available.T3).toBe(9);   // Cumple T3
      expect(result.canFulfill).toBe(true);
      
      // Verifica que sobra material para 1 T4
      // Quedan 27 T1, que hacen 9 T2, que hacen 3 T3, que hacen 1 T4
      expect(result.remainingAfterUse.T1).toBe(27);
    });
  });

  describe('Scenario 4: Enough T1 to fulfill ALL requirements (T1 + T2 + T3 + T4) + extra', () => {
    it('should synthesize correctly for complete requirements with remainder', () => {
      // Requisitos: 4 T1, 9 T2, 9 T3, 9 T4
      // CALCULA A MANO:
      // - 4 T1 directos
      // - 9 T2 = 27 T1
      // - 9 T3 = 27 T2 = 81 T1
      // - 9 T4 = 27 T3 = 81 T2 = 243 T1
      // Total: 4 + 27 + 81 + 243 = 355 T1
      // Más 10 T1 extra = 365 T1 total
      const required = { T1: 4, T2: 9, T3: 9, T4: 9 };
      const owned = { T1: 365, T2: 0, T3: 0, T4: 0 };  // <-- VALOR A VERIFICAR
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas:
      expect(result.available.T1).toBe(4);   // Cumple T1
      expect(result.available.T2).toBe(9);   // Cumple T2
      expect(result.available.T3).toBe(9);   // Cumple T3
      expect(result.available.T4).toBe(9);   // Cumple T4
      expect(result.canFulfill).toBe(true);
      
      // Verifica que sobran 10 T1
      expect(result.remainingAfterUse.T1).toBe(10);
    });
  });

  describe('Scenario 5: Insufficient T1 - partial fulfillment', () => {
    it('should calculate partial fulfillment when not enough T1', () => {
      // Requisitos: 4 T1, 9 T2, 9 T3, 0 T4
      // Tenemos solo: 70 T1 (insuficiente)
      // CALCULA A MANO cuánto se puede cumplir:
      // - 4 T1 directos → quedan 66 T1
      // - 9 T2 = 27 T1 → quedan 39 T1
      // - 9 T3 necesitaría 81 T1, pero solo quedan 39
      //   - Con 39 T1 puedes hacer: 39/3 = 13 T2
      //   - Con 13 T2 puedes hacer: 13/3 = 4 T3 (resto 1 T2)
      const required = { T1: 4, T2: 9, T3: 9, T4: 0 };
      const owned = { T1: 70, T2: 0, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas (VERIFICA CON TUS CÁLCULOS):
      expect(result.available.T1).toBe(4);   // Cumple T1
      expect(result.available.T2).toBe(9);   // Cumple T2
      expect(result.available.T3).toBe(4);   // Solo puede hacer 4 T3 de los 9 requeridos
      expect(result.canFulfill).toBe(false); // NO puede cumplir todo
      
      // Verifica el resto
      // Después de hacer 4 T3, sobra 1 T2
      expect(result.remainingAfterUse.T2).toBe(1);
      expect(result.remainingAfterUse.T1).toBe(0);
    });
  });

  describe('Scenario 6: Mixed inventory (not only T1)', () => {
    it('should use existing higher quality materials first', () => {
      // Requisitos: 0 T1, 5 T2, 0 T3, 0 T4
      // Tenemos: 6 T1, 3 T2 (ya tenemos algunos T2)
      // CALCULA A MANO:
      // - Usa los 3 T2 que ya tiene
      // - Necesita 2 T2 más = 6 T1
      // - Total: usa 3 T2 directos + sintetiza 2 T2 de 6 T1
      const required = { T1: 0, T2: 5, T3: 0, T4: 0 };
      const owned = { T1: 6, T2: 3, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas:
      expect(result.available.T2).toBe(5);   // Cumple los 5 T2
      expect(result.canFulfill).toBe(true);
      
      // Verifica que se usaron los materiales correctamente
      expect(result.remainingAfterUse.T1).toBe(0);  // Usó todos los T1
      expect(result.remainingAfterUse.T2).toBe(0);  // Usó todos los T2 necesarios
    });
  });

  describe('Scenario 7: Augusta real requirements', () => {
    it('should calculate for Augusta Level 1->90 with Forte 1->10', () => {
      // Requisitos reales de Augusta (según la documentación corregida):
      // Common (Tidal Residuum): T1=33, T2=41, T3=41, T4=49
      // 
      // CALCULA A MANO cuántos T1 totales necesitas:
      // - 33 T1 directos
      // - 41 T2 = 123 T1
      // - 41 T3 = 123 T2 = 369 T1
      // - 49 T4 = 147 T3 = 441 T2 = 1323 T1
      // Total: 33 + 123 + 369 + 1323 = 1848 T1
      const required = { T1: 33, T2: 41, T3: 41, T4: 49 };
      const owned = { T1: 1848, T2: 0, T3: 0, T4: 0 };  // <-- VALOR CALCULADO
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Expectativas:
      expect(result.available.T1).toBe(33);  // Cumple T1
      expect(result.available.T2).toBe(41);  // Cumple T2
      expect(result.available.T3).toBe(41);  // Cumple T3
      expect(result.available.T4).toBe(49);  // Cumple T4
      expect(result.canFulfill).toBe(true);
      
      // No debe sobrar nada
      expect(result.remainingAfterUse.T1).toBe(0);
      expect(result.remainingAfterUse.T2).toBe(0);
      expect(result.remainingAfterUse.T3).toBe(0);
      expect(result.remainingAfterUse.T4).toBe(0);
    });

    it('should calculate Augusta with only 1000 T1 (insufficient)', () => {
      // User bug report: Con 1000 T1 en inventario, ¿cuánto puede cubrir?
      const required = { T1: 33, T2: 41, T3: 41, T4: 49 };
      const owned = { T1: 1000, T2: 0, T3: 0, T4: 0 };
      
      const result = calculateMaterialSynthesis(required, owned);
      
      // Cálculo manual:
      // - T1: 33 directos → quedan 967
      // - T2: 41 necesita 123 T1 → usa 123, quedan 844
      // - T3: 41 necesita 369 T1 → usa 369, quedan 475
      // - T4: 49 necesita 1323 T1, pero solo quedan 475
      //   - Con 475 T1 puedes hacer 475/27 = 17 T4 (resto 16 T1)
      
      expect(result.available.T1).toBe(33);   // Cumple T1
      expect(result.available.T2).toBe(41);   // Cumple T2
      expect(result.available.T3).toBe(41);   // Cumple T3
      expect(result.available.T4).toBe(17);   // Solo puede hacer 17 de 49
      expect(result.canFulfill).toBe(false);  // NO puede cumplir todo
      
      // Verifica el resto (el exceso queda distribuido en las calidades intermedias)
      const remainingT1Equivalent = 
        (result.remainingAfterUse.T1 || 0) +
        (result.remainingAfterUse.T2 || 0) * 3 +
        (result.remainingAfterUse.T3 || 0) * 9 +
        (result.remainingAfterUse.T4 || 0) * 27;
      
      // Sobran 1 T1 + 2 T2 + 1 T3 = 1 + 6 + 9 = 16 T1 equivalentes
      expect(result.remainingAfterUse.T1).toBe(1);
      expect(result.remainingAfterUse.T2).toBe(2);
      expect(result.remainingAfterUse.T3).toBe(1);
      expect(remainingT1Equivalent).toBe(16);
    });
  });
});

