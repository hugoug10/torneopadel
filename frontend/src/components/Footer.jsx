import { Link } from 'react-router-dom';
import { MapPin, CalendarDays, Clock } from 'lucide-react';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-soft/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-semibold">Torneo de Pádel</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Torneo amateur de pádel abierto a todos los niveles. Deporte, diversión y buen ambiente.
          </p>
        </div>

        <div className="text-sm text-white/70">
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-lime-accent">
            Evento
          </h4>
          <p className="mb-2 flex items-center gap-2">
            <CalendarDays size={16} className="text-court-light" /> Sábado 18 de julio
          </p>
          <p className="mb-2 flex items-center gap-2">
            <Clock size={16} className="text-court-light" /> 20:00h hasta el final del torneo
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-court-light" /> Fuente de Pedro Naharro
          </p>
        </div>

        <div className="text-sm text-white/70">
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-lime-accent">
            Enlaces
          </h4>
          <div className="flex flex-col gap-2">
            <Link to="/informacion" className="transition hover:text-lime-accent">Información</Link>
            <Link to="/inscripcion" className="transition hover:text-lime-accent">Inscripción</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Torneo de Pádel - Fuente de Pedro Naharro. Todos los derechos reservados.
      </div>
    </footer>
  );
}
