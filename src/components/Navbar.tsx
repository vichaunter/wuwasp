import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Wuthering Waves Planner
            </h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Inicio
            </Link>
            
            <Link
              to="/characters"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/characters')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Personajes
            </Link>
            
            <Link
              to="/inventory"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/inventory')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Inventario
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

