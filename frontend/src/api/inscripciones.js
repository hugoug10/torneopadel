// Frontend y backend se sirven desde el mismo origen (Cloudflare Pages Functions),
// por lo que basta con una ruta relativa. VITE_API_URL permite sobreescribirla si hiciera falta.
const API_URL = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || 'Error en la petición.');
    error.fieldErrors = data.fieldErrors || null;
    error.status = res.status;
    throw error;
  }
  return data;
}

export async function crearInscripcion(payload) {
  const res = await fetch(`${API_URL}/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function obtenerInscripciones(query = '') {
  const url = query
    ? `${API_URL}/inscripciones?q=${encodeURIComponent(query)}`
    : `${API_URL}/inscripciones`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function eliminarInscripcion(id, adminPassword) {
  const res = await fetch(`${API_URL}/inscripciones/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': adminPassword },
  });
  return handleResponse(res);
}

export function csvExportUrl() {
  return `${API_URL}/inscripciones/export/csv`;
}

export async function verificarAdmin(password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return handleResponse(res);
}
