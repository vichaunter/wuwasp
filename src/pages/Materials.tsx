import { useState, useMemo, useEffect } from "react";
import { materials } from "@/data/materials";
import { MaterialCard } from "@/components/material/MaterialCard";
import { SearchInput, FilterGroup } from "@/components/filters";
import { MaterialCategory } from "@/types";
import {
  filterMaterials,
  countMaterialsByCategory,
} from "@/utils/filterHelpers";

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

  const categories: Array<MaterialCategory | "ALL"> = [
    "ALL",
    MaterialCategory.COMMON,
    MaterialCategory.FORGERY,
    MaterialCategory.BOSS,
    MaterialCategory.OVERWORLD,
    MaterialCategory.EXP,
    MaterialCategory.CURRENCY,
  ];

  const filteredMaterials = useMemo(
    () => filterMaterials(materials, searchQuery, selectedCategory, groupBySet),
    [searchQuery, selectedCategory, groupBySet]
  );

  const categoryCounts = useMemo(() => countMaterialsByCategory(materials), []);

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

      <div className="space-y-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar materiales..."
        />

        <FilterGroup
          title="Categoría"
          options={categories.map((category) => ({
            value: category,
            label: category,
            count: categoryCounts[category],
          }))}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
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
              titleMode="visible"
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
