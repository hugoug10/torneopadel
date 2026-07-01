import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';
import PageTransition from '../components/PageTransition.jsx';
import ParejasCounter from '../components/ParejasCounter.jsx';

export default function Home() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient pt-24">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-court-light/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-lime-accent/20 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-lime-accent"
            >
              Torneo amateur · Abierto a todos los niveles
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Torneo de <span className="text-gradient">Pádel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-3 font-display text-2xl font-medium text-white/80 sm:text-3xl"
            >
              Fuente de Pedro Naharro
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-white/85"
            >
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <CalendarDays size={18} className="text-lime-accent" /> Sábado 18 de julio
              </span>
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <Clock size={18} className="text-lime-accent" /> 20:00h hasta el final del torneo
              </span>
              <span className="glass flex items-center gap-2 rounded-full px-4 py-2">
                <MapPin size={18} className="text-lime-accent" /> Fuente de Pedro Naharro
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/70"
            >
              Un torneo amateur pensado para disfrutar del pádel en buena compañía,
              sea cual sea tu nivel. Ven a competir, pasarlo bien y compartir pista
              con otros jugadores de la zona.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button as={Link} to="/inscripcion" className="text-lg">
                Inscribirse <ArrowRight size={20} />
              </Button>
              <Link
                to="/informacion"
                className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-lime-accent hover:underline"
              >
                Ver más información
              </Link>
            </motion.div>

            <div className="mt-8">
              <ParejasCounter />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden justify-self-center md:block"
          >
            <PadelCourtGraphic />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Descubre más</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="h-8 w-5 rounded-full border-2 border-white/30 p-1"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-lime-accent" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto max-w-2xl rounded-3xl border border-white/10 px-8 py-10 text-center shadow-card"
        >
          <h3 className="font-display text-2xl font-bold">
            ¿Listo para pisar la pista?
          </h3>
          <p className="mt-3 text-white/60">
            Consulta precio, horarios y normas del torneo, o asegura tu plaza ahora mismo.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/inscripcion">
              Inscribirse <ArrowRight size={20} />
            </Button>
            <Button as={Link} to="/informacion" variant="outline">
              Ver información
            </Button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

function PadelCourtGraphic() {
  return (
    <div className="relative h-[420px] w-[340px]">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="glass absolute inset-0 rounded-[2.5rem] border border-white/10 shadow-glow"
      >
        <svg viewBox="0 0 300 380" className="h-full w-full p-8" fill="none">
          <rect x="10" y="10" width="280" height="360" rx="18" fill="#0F6B3A" stroke="#D4F547" strokeWidth="3" />
          <line x1="10" y1="190" x2="290" y2="190" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.85" />
          <line x1="150" y1="10" x2="150" y2="370" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
          <line x1="10" y1="130" x2="290" y2="130" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
          <line x1="10" y1="250" x2="290" y2="250" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
          <rect x="10" y="10" width="280" height="360" rx="18" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -right-6 top-10 h-16 w-16 rounded-full bg-lime-accent shadow-glow"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-8 bottom-16 flex h-20 w-20 items-center justify-center rounded-full bg-ink-soft/80 shadow-card"
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-display text-2xl font-bold text-lime-accent">18</span>
      </motion.div>
    </div>
  );
}
