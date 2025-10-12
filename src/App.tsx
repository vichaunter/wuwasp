import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Home from '@/pages/Home';
import CharacterList from '@/pages/CharacterList';
import WeaponList from '@/pages/WeaponList';
import Planning from '@/pages/Planning';
import Inventory from '@/pages/Inventory';
import { Materials } from '@/pages/Materials';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/weapons" element={<WeaponList />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/materials" element={<Materials />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
