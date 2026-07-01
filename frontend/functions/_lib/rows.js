export function toRow(record) {
  return {
    id: record.id,
    fecha: record.fecha_inscripcion,
    nombreEquipo: record.nombre_equipo,
    jugador1: {
      nombre: record.jugador1_nombre,
      apellidos: record.jugador1_apellidos,
      telefono: record.jugador1_telefono,
    },
    jugador2: {
      nombre: record.jugador2_nombre,
      apellidos: record.jugador2_apellidos,
      telefono: record.jugador2_telefono,
    },
  };
}
