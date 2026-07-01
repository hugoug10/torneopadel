export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  if (!password || password !== env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }

  return Response.json({ ok: true });
}
