export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Wuthering Waves
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Planificador de Ascensión de Personajes
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Organiza y planifica la ascensión de tus personajes favoritos. 
          Gestiona tu inventario de materiales y prioriza tus recursos de manera eficiente.
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-4xl font-bold text-purple-400 mb-2">40</div>
          <div className="text-gray-400">Personajes</div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-2">82</div>
          <div className="text-gray-400">Materiales</div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">0</div>
          <div className="text-gray-400">En tu plan</div>
        </div>
      </div>
    </div>
  );
}
