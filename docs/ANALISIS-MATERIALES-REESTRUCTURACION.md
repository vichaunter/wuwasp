# Análisis del Sistema de Materiales y Plan de Reestructuración

## 📊 ANÁLISIS DEL SISTEMA ACTUAL

### 1. Tipos de Materiales Identificados

Según la documentación oficial (`manual-progresión-resonador.md` y `manual-progresion-armas.md`):

| Tipo                            | Origen           | Calidades     | Uso                                           |
| ------------------------------- | ---------------- | ------------- | --------------------------------------------- |
| **MAT_BASE** (Enemy Drops)      | Enemigos comunes | T1-T4         | Ascensión personajes, Ascensión armas, Fortes |
| **MAT_FORTE/MAT_ARMA** (Domain) | Dominios         | T1-T4         | Fortes (MAT_FORTE), Armas (MAT_ARMA)          |
| **MAT_BOSS_MUNDO** (Boss)       | Jefes de mundo   | Sin calidades | Ascensión personajes                          |
| **MAT_BOSS_SEMANAL** (Weekly)   | Jefes semanales  | Sin calidades | Fortes                                        |
| **MAT_LOCAL** (Overworld)       | Recolectables    | Sin calidades | Ascensión personajes                          |

### 2. Estructura Actual del Código

#### 2.1 Tipos (`src/types/index.ts`)

```typescript
type MaterialCategory =
  | "COMMON"
  | "FORGERY"
  | "BOSS"
  | "OVERWORLD"
  | "CURRENCY"
  | "EXP";
```

**❌ PROBLEMA:**

- `COMMON` se usa para TODOS los materiales con calidades, sin distinguir entre enemigos y dominios
- `FORGERY` solo se usa en algunos contextos pero no está bien definido

#### 2.2 Ascensión de Personajes (`ascension-requirements.ts`)

```typescript
interface AscensionRequirement {
  common: Partial<Record<MaterialQualityTier, number>>; // ⚠️ Nombre confuso
  boss?: number;
  overworld?: number;
  currency: number;
}
```

**❌ PROBLEMA:**

- El campo `common` según la documentación debería ser **MAT_BASE (enemy drops)**, pero el nombre es confuso
- NO hay distinción clara de que estos son materiales de enemigos

#### 2.3 Ascensión de Armas (`weapon-ascension-requirements.ts`)

```typescript
interface WeaponAscensionRequirement {
  materials: {
    common: { quality: "T1" | "T2" | "T3" | "T4"; quantity: number }; // MAT_BASE (enemy drops) ✅
    forgery: { quality: "T1" | "T2" | "T3" | "T4"; quantity: number }; // MAT_ARMA (domain) ✅
    ascension?: { quantity: number }; // Weapon-specific material
    shellCredits: number;
  };
}
```

**✅ CORRECTO:**

- Distingue claramente entre `common` (enemigos) y `forgery` (dominio)
- Ambos soportan calidades diferentes
- Los comentarios indican correctamente el origen

#### 2.4 Fortes (`forte-requirements.ts`)

```typescript
interface ForteNodeRequirement {
  common?: Partial<Record<MaterialQualityTier, number>>; // MAT_BASE (enemy) ✅
  forgery?: Partial<Record<MaterialQualityTier, number>>; // MAT_FORTE (domain) ✅
  boss?: number; // Weekly boss
  currency: number;
}
```

**✅ CORRECTO:**

- Distingue claramente entre `common` (enemigos) y `forgery` (dominio)
- Ambos soportan calidades diferentes
- Los comentarios indican correctamente el origen

#### 2.5 Base de Datos de Materiales (`materials.ts`)

```typescript
{
  id: 'lf-howler-core',
  name: 'LF Howler Core',
  baseName: 'Howler Core',
  category: 'COMMON',  // ❌ PROBLEMA: No distingue si es enemy o domain
  quality: 'T1',
}
```

**❌ PROBLEMA CRÍTICO:**

- TODOS los materiales con calidades se marcan como `category: 'COMMON'`
- No hay forma de distinguir si un material viene de enemigos o de dominios
- Esto hace imposible filtrar o agrupar correctamente por origen

### 3. Resumen de Problemas

| Problema                                      | Impacto                                    | Gravedad |
| --------------------------------------------- | ------------------------------------------ | -------- |
| Nomenclatura confusa de "common"              | Dificulta entender el código               | Media    |
| MaterialCategory no distingue Enemy vs Domain | No se pueden filtrar materiales por origen | **Alta** |
| Base de datos marca todo como 'COMMON'        | Sistema no escalable ni mantenible         | **Alta** |
| Inconsistencia entre archivos de requisitos   | Confusión al leer código                   | Media    |

## ✅ EVALUACIÓN: ¿EL SISTEMA ACTUAL LO SOPORTA?

### Soporte para Múltiples Tipos con Calidades

| Componente     | Enemy + Domain           | Calidades Diferentes | Cantidades Diferentes | ✅/❌           |
| -------------- | ------------------------ | -------------------- | --------------------- | --------------- |
| **Armas**      | ✅ Sí (common + forgery) | ✅ Sí                | ✅ Sí                 | **✅ FUNCIONA** |
| **Fortes**     | ✅ Sí (common + forgery) | ✅ Sí                | ✅ Sí                 | **✅ FUNCIONA** |
| **Personajes** | ⚠️ Solo enemy (common)   | ✅ Sí                | ✅ Sí                 | **⚠️ PARCIAL**  |

**CONCLUSIÓN:** El sistema de requisitos (interfaces) **SÍ soporta** tener múltiples tipos de materiales con calidades y cantidades diferentes. El problema está en:

1. La **nomenclatura** ("common" es confuso)
2. La **base de datos de materiales** no categoriza correctamente
3. La **documentación implícita** en el código es inconsistente

## 🎯 PLAN DE REESTRUCTURACIÓN

### Fase 1: Actualizar Tipos Base

#### 1.1 Actualizar `MaterialCategory`

```typescript
// ANTES
type MaterialCategory =
  | "COMMON"
  | "FORGERY"
  | "BOSS"
  | "OVERWORLD"
  | "CURRENCY"
  | "EXP";

// DESPUÉS
type MaterialCategory =
  | "ENEMY" // Enemy drops (ex: Howler Core, Tidal Residuum) - CON calidades T1-T4
  | "DOMAIN" // Domain materials (ex: Waveworn Residue, Crude Ring) - CON calidades T1-T4
  | "BOSS" // World boss drops (ex: Blighted Crown) - SIN calidades
  | "WEEKLY" // Weekly boss drops - SIN calidades
  | "OVERWORLD" // Collectibles (ex: Luminous Calendula) - SIN calidades
  | "CURRENCY" // Shell Credits
  | "EXP"; // Experience items
```

**Migración:**

- Deprecar `COMMON` y `FORGERY` gradualmente
- Crear alias temporales para compatibilidad si es necesario

#### 1.2 Actualizar Interfaces de Materiales

```typescript
// Añadir campo descriptivo de origen
export interface Material {
  id: string;
  name: string;
  baseName: string;
  category: MaterialCategory; // Ahora será ENEMY o DOMAIN
  quality?: MaterialQualityTier;
  origin?: "enemy" | "domain" | "boss" | "weekly" | "overworld"; // Redundante pero útil
  image?: string;
}
```

### Fase 2: Actualizar Base de Datos de Materiales

#### 2.1 Clasificar Materiales Existentes

Necesitamos clasificar cada material en la base de datos:

**Materiales de ENEMIGOS (category: 'ENEMY'):**

- Howler Core
- Tidal Residuum
- Crude Ring
- Elegy Tacet Core
- Strife Tacet Core
- ... (todos los "cores" que dropean enemigos)

**Materiales de DOMINIOS (category: 'DOMAIN'):**

- Waveworn Residue (210, 226, 235, 239)
- Impure Phlogiston (210, 226, 235, 239)
- Inert Metallic Drip (210, 226, 235, 239)
- ... (todos los materiales de dominio con números)

#### 2.2 Script de Migración

```typescript
// scripts/migrate-material-categories.ts
// Script para actualizar automáticamente la categorización
```

### Fase 3: Actualizar Interfaces de Requisitos (Opcional - Mejorar Nomenclatura)

```typescript
// ascension-requirements.ts - OPCIÓN 1: Mantener "common" pero documentar mejor
interface AscensionRequirement {
  common: Partial<Record<MaterialQualityTier, number>>; // Enemy drops (MAT_BASE)
  boss?: number; // World boss material
  overworld?: number; // Collectible material
  currency: number;
}

// ascension-requirements.ts - OPCIÓN 2: Renombrar para claridad
interface AscensionRequirement {
  enemy: Partial<Record<MaterialQualityTier, number>>; // Enemy drops (MAT_BASE)
  boss?: number; // World boss material
  overworld?: number; // Collectible material
  currency: number;
}

// weapon-ascension-requirements.ts - OPCIÓN 2
interface WeaponAscensionRequirement {
  materials: {
    enemy: { quality: MaterialQualityTier; quantity: number }; // Enemy drops
    domain: { quality: MaterialQualityTier; quantity: number }; // Domain materials
    ascension?: { quantity: number }; // Weapon-specific
    shellCredits: number;
  };
}

// forte-requirements.ts - OPCIÓN 2
interface ForteNodeRequirement {
  enemy?: Partial<Record<MaterialQualityTier, number>>; // Enemy drops
  domain?: Partial<Record<MaterialQualityTier, number>>; // Domain materials
  weekly?: number; // Weekly boss material
  currency: number;
}
```

### Fase 4: Actualizar Scripts de Generación

Actualizar `scripts/generate-materials-db.ts` para:

1. Detectar automáticamente el tipo de material (enemy vs domain)
2. Asignar la categoría correcta
3. Validar que la categorización sea correcta

### Fase 5: Actualizar Componentes UI (si aplica)

Si hay componentes que filtran o muestran materiales por categoría:

1. Actualizar filtros para usar nuevas categorías
2. Agregar etiquetas visuales (badges) para distinguir origen
3. Agrupar materiales por origen en inventarios

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Paso 1: Tipos y Definiciones

- [ ] Actualizar `MaterialCategory` en `src/types/index.ts`
- [ ] Añadir `origin` opcional a interface `Material`
- [ ] Documentar con comentarios TSDoc cada categoría

### Paso 2: Base de Datos

- [ ] Crear lista de materiales de ENEMY
- [ ] Crear lista de materiales de DOMAIN
- [ ] Actualizar `materials.ts` con categorías correctas
- [ ] Crear script de validación

### Paso 3: Interfaces de Requisitos (Opcional)

- [ ] Decidir: ¿mantener "common/forgery" o renombrar a "enemy/domain"?
- [ ] Si se renombra: actualizar todas las interfaces
- [ ] Si se mantiene: mejorar documentación con comentarios
- [ ] Actualizar todos los archivos de requisitos

### Paso 4: Scripts y Generadores

- [ ] Actualizar `generate-materials-db.ts`
- [ ] Crear script de migración/validación
- [ ] Actualizar scripts de scraping si aplica

### Paso 5: Testing y Validación

- [ ] Verificar que todos los cálculos siguen funcionando
- [ ] Verificar que no hay regresiones en UI
- [ ] Validar que los filtros funcionan con nuevas categorías

### Paso 6: Documentación

- [ ] Actualizar `docs/project-structure.md`
- [ ] Crear guía de categorización de materiales
- [ ] Documentar decisiones de diseño

## 🎓 RECOMENDACIONES

### Nomenclatura Preferida

1. **OPCIÓN A (Mínimo cambio):**

   - Mantener `common`/`forgery` en interfaces de requisitos
   - Mejorar significativamente los comentarios
   - Actualizar solo `MaterialCategory` y base de datos

2. **OPCIÓN B (Claridad máxima - RECOMENDADA):**
   - Renombrar `common` → `enemy` en todas las interfaces
   - Renombrar `forgery` → `domain` en todas las interfaces
   - Actualizar `MaterialCategory` y base de datos
   - Mayor trabajo inicial pero código mucho más legible

### Estrategia de Migración

1. **Incremental (Recomendado):**

   - Fase 1: Actualizar tipos y base de datos (no rompe nada)
   - Fase 2: Actualizar interfaces de requisitos (breaking change)
   - Fase 3: Actualizar UI y componentes
   - Fase 4: Cleanup y documentación

2. **Big Bang:**
   - Hacer todos los cambios de una vez
   - Mayor riesgo pero más rápido
   - Requiere testing exhaustivo

## 💡 EJEMPLOS DE USO POST-REESTRUCTURACIÓN

### Filtrar Materiales por Origen

```typescript
const enemyMaterials = materials.filter((m) => m.category === "ENEMY");
const domainMaterials = materials.filter((m) => m.category === "DOMAIN");
```

### Calcular Requisitos de Armas

```typescript
// Con nomenclatura nueva (OPCIÓN B)
const requirements = {
  enemy: { quality: "T2", quantity: 6 }, // 6x MF Howler Core
  domain: { quality: "T2", quantity: 6 }, // 6x Waveworn Residue 226
  shellCredits: 10000,
};
```

### Agrupar en UI

```typescript
const groupedMaterials = {
  "Enemy Drops": materials.filter((m) => m.category === "ENEMY"),
  "Domain Materials": materials.filter((m) => m.category === "DOMAIN"),
  "Boss Materials": materials.filter(
    (m) => m.category === "BOSS" || m.category === "WEEKLY"
  ),
  Overworld: materials.filter((m) => m.category === "OVERWORLD"),
};
```

---

## 🎯 CONCLUSIÓN

**El sistema actual SÍ soporta técnicamente múltiples tipos de materiales con calidades diferentes**, como se evidencia en las interfaces de armas y fortes. Sin embargo, necesita:

1. ✅ **Reestructuración de categorías** - Para distinguir enemy vs domain
2. ✅ **Mejora de nomenclatura** - Para mayor claridad (opcional pero recomendado)
3. ✅ **Actualización de base de datos** - Para categorizar correctamente cada material

Una vez implementada esta reestructuración:

- Los cálculos serán más claros y mantenibles
- La UI podrá filtrar y agrupar correctamente
- El código será más autodocumentado
- Facilitará futuras extensiones del sistema
