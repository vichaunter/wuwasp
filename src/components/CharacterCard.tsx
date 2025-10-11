import type { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  // Border color based on rarity
  const rarityColors = {
    4: 'from-purple-600 to-purple-700',
    5: 'from-amber-500 to-yellow-600',
  };
  
  const borderGradient = rarityColors[character.rarity];
  
  return (
    <div className="flex gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20">
      {/* Character Image */}
      <div className={`relative w-24 h-32 bg-gradient-to-br ${borderGradient} rounded-lg flex items-center justify-center ring-2 ring-gray-700 flex-shrink-0 overflow-hidden`}>
        {character.image ? (
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            {character.name.charAt(0)}
          </span>
        )}
      </div>
      
      {/* Character Info */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-100 capitalize">
          {character.name}
        </h3>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          {/* Left Column */}
          <div className="space-y-1.5">
            {/* Rarity */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs w-12">Stars:</span>
              <div className="flex items-center gap-0.5">
                {[...Array(character.rarity)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
            
            {/* Tier */}
            {character.tier && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 text-xs w-12">Tier:</span>
                <span className={`font-bold text-sm px-2 py-0.5 rounded ${
                  character.tier === 'S' ? 'bg-red-500/20 text-red-400' :
                  character.tier === 'A' ? 'bg-orange-500/20 text-orange-400' :
                  character.tier === 'B' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-600/20 text-gray-400'
                }`}>
                  {character.tier}
                </span>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="space-y-1.5">
            {/* Element */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs w-16">Element:</span>
              <span className="text-gray-200 text-sm font-medium">{character.element}</span>
            </div>
            
            {/* Weapon */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 text-xs w-16">Weapon:</span>
              <span className="text-gray-200 text-sm font-medium">{character.weapon}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

