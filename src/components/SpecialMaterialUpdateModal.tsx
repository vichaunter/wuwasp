import { Modal } from "@/components/Modal";
import { materials } from "@/data/materials";
import { MaterialCard } from "@/components/material";

interface SpecialMaterialUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpecialMaterialUpdateModal({
  isOpen,
  onClose,
}: SpecialMaterialUpdateModalProps) {
  const resonancePotions = materials.filter(
    (mat) => mat.baseName === "Resonance Potion"
  );
  const energyCores = materials.filter((mat) => mat.baseName === "Energy Core");
  const shellCreditMaterial = materials.find(
    (mat) => mat.id === "shell-credit"
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Materiales Especiales"
      maxWidth="max-w-[580px]"
    >
      <div className="p-4">
        <p className="text-gray-300 mb-4">
          Ajusta las cantidades de tus materiales de EXP y Créditos de Concha.
        </p>

        {/* Shell Credits */}
        {shellCreditMaterial && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Créditos de Concha
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full">
                <MaterialCard
                  key={shellCreditMaterial.id}
                  materialId={shellCreditMaterial.id}
                  mode="input"
                />
              </div>
            </div>
          </div>
        )}

        {/* Resonance Potions */}
        {resonancePotions.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Pociones de Resonancia
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {resonancePotions.map((mat) => (
                <MaterialCard key={mat.id} materialId={mat.id} mode="input" />
              ))}
            </div>
          </div>
        )}

        {/* Energy Cores */}
        {energyCores.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Núcleos de Energía
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {energyCores.map((mat) => (
                <MaterialCard key={mat.id} materialId={mat.id} mode="input" />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
