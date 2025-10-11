# Manual de Progresión de Resonators en Wuthering Waves (CORREGIDO)

Este documento es la base de datos y libro de reglas para el desarrollo de la calculadora de materiales de Personajes (Resonators). Contiene todos los niveles, costes y la lógica de síntesis.

---

## 1. Terminología y Estructura de Progresión

| ID | Término | Tipo de Recurso | Descripción |
| :--- | :--- | :--- | :--- |
| MAT_BASE | Material Base (Núcleos) | Drop de Enemigo | Material de Ascensión y Fortes. |
| MAT_FORTE | Material de Forte (Libros) | Dominio de Forte | Material exclusivo de Fortes. |
| MAT_BOSS_MUNDO | Material Jefe de Mundo | Drop de Jefe | Material de Ascensión (Huesos/Coronas/Fragmentos, etc.). |
| MAT_BOSS_SEMANAL | Material Jefe Semanal | Drop de Jefe Semanal | Material exclusivo de Fortes (a partir de Nv. 6). |
| MAT_LOCAL | Material Local | Recolectable | Material exclusivo de Ascensión. |
| EXP_POT | Poción de Resonancia | Consumible | Ítem de experiencia para el Resonator. |
| SHELL | Shell Credits | Moneda | Coste en todas las subidas. |

---

## 2. Sistema de Ascensión (Nivel y EXP)

### 2.1. Requisitos de EXP por Nivel (Pociones de Resonancia - Corregido)

**EXP Total Requerida para un Resonator (Nv. 1 $\rightarrow$ Nv. 90):**

$$\mathbf{EXP\ Total\ Resonator\ (1\rightarrow 90)} \approx \mathbf{4,125,000}$$

| HITO_NIVEL | EXP_TOTAL_ACUMULADA (Aprox.) | SHELL_CREDITS_NIVELACION (Aprox.) |
| :--- | :--- | :--- |
| 1 $\rightarrow$ 40 | 280,000 | 60,000 |
| 40 $\rightarrow$ 50 | 270,000 | 40,000 |
| 50 $\rightarrow$ 60 | 410,000 | 70,000 |
| 60 $\rightarrow$ 70 | 620,000 | 105,000 |
| 70 $\rightarrow$ 80 | 960,000 | 175,000 |
| 80 $\rightarrow$ 90 | 1,585,000 | 315,000 |
| **TOTAL 1 $\rightarrow$ 90** | $\mathbf{4,125,000}$ | $\mathbf{765,000}$ |

**Regla de Pociones de Resonancia (EXP_POT):**

| ID_POTION | NOMBRE_COMUN | EXP_OTORGADA |
| :--- | :--- | :--- |
| Verde (1★) | Basic Resonance Potion | 1,000 |
| Azul (2★) | Medium Resonance Potion | 4,000 |
| Morada (3★) | Advanced Resonance Potion | 10,000 |
| Dorada (4★) | Premium Resonance Potion | 20,000 |

**Lógica de Cálculo de Pociones (IA - Corregida para 4 Tiers):**
1.  Calcular la EXP neta necesaria ($E_{neta}$).
2.  $N_{\text{Dorada}} = \lfloor E_{neta} / 20000 \rfloor$
3.  $E_{\text{restante}} = E_{neta} \pmod{20000}$
4.  $N_{\text{Morada}} = \lfloor E_{\text{restante}} / 10000 \rfloor$
5.  $E_{\text{restante}} = E_{\text{restante}} \pmod{10000}$
6.  $N_{\text{Azul}} = \lfloor E_{\text{restante}} / 4000 \rfloor$
7.  $E_{\text{restante}} = E_{\text{restante}} \pmod{4000}$
8.  $N_{\text{Verde}} = \lceil E_{\text{restante}} / 1000 \rceil$

### 2.3. Requisitos de Materiales Fijos por Ascensión (Mismo que el anterior)

Esta tabla permanece **sin cambios**, ya que la Ascensión no depende de la EXP de nivel, sino de los materiales de hito:

| ID_ASCENSION | NIVEL_MAX | MAT_BASE_VERDE | MAT_BASE_AZUL | MAT_BASE_MORADO | MAT_BASE_DORADO | MAT_BOSS_MUNDO | MAT_LOCAL | SHELL |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A1_20 | 40 | 4 | 0 | 0 | 0 | 3 | 0 | 5000 |
| A2_40 | 50 | 0 | 4 | 0 | 0 | 6 | 4 | 10000 |
| A3_50 | 60 | 0 | 8 | 0 | 0 | 9 | 8 | 15000 |
| A4_60 | 70 | 0 | 0 | 4 | 0 | 12 | 12 | 20000 |
| A5_70 | 80 | 0 | 0 | 8 | 0 | 16 | 16 | 40000 |
| A6_80 | 90 | 0 | 0 | 0 | 4 | 20 | 20 | 80000 |
| **TOTAL_1_90** | **90** | **4** | **12** | **12** | **4** | **66** | **60** | **170000** |

---

## 3. Sistema de Fortes y Nodos (Sin cambios)

*Las tablas y costes de Forte (Sección 3.1) y Nodos (Sección 3.2) permanecen **sin cambios**, ya que solo la EXP de Nivel fue el punto de revisión.*

---

## 4. Lógica del Sistema de Síntesis (Sin cambios)

*La tabla y lógica de conversión $3:1$ permanece **sin cambios** para garantizar la consistencia en la conversión de materiales.*

---

## 5. Coste Total Acumulado (Para Verificación - Recalculado)

El coste total de `SHELL` es la suma de:

$$\mathbf{C}_{\text{Total}} = \mathbf{C}_{\text{Ascension Fija}} + \mathbf{C}_{\text{Nivel EXP}} + \mathbf{C}_{\text{Fortes}} + \mathbf{C}_{\text{Nodos Pasivos}} + \mathbf{C}_{\text{Síntesis}}$$

| Componente | Nivel Max $\rightarrow$ Nivel Max | Coste Mínimo SHELL (Aprox.) |
| :--- | :--- | :--- |
| Ascensión Fija (A1 $\rightarrow$ A6) | Nv. 90 | $\mathbf{170,000}$ |
| Subida de Nivel (EXP) | Nv. 1 $\rightarrow$ 90 | $\mathbf{765,000}$ |
| Fortes (5 Habilidades a Nv. 10) | Nv. 10 | $\mathbf{1,400,000}$ |
| Nodos Pasivos (4 Nodos) | $\checkmark$ | $\mathbf{36,000}$ |
| **TOTAL BRUTO (MAXEO COMPLETO)** | | $\mathbf{2,371,000}$ |

*El coste total de Shell Credits no cambia significativamente por la re-denominación de las pociones, ya que el coste de la EXP se mantuvo constante.*