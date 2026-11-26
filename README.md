# API MySQL + express-validator (ESM)

Ejemplo con **Express 5**, **express-validator 7** (ESM), **MySQL2** y validaciones en rutas/middlewares.

## Requisitos
- Node.js (recomendado LTS)
- MySQL con una BD/tablas compatibles (ver `ejemplo.sql` si existe)

## Instalación
```bash
npm install
```

## Configuración (.env)
Crea un archivo `.env` en la raíz (ya hay uno de ejemplo) con, por ejemplo:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_DATABASE=nombre_bd
```

## Ejecución
```bash
npm run dev
# o
npm start
```

Servidor por defecto: `http://localhost:PORT` (prefijo API: `/api`).

## Notas sobre validación (resumen)
- Las reglas van en rutas (`routes/userRoutes.js`) con `check/param/body`.
- `middlewares/validar-campos.js` usa `validationResult(req).array()` y responde `400 { errors: [...] }`.
- Validaciones custom y acceso a BD en `helpers/db-validators.js` (async/await).
- En controladores se evita repetir comprobaciones de validación cuando ya existe el middleware.

## Estructura
- `app/` arranque (`app.js`, `server.js`)
- `routes/` rutas
- `middlewares/` validación y middlewares propios
- `helpers/` validadores custom / DB
- `controllers/` lógica de endpoints
- `database/` conexión MySQL (`Conexion.js`)