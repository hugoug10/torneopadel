# Torneo de Pádel — Fuente de Pedro Naharro

Web completa para gestionar las inscripciones del torneo amateur de pádel del
**sábado 18 de julio** en **Fuente de Pedro Naharro**. Incluye landing page,
formulario de inscripción por parejas y panel de administración.

Todo el proyecto (frontend + API) vive en un único proyecto de **Cloudflare Pages**,
con **Cloudflare D1** como base de datos.

## Stack tecnológico

- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Framer Motion, lucide-react.
- **Backend:** Cloudflare Pages Functions (`frontend/functions/`) — mismo origen que el
  frontend, sin servidor Express independiente.
- **Base de datos:** Cloudflare D1 (SQL compatible con SQLite, gestionado por Cloudflare).

## Requisitos previos

- Node.js 18 o superior.
- Una cuenta de Cloudflare y sesión iniciada con Wrangler: `npx wrangler login`.

## Estructura del proyecto

```
TorneoPadel/
└── frontend/
    ├── src/            Aplicación React (Vite)
    ├── functions/       API (Cloudflare Pages Functions)
    │   ├── api/
    │   └── _lib/        Código compartido (validaciones, auth, formateo)
    ├── migrations/      Esquema SQL de la base de datos D1
    └── wrangler.toml    Configuración de Cloudflare (binding de D1, etc.)
```

## Puesta en marcha (desarrollo local)

```bash
cd frontend
npm install
cp .dev.vars.example .dev.vars   # ajusta ADMIN_PASSWORD
npm run db:migrate:local          # crea las tablas en la base de datos D1 local
```

Hay dos formas de desarrollar:

- **`npm run dev`** — Vite puro, recarga instantánea para maquetar la interfaz. Las
  llamadas a `/api/...` no funcionarán en este modo (no hay Functions corriendo).
- **`npm run dev:full`** — compila el frontend y levanta `wrangler pages dev`, sirviendo
  frontend + API + D1 local juntos en `http://localhost:8788`. Úsalo para probar el flujo
  completo (inscripción, panel de administración, etc.). Hay que repetir este comando tras
  cada cambio para reconstruir.

## Despliegue a Cloudflare Pages

1. Crea la base de datos D1 (solo la primera vez):
   ```bash
   npx wrangler d1 create torneo-padel-db
   ```
   Copia el `database_id` que te devuelve en `frontend/wrangler.toml`.

2. Aplica el esquema a la base de datos remota:
   ```bash
   npm run db:migrate:remote
   ```

3. Configura el secreto de administrador en Cloudflare (no se guarda en el repo):
   ```bash
   npx wrangler pages secret put ADMIN_PASSWORD --project-name=torneo-padel
   ```

4. Despliega:
   ```bash
   npm run deploy
   ```

En despliegues sucesivos solo hace falta `npm run deploy`. Si conectas el repositorio Git al
dashboard de Cloudflare Pages, el despliegue se dispara automáticamente en cada push (recuerda
enlazar la base de datos D1 y el secreto `ADMIN_PASSWORD` desde el propio dashboard del proyecto).

## Endpoints de la API

| Método | Ruta                              | Descripción                                              | Protegido |
|--------|------------------------------------|-----------------------------------------------------------|-----------|
| POST   | `/api/inscripciones`               | Crea una inscripción (pareja de jugadores)                 | No        |
| GET    | `/api/inscripciones?q=texto`       | Lista inscripciones (con búsqueda opcional por nombre/teléfono) | No |
| GET    | `/api/inscripciones/export/csv`    | Exporta todas las inscripciones en CSV                     | Sí (`x-admin-password`) |
| DELETE | `/api/inscripciones/:id`           | Elimina una inscripción                                    | Sí (`x-admin-password`) |
| POST   | `/api/admin/login`                 | Verifica la contraseña de administrador                    | No        |

## Panel de administración

Accede a `/admin`, introduce la contraseña configurada en `ADMIN_PASSWORD` y podrás:

- Ver todas las parejas inscritas (fecha, jugadores y teléfonos).
- Buscar por nombre o teléfono.
- Eliminar inscripciones (con confirmación).
- Exportar todas las inscripciones a CSV.

## Notas de producción

- `ADMIN_PASSWORD` vive solo en `.dev.vars` (local, excluido de git) y en los secretos de
  Cloudflare Pages (`wrangler pages secret put`) — nunca en `wrangler.toml` ni en el repo.
- La base de datos D1 tiene un tier gratuito generoso (5 GB de almacenamiento) más que
  suficiente para este uso.
