import type { Weapon } from '@/types';

interface WeaponCardProps {
  weapon: Weapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  const rarityColors = {
    3: 'from-blue-600 to-blue-700',
    4: 'from-purple-600 to-purple-700',
    5: 'from-amber-600 to-yellow-600',
  };

  const getStars = (rarity: number) => {
    return '★'.repeat(rarity);
  };

  const weaponName = weapon.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="group relative flex bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
      {/* Weapon Image */}
      <div className={`relative w-24 h-32 flex-shrink-0 bg-gradient-to-br ${rarityColors[weapon.rarity]} rounded-l-xl flex items-center justify-center ring-1 ring-gray-700 group-hover:ring-purple-500 transition-all duration-300`}>
        {weapon.image ? (
          <img 
            src={weapon.image} 
            alt={weapon.name} 
            className="w-20 h-28 object-contain drop-shadow-lg"
          />
        ) : (
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            {weapon.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Weapon Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">
            {weaponName}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-bold text-sm">
              {getStars(weapon.rarity)}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">{weapon.type}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">ATK</span>
            <span className="text-gray-100 font-semibold">{weapon.baseAtk}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-500">Sub Stat</span>
            <span className="text-gray-100 font-semibold">{weapon.subStat}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

