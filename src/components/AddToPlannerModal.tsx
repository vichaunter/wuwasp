import { useState, useMemo, useEffect } from "react";
import { useInventoryStore } from "@/store/inventory";
import { Modal } from "@/components/Modal";
import { getActivePlannerItems } from "@/utils/plannerItems";
import { characters } from "@/data/characters";
import { weapons } from "@/data/weapons";

export interface PlannerPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: "character" | "weapon";
  itemId: string;
  itemName?: string;
  acceptButtonText: string;
  title: string;
  description: string;
  acceptButtonClass?: string;
  onConfirm: (selectedPosition: number) => void;
  isReorderMode?: boolean;
}

export function AddToPlannerModal({
  isOpen,
  onClose,
  itemType,
  itemId,
  acceptButtonText,
  title,
  description,
  acceptButtonClass = "bg-green-600 hover:bg-green-700",
  onConfirm,
  isReorderMode = false,
}: PlannerPositionModalProps) {
  const characterProgress = useInventoryStore(
    (state) => state.characterProgress
  );
  const weaponProgress = useInventoryStore((state) => state.weaponProgress);
  const completedCharacters = useInventoryStore(
    (state) => state.completedCharacters
  );
  const completedWeapons = useInventoryStore((state) => state.completedWeapons);

  const orderedItems = useMemo(() => {
    return getActivePlannerItems(
      characterProgress,
      weaponProgress,
      completedCharacters,
      completedWeapons,
      characters,
      weapons
    );
  }, [
    characterProgress,
    weaponProgress,
    completedCharacters,
    completedWeapons,
  ]);

  const currentIndex = isReorderMode
    ? orderedItems.findIndex(
        (item) => item.id === itemId && item.type === itemType
      )
    : -1;

  const availablePositions = orderedItems.length;
  const defaultPosition = isReorderMode
    ? currentIndex !== -1
      ? currentIndex
      : availablePositions
    : availablePositions;

  const [selectedPosition, setSelectedPosition] = useState(defaultPosition);

  useEffect(() => {
    if (isOpen) {
      if (isReorderMode && currentIndex !== -1) {
        setSelectedPosition(currentIndex);
      } else {
        setSelectedPosition(availablePositions);
      }
    }
  }, [isOpen, isReorderMode, currentIndex, availablePositions]);

  const handleConfirm = () => {
    if (isReorderMode && selectedPosition === currentIndex) {
      onClose();
      return;
    }
    if (isReorderMode && selectedPosition === currentIndex + 1) {
      // No hacer nada si se selecciona la posición inmediatamente debajo
      onClose();
      return;
    }
    onConfirm(selectedPosition);
    onClose();
  };

  const isAcceptDisabled = isReorderMode && (selectedPosition === currentIndex || selectedPosition === currentIndex + 1);

  const getItemIcon = (type: "character" | "weapon") => {
    return type === "character" ? "👤" : "⚔️";
  };

  const itemNames = orderedItems.map((item) => item.name);

  const getPositionLabel = (position: number) => {
    if (itemNames.length === 0) {
      return position === 0 ? "Al principio (posición 1)" : "";
    }

    if (position === 0) {
      const firstItemName = itemNames[0];
      return `Al principio (encima de: ${firstItemName})`;
    } else if (position >= itemNames.length) {
      return `Al final (posición ${itemNames.length + 1})`;
    } else {
      const itemName = itemNames[position];
      return `${position + 1} - ${itemName} (insertar encima)`;
    }
  };

  const getSelectedPositionDescription = () => {
    if (itemNames.length === 0) {
      return "Será el primer item en tu planificador.";
    }

    if (selectedPosition >= itemNames.length) {
      return "Se añadirá al final de la lista.";
    } else if (selectedPosition === 0) {
      return `Se insertará al principio, antes de "${itemNames[0]}".`;
    } else {
      return `Se insertará encima de "${itemNames[selectedPosition]}" en la posición ${selectedPosition + 1}.`;
    }
  };

  const maxPosition = itemNames.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleConfirm}
      title={title}
      acceptText={acceptButtonText}
      acceptButtonClass={acceptButtonClass}
      acceptDisabled={isAcceptDisabled}
    >
      <p className="text-gray-300 mb-4">{description}</p>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {isReorderMode ? "Nueva posición en la lista:" : "Posición en la lista:"}
        </label>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {itemNames.length === 0 ? (
            <option value={0}>Al principio (posición 1)</option>
          ) : (
            Array.from({ length: maxPosition + 1 }, (_, i) => {
              const isCurrentPosition = isReorderMode && i === currentIndex;
              
              let icon = "";
              if (isCurrentPosition) {
                icon = "→";
              } else if (i < orderedItems.length) {
                icon = getItemIcon(orderedItems[i].type);
              }

              const label = getPositionLabel(i);
              const displayLabel = icon ? `${icon} ${label}` : label;

              return (
                <option key={i} value={i}>
                  {displayLabel}
                </option>
              );
            })
          )}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          {isReorderMode && selectedPosition === currentIndex
            ? "Posición actual - no se realizarán cambios."
            : isReorderMode && selectedPosition === currentIndex + 1
            ? "Esta posición es inmediatamente debajo de la actual. El elemento ya está en esta posición relativa."
            : getSelectedPositionDescription()}
        </p>
      </div>
    </Modal>
  );
}
