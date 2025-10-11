import { CharacterCard } from '@/components/CharacterCard';
import { characters } from '@/data/characters';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Wuthering Waves
          </h1>
          <p className="text-xl text-gray-400">
            Planificador de Ascensión de Personajes
          </p>
        </div>
        
        {/* Characters Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Personajes
            </h2>
            <p className="text-gray-400 text-sm">
              {characters.length} personajes disponibles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
