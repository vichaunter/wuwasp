import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { MaterialInput } from '@/components/MaterialInput';
import { materials, getMaterialById } from '@/data/materials';
import type { Material } from '@/types';

interface MaterialUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialId: string;
}

export function MaterialUpdateModal({ isOpen, onClose, materialId }: MaterialUpdateModalProps) {
  const [clickedMaterial, setClickedMaterial] = useState<Material | null>(null);
  const [gridMaterials, setGridMaterials] = useState<Material[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const [isLargeCollection, setIsLargeCollection] = useState(false);

  useEffect(() => {
    if (!isOpen || !materialId) return;

    const material = getMaterialById(materialId);
    if (!material) return;

    let grid: Material[] = [];
    let title = '';

    if (material.category === 'COMMON' || material.category === 'FORGERY') {
      // Mostrar las 4 calidades del mismo material base, ordenadas por quality
      const allQualities = materials.filter(m => m.baseName === material.baseName);
      // Ordenar por quality: T1, T2, T3, T4
      const qualityOrder = { T1: 1, T2: 2, T3: 3, T4: 4 };
      grid = allQualities.sort((a, b) => {
        if (!a.quality || !b.quality) return 0;
        return qualityOrder[a.quality] - qualityOrder[b.quality];
      });
      title = material.baseName;
      setClickedMaterial(null);
    } else if (material.category === 'BOSS') {
      // El material clicado aparte, los demás en el grid
      grid = materials.filter(m => m.category === 'BOSS' && m.id !== materialId);
      title = 'Boss Materials';
      setClickedMaterial(material);
    } else if (material.category === 'OVERWORLD') {
      // El material clicado aparte, los demás en el grid
      grid = materials.filter(m => m.category === 'OVERWORLD' && m.id !== materialId);
      title = 'Overworld Materials';
      setClickedMaterial(material);
    }

    setGridMaterials(grid);
    setModalTitle(title);
    setIsLargeCollection(grid.length > 10);
  }, [isOpen, materialId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth={isLargeCollection ? 'max-w-7xl' : 'max-w-[580px]'}
      maxHeight="max-h-[80vh]"
      contentPadding="p-6"
    >
      {/* Clicked Material (only for boss/overworld) */}
      {clickedMaterial && (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-[140px]">
              <MaterialInput materialId={clickedMaterial.id} />
            </div>
          </div>
          <div className="border-t border-gray-700 mb-6"></div>
        </>
      )}
      
      {/* Grid of materials */}
      <div 
        className="grid gap-3" 
        style={{ 
          gridTemplateColumns: isLargeCollection 
            ? 'repeat(auto-fill, minmax(120px, 120px))' 
            : 'repeat(4, minmax(120px, 120px))' 
        }}
      >
        {gridMaterials.map(material => (
          <MaterialInput key={material.id} materialId={material.id} />
        ))}
      </div>
    </Modal>
  );
}

