import { describe, expect, test } from "vitest";
import materialSubstract from "./materialSubstract";

describe("materialSubstract", () => {
  // Ejemplo 1: Conversión directa de T2 a T3
  // human checked, do not modify this one
  test("Ejemplo 1: Conversión directa de T2 a T3", () => {
    const inventory = [0, 9, 0, 0];
    const requirements = [0, 0, 3, 0];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 2: Uso parcial directo + síntesis de T2 a T3
  // human checked, do not modify this one
  test("Ejemplo 2: Uso parcial directo + síntesis de T2 a T3", () => {
    const inventory = [0, 5, 1, 0];
    const requirements = [0, 0, 3, 0];
    const expected = new Error(
      "Not enough materials to synthesize 2x T3 from T2"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(Error);
  });

  // Ejemplo 3: Múltiples niveles de síntesis encadenados (27 T1 -> 9 T2 -> 3 T3 -> 1 T3 usado)
  test("Ejemplo 3: Múltiples niveles de síntesis encadenados", () => {
    const inventory = [27, 0, 0, 0];
    const requirements = [0, 0, 1, 0];
    const expected = [18, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 4: Descuento de T4 con síntesis desde T3
  test("Ejemplo 4: Descuento de T4 con síntesis desde T3", () => {
    const inventory = [0, 0, 6, 1];
    const requirements = [0, 0, 0, 3];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 5: Combinación de directos y síntesis en varios niveles
  test("Ejemplo 5: Combinación de directos y síntesis en varios niveles", () => {
    const inventory = [18, 0, 2, 0];
    const requirements = [0, 0, 0, 1];
    const expected = [9, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 6: Inventario mixto, con sobras
  test("Ejemplo 6: Inventario mixto, con sobras", () => {
    const inventory = [10, 6, 2, 0];
    const requirements = [0, 0, 3, 0];
    const expected = [10, 3, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 7: Síntesis completa desde T1 hasta T4
  test("Ejemplo 7: Síntesis completa desde T1 hasta T4", () => {
    const inventory = [81, 0, 0, 0];
    const requirements = [0, 0, 0, 1];
    const expected = [54, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 8: T3 justo y sin sobras
  test("Ejemplo 8: T3 justo y sin sobras", () => {
    const inventory = [9, 3, 0, 0];
    const requirements = [0, 0, 1, 0];
    const expected = [9, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 9: T2 no suficiente, pero T1 sí
  test("Ejemplo 9: T2 no suficiente, pero T1 sí", () => {
    const inventory = [20, 2, 0, 0];
    const requirements = [0, 3, 0, 0];
    const expected = [17, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 10: Requerimientos altos y encadenamiento parcial
  test("Ejemplo 10: Requerimientos altos y encadenamiento parcial", () => {
    const inventory = [20, 3, 1, 0];
    const requirements = [0, 0, 0, 1];
    const expected = [11, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 11: Requiere T2 y T3, con síntesis parcial
  test("Ejemplo 11: Requiere T2 y T3, con síntesis parcial", () => {
    const inventory = [12, 2, 1, 0];
    const requirements = [0, 3, 2, 0];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 12: Requiere T1, T3 y T4 – encadenamiento completo
  test("Ejemplo 12: Requiere T1, T3 y T4 – encadenamiento completo", () => {
    const inventory = [40, 3, 1, 0];
    const requirements = [5, 0, 2, 1];
    const expected = [8, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 13: Requiere solo T3 y T4 pero todo viene desde T1
  test("Ejemplo 13: Requiere solo T3 y T4 pero todo viene desde T1", () => {
    const inventory = [90, 0, 0, 0];
    const requirements = [0, 0, 2, 2];
    const expected = [18, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 14: Mezcla intermedia con sobras
  test("Ejemplo 14: Mezcla intermedia con sobras", () => {
    const inventory = [20, 5, 4, 1];
    const requirements = [0, 4, 2, 2];
    const expected = [14, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 15: Síntesis desde distintos niveles para cubrir múltiples tiers (resultado parcial)
  test("Ejemplo 15: Síntesis desde distintos niveles", () => {
    const inventory = [18, 3, 0, 1];
    const requirements = [0, 3, 0, 2];
    const expected = new Error(
      "Not enough materials to synthesize 9x T2 from T1"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(Error);
  });

  // Ejemplo 16: Usar todo tipo de materiales en su justa medida
  test("Ejemplo 16: Usar todo tipo de materiales en su justa medida", () => {
    const inventory = [15, 6, 2, 0];
    const requirements = [0, 2, 3, 1];
    const expected = new Error(
      "Not enough materials to synthesize 8x T2 from T1"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(Error);
  });

  // Ejemplo 17: Sobran materiales tras sintetizar lo justo
  test("Ejemplo 17: Sobran materiales tras sintetizar lo justo", () => {
    const inventory = [60, 6, 3, 0];
    const requirements = [0, 0, 0, 2];
    const expected = [51, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 18: Solo se logra completar parte de los materiales requeridos
  test("Ejemplo 18: Solo se logra completar parte de los materiales requeridos", () => {
    const inventory = [10, 2, 1, 0];
    const requirements = [0, 0, 2, 1];
    const expected = new Error(
      "Not enough materials to synthesize 1x T4 from T3"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Ejemplo 19: Caso mixto con sobras en todos los niveles
  test("Ejemplo 19: Caso mixto con sobras en todos los niveles", () => {
    const inventory = [20, 10, 5, 2];
    const requirements = [0, 4, 4, 2];
    const expected = [20, 6, 1, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Ejemplo 20: Materiales desbalanceados obligan a usar muchos T1
  test("Ejemplo 20: Materiales desbalanceados obligan a usar muchos T1", () => {
    const inventory = [60, 0, 0, 0];
    const requirements = [0, 3, 2, 1];
    const expected = [6, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de error: No hay suficientes materiales de T1 para sintetizar T2
  test("Caso de error: No hay suficientes T2 desde T1", () => {
    const inventory = [0, 0, 0, 0];
    const requirements = [0, 1, 0, 0];
    const expected = new Error(
      "Not enough materials to synthesize 1x T2 from T1"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Caso de error: No hay suficientes materiales de T2 para sintetizar T3
  test("Caso de error: No hay suficientes T3 desde T2", () => {
    const inventory = [0, 0, 0, 0];
    const requirements = [0, 0, 1, 0];
    const expected = new Error(
      "Not enough materials to synthesize 1x T3 from T2"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Caso de error: No hay suficientes materiales de T3 para sintetizar T4
  test("Caso de error: No hay suficientes T4 desde T3", () => {
    const inventory = [0, 0, 0, 0];
    const requirements = [0, 0, 0, 1];
    const expected = new Error(
      "Not enough materials to synthesize 1x T4 from T3"
    );
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Caso de error: Inventario vacío y requerimientos
  test("Caso de error: Inventario vacío y requerimientos", () => {
    const inventory = [0, 0, 0, 0];
    const requirements = [1, 1, 1, 1];
    const expected = new Error("Not enough materials to subtract 1x T1");
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Caso de éxito: No se requieren materiales
  test("Caso de éxito: No se requieren materiales", () => {
    const inventory = [10, 10, 10, 10];
    const requirements = [0, 0, 0, 0];
    const expected = [10, 10, 10, 10];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de éxito: Solo se requieren T1
  test("Caso de éxito: Solo se requieren T1", () => {
    const inventory = [10, 10, 10, 10];
    const requirements = [5, 0, 0, 0];
    const expected = [5, 10, 10, 10];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de error: No hay suficientes T1 directos
  test("Caso de error: No hay suficientes T1 directos", () => {
    const inventory = [4, 0, 0, 0];
    const requirements = [5, 0, 0, 0];
    const expected = new Error("Not enough materials to subtract 5x T1");
    expect(() => materialSubstract(inventory, requirements)).toThrow(
      expected.message
    );
  });

  // Caso de éxito: Sintetizar T2 con T1 existentes
  test("Caso de éxito: Sintetizar T2 con T1 existentes", () => {
    const inventory = [3, 0, 0, 0];
    const requirements = [0, 1, 0, 0];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de éxito: Sintetizar T3 con T2 existentes
  test("Caso de éxito: Sintetizar T3 con T2 existentes", () => {
    const inventory = [0, 3, 0, 0];
    const requirements = [0, 0, 1, 0];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de éxito: Sintetizar T4 con T3 existentes
  test("Caso de éxito: Sintetizar T4 con T3 existentes", () => {
    const inventory = [0, 0, 3, 0];
    const requirements = [0, 0, 0, 1];
    const expected = [0, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de éxito: Requerimientos de T1, T2 y T3
  test("Caso de éxito: Requerimientos de T1, T2 y T3", () => {
    const inventory = [10, 10, 10, 10];
    const requirements = [2, 1, 1, 0];
    const expected = [8, 9, 9, 10];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });

  // Caso de error: Requerimientos T4, con T3, T2, T1 disponibles
  test("Caso de éxito: Requerimientos T4 cubiertos por síntesis en cascada", () => {
    const inventory = [27, 9, 3, 1];
    const requirements = [0, 0, 0, 3];
    // Se consume: 1 T4 directo, 3 T3 directo, 9 T2 directo.
    const expected = [27, 0, 0, 0];
    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });
  test("Caso de exito: Requerimientos T4, con T3, T2, T1 suficientes", () => {
    const inventory = [26, 8, 3, 1]; // Se reduce un T1 y un T2 para forzar el error.
    const requirements = [0, 0, 0, 3];
    const expected = [23, 0, 0, 0];

    expect(materialSubstract(inventory, requirements)).toEqual(expected);
  });
});
