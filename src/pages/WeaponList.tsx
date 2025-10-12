import { useState, useMemo } from "react";
import { WeaponCard } from "@/components/cards";
import { weapons } from "@/data/weapons";
import type { WeaponType } from "@/types";

type WeaponRarity = 3 | 4 | 5;

export default function WeaponList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<WeaponType | "ALL">("ALL");
  const [selectedRarity, setSelectedRarity] = useState<WeaponRarity | "ALL">(
    "ALL"
  );

  // Get unique types
  const types: Array<WeaponType | "ALL"> = [
    "ALL",
    "Sword",
    "Broadblade",
    "Pistol",
    "Gauntlet",
    "Rectifier",
  ];

  // Get unique rarities
  const rarities: Array<WeaponRarity | "ALL"> = ["ALL", 5, 4, 3];

  // Filter weapons based on search, type, and rarity
  const filteredWeapons = useMemo(() => {
    let filtered = weapons;

    // Filter by type
    if (selectedType !== "ALL") {
      filtered = filtered.filter((w) => w.type === selectedType);
    }

    // Filter by rarity
    if (selectedRarity !== "ALL") {
      filtered = filtered.filter((w) => w.rarity === selectedRarity);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.id.toLowerCase().includes(query)
      );
    }

    // Sort by rarity (descending) and then by name (ascending)
    return filtered.sort((a, b) => {
      if (a.rarity !== b.rarity) {
        return b.rarity - a.rarity; // Higher rarity first
      }
      return a.name.localeCompare(b.name); // Alphabetically by name
    });
  }, [searchQuery, selectedType, selectedRarity]);

  // Count weapons by type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: weapons.length };
    types.forEach((type) => {
      if (type !== "ALL") {
        counts[type] = weapons.filter((w) => w.type === type).length;
      }
    });
    return counts;
  }, []);

  // Count weapons by rarity
  const rarityCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: weapons.length };
    rarities.forEach((rarity) => {
      if (rarity !== "ALL") {
        counts[rarity] = weapons.filter((w) => w.rarity === rarity).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">Armas</h1>
        <p className="text-gray-400">
          Explora todas las armas de Wuthering Waves
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar armas..."
            className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Type filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Tipo</h3>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {type}
                <span className="ml-2 text-xs opacity-75">
                  ({typeCounts[type] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rarity filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Rareza</h3>
          <div className="flex flex-wrap gap-2">
            {rarities.map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedRarity === rarity
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {rarity === "ALL" ? "ALL" : `${rarity} ★`}
                <span className="ml-2 text-xs opacity-75">
                  ({rarityCounts[rarity] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-400">
        {filteredWeapons.length} arma
        {filteredWeapons.length !== 1 ? "s" : ""} encontrada
        {filteredWeapons.length !== 1 ? "s" : ""}
      </div>

      {/* Weapons Grid */}
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
