import { useState, useMemo } from "react";
import { materials } from "@/data/materials";
import { MaterialCard } from "@/components/material/MaterialCard";
import type { MaterialCategory } from "@/types";

export function Materials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    MaterialCategory | "ALL"
  >("ALL");

  // Get unique categories
  const categories: Array<MaterialCategory | "ALL"> = [
    "ALL",
    "COMMON",
    "FORGERY",
    "BOSS",
    "OVERWORLD",
    "EXP",
    "CURRENCY",
  ];

  // Filter materials based on search and category
  const filteredMaterials = useMemo(() => {
    let filtered = materials;

    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.baseName.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query)
      );
    }

    // Sort by category, then by quality (descending), then by name
    return filtered.sort((a, b) => {
      // First by category
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }

      // Then by quality (T4 > T3 > T2 > T1)
      if (a.quality && b.quality) {
        const qualityOrder = { T4: 4, T3: 3, T2: 2, T1: 1 };
        const aQuality = qualityOrder[a.quality] || 0;
        const bQuality = qualityOrder[b.quality] || 0;
        if (aQuality !== bQuality) {
          return bQuality - aQuality;
        }
      }

      // Finally by name
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory]);

  // Count materials by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: materials.length };
    materials.forEach((m) => {
      counts[m.category] = (counts[m.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">Materiales</h1>
        <p className="text-gray-400">
          Explora todos los materiales de Wuthering Waves
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
            placeholder="Buscar materiales..."
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

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-75">
                ({categoryCounts[category] || 0})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-400">
        {filteredMaterials.length} material
        {filteredMaterials.length !== 1 ? "es" : ""} encontrado
        {filteredMaterials.length !== 1 ? "s" : ""}
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              materialId={material.id}
              mode="title"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            No se encontraron materiales
          </div>
          <div className="text-gray-600 text-sm">
            Intenta con otro término de búsqueda
          </div>
        </div>
      )}
    </div>
  );
}

