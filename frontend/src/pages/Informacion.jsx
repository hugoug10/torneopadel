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
      <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <AnimatedSection className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-lime-accent">
            Todo lo que necesitas saber
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Información del torneo
          </h1>
          <p className="mt-3 text-sm text-white/60 sm:mt-4 sm:text-base">
            Fecha, horario, precio y normas de participación en un solo lugar.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10 grid gap-4 sm:mb-14 sm:grid-cols-3 sm:gap-6">
          {scheduleItems.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="glass rounded-2xl border border-white/10 p-5 text-center shadow-card sm:p-6"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-court-light/20 text-lime-accent sm:mb-4 sm:h-12 sm:w-12">
                <Icon size={22} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {label}
              </p>
              <p className="mt-2 font-display text-base font-semibold sm:text-lg">{value}</p>
            </div>
          ))}
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {infoCards.map(({ icon: Icon, title, description }, index) => (
            <AnimatedSection key={title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, borderColor: 'rgba(212,245,71,0.5)' }}
                className="glass group h-full rounded-2xl border border-white/10 p-5 shadow-card transition-colors sm:p-7"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-court-light/20 text-lime-accent transition-colors group-hover:bg-lime-accent group-hover:text-ink sm:mb-5 sm:h-12 sm:w-12">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-base font-semibold sm:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2} className="mt-8 space-y-4 sm:mt-10">
          <div className="glass mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-lime-accent/30 p-5 shadow-card sm:gap-4 sm:p-6">
            <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent sm:h-9 sm:w-9">
              <HandCoins size={16} />
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-lime-accent">Sin ánimo de lucro:</span>{' '}
              el dinero de las inscripciones no genera ningún beneficio. Todo el importe se
              destina a los premios del torneo y a los gastos propios del evento (agua, algo
              para picar, alquiler de pista, etc.). El pago se abonará en metálico el mismo
              día del torneo.
            </p>
          </div>

          <div className="glass mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-lime-accent/30 p-5 shadow-card sm:gap-4 sm:p-6">
            <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent sm:h-9 sm:w-9">
              <Info size={16} />
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-lime-accent">Nota sobre el calendario:</span>{' '}
              el torneo se disputará el sábado. Si el número de parejas inscritas es muy elevado
              y no diera tiempo a completar el cuadro en una jornada, el torneo se ampliaría
              también al viernes.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-12 text-center sm:mt-16">
          <div className="glass mx-auto max-w-2xl rounded-3xl border border-white/10 px-6 py-8 shadow-card sm:px-8 sm:py-10">
            <h3 className="font-display text-xl font-bold sm:text-2xl">
              ¿Listo para pisar la pista?
            </h3>
            <p className="mt-3 text-sm text-white/60 sm:text-base">
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
