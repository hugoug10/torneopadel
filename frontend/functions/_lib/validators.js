// Teléfono español: móviles (6/7) y fijos (8/9), 9 dígitos, con espacios/guiones opcionales.
const PHONE_REGEX = /^[6789]\d{8}$/;

export function normalizePhone(raw) {
  return String(raw || '').replace(/[\s-]/g, '');
}

export function isValidPhone(raw) {
  return PHONE_REGEX.test(normalizePhone(raw));
}

export function isNonEmptyText(value, { min = 2, max = 60 } = {}) {
  const text = String(value || '').trim();
  return text.length >= min && text.length <= max;
}

export function validateInscripcion(body) {
  const errors = {};
  const fields = [
    ['nombreEquipo', 'Nombre del equipo'],
    ['jugador1Nombre', 'Nombre del jugador 1'],
    ['jugador1Apellidos', 'Apellidos del jugador 1'],
    ['jugador2Nombre', 'Nombre del jugador 2'],
    ['jugador2Apellidos', 'Apellidos del jugador 2'],
  ];

  for (const [key, label] of fields) {
    if (!isNonEmptyText(body[key])) {
      errors[key] = `${label} es obligatorio (2-60 caracteres).`;
    }
  }

  if (!isValidPhone(body.jugador1Telefono)) {
    errors.jugador1Telefono = 'Teléfono del jugador 1 no válido (9 dígitos, empieza por 6-9).';
  }

  if (!isValidPhone(body.jugador2Telefono)) {
    errors.jugador2Telefono = 'Teléfono del jugador 2 no válido (9 dígitos, empieza por 6-9).';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
