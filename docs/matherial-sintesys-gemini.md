# 📝 Documentación del Sistema de Síntesis de Materiales en Wuthering Waves

Esta documentación describe el sistema de **materiales de ascensión** en **Wuthering Waves**, centrándose en el mecanismo de síntesis o _crafting_ de materiales de mayor calidad a partir de materiales de menor calidad.

## 🌟 Sistema de Calidad de Materiales

Los materiales de ascensión se dividen en cuatro niveles de calidad (o _Tiers_):

|    Calidad     | Nomenclatura Común | Uso Principal                                          |
| :------------: | :----------------: | :----------------------------------------------------- |
|   **Básico**   |    T1 (Tier 1)     | Ascensión inicial de personajes y armas.               |
| **Intermedio** |    T2 (Tier 2)     | Ascensión intermedia de personajes y armas.            |
|  **Avanzado**  |    T3 (Tier 3)     | Ascensión de alto nivel de personajes y armas.         |
|  **Superior**  |    T4 (Tier 4)     | Ascensión final y de alto nivel de personajes y armas. |

---

## 🔬 Mecanismo de Síntesis (Crafting)

El proceso de **síntesis** permite a los jugadores convertir materiales de baja calidad en materiales de mayor calidad.

### 🧪 Proporción de Síntesis

La regla de síntesis es **constante** y **unidireccional** (solo de inferior a superior):

> **3x Material de Calidad N -> 1x Material de Calidad N+1**

Para obtener un material de la siguiente calidad superior, se requieren **tres** unidades del material inmediatamente inferior.

### 📊 Esquema de Conversión

| Material a Obtener | Materiales Requeridos (Costo) | Relación de Costo |
| :----------------: | :---------------------------: | :---------------: |
|     **1x T2**      |             3x T1             |   1 T2 <- 3 T1    |
|     **1x T3**      |             3x T2             |   1 T3 <- 3 T2    |
|     **1x T4**      |             3x T3             |   1 T4 <- 3 T3    |

### 🔄 Conversión en Cadena (Equivalencia T1)

| Material a Obtener | Equivalencia en T1 |      Cálculo      |
| :----------------: | :----------------: | :---------------: |
|     **1x T2**      |       3x T1        |       3 T1        |
|     **1x T3**      |       9x T1        |   3 x 3 = 9 T1    |
|     **1x T4**      |       27x T1       | 3 x 3 x 3 = 27 T1 |

---

## 💡 Implicación para el Planificador de Inventario

La capacidad de síntesis es vital. Un material de alta calidad se considera **disponible** si el jugador posee suficientes materiales de menor calidad para sintetizarlo.

> **Regla Crucial:** La función de descuento debe simular la síntesis. Si un material requerido (ej. T3) no existe, debe consumir la cantidad equivalente de materiales inferiores (ej. 3xT2) para cubrir la necesidad.

### 📝 Estrategia de Descuento

1.  **Iterar las necesidades de mayor a menor calidad** (T4 -> T3 -> T2).
2.  Para cada calidad (N), cubrir la necesidad con el **stock existente** (consumo directo antes de iteraciones y descontar de inventario directamente ya que para sintetizar necesitamos materiales existentes y estos ya se habrán consumido).
3.  Si hay un déficit, calcular la cantidad de material de calidad inferior (N-1) requerida (multiplicando el déficit por 3).
4.  **Descontar** ese material de calidad N-1 del inventario.
5.  Repetir el proceso en cascada.
6.  **El inventario devuelto será un nuevo objeto de inventario con los materiales descontados para no modificar el inventario original.**
7.  **Si no hay suficientes materiales de nivel inferior, no se puede sintetizar y devolverá error que se tiene que manejar en la UI.**

### 📖 Ejemplo de Descuento: Caso Combinado

|              Estado              |  T1   |   T2   |  T3   |  T4   | Notas                                                                       |
| :------------------------------: | :---: | :----: | :---: | :---: | :-------------------------------------------------------------------------- |
|      **Inventario Inicial**      |   1   |   30   |   0   |   1   |                                                                             |
|          **Requerido**           |   0   |   0    |   3   |   1   |                                                                             |
|     **Paso 1: Descontar T4**     |   1   |   30   |   0   |   0   | El 1xT4 se descuenta directamente (1-1=0).                                  |
| **Paso 2: Cubrir Déficit de T3** |   1   |   21   |   0   |   0   | Se necesitan 3xT3. Se requieren 3 x 3 = 9 T2. Se descuentan 9 T2 (30-9=21). |
|       **Inventario Final**       | **1** | **21** | **0** | **0** | El inventario final.                                                        |
