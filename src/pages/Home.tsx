import { MaterialCard } from '@/components/MaterialCard';
import { MaterialInput } from '@/components/MaterialInput';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Wuthering Waves
          </h1>
          <p className="text-xl text-gray-400">
            Planificador de Ascensión de Personajes
          </p>
        </div>
        
        {/* Demo Sections */}
        <div className="space-y-12">
          {/* Material Cards Demo */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                Material Cards
              </h2>
              <p className="text-gray-400 text-sm">
                Vista de materiales en plan de ascensión de personajes
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <MaterialCard materialId="lf-tidal-residuum" required={4} />
              <MaterialCard materialId="mf-tidal-residuum" required={9} />
              <MaterialCard materialId="hf-tidal-residuum" required={9} />
              <MaterialCard materialId="ff-tidal-residuum" required={4} />
              <MaterialCard materialId="blighted-crown-of-puppet-king" required={46} />
              <MaterialCard materialId="luminous-calendula" required={60} />
            </div>
          </section>
          
          {/* Material Inputs Demo */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                Gestión de Inventario
              </h2>
              <p className="text-gray-400 text-sm">
                Administra tus materiales disponibles
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MaterialInput materialId="lf-tidal-residuum" />
              <MaterialInput materialId="mf-tidal-residuum" />
              <MaterialInput materialId="hf-tidal-residuum" />
              <MaterialInput materialId="ff-tidal-residuum" />
              <MaterialInput materialId="blighted-crown-of-puppet-king" />
              <MaterialInput materialId="luminous-calendula" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
