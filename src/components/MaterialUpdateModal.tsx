import { useState, useEffect } from 'react';
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl w-full max-h-[80vh] overflow-hidden pointer-events-auto ${
            isLargeCollection ? 'max-w-7xl' : 'max-w-[580px]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-gray-100">
              {modalTitle}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
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
          </div>
        </div>
      </div>
    </>
  );
}

