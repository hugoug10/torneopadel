import { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Users } from 'lucide-react';
import { obtenerInscripciones } from '../api/inscripciones.js';

export default function ParejasCounter() {
  const [count, setCount] = useState(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let cancelled = false;

    obtenerInscripciones()
      .then((data) => {
        if (!cancelled) setCount(data.length);
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (count === null) return undefined;
    const controls = animate(0, count, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="glass inline-flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3.5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-accent/20 text-lime-accent">
        <Users size={20} />
      </div>
      <div>
        <p className="font-display text-2xl font-bold leading-none">
          {count === null ? '—' : display}
        </p>
        <p className="text-xs text-white/60">
          {count === 1 ? 'pareja ya inscrita' : 'parejas ya inscritas'}
        </p>
      </div>
    </motion.div>
  );
}
