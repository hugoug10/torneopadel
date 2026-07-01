import { isAdminAuthorized } from '../../../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  if (!isAdminAuthorized(request, env)) {
    return Response.json(
      { error: 'No autorizado. Contraseña de administrador incorrecta.' },
      { status: 401 }
    );
  }

  const { results } = await env.DB.prepare('SELECT * FROM inscripciones ORDER BY id DESC').all();

  const header = [
    'Fecha',
    'Jugador 1 - Nombre',
    'Jugador 1 - Apellidos',
    'Jugador 1 - Teléfono',
    'Jugador 2 - Nombre',
    'Jugador 2 - Apellidos',
    'Jugador 2 - Teléfono',
  ];

  const escapeCsv = (value) => `"${String(value).replace(/"/g, '""')}"`;

  const lines = [header.join(';')];
  for (const row of results) {
    lines.push(
      [
        row.fecha_inscripcion,
        row.jugador1_nombre,
        row.jugador1_apellidos,
        row.jugador1_telefono,
        row.jugador2_nombre,
        row.jugador2_apellidos,
        row.jugador2_telefono,
      ]
        .map(escapeCsv)
        .join(';')
    );
  }

  const csv = '﻿' + lines.join('\r\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="inscripciones_torneo_padel.csv"',
    },
  });
}
