import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Download, LogOut, Lock, ShieldAlert } from 'lucide-react';
import Button from '../components/Button.jsx';
import FormInput from '../components/FormInput.jsx';
import Loader from '../components/Loader.jsx';
import PageTransition from '../components/PageTransition.jsx';
import {
  obtenerInscripciones,
  eliminarInscripcion,
  verificarAdmin,
  csvExportUrl,
} from '../api/inscripciones.js';

const SESSION_KEY = 'torneo_admin_password';

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(SESSION_KEY) || '');
  const [authed, setAuthed] = useState(() => Boolean(sessionStorage.getItem(SESSION_KEY)));

  if (!authed) {
    return (
      <PageTransition>
        <LoginGate
          onSuccess={(pwd) => {
            sessionStorage.setItem(SESSION_KEY, pwd);
            setPassword(pwd);
            setAuthed(true);
          }}
        />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Dashboard
        password={password}
        onLogout={() => {
          sessionStorage.removeItem(SESSION_KEY);
          setAuthed(false);
        }}
      />
    </PageTransition>
  );
}

function LoginGate({ onSuccess }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verificarAdmin(value);
      onSuccess(value);
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-24">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass w-full max-w-sm rounded-3xl border border-white/10 p-8 text-center shadow-card"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-lime-accent/20 text-lime-accent">
          <Lock size={26} />
        </div>
        <h1 className="font-display text-2xl font-bold">Panel de administración</h1>
        <p className="mt-2 text-sm text-white/60">Introduce la contraseña para acceder a las inscripciones.</p>

        <div className="mt-6 text-left">
          <FormInput
            label="Contraseña"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={error}
            placeholder="••••••••"
            autoFocus
          />
        </div>

        <Button type="submit" disabled={loading} className="mt-6 w-full disabled:opacity-60">
          {loading ? 'Comprobando...' : 'Acceder'}
        </Button>
      </motion.form>
    </section>
  );
}

function Dashboard({ password, onLogout }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(query);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function fetchData(q) {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerInscripciones(q);
      setInscripciones(data);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las inscripciones.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await eliminarInscripcion(id, password);
      setInscripciones((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la inscripción.');
    } finally {
      setDeletingId(null);
      setConfirmTarget(null);
    }
  }

  async function handleExportCsv() {
    try {
      const res = await fetch(csvExportUrl(), {
        headers: { 'x-admin-password': password },
      });
      if (!res.ok) throw new Error('No se pudo exportar el CSV.');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'inscripciones_torneo_padel.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'No se pudo exportar el CSV.');
    }
  }

  const totalParejas = inscripciones.length;

  return (
    <section className="mx-auto min-h-screen max-w-6xl px-6 pb-24 pt-32">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-lime-accent">
            Administración
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Inscripciones del torneo
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {totalParejas} pareja{totalParejas === 1 ? '' : 's'} inscrita{totalParejas === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportCsv} className="!px-5 !py-2.5 text-sm">
            <Download size={18} /> Exportar CSV
          </Button>
          <Button variant="ghost" onClick={onLogout} className="!px-5 !py-2.5 text-sm">
            <LogOut size={18} /> Salir
          </Button>
        </div>
      </div>

      <div className="glass mb-6 flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3.5">
        <Search size={18} className="text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o teléfono..."
          className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
        />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <ShieldAlert size={18} /> {error}
        </div>
      )}

      {loading ? (
        <Loader label="Cargando inscripciones..." />
      ) : (
        <div className="glass overflow-hidden rounded-2xl border border-white/10 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
                  <th className="px-5 py-4">Fecha</th>
                  <th className="px-5 py-4">Jugador 1</th>
                  <th className="px-5 py-4">Teléfono</th>
                  <th className="px-5 py-4">Jugador 2</th>
                  <th className="px-5 py-4">Teléfono</th>
                  <th className="px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {inscripciones.map((row) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-b border-white/5 transition-colors hover:bg-white/5"
                    >
                      <td className="px-5 py-4 text-white/70">{row.fecha}</td>
                      <td className="px-5 py-4 font-medium">
                        {row.jugador1.nombre} {row.jugador1.apellidos}
                      </td>
                      <td className="px-5 py-4 text-white/70">{row.jugador1.telefono}</td>
                      <td className="px-5 py-4 font-medium">
                        {row.jugador2.nombre} {row.jugador2.apellidos}
                      </td>
                      <td className="px-5 py-4 text-white/70">{row.jugador2.telefono}</td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setConfirmTarget(row)}
                          disabled={deletingId === row.id}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          {deletingId === row.id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>

                {inscripciones.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-white/40">
                      No hay inscripciones que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {confirmTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
            onClick={() => setConfirmTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-sm rounded-2xl border border-white/10 p-7 text-center shadow-card"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-400/15 text-red-300">
                <Trash2 size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold">Eliminar inscripción</h3>
              <p className="mt-2 text-sm text-white/60">
                ¿Seguro que quieres eliminar la inscripción de{' '}
                <span className="font-medium text-white/85">
                  {confirmTarget.jugador1.nombre} {confirmTarget.jugador1.apellidos}
                </span>{' '}
                y{' '}
                <span className="font-medium text-white/85">
                  {confirmTarget.jugador2.nombre} {confirmTarget.jugador2.apellidos}
                </span>
                ? Esta acción no se puede deshacer.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmTarget(null)}
                  className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(confirmTarget.id)}
                  disabled={deletingId === confirmTarget.id}
                  className="flex-1 rounded-full bg-red-400/90 px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
                >
                  {deletingId === confirmTarget.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
