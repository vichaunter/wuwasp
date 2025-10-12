import { useState, useMemo } from "react";
import { useInventoryStore } from "@/store/inventory";
import { getMaterialById } from "@/data/materials";
import { MaterialUpdateModal } from "@/components/MaterialUpdateModal";
import { formatMaterialAvailability } from "@/utils/materialSynthesis";
import { MaterialCardImage } from "./MaterialCardImage";
import { MaterialCardProgress } from "./MaterialCardProgress";
import { MaterialCardInput } from "./MaterialCardInput";
import { MaterialCardTitle } from "./MaterialCardTitle";

interface MaterialRequirement {
  materialId: string;
  materialName: string;
  quantity: number;
}

interface MaterialCardProps {
  materialId: string;
  required?: number;
  allMaterialsOfSameBase?: MaterialRequirement[];
  effectiveInventory?: Record<string, number>;
  mode?: "card" | "input" | "title"; // card = muestra progreso, input = muestra controles, title = muestra nombre
  isEmpty?: boolean; // If true, shows 0/0 with reduced opacity
}

export function MaterialCard({
  materialId,
  required = 0,
  allMaterialsOfSameBase,
  effectiveInventory,
  mode = "card",
  isEmpty = false,
}: MaterialCardProps) {
  const getMaterialQuantity = useInventoryStore(
    (state) => state.getMaterialQuantity
  );
  const material = getMaterialById(materialId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!material) {
    return (
      <div className="text-sm text-gray-400">
        Material no encontrado: {materialId}
      </div>
    );
  }

  // Calculate effective availability considering synthesis
  const { available } = useMemo(() => {
    // Use effectiveInventory if provided, otherwise use global inventory
    const getQuantity = (matId: string) => {
      return effectiveInventory !== undefined
        ? effectiveInventory[matId] || 0
        : getMaterialQuantity(matId);
    };

    const ownedQty = getQuantity(materialId);

    // If we have quality tiers and all materials of same base, use synthesis calculation
    if (
      material.quality &&
      material.baseName &&
      allMaterialsOfSameBase &&
      allMaterialsOfSameBase.length > 1
    ) {
      // Build requirements and owned for all qualities of this base material
      const requirements: Record<string, number> = {};
      const ownedByQuality: Record<string, number> = {};

      allMaterialsOfSameBase.forEach((mat) => {
        const m = getMaterialById(mat.materialId);
        if (m && m.quality) {
          requirements[m.quality] = mat.quantity;
          ownedByQuality[m.quality] = getQuantity(mat.materialId);
        }
      });

      // Calculate synthesis
      const result = formatMaterialAvailability(
        material.quality,
        required,
        ownedByQuality,
        requirements
      );

      return {
        available: result.available,
        hasEnough: result.hasEnough,
      };
    }

    return {
      available: ownedQty,
      hasEnough: ownedQty >= required,
    };
  }, [
    material,
    materialId,
    required,
    allMaterialsOfSameBase,
    effectiveInventory,
    getMaterialQuantity,
  ]);

  // Determine gradient based on material type
  let bgGradient: string;
  let separatorColor: string;

  if (material.quality === "T1") {
    bgGradient = "from-green-700 to-green-800";
    separatorColor = "bg-green-500";
  } else if (material.quality === "T2") {
    bgGradient = "from-blue-700 to-blue-800";
    separatorColor = "bg-blue-500";
  } else if (material.quality === "T3") {
    bgGradient = "from-purple-700 to-purple-800";
    separatorColor = "bg-purple-500";
  } else if (material.quality === "T4") {
    bgGradient = "from-amber-700 to-amber-800";
    separatorColor = "bg-amber-500";
  } else if (material.category === "BOSS") {
    bgGradient = "from-red-700 to-red-800";
    separatorColor = "bg-red-500";
  } else {
    // OVERWORLD or CURRENCY
    bgGradient = "from-gray-700 to-gray-800";
    separatorColor = "bg-gray-500";
  }

  const handleCardClick = () => {
    if (mode === "card") {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {mode === "card" && (
        <MaterialUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          materialId={materialId}
        />
      )}

      <div
        className={`group relative flex flex-col bg-gray-800 rounded-lg border border-gray-700 transition-all cursor-pointer overflow-hidden ${
          isEmpty ? "opacity-50" : ""
        }`}
        onClick={handleCardClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip - nombre del material */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-950 text-gray-100 text-xs font-medium rounded shadow-xl border border-gray-700 whitespace-nowrap pointer-events-none z-50">
            {material.name}
          </div>
        )}

        {/* Material Icon with gradient glow */}
        <MaterialCardImage
          material={material}
          showTooltip={showTooltip}
          bgGradient={bgGradient}
        />

        {/* Color separator */}
        <div className={`w-full h-1 ${separatorColor}`}></div>

        {/* Bottom section - changes based on mode */}
        {mode === "card" ? (
          <MaterialCardProgress available={available} required={required} />
        ) : mode === "title" ? (
          <MaterialCardTitle name={material.name} category={material.category} />
        ) : (
          <MaterialCardInput materialId={materialId} />
        )}
      </div>
    </>
  );
}
