import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Home } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';

export default function Confirmacion() {
  return (
    <PageTransition>
      <section className="flex min-h-screen items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass w-full max-w-lg rounded-3xl border border-white/10 p-10 text-center shadow-card"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent"
          >
            <CheckCircle2 size={48} strokeWidth={1.6} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="font-display text-3xl font-bold sm:text-4xl"
          >
            ¡Inscripción realizada correctamente!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 text-white/70"
          >
            Nos pondremos en contacto contigo si fuese necesario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8"
          >
            <Button as={Link} to="/" className="mx-auto">
              <Home size={18} /> Volver al inicio
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
