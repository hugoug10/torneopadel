import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import Button from './Button.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass shadow-card py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Torneo de <span className="text-gradient">Pádel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-white/80 transition hover:text-lime-accent">
            Inicio
          </Link>
          <Link to="/informacion" className="text-sm font-medium text-white/80 transition hover:text-lime-accent">
            Información
          </Link>
          <Button as={Link} to="/inscripcion" className="!px-6 !py-2.5 text-sm">
            Inscribirse
          </Button>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="glass mx-6 mt-4 flex flex-col gap-4 rounded-2xl p-6">
              <Link to="/" className="text-white/80 hover:text-lime-accent">Inicio</Link>
              <Link to="/informacion" className="text-white/80 hover:text-lime-accent">Información</Link>
              <Button as={Link} to="/inscripcion" className="w-full">Inscribirse</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
