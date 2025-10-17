import { useState, useEffect } from "react";
import { useInventoryStore } from "@/store/inventory";

interface MaterialCardInputProps {
  materialId: string;
}

export function MaterialCardInput({ materialId }: MaterialCardInputProps) {
  const owned = useInventoryStore((state) =>
    state.getMaterialQuantity(materialId)
  );
  const setMaterialQuantity = useInventoryStore(
    (state) => state.setMaterialQuantity
  );

  const [localValue, setLocalValue] = useState("");

  // Sync local value with store value
  useEffect(() => {
    setLocalValue(owned.toString());
  }, [owned]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string or numbers only
    if (value === "" || /^\d+$/.test(value)) {
      setLocalValue(value);

      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setMaterialQuantity(materialId, numValue);
      } else if (value === "") {
        setMaterialQuantity(materialId, 0);
      }
    }
  };

  const handleIncrement = () => {
    setMaterialQuantity(materialId, owned + 1);
  };

  const handleDecrement = () => {
    if (owned > 0) {
      setMaterialQuantity(materialId, owned - 1);
    }
  };

  return (
    <div
      className="flex items-center justify-center gap-1.5 py-2 px-2 bg-gray-900"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleDecrement}
        disabled={owned === 0}
        className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-gray-200 rounded font-bold transition-all duration-200 cursor-pointer"
      >
        −
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={handleInputChange}
        className="w-14 px-1 py-1 text-center text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 transition-all tabular-nums flex-grow"
      />

      <button
        onClick={handleIncrement}
        className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-200 rounded font-bold transition-all duration-200 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
