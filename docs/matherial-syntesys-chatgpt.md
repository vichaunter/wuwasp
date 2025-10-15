# 📦 Sistema de Síntesis de Materiales en Wuthering Waves

La síntesis de materiales es una mecánica clave para la gestión de recursos en Wuthering Waves. En esta documentación se describe cómo funciona la síntesis, cómo se clasifican los materiales, y cómo se deben descontar correctamente del inventario cuando se marcan como "completados" en una aplicación de planificación.

---

## 🧪 ¿Qué es la síntesis?

La **síntesis** es el proceso por el cual se pueden convertir materiales de calidad inferior en materiales de calidad superior mediante una proporción fija. Esta mecánica permite al jugador cubrir requisitos de materiales aunque no tenga suficientes del nivel exacto, siempre y cuando tenga suficientes de los niveles inferiores.

---

## 🏷️ Niveles de materiales

Los materiales de ascensión (por ejemplo, _Helix_) existen en 4 niveles de calidad, identificados como:

- **T1** (Tier 1) → Nivel más bajo
- **T2** (Tier 2)
- **T3** (Tier 3)
- **T4** (Tier 4) → Nivel más alto

Un inventario puede tener cantidades distintas de cada nivel de un mismo tipo de material.

---

## 🔁 Reglas de síntesis

La síntesis sigue una regla estricta de conversión 3:1 entre niveles consecutivos:

3x T1 => 1x T2
3x T2 => 1x T3
3x T3 => 1x T4

> Esta conversión **es unidireccional**: solo puedes sintetizar hacia arriba, nunca deshacerla hacia abajo.

---

## 📉 Descuento de materiales con síntesis

Cuando un personaje es marcado como “completado”, los materiales necesarios para su ascensión deben descontarse del inventario.

Dado que pueden faltar materiales directos, la función encargada del descuento debe aplicar **síntesis implícita** para cumplir con los requisitos siempre que haya materiales de menor calidad suficientes para ello.

### 🧮 Prioridad de uso

La lógica de descuento sigue este orden:

1. Primero se usan los materiales exactos del nivel requerido.
2. Si no hay suficientes, se sintetizan solo los necesarios desde los niveles inferiores.
3. Nunca se sintetiza más material del necesario.
4. Si no hay materiales suficientes para cumplir el requerimiento, se debe devolver un error.
5. La síntesis puede encadenarse entre niveles (T1 → T2 → T3 → T4).

---

## 📘 Ejemplos de síntesis y descuento

### Ejemplo 1

#### Inventario inicial:

T1: 0
T2: 9
T3: 0
T4: 0

#### Requeridos:

T3: 3

#### Conversión realizada:

- 9x T2 → 3x T3

#### Resultado final:

T1: 0
T2: 0
T3: 0
T4: 0

---

### Ejemplo 2

#### Inventario inicial:

T1: 1
T2: 30
T3: 0
T4: 1

#### Requeridos:

T3: 3
T4: 1

#### Conversión realizada:

- 9x T2 → 3x T3
- 1x T4 usado directamente

#### Resultado final:

T1: 1
T2: 21
T3: 0
T4: 0

---

### Ejemplo 3

#### Inventario inicial:

T1: 40
T2: 0
T3: 0
T4: 0

#### Requeridos:

T3: 1

#### Conversión realizada:

- 27x T1 → 9x T2 → 3x T3 → 1x T3 usado

#### Resultado final:

T1: 13
T2: 0
T3: 0
T4: 0

> Se sintetizaron 1x T3, ya que solo hacía falta 1x T3. El resto queda en el inventario en su valor original.

---

## 🛠️ Consideraciones para implementación

- La función de descuento debe permitir pasar dos arrays:
  1. El inventario actual (`[T1, T2, T3, T4]`)
  2. Los materiales requeridos (`[T1_needed, T2_needed, T3_needed, T4_needed]`)
- La función debe devolver el inventario actualizado (`[T1, T2, T3, T4]`).
- Siempre se prefiere **usar antes que sintetizar**.
- La función puede **no puede sintetizar más de lo necesario** en ningún caso ya.

> Se recomienda crear tests unitarios para cada uno de los casos anteriores, y para casos adicionales con materiales mixtos.

## 📌 Próximos pasos

Esta documentación es la base para el desarrollo de la función `discountMaterialsWithSynthesis()`. A partir de aquí se desarrollarán:

- Los tests en TypeScript.
- La función principal de lógica de descuento.
- Su integración con la UI.

Ejemplos

---

# 🧪 Ejemplos complejos de sintetización de materiales en Wuthering Waves

A continuación se presentan 10 ejemplos avanzados sobre cómo aplicar la lógica de síntesis de materiales respetando las reglas establecidas:

- Se **usa primero el material del tier exacto si está disponible**.
- Solo se **sintetiza la cantidad estrictamente necesaria** para completar lo que falta.
- La síntesis sigue la regla:  
  `3x T1 → 1x T2`  
  `3x T2 → 1x T3`  
  `3x T3 → 1x T4`

---

## 📘 Ejemplo 1: Conversión directa de T2 a T3

**Inventario inicial:**

- T1: 0
- T2: 9
- T3: 0
- T4: 0

**Requeridos:**

- T3: 3

**Proceso:**

- No hay T3 → se sintetizan 3x T3 usando 9x T2.

**Inventario final:**

- T1: 0
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 2: Uso parcial directo + síntesis de T2 a T3

**Inventario inicial:**

- T1: 0
- T2: 5
- T3: 1
- T4: 0

**Requeridos:**

- T3: 3

**Proceso:**

- Usamos 1x T3.
- Faltan 2x T3 → se sintetizan con 6x T2 → usamos 6x T2.

**Inventario final:**

- T1: 0
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 3: Múltiples niveles de síntesis encadenados

**Inventario inicial:**

- T1: 27
- T2: 0
- T3: 0
- T4: 0

**Requeridos:**

- T3: 1

**Proceso:**

- 27x T1 → 9x T2 → 3x T3 → usamos 1x T3

**Inventario final:**

- T1: 0
- T2: 0
- T3: 2
- T4: 0

---

## 📘 Ejemplo 4: Descuento de T4 con síntesis desde T3

**Inventario inicial:**

- T1: 0
- T2: 0
- T3: 6
- T4: 1

**Requeridos:**

- T4: 3

**Proceso:**

- Usamos 1x T4.
- Faltan 2x T4 → sintetizamos 6x T3 → obtenemos 2x T4.

**Inventario final:**

- T1: 0
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 5: Combinación de directos y síntesis en varios niveles

**Inventario inicial:**

- T1: 18
- T2: 0
- T3: 2
- T4: 0

**Requeridos:**

- T4: 1

**Proceso:**

- 3x T3 necesarios → hay 2 → falta 1x T3 → sintetizar 3x T2 → requiere 9x T1
- Se usa 9x T1 → obtenemos 3x T2 → 1x T3 → se sintetiza 1x T4

**Inventario final:**

- T1: 9
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 6: Inventario mixto, con sobras

**Inventario inicial:**

- T1: 10
- T2: 6
- T3: 2
- T4: 0

**Requeridos:**

- T3: 3

**Proceso:**

- Usamos 2x T3.
- Faltan 1x T3 → sintetizamos 3x T2 → usamos.

**Inventario final:**

- T1: 10
- T2: 3
- T3: 0
- T4: 0

---

## 📘 Ejemplo 7: Síntesis completa desde T1 hasta T4

**Inventario inicial:**

- T1: 81
- T2: 0
- T3: 0
- T4: 0

**Requeridos:**

- T4: 1

**Proceso:**

- 81x T1 → 27x T2 → 9x T3 → 3x T4 → usamos 1x T4

**Inventario final:**

- T1: 54
- T2: 0
- T3: 0
- T4: 2

---

## 📘 Ejemplo 8: T3 justo y sin sobras

**Inventario inicial:**

- T1: 9
- T2: 3
- T3: 0
- T4: 0

**Requeridos:**

- T3: 1

**Proceso:**

- 9x T1 → 3x T2 → 1x T3 → usamos

**Inventario final:**

- T1: 0
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 9: T2 no suficiente, pero T1 sí

**Inventario inicial:**

- T1: 20
- T2: 2
- T3: 0
- T4: 0

**Requeridos:**

- T2: 3

**Proceso:**

- Usamos 2x T2.
- Falta 1x T2 → 3x T1 → usamos.

**Inventario final:**

- T1: 17
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 10: Requerimientos altos y encadenamiento parcial

**Inventario inicial:**

- T1: 20
- T2: 3
- T3: 1
- T4: 0

**Requeridos:**

- T4: 1

**Proceso:**

- 3x T3 necesarios → hay 1 → faltan 2x T3 → 6x T2 necesarios → hay 3 → faltan 3x T2
- 3x T2 → 9x T1 → se sintetiza todo → se obtiene T4

**Inventario final:**

- T1: 11
- T2: 0
- T3: 0
- T4: 0

# 🔄 Ejemplos de síntesis con múltiples materiales requeridos

---

## 📘 Ejemplo 11: Requiere T2 y T3, con síntesis parcial

**Inventario inicial:**

- T1: 12
- T2: 2
- T3: 1
- T4: 0

**Requeridos:**

- T2: 3
- T3: 2

**Proceso:**

- T2: hay 2 → falta 1 → sintetizamos 3x T1 → obtenemos 1x T2
- T3: hay 1 → falta 1 → sintetizamos 3x T2 → usamos

**Inventario final:**

- T1: 9
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 12: Requiere T1, T3 y T4 – encadenamiento completo

**Inventario inicial:**

- T1: 40
- T2: 3
- T3: 1
- T4: 0

**Requeridos:**

- T1: 5
- T3: 2
- T4: 1

**Proceso:**

- T1: se consumen 5 directamente
- T3: hay 1 → falta 1 → 3x T2 → sintetizado desde 9x T1
- T4: se necesitan 3x T3 → hay 2 → falta 1 → 3x T2 → 9x T1

**Inventario final:**

- T1: 17
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 13: Requiere solo T3 y T4 pero todo viene desde T1

**Inventario inicial:**

- T1: 90
- T2: 0
- T3: 0
- T4: 0

**Requeridos:**

- T3: 2
- T4: 2

**Proceso:**

- T3 total necesarios: 2 (directos) + 6 para T4 = 8x T3
- T3 → 24x T2 → 72x T1

**Inventario final:**

- T1: 18
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 14: Mezcla intermedia con sobras

**Inventario inicial:**

- T1: 20
- T2: 5
- T3: 4
- T4: 1

**Requeridos:**

- T2: 4
- T3: 2
- T4: 2

**Proceso:**

- T2: usar 4 → quedan 1
- T3: usar 2 → quedan 2
- T4: usar 1 → falta 1 → sintetizar 3x T3

**Inventario final:**

- T1: 20
- T2: 1
- T3: 0
- T4: 0

---

## 📘 Ejemplo 15: Síntesis desde distintos niveles para cubrir múltiples tiers

**Inventario inicial:**

- T1: 18
- T2: 3
- T3: 0
- T4: 1

**Requeridos:**

- T2: 3
- T4: 2

**Proceso:**

- T2: usar 3 directamente
- T4: hay 1 → falta 1 → sintetizar 3x T3 → requiere 9x T2 → se generan desde 27x T1 (pero solo hay 18)
- Solo se puede sintetizar 6x T2 → no suficiente

**Resultado parcial:** Solo se completa T2 y 1x T4

**Inventario final:**

- T1: 0
- T2: 0
- T3: 0
- T4: 1

---

## 📘 Ejemplo 16: Usar todo tipo de materiales en su justa medida

**Inventario inicial:**

- T1: 15
- T2: 6
- T3: 2
- T4: 0

**Requeridos:**

- T2: 2
- T3: 3
- T4: 1

**Proceso:**

- T2: usar 2
- T3: hay 2 → falta 1 → 3x T2 → sintetizamos
- T4: 3x T3 → justo los 3 sintetizados y usados

**Inventario final:**

- T1: 6
- T2: 1
- T3: 0
- T4: 0

---

## 📘 Ejemplo 17: Sobran materiales tras sintetizar lo justo

**Inventario inicial:**

- T1: 60
- T2: 6
- T3: 3
- T4: 0

**Requeridos:**

- T4: 2

**Proceso:**

- Necesita 6x T3 → hay 3 → falta 3 → requiere 9x T2 → tenemos 6 → faltan 3 → 9x T1
- Se sintetiza lo justo para completar 6x T3 → se usan

**Inventario final:**

- T1: 51
- T2: 0
- T3: 0
- T4: 0

---

## 📘 Ejemplo 18: Solo se logra completar parte de los materiales requeridos

**Inventario inicial:**

- T1: 10
- T2: 2
- T3: 1
- T4: 0

**Requeridos:**

- T3: 2
- T4: 1

**Proceso:**

- T3: hay 1 → falta 1 → 3x T2 → no hay suficientes → intentar con T1
- 3x T2 → 9x T1 → disponible
- Usamos 9x T1 → obtenemos 1x T3
- Ya tenemos 2x T3 → se usan para sintetizar 1x T4

**Inventario final:**

- T1: 1
- T2: 2
- T3: 0
- T4: 0

---

## 📘 Ejemplo 19: Caso mixto con sobras en todos los niveles

**Inventario inicial:**

- T1: 20
- T2: 10
- T3: 5
- T4: 2

**Requeridos:**

- T2: 4
- T3: 4
- T4: 2

**Proceso:**

- T2: usar 4 → quedan 6
- T3: usar 4 → queda 1
- T4: usar 2 → queda 0

**Inventario final:**

- T1: 20
- T2: 6
- T3: 1
- T4: 0

---

## 📘 Ejemplo 20: Materiales desbalanceados obligan a usar muchos T1

**Inventario inicial:**

- T1: 60
- T2: 0
- T3: 0
- T4: 0

**Requeridos:**

- T2: 3
- T3: 2
- T4: 1

**Proceso:**

- T2: 3 → 9x T1
- T3: 2 → 6x T2 → 18x T1
- T4: 3x T3 → 9x T2 → 27x T1

- Total usado: 9 + 18 + 27 = 54x T1

**Inventario final:**

- T1: 6
- T2: 0
- T3: 0
- T4: 0
