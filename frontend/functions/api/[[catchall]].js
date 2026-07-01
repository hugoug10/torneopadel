export async function onRequest() {
  return Response.json({ error: 'Ruta no encontrada.' }, { status: 404 });
}
