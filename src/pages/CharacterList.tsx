import { useState, useMemo } from "react";
import { CharacterCard } from "@/components/cards";
import { characters } from "@/data/characters";
import { SearchInput, FilterGroup } from "@/components/filters";
import {
  filterCharacters,
  getCharacterElements,
  getCharacterWeapons,
  countByElement,
  countByWeapon,
  countByRarity,
} from "@/utils/filterHelpers";

type CharacterRarity = 4 | 5;

export default function CharacterList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | "ALL">("ALL");
  const [selectedWeapon, setSelectedWeapon] = useState<string | "ALL">("ALL");
  const [selectedRarity, setSelectedRarity] = useState<CharacterRarity | "ALL">(
    "ALL"
  );

  const elements = useMemo(
    () => ["ALL", ...getCharacterElements(characters)],
    []
  );
  const weapons = useMemo(
    () => ["ALL", ...getCharacterWeapons(characters)],
    []
  );
  const rarities: Array<CharacterRarity | "ALL"> = ["ALL", 5, 4];

  const filteredCharacters = useMemo(
    () =>
      filterCharacters(
        characters,
        searchQuery,
        selectedElement,
        selectedWeapon,
        selectedRarity
      ),
    [searchQuery, selectedElement, selectedWeapon, selectedRarity]
  );

  const elementCounts = useMemo(() => countByElement(characters), []);
  const weaponCounts = useMemo(() => countByWeapon(characters), []);
  const rarityCounts = useMemo(() => countByRarity(characters), []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">Personajes</h1>
        <p className="text-gray-400">
          Explora todos los personajes de Wuthering Waves
        </p>
      </div>

      <div className="space-y-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar personajes..."
        />

        <FilterGroup
          title="Elemento"
          options={elements.map((element) => ({
            value: element,
            label: element,
            count: elementCounts[element],
          }))}
          selected={selectedElement}
          onSelect={setSelectedElement}
        />

        <FilterGroup
          title="Arma"
          options={weapons.map((weapon) => ({
            value: weapon,
            label:
              weapon === "Pistol"
                ? "Pistols"
                : weapon === "Gauntlet"
                ? "Gauntlets"
                : weapon,
            count: weaponCounts[weapon],
          }))}
          selected={selectedWeapon}
          onSelect={setSelectedWeapon}
        />

        <FilterGroup
          title="Rareza"
          options={rarities.map((rarity) => ({
            value: rarity,
            label: rarity === "ALL" ? "ALL" : `${rarity} ★`,
            count: rarityCounts[rarity],
          }))}
          selected={selectedRarity}
          onSelect={setSelectedRarity}
        />
      </div>

      <div className="text-sm text-gray-400">
        {filteredCharacters.length} personaje
        {filteredCharacters.length !== 1 ? "s" : ""} encontrado
        {filteredCharacters.length !== 1 ? "s" : ""}
      </div>

      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            No se encontraron personajes
          </div>
          <div className="text-gray-600 text-sm">
            Intenta con otro término de búsqueda o filtro
          </div>
        </div>
      )}
    </div>
  );
}
