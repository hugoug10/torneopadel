export async function onRequestGet() {
  return Response.json({ status: 'ok', torneo: 'Torneo de Pádel - Fuente de Pedro Naharro' });
}
