import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  ShieldCheck,
  Trophy,
  ArrowRight,
  Info,
  HandCoins,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import PageTransition from '../components/PageTransition.jsx';

const scheduleItems = [
  { icon: CalendarDays, label: 'Fecha', value: 'Sábado 18 de julio' },
  { icon: Clock, label: 'Horario', value: '20:00h hasta el final del torneo' },
  { icon: MapPin, label: 'Lugar', value: 'Fuente de Pedro Naharro' },
];

const infoCards = [
  {
    icon: Ticket,
    title: '20 € por pareja',
    description: '10 € por persona. Precio único, sin sorpresas ni costes ocultos.',
  },
  {
    icon: ShieldCheck,
    title: 'Inscripción previa obligatoria',
    description: 'Reserva tu plaza online antes del torneo para asegurar tu participación.',
  },
  {
    icon: Trophy,
    title: 'Ambiente deportivo',
    description: 'Buen compañerismo, deporte y diversión para todos los niveles de juego.',
  },
];

export default function Informacion() {
  return (
    <PageTransition>
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-32">
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-lime-accent">
            Todo lo que necesitas saber
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Información del torneo
          </h1>
          <p className="mt-4 text-white/60">
            Fecha, horario, precio y normas de participación en un solo lugar.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-14 grid gap-6 sm:grid-cols-3">
          {scheduleItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass rounded-2xl border border-white/10 p-6 text-center shadow-card"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-court-light/20 text-lime-accent">
                <Icon size={24} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {label}
              </p>
              <p className="mt-2 font-display text-lg font-semibold">{value}</p>
            </div>
          ))}
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-3">
          {infoCards.map(({ icon: Icon, title, description }, index) => (
            <AnimatedSection key={title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, borderColor: 'rgba(212,245,71,0.5)' }}
                className="glass group h-full rounded-2xl border border-white/10 p-7 shadow-card transition-colors"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-court-light/20 text-lime-accent transition-colors group-hover:bg-lime-accent group-hover:text-ink">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2} className="mt-10 space-y-4">
          <div className="glass mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-lime-accent/30 p-6 shadow-card">
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent">
              <HandCoins size={18} />
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-lime-accent">Sin ánimo de lucro:</span>{' '}
              el dinero de las inscripciones no genera ningún beneficio. Todo el importe se
              destina a los premios del torneo y a los gastos propios del evento (agua, algo
              para picar, alquiler de pista, etc.).
            </p>
          </div>

          <div className="glass mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-lime-accent/30 p-6 shadow-card">
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent">
              <Info size={18} />
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-lime-accent">Nota sobre el calendario:</span>{' '}
              el torneo se disputará el sábado. Si el número de parejas inscritas es muy elevado
              y no diera tiempo a completar el cuadro en una jornada, el torneo se ampliaría
              también al viernes.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-16 text-center">
          <div className="glass mx-auto max-w-2xl rounded-3xl border border-white/10 px-8 py-10 shadow-card">
            <h3 className="font-display text-2xl font-bold">
              ¿Listo para pisar la pista?
            </h3>
            <p className="mt-3 text-white/60">
              Asegura tu plaza ahora mismo, las inscripciones se completan rápido.
            </p>
            <Button as={Link} to="/inscripcion" className="mt-6">
              Inscribirse <ArrowRight size={20} />
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}
