import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Informacion from './pages/Informacion.jsx';
import Inscripcion from './pages/Inscripcion.jsx';
import Confirmacion from './pages/Confirmacion.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-court-lines">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/informacion" element={<Informacion />} />
          <Route path="/inscripcion" element={<Inscripcion />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
