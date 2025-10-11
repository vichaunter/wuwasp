import type { Character } from '@/types';

// Importar dinámicamente todos los archivos de personajes
const characterModules = import.meta.glob<Record<string, Character>>('./characters/*.ts', { 
  eager: true
});

// Extraer todos los personajes de los módulos importados
export const characters: Character[] = Object.entries(characterModules)
  .flatMap(([_, module]) => {
    // Cada módulo exporta un personaje con su nombre como key
    // Filtramos solo los valores que son objetos Character válidos
    return Object.values(module).filter(
      (value): value is Character => 
        typeof value === 'object' && 
        value !== null && 
        'id' in value && 
        'name' in value &&
        'slug' in value
    );
  });
