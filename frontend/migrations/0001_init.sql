CREATE TABLE IF NOT EXISTS inscripciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jugador1_nombre TEXT NOT NULL,
  jugador1_apellidos TEXT NOT NULL,
  jugador1_telefono TEXT NOT NULL,
  jugador2_nombre TEXT NOT NULL,
  jugador2_apellidos TEXT NOT NULL,
  jugador2_telefono TEXT NOT NULL,
  fecha_inscripcion TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);
