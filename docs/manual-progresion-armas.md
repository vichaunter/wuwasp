# Manual de Progresión de Armas en Wuthering Waves (Para Planificador/IA)

Este documento detalla los datos y reglas para calcular los materiales necesarios para la progresión de cualquier Arma de 5 Estrellas (5*) en Wuthering Waves, de Nivel 1 a Nivel 90.

---

## 1. Terminología y Estructura de Progresión

| ID | Término | Tipo de Recurso | Descripción |
| :--- | :--- | :--- | :--- |
| MAT_ARMA | Material de Arma | Dominio Diario | Material de Ascensión de Arma (depende del día/tipo). |
| MAT_BASE | Material Base (Núcleos) | Drop de Enemigo | Material de Ascensión de Arma. |
| EXP_ARMA | Material EXP de Arma (Núcleos) | Consumible | Ítem de experiencia para el Arma (Básico, Avanzado, Premium). |
| SHELL | Shell Credits | Moneda | Coste en todas las subidas. |

---

## 2. Sistema de Ascensión de Arma (Nivel y EXP)

El sistema requiere EXP para la nivelación y Materiales Fijos en los niveles clave para la Ascensión. Los costes de Ascensión son idénticos para Armas de 4★ y 5★, pero la EXP total es ligeramente diferente. Usaremos la EXP para 5★.

### 2.1. Requisitos de Materiales Fijos por Ascensión (Coste Acumulado)

La IA debe sumar estos costes por Ascensión para obtener el total para el nivel objetivo del Arma.

| ID_ASCENSION | NIVEL_MAX | MAT_BASE_VERDE | MAT_BASE_AZUL | MAT_BASE_MORADO | MAT_BASE_DORADO | MAT_ARMA_ESPECIFICO | SHELL |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A1_20 | 40 | 6 | 0 | 0 | 0 | 3 V | 5000 |
| A2_40 | 50 | 0 | 6 | 0 | 0 | 6 A | 10000 |
| A3_50 | 60 | 0 | 10 | 0 | 0 | 9 A | 15000 |
| A4_60 | 70 | 0 | 0 | 6 | 0 | 6 M | 20000 |
| A5_70 | 80 | 0 | 0 | 12 | 0 | 9 M | 40000 |
| A6_80 | 90 | 0 | 0 | 0 | 6 | 4 D | 80000 |
| **TOTAL_1_90** | **90** | **6** | **16** | **18** | **6** | **3 V, 15 A, 15 M, 4 D** | **170000** |

*Nota sobre MAT_ARMA_ESPECIFICO: Los materiales de Dominio de Arma se listan con la rareza mínima necesaria para la Ascensión. Ej: 3 V = 3 Materiales de Arma Verdes (Crude Ring, Inert Metallic Drip, etc.).*

### 2.2. Requisitos de EXP por Nivel (Material EXP de Arma)

**EXP Total Requerida para un Arma 5★ (Nv. 1 → Nv. 90):**

$$\mathbf{EXP\ Total\ Arma\ 5\star\ (1\rightarrow 90)} \approx \mathbf{2,692,000}$$

| HITO_NIVEL | EXP_TOTAL_ACUMULADA (Aprox.) | SHELL_CREDITS_NIVELACION (Aprox.) |
| :--- | :--- | :--- |
| 1 → 40 | 200,000 | 40,000 |
| 40 → 50 | 200,000 | 30,000 |
| 50 → 60 | 300,000 | 50,000 |
| 60 → 70 | 450,000 | 75,000 |
| 70 → 80 | 680,000 | 135,000 |
| 80 → 90 | 862,000 | 200,000 |
| **TOTAL 1 → 90** | $\mathbf{2,692,000}$ | $\mathbf{530,000}$ |

**Regla de Material EXP de Arma (EXP_ARMA):**

| ID_EXP_ARMA | NOMBRE_COMUN | EXP_OTORGADA |
| :--- | :--- | :--- |
| Verde (Basic Energy Core) | Básico | 1,000 |
| Azul (Advanced Energy Core) | Avanzado | 4,000 |
| Dorado (Premium Energy Core) | Premium | 8,000 |

**Lógica de Cálculo de EXP_ARMA (IA - CORREGIDA):**
1.  Calcular la EXP neta necesaria ($E_{neta}$).
2.  $N_{\text{Dorado}} = \lfloor E_{neta} / 8000 \rfloor$
3.  $E_{\text{restante}} = E_{neta} \pmod{8000}$
4.  $N_{\text{Azul}} = \lfloor E_{\text{restante}} / 4000 \rfloor$
5.  $E_{\text{restante}} = E_{\text{restante}} \pmod{4000}$
6.  $N_{\text{Verde}} = \lceil E_{\text{restante}} / 1000 \rceil$

---

## 3. Lógica del Sistema de Síntesis (Reglas 3:1)

El sistema de síntesis opera de forma idéntica para los Materiales Base (MAT_BASE) y los Materiales de Arma (MAT_ARMA).

**Regla de Conversión (MAT_BASE y MAT_ARMA):**

| CONVERSION | INPUT | OUTPUT | SHELL_COST_UNITARIO |
| :--- | :--- | :--- | :--- |
| Verde → Azul | 3 V | 1 A | 50 |
| Azul → Morado | 3 A | 1 M | 150 |
| Morado → Dorado | 3 M | 1 D | 500 |

**Instrucción Clave para la IA (Lógica de Conversión):**
1.  La IA debe calcular la cantidad **neta** requerida para cada Material Base (MAT_BASE) y para cada Material de Arma (MAT_ARMA) de todas las rarezas.
2.  Si el usuario tiene un **exceso** de materiales de rareza inferior, la IA debe aplicar la regla $3:1$ (Verde → Azul → Morado → Dorado) para compensar el déficit de la rareza superior.
3.  El coste de `SHELL` generado por estas síntesis ($N_{\text{Conversiones}} \times \text{SHELL\_COST\_UNITARIO}$) debe sumarse al `SHELL_TOTAL`.
4.  La IA debe permitir al usuario especificar el **tipo** de Material de Arma (Ej: Crude Ring, Cadence Seed, etc.) para vincular el material específico al cálculo.

---

## 4. Coste Total Acumulado (Para Verificación)

El coste total de `SHELL` es la suma de:

$$\mathbf{C}_{\text{Total}} = \mathbf{C}_{\text{Ascension Fija}} + \mathbf{C}_{\text{Nivel EXP}} + \mathbf{C}_{\text{Síntesis}}$$

| Componente | Nivel Max → Nivel Max | Coste Mínimo SHELL (Aprox.) |
| :--- | :--- | :--- |
| Ascensión Fija (A1 → A6) | Nv. 90 | $\mathbf{170,000}$ |
| Subida de Nivel (EXP) | Nv. 1 → 90 | $\mathbf{530,000}$ |
| **TOTAL BRUTO (MAXEO COMPLETO)** | | $\mathbf{700,000}$ |

Esta estructura modular y las reglas $3:1$ proporcionadas deben ser suficientes para que la IA desarrolle la calculadora de materiales de Arma de forma precisa, basándose en el nivel objetivo y el inventario del usuario.