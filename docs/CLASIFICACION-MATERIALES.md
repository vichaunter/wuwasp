# Clasificación de Materiales por Origen

## 📚 Resumen Ejecutivo

Este documento clasifica TODOS los materiales del juego según su origen. Después del análisis, se ha identificado que:

- ✅ El sistema **YA está bien categorizado técnicamente** en `materials.ts`
- ❌ El problema es de **nomenclatura confusa** en las interfaces
- 🔄 Se recomienda renombrar para mejor claridad

## 🎯 Mapeo de Categorías

| Código Actual | Nuevo Nombre Propuesto | Descripción                               |
| ------------- | ---------------------- | ----------------------------------------- |
| `COMMON`      | `ENEMY`                | Materiales que dropean enemigos comunes   |
| `FORGERY`     | `DOMAIN`               | Materiales de dominios/calabozos          |
| `BOSS`        | `BOSS`                 | Materiales de jefes de mundo (sin cambio) |
| `OVERWORLD`   | `OVERWORLD`            | Materiales recolectables (sin cambio)     |
| `EXP`         | `EXP`                  | Items de experiencia (sin cambio)         |
| `CURRENCY`    | `CURRENCY`             | Moneda del juego (sin cambio)             |

## 📊 Clasificación Completa de Materiales

### 1. Materiales de ENEMIGOS (COMMON → ENEMY)

**Características:**

- Dropean de enemigos comunes
- Tienen 4 calidades: T1 (LF), T2 (MF), T3 (HF), T4 (FF)
- Se usan en: Ascensión de personajes, Ascensión de armas, Fortes

| Base Name          | T1 (Verde)        | T2 (Azul)         | T3 (Morado)       | T4 (Dorado)       |
| ------------------ | ----------------- | ----------------- | ----------------- | ----------------- |
| **Howler Core**    | LF Howler Core    | MF Howler Core    | HF Howler Core    | FF Howler Core    |
| **Tidal Residuum** | LF Tidal Residuum | MF Tidal Residuum | HF Tidal Residuum | FF Tidal Residuum |
| **Crude Ring**     | LF Crude Ring     | MF Crude Ring     | HF Crude Ring     | FF Crude Ring     |
| **Whisperin Core** | LF Whisperin Core | MF Whisperin Core | HF Whisperin Core | FF Whisperin Core |
| **Polygon Core**   | LF Polygon Core   | MF Polygon Core   | HF Polygon Core   | FF Polygon Core   |

**Total:** 5 familias × 4 calidades = **20 materiales**

---

### 2. Materiales de DOMINIOS (FORGERY → DOMAIN)

**Características:**

- Se obtienen en dominios diarios
- Tienen 4 calidades: T1, T2, T3, T4 (con nombres únicos o números)
- Se usan en: Fortes (MAT_FORTE) y Armas (MAT_ARMA)

| Base Name               | T1                   | T2                     | T3                      | T4                      |
| ----------------------- | -------------------- | ---------------------- | ----------------------- | ----------------------- |
| **Impure Phlogiston**   | Impure Phlogiston    | Extracted Phlogiston   | Refined Phlogiston      | Flawless Phlogiston     |
| **Waveworn Residue**    | Waveworn Residue 210 | Waveworn Residue 226   | Waveworn Residue 235    | Waveworn Residue 239    |
| **Lento Helix**         | Lento Helix          | Adagio Helix           | Andante Helix           | Presto Helix            |
| **Inert Metallic Drip** | Inert Metallic Drip  | Reactive Metallic Drip | Polarized Metallic Drip | Heterized Metallic Drip |
| **Cadence Seed**        | Cadence Seed         | Cadence Bud            | Cadence Leaf            | Cadence Blossom         |

**Total:** 5 familias × 4 calidades = **20 materiales**

---

### 3. Materiales de JEFES DE MUNDO (BOSS)

**Características:**

- Dropean de jefes de mundo (world bosses)
- **Sin calidades** (material único)
- Se usan en: Ascensión de personajes

| Material Name                 | ID                              |
| ----------------------------- | ------------------------------- |
| Roaring Rock Fist             | `roaring-rock-fist`             |
| Monument Bell                 | `monument-bell`                 |
| Blighted Crown of Puppet King | `blighted-crown-of-puppet-king` |
| When Irises Bloom             | `when-irises-bloom`             |
| Sound-Keeping Tacet Core      | `sound-keeping-tacet-core`      |
| Blazing Bone                  | `blazing-bone`                  |
| The Netherworld's Stare       | `the-netherworlds-stare`        |
| Thundering Tacet Core         | `thundering-tacet-core`         |
| Topological Confinement       | `topological-confinement`       |
| Dreamless Feather             | `dreamless-feather`             |
| Cleansing Conch               | `cleansing-conch`               |
| Unfading Glory                | `unfading-glory`                |
| Rage Tacet Core               | `rage-tacet-core`               |
| Sentinel's Dagger             | `sentinels-dagger`              |
| Strife Tacet Core             | `strife-tacet-core`             |
| Unending Destruction          | `unending-destruction`          |
| Curse of the Abyss            | `curse-of-the-abyss`            |
| Abyssal Husk                  | `abyssal-husk`                  |
| Elegy Tacet Core              | `elegy-tacet-core`              |
| Truth in Lies                 | `truth-in-lies`                 |
| Gold-Dissolving Feather       | `gold-dissolving-feather`       |
| Hidden Thunder Tacet Core     | `hidden-thunder-tacet-core`     |
| Group Abomination Tacet Core  | `group-abomination-tacet-core`  |
| Platinum Core                 | `platinum-core`                 |

**Total:** **24 materiales** únicos

**Nota:** Algunos de estos son de jefes semanales (weekly boss). Podrían separarse en una categoría `WEEKLY` si se necesita:

- Strife Tacet Core (Semanal)
- Elegy Tacet Core (Semanal)
- Group Abomination Tacet Core (Semanal)

---

### 4. Materiales de MUNDO ABIERTO (OVERWORLD)

**Características:**

- Se recolectan en el mundo abierto (flores, plantas, etc.)
- **Sin calidades** (material único)
- Se usan en: Ascensión de personajes

| Material Name         | ID                      |
| --------------------- | ----------------------- |
| Wintry Bell           | `wintry-bell`           |
| Luminous Calendula    | `luminous-calendula`    |
| Lanternberry          | `lanternberry`          |
| Golden Fleece         | `golden-fleece`         |
| Iris                  | `iris`                  |
| Nova                  | `nova`                  |
| Seaside Cendrelis     | `seaside-cendrelis`     |
| Bamboo Iris           | `bamboo-iris`           |
| Pavo Plum             | `pavo-plum`             |
| Belle Poppy           | `belle-poppy`           |
| Pecok Flower          | `pecok-flower`          |
| Stone Rose            | `stone-rose`            |
| Sliverglow Bloom      | `sliverglow-bloom`      |
| Loong's Pearl         | `loongs-pearl`          |
| Coriolus              | `coriolus`              |
| Terraspawn Fungus     | `terraspawn-fungus`     |
| Bloodleaf Viburnum    | `bloodleaf-viburnum`    |
| Firecracker Jewelweed | `firecracker-jewelweed` |
| Afterlife             | `afterlife`             |
| Violet Coral          | `violet-coral`          |
| Sword Acorus          | `sword-acorus`          |

**Total:** **21 materiales** únicos

---

### 5. Materiales de EXPERIENCIA (EXP)

**Características:**

- Items consumibles para ganar experiencia
- Tienen calidades (T1-T4 para personajes, T1-T3 para armas)

#### 5.1 Pociones de Resonancia (Personajes)

| Quality | Name                      | EXP Value |
| ------- | ------------------------- | --------- |
| T1      | Basic Resonance Potion    | 1,000     |
| T2      | Advanced Resonance Potion | 4,000     |
| T3      | Premium Resonance Potion  | 10,000    |
| T4      | Supreme Resonance Potion  | 20,000    |

#### 5.2 Núcleos de Energía (Armas)

| Quality | Name                 | EXP Value |
| ------- | -------------------- | --------- |
| T1      | Basic Energy Core    | 1,000     |
| T2      | Advanced Energy Core | 4,000     |
| T3      | Premium Energy Core  | 8,000     |

**Total:** 4 + 3 = **7 materiales**

---

### 6. MONEDA (CURRENCY)

| Material Name           | Description                           |
| ----------------------- | ------------------------------------- |
| Shell Credit            | Moneda principal del juego            |
| Shell Credit (Leveling) | Virtual (para cálculos de nivelación) |

**Total:** **2 materiales** (1 real + 1 virtual)

---

## 📈 Resumen de Totales

| Categoría               | Cantidad          | Calidades  | Uso Principal                            |
| ----------------------- | ----------------- | ---------- | ---------------------------------------- |
| **ENEMY** (ex-COMMON)   | 20                | Sí (T1-T4) | Ascensión personajes/armas, Fortes       |
| **DOMAIN** (ex-FORGERY) | 20                | Sí (T1-T4) | Fortes, Ascensión armas                  |
| **BOSS**                | 24                | No         | Ascensión personajes, Fortes (semanales) |
| **OVERWORLD**           | 21                | No         | Ascensión personajes                     |
| **EXP**                 | 7                 | Sí         | Experiencia personajes/armas             |
| **CURRENCY**            | 2                 | No         | Compras y mejoras                        |
| **TOTAL**               | **94 materiales** | -          | -                                        |

---

## 🔧 Uso por Sistema

### Ascensión de Personajes (Character Ascension)

```typescript
{
  enemy: { T1: 4, T2: 12, T3: 12, T4: 4 },     // Howler Core, etc.
  boss: 46,                                      // Blighted Crown, etc.
  overworld: 60,                                 // Luminous Calendula, etc.
  currency: 170000                               // Shell Credits
}
```

**Usa:**

- ✅ ENEMY (con calidades)
- ✅ BOSS (sin calidades)
- ✅ OVERWORLD (sin calidades)
- ❌ NO usa DOMAIN

---

### Ascensión de Armas (Weapon Ascension)

```typescript
{
  enemy: { quality: 'T2', quantity: 6 },         // Howler Core, etc.
  domain: { quality: 'T2', quantity: 6 },        // Crude Ring (dominio), etc.
  ascension: { quantity: 3 },                    // Monument Bell (boss específico)
  shellCredits: 10000
}
```

**Usa:**

- ✅ ENEMY (con calidades)
- ✅ DOMAIN (con calidades)
- ✅ BOSS (ascensión específica, opcional en 4★/5★)
- ❌ NO usa OVERWORLD

---

### Fortes (Forte Circuits)

```typescript
{
  enemy: { T2: 3, T3: 5 },                       // Tidal Residuum, etc.
  domain: { T2: 3, T3: 5 },                      // Waveworn Residue, etc.
  weekly: 1,                                     // Strife Tacet Core (boss semanal)
  currency: 30000
}
```

**Usa:**

- ✅ ENEMY (con calidades)
- ✅ DOMAIN (con calidades)
- ✅ BOSS SEMANAL (sin calidades)
- ❌ NO usa OVERWORLD

---

## 🎨 Recomendaciones de UI

### Agrupación de Inventario

```typescript
const materialGroups = {
  "Enemy Drops": materials.filter((m) => m.category === "ENEMY"),
  "Domain Materials": materials.filter((m) => m.category === "DOMAIN"),
  "Boss Materials": materials.filter((m) => m.category === "BOSS"),
  "Overworld Items": materials.filter((m) => m.category === "OVERWORLD"),
  "Experience Items": materials.filter((m) => m.category === "EXP"),
};
```

### Etiquetas Visuales (Badges)

| Categoría | Color Sugerido | Icono |
| --------- | -------------- | ----- |
| ENEMY     | 🔴 Rojo        | ⚔️    |
| DOMAIN    | 🔵 Azul        | 🏛️    |
| BOSS      | 🟣 Morado      | 👹    |
| WEEKLY    | 🟡 Amarillo    | 👑    |
| OVERWORLD | 🟢 Verde       | 🌸    |
| EXP       | 🟠 Naranja     | ⭐    |

---

## 🔍 Identificación Rápida

### Por Nombre del Material

**Si el material tiene prefijo LF/MF/HF/FF:**

- ➡️ Es de ENEMY

**Si el material tiene números (210, 226, etc.) o nombres progresivos:**

- ➡️ Es de DOMAIN

**Si el material tiene "Tacet Core" o nombres únicos de jefes:**

- ➡️ Es de BOSS

**Si el material es una flor/planta con nombre bonito:**

- ➡️ Es de OVERWORLD

**Si el material tiene "Potion" o "Core" con Basic/Advanced/Premium:**

- ➡️ Es de EXP

---

## 🚀 Próximos Pasos para Implementación

1. **Fase 1 - Tipos:**

   - [ ] Añadir alias `type MaterialCategoryLegacy = 'COMMON' | 'FORGERY'`
   - [ ] Actualizar `MaterialCategory` con `'ENEMY' | 'DOMAIN' | 'BOSS' | 'WEEKLY' | 'OVERWORLD' | 'EXP' | 'CURRENCY'`
   - [ ] Mantener compatibilidad temporal

2. **Fase 2 - Base de Datos:**

   - [ ] Actualizar `materials.ts`: `COMMON` → `ENEMY`
   - [ ] Actualizar `materials.ts`: `FORGERY` → `DOMAIN`
   - [ ] Opcionalmente separar WEEKLY de BOSS

3. **Fase 3 - Interfaces (Opcional pero Recomendado):**

   - [ ] `ascension-requirements.ts`: `common` → `enemy` (o mejorar comentarios)
   - [ ] `weapon-ascension-requirements.ts`: `common` → `enemy`, `forgery` → `domain`
   - [ ] `forte-requirements.ts`: `common` → `enemy`, `forgery` → `domain`

4. **Fase 4 - UI y Componentes:**

   - [ ] Actualizar filtros de materiales
   - [ ] Añadir etiquetas visuales por categoría
   - [ ] Agrupar inventario por origen

5. **Fase 5 - Testing:**
   - [ ] Verificar que todos los cálculos funcionan
   - [ ] Validar que no hay regresiones
   - [ ] Probar filtros y búsquedas

---

## 📝 Notas Importantes

1. **El sistema actual ya funciona correctamente** - solo es un problema de nomenclatura
2. **COMMON = ENEMY** y **FORGERY = DOMAIN** técnicamente están bien implementados
3. El renombrado es principalmente para **mejorar la legibilidad del código**
4. Se puede hacer de forma **incremental sin romper el sistema**
5. La separación BOSS/WEEKLY es opcional pero recomendada para claridad

---

## 🎓 Glosario

| Término Original (Docs) | Código Actual | Código Propuesto | Descripción                    |
| ----------------------- | ------------- | ---------------- | ------------------------------ |
| MAT_BASE                | COMMON        | ENEMY            | Materiales de enemigos comunes |
| MAT_FORTE / MAT_ARMA    | FORGERY       | DOMAIN           | Materiales de dominios         |
| MAT_BOSS_MUNDO          | BOSS          | BOSS             | Materiales de jefes de mundo   |
| MAT_BOSS_SEMANAL        | BOSS          | WEEKLY           | Materiales de jefes semanales  |
| MAT_LOCAL               | OVERWORLD     | OVERWORLD        | Materiales recolectables       |
| EXP_POT / EXP_ARMA      | EXP           | EXP              | Items de experiencia           |
| SHELL                   | CURRENCY      | CURRENCY         | Moneda del juego               |
