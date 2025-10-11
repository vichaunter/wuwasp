import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Home from '@/pages/Home';
import CharacterList from '@/pages/CharacterList';
import Inventory from '@/pages/Inventory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
