import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Ticket, AlertCircle } from 'lucide-react';
import Button from '../components/Button.jsx';
import FormInput from '../components/FormInput.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { crearInscripcion } from '../api/inscripciones.js';

const PHONE_REGEX = /^[6789]\d{8}$/;

const initialForm = {
  jugador1Nombre: '',
  jugador1Apellidos: '',
  jugador1Telefono: '',
  jugador2Nombre: '',
  jugador2Apellidos: '',
  jugador2Telefono: '',
};

function validate(form) {
  const errors = {};
  const requiredFields = [
    ['jugador1Nombre', 'El nombre es obligatorio.'],
    ['jugador1Apellidos', 'Los apellidos son obligatorios.'],
    ['jugador2Nombre', 'El nombre es obligatorio.'],
    ['jugador2Apellidos', 'Los apellidos son obligatorios.'],
  ];

  for (const [key, message] of requiredFields) {
    if (!form[key] || form[key].trim().length < 2) {
      errors[key] = message;
    }
  }

  const phone1 = form.jugador1Telefono.replace(/[\s-]/g, '');
  const phone2 = form.jugador2Telefono.replace(/[\s-]/g, '');

  if (!PHONE_REGEX.test(phone1)) {
    errors.jugador1Telefono = 'Teléfono no válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';
  }
  if (!PHONE_REGEX.test(phone2)) {
    errors.jugador2Telefono = 'Teléfono no válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';
  }

  return errors;
}

export default function Inscripcion() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await crearInscripcion(form);
      navigate('/confirmacion');
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
      }
      setServerError(err.message || 'No se pudo completar la inscripción. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageTransition>
      <section className="relative mx-auto min-h-screen max-w-3xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <AnimatedSection className="mb-8 text-center sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-lime-accent">
            Reserva tu plaza
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Inscripción al torneo
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:mt-4 sm:text-base">
            Rellena los datos de la pareja para completar la inscripción. Todos los campos son obligatorios.
          </p>

          <div className="glass mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-lime-accent/30 px-4 py-2 text-xs font-semibold text-lime-accent sm:mt-6 sm:px-5 sm:py-2.5 sm:text-sm">
            <Ticket size={16} /> Precio: 20 € por pareja (10 € por persona)
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="glass space-y-8 rounded-3xl border border-white/10 p-5 shadow-card sm:space-y-10 sm:p-10">
            <PlayerFields
              title="Jugador 1"
              prefix="jugador1"
              form={form}
              errors={errors}
              onChange={handleChange}
            />

            <div className="h-px bg-white/10" />

            <PlayerFields
              title="Jugador 2"
              prefix="jugador2"
              form={form}
              errors={errors}
              onChange={handleChange}
            />

            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300"
              >
                <AlertCircle size={18} /> {serverError}
              </motion.div>
            )}

            <Button type="submit" disabled={submitting} className="w-full disabled:opacity-60">
              {submitting ? 'Enviando...' : 'Enviar inscripción'}
            </Button>
          </form>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}

function PlayerFields({ title, prefix, form, errors, onChange }) {
  return (
    <div>
      <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold text-lime-accent">
        <User size={20} /> {title}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          label="Nombre"
          name={`${prefix}Nombre`}
          value={form[`${prefix}Nombre`]}
          onChange={onChange}
          error={errors[`${prefix}Nombre`]}
          placeholder="Nombre"
          autoComplete="given-name"
        />
        <FormInput
          label="Apellidos"
          name={`${prefix}Apellidos`}
          value={form[`${prefix}Apellidos`]}
          onChange={onChange}
          error={errors[`${prefix}Apellidos`]}
          placeholder="Apellidos"
          autoComplete="family-name"
        />
        <div className="sm:col-span-2">
          <FormInput
            label="Número de teléfono"
            name={`${prefix}Telefono`}
            value={form[`${prefix}Telefono`]}
            onChange={onChange}
            error={errors[`${prefix}Telefono`]}
            placeholder="600 000 000"
            type="tel"
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  );
}
