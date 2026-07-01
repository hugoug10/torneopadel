import { validateInscripcion, normalizePhone } from '../../_lib/validators.js';
import { toRow } from '../../_lib/rows.js';

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const { valid, errors } = validateInscripcion(body);

  if (!valid) {
    return Response.json(
      { error: 'Datos de inscripción inválidos.', fieldErrors: errors },
      { status: 400 }
    );
  }

  const record = {
    jugador1_nombre: body.jugador1Nombre.trim(),
    jugador1_apellidos: body.jugador1Apellidos.trim(),
    jugador1_telefono: normalizePhone(body.jugador1Telefono),
    jugador2_nombre: body.jugador2Nombre.trim(),
    jugador2_apellidos: body.jugador2Apellidos.trim(),
    jugador2_telefono: normalizePhone(body.jugador2Telefono),
  };

  const result = await env.DB.prepare(
    `INSERT INTO inscripciones (
      jugador1_nombre, jugador1_apellidos, jugador1_telefono,
      jugador2_nombre, jugador2_apellidos, jugador2_telefono
    ) VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(
      record.jugador1_nombre,
      record.jugador1_apellidos,
      record.jugador1_telefono,
      record.jugador2_nombre,
      record.jugador2_apellidos,
      record.jugador2_telefono
    )
    .run();

  const created = await env.DB.prepare('SELECT * FROM inscripciones WHERE id = ?')
    .bind(result.meta.last_row_id)
    .first();

  return Response.json(toRow(created), { status: 201 });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  let stmt;
  if (q && q.trim() !== '') {
    const term = `%${q.trim().toLowerCase()}%`;
    stmt = env.DB.prepare(
      `SELECT * FROM inscripciones
       WHERE LOWER(jugador1_nombre) LIKE ?
          OR LOWER(jugador1_apellidos) LIKE ?
          OR LOWER(jugador2_nombre) LIKE ?
          OR LOWER(jugador2_apellidos) LIKE ?
          OR jugador1_telefono LIKE ?
          OR jugador2_telefono LIKE ?
       ORDER BY id DESC`
    ).bind(term, term, term, term, term, term);
  } else {
    stmt = env.DB.prepare('SELECT * FROM inscripciones ORDER BY id DESC');
  }

  const { results } = await stmt.all();
  return Response.json(results.map(toRow));
}
