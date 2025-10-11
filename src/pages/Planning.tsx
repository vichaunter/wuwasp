import { useMemo } from 'react';
import { characters } from '@/data/characters';
import { weapons } from '@/data/weapons';
import { CharacterCard } from '@/components/CharacterCard';
import { WeaponCard } from '@/components/WeaponCard';
import { useInventoryStore } from '@/store/inventory';

export default function Planning() {
  const characterProgress = useInventoryStore(state => state.characterProgress);
  const weaponProgress = useInventoryStore(state => state.weaponProgress);
  
  // Combine all enabled items and sort by global order
  const allEnabledItems = useMemo(() => {
    const enabledChars = characters
      .filter(c => characterProgress[c.id]?.enabled)
      .map(c => ({
        type: 'character' as const,
        data: c,
        order: characterProgress[c.id]?.order ?? 999,
      }));
    
    const enabledWeapons = weapons
      .filter(w => weaponProgress[w.id]?.enabled)
      .map(w => ({
        type: 'weapon' as const,
        data: w,
        order: weaponProgress[w.id]?.order ?? 999,
      }));
    
    return [...enabledChars, ...enabledWeapons].sort((a, b) => a.order - b.order);
  }, [characterProgress, weaponProgress]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Planificación
        </h1>
        <p className="text-xl text-gray-400">
          Gestiona la prioridad de ascensión
        </p>
      </div>
      
      {/* Content - Responsive Grid */}
      {allEnabledItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {allEnabledItems.map((item, index) => (
            <div key={`${item.type}-${item.data.id}`} className="relative h-full">
              {/* Priority Badge */}
              <div className="absolute -top-2 -left-2 z-20 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-gray-900">
                {index + 1}
              </div>
              
              <div className="h-full">
                {item.type === 'character' ? (
                  <CharacterCard character={item.data} plannerMode={true} />
                ) : (
                  <WeaponCard weapon={item.data} plannerMode={true} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No hay items en el planificador</p>
          <p className="text-sm">Añade personajes o armas desde sus páginas respectivas</p>
        </div>
      )}
    </div>
  );
}

