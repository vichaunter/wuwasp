import { useState, useMemo } from "react";
import { WeaponCard } from "@/components/cards";
import { weapons } from "@/data/weapons";
import { SearchInput, FilterGroup } from "@/components/filters";
import type { WeaponType } from "@/types";
import {
  filterWeapons,
  countWeaponsByType,
  countWeaponsByRarity,
} from "@/utils/filterHelpers";

type WeaponRarity = 3 | 4 | 5;

export default function WeaponList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<WeaponType | "ALL">("ALL");
  const [selectedRarity, setSelectedRarity] = useState<WeaponRarity | "ALL">(
    "ALL"
  );

  const types: Array<WeaponType | "ALL"> = [
    "ALL",
    "Sword",
    "Broadblade",
    "Pistol",
    "Gauntlet",
    "Rectifier",
  ];

  const rarities: Array<WeaponRarity | "ALL"> = ["ALL", 5, 4, 3];

  const filteredWeapons = useMemo(
    () => filterWeapons(weapons, searchQuery, selectedType, selectedRarity),
    [searchQuery, selectedType, selectedRarity]
  );

  const typeCounts = useMemo(() => countWeaponsByType(weapons), []);
  const rarityCounts = useMemo(() => countWeaponsByRarity(weapons), []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">Armas</h1>
        <p className="text-gray-400">
          Explora todas las armas de Wuthering Waves
        </p>
      </div>

      <div className="space-y-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar armas..."
        />

        <FilterGroup
          title="Tipo"
          options={types.map((type) => ({
            value: type,
            label: type,
            count: typeCounts[type],
          }))}
          selected={selectedType}
          onSelect={setSelectedType}
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
        {filteredWeapons.length} arma
        {filteredWeapons.length !== 1 ? "s" : ""} encontrada
        {filteredWeapons.length !== 1 ? "s" : ""}
      </div>

      {filteredWeapons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            No se encontraron armas
          </div>
          <div className="text-gray-600 text-sm">
            Intenta con otro término de búsqueda o filtro
          </div>
        </div>
      )}
    </div>
  );
}
