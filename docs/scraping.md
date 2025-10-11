# Web Scraping

## Scripts de Scraping

### Scraping de Personajes

Extrae datos de personajes desde Game8.

```bash
pnpm scrape:characters
```

**Características:**
- ✅ Guarda HTML original en `scripts/html-cache/` para reprocesamiento
- ✅ Solo scrape personajes reales (ignora categorías, listas, elementos, armas)
- ✅ Delay de 2 segundos entre requests para evitar bloqueos
- ✅ Detección automática de personajes ya existentes (skipea por URL)
- ✅ Genera archivos TypeScript individuales por personaje
- ✅ Importación dinámica con `import.meta.glob` (no necesita regenerar index)

**Datos extraídos:**
- Información básica: nombre, rareza, elemento, arma
- URL de la página (para comparación y skip)
- Imagen del personaje
- Materiales de ascensión (base, elite, boss)
- Materiales de forte (elite, forgery, boss)

**Estructura de archivos generados:**
```
src/data/characters/
  ├── augusta.ts
  ├── brant.ts
  ├── ...
  └── (cada personaje en su propio archivo)

src/data/characters.ts (importa todo automáticamente)
```

### Cache HTML

Los HTML originales se guardan en `scripts/html-cache/` para:
- Reprocesar datos sin hacer nuevos requests
- Ajustar extracción de datos sin recargar páginas
- Desarrollo y testing más rápido

**Ver archivos en cache:**
```bash
pnpm reprocess:characters
```

## Estructura de Datos

### Character

```typescript
interface Character {
  id: string;
  name: string;
  slug: string;
  url: string;
  rarity: 4 | 5;
  element: string;
  weapon: string;
  materials: CharacterMaterials;
  image?: string;
}
```

### CharacterMaterials

```typescript
interface CharacterMaterials {
  ascension: {
    base: string;    // e.g., "Tidal Residuum"
    elite: string;   // e.g., "Waveworn Residue"
    boss: string;    // e.g., "When Irises Bloom"
  };
  forte: {
    elite: string;   // e.g., "Waveworn Residue"
    forgery: string; // e.g., "Waveworn Residue"
    boss: string;    // e.g., "When Irises Bloom"
  };
}
```

## Notas Importantes

1. **Cantidades de materiales**: Los personajes solo guardan los TIPOS de materiales que usan, no las cantidades. Las cantidades se gestionan en tablas separadas que son comunes para todos los personajes.

2. **Calidades de materiales**: Los materiales tienen 4 calidades (LF, MF, HF, FF). El personaje solo referencia el nombre base (ej: "Tidal Residuum") y el sistema sabe que incluye todas las calidades.

3. **Nombres de variables**: Los slugs con guiones se convierten a guiones bajos en los nombres de variables (ej: `rover-aero` → `rover_aero`).

4. **Import dinámico**: Se usa `import.meta.glob` para importar automáticamente todos los personajes sin necesidad de mantener un index manual.

## Fuente de Datos

- **Game8 Wuthering Waves**: https://game8.co/games/Wuthering-Waves/archives/452489

