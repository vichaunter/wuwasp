import { MaterialInput } from '@/components/MaterialInput';
import { MaterialSection } from '@/components/MaterialSection';
import { materials } from '@/data/materials';

export default function Inventory() {
  // Group materials by category
  const commonMaterials = materials.filter(m => m.category === 'COMMON');
  const forgeryMaterials = materials.filter(m => m.category === 'FORGERY');
  const bossMaterials = materials.filter(m => m.category === 'BOSS');
  const overworldMaterials = materials.filter(m => m.category === 'OVERWORLD');
  
  // Group by baseName for common and forgery
  const groupByBaseName = (mats: typeof materials) => {
    const grouped = new Map<string, typeof materials>();
    mats.forEach(mat => {
      if (!grouped.has(mat.baseName)) {
        grouped.set(mat.baseName, []);
      }
      grouped.get(mat.baseName)!.push(mat);
    });
    
    // Sort each group by quality (T1, T2, T3, T4)
    grouped.forEach(group => {
      group.sort((a, b) => {
        if (!a.quality || !b.quality) return 0;
        const order = { T1: 1, T2: 2, T3: 3, T4: 4 };
        return order[a.quality] - order[b.quality];
      });
    });
    
    return Array.from(grouped.entries());
  };
  
  const commonGrouped = groupByBaseName(commonMaterials);
  const forgeryGrouped = groupByBaseName(forgeryMaterials);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">
          Inventario
        </h1>
        <p className="text-gray-400">
          Gestiona tus materiales disponibles
        </p>
      </div>
      
      <div className="space-y-12">
        <MaterialSection 
          title="Materiales Comunes"
          subtitle={`${commonGrouped.length} tipos • 4 calidades cada uno`}
        >
          {commonGrouped.flatMap(([, mats]) => 
            mats.map(mat => (
              <div key={mat.id} className="w-[140px]">
                <MaterialInput materialId={mat.id} />
              </div>
            ))
          )}
        </MaterialSection>
        
        <MaterialSection 
          title="Materiales de Forja"
          subtitle={`${forgeryGrouped.length} tipos • 4 calidades cada uno`}
        >
          {forgeryGrouped.flatMap(([, mats]) => 
            mats.map(mat => (
              <div key={mat.id} className="w-[140px]">
                <MaterialInput materialId={mat.id} />
              </div>
            ))
          )}
        </MaterialSection>
        
        <MaterialSection 
          title="Materiales de Jefes"
          subtitle={`${bossMaterials.length} materiales únicos`}
        >
          {bossMaterials.map(mat => (
            <div key={mat.id} className="w-[140px]">
              <MaterialInput materialId={mat.id} />
            </div>
          ))}
        </MaterialSection>
        
        <MaterialSection 
          title="Materiales de Mundo"
          subtitle={`${overworldMaterials.length} materiales únicos`}
        >
          {overworldMaterials.map(mat => (
            <div key={mat.id} className="w-[140px]">
              <MaterialInput materialId={mat.id} />
            </div>
          ))}
        </MaterialSection>
      </div>
    </div>
  );
}

