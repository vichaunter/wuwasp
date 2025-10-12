import { useState, useMemo, useEffect } from "react";
import { materials } from "@/data/materials";
import { MaterialCard } from "@/components/material/MaterialCard";
import type { MaterialCategory } from "@/types";

export function Materials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    MaterialCategory | "ALL"
  >("ALL");

  // Load edit mode from localStorage
  const [editMode, setEditMode] = useState(() => {
    const saved = localStorage.getItem("materialsEditMode");
    return saved === "true";
  });

  // Load group by set from localStorage (default: true)
  const [groupBySet, setGroupBySet] = useState(() => {
    const saved = localStorage.getItem("materialsGroupBySet");
    return saved === null ? true : saved === "true";
  });

  // Save edit mode to localStorage
  useEffect(() => {
    localStorage.setItem("materialsEditMode", editMode.toString());
  }, [editMode]);

  // Save group by set to localStorage
  useEffect(() => {
    localStorage.setItem("materialsGroupBySet", groupBySet.toString());
  }, [groupBySet]);

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

    // Sort materials
    return filtered.sort((a, b) => {
      if (groupBySet) {
        // Group by set: category first (BOSS, FORGERY, COMMON, OVERWORLD), then baseName, then quality ascending (T1 -> T4)
        const categoryOrder: Record<string, number> = {
          BOSS: 1,
          FORGERY: 2,
          COMMON: 3,
          OVERWORLD: 4,
          EXP: 5,
          CURRENCY: 6,
        };

        const aCategoryOrder = categoryOrder[a.category] || 999;
        const bCategoryOrder = categoryOrder[b.category] || 999;

        if (aCategoryOrder !== bCategoryOrder) {
          return aCategoryOrder - bCategoryOrder;
        }

        // Within same category, group by baseName
        if (a.baseName !== b.baseName) {
          return a.baseName.localeCompare(b.baseName);
        }

        // Within same baseName, sort by quality ascending (T1 < T2 < T3 < T4)
        if (a.quality && b.quality) {
          const qualityOrder = { T1: 1, T2: 2, T3: 3, T4: 4 };
          const aQuality = qualityOrder[a.quality] || 0;
          const bQuality = qualityOrder[b.quality] || 0;
          if (aQuality !== bQuality) {
            return aQuality - bQuality;
          }
        }

        return a.name.localeCompare(b.name);
      } else {
        // Default: category, then quality descending (T4 -> T1), then name
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }

        if (a.quality && b.quality) {
          const qualityOrder = { T4: 4, T3: 3, T2: 2, T1: 1 };
          const aQuality = qualityOrder[a.quality] || 0;
          const bQuality = qualityOrder[b.quality] || 0;
          if (aQuality !== bQuality) {
            return bQuality - aQuality;
          }
        }

        return a.name.localeCompare(b.name);
      }
    });
  }, [searchQuery, selectedCategory, groupBySet]);

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
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-100">Materiales</h1>
          <p className="text-gray-400">
            {editMode
              ? "Actualiza tu inventario de materiales"
              : "Explora todos los materiales de Wuthering Waves"}
          </p>
        </div>

        {/* Edit Mode Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-300">
            Modo edición
          </span>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer ${
              editMode ? "bg-blue-600" : "bg-gray-700"
            }`}
            role="switch"
            aria-checked={editMode}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                editMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
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
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
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

      {/* Results count and Group By Set toggle */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {filteredMaterials.length} material
          {filteredMaterials.length !== 1 ? "es" : ""} encontrado
          {filteredMaterials.length !== 1 ? "s" : ""}
        </div>

        {/* Group By Set Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-300">
            Ordenar por set
          </span>
          <button
            onClick={() => setGroupBySet(!groupBySet)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer ${
              groupBySet ? "bg-blue-600" : "bg-gray-700"
            }`}
            role="switch"
            aria-checked={groupBySet}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                groupBySet ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              materialId={material.id}
              mode={editMode ? "input" : "title"}
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
