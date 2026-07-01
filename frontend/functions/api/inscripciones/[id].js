import { isAdminAuthorized } from '../../_lib/auth.js';

export async function onRequestDelete({ request, env, params }) {
  if (!isAdminAuthorized(request, env)) {
    return Response.json(
      { error: 'No autorizado. Contraseña de administrador incorrecta.' },
      { status: 401 }
    );
  }

  const { id } = params;
  const result = await env.DB.prepare('DELETE FROM inscripciones WHERE id = ?').bind(id).run();

  if (result.meta.changes === 0) {
    return Response.json({ error: 'Inscripción no encontrada.' }, { status: 404 });
  }

  return Response.json({ ok: true });
}
