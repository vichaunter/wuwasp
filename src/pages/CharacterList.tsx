import { CharacterCard } from "@/components/cards";
import { characters } from "@/data/characters";

export default function CharacterList() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Personajes</h1>
        <p className="text-gray-400">
          {characters.length} personajes disponibles
        </p>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
