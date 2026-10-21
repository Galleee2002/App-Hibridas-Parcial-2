# CommandHub — App Híbridas Parcial 2

Base del proyecto definido en `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
El frontend tiene Vite, Tailwind CSS 4 y shadcn/ui como andamiaje; todavía no hay pantallas ni funcionalidades del MVP.

## Entorno

- Node.js `24.22.0` LTS, fijado en `.nvmrc`.
- pnpm `10.33.0`, fijado en `package.json` mediante `packageManager`.
- Workspace con `backend/` y `frontend/`; un único `pnpm-lock.yaml` en la raíz.

Con nvm ya instalado y disponible en la terminal:

```bash
cd /ruta/al/proyecto
nvm install
nvm use
node --version
which node
pnpm --version
pnpm install --frozen-lockfile
```

Las versiones esperadas son `v24.22.0` y `10.33.0`. `which node` debe apuntar a `~/.nvm/versions/node/v24.22.0/...`. Si aparece otra ruta (por ejemplo Homebrew con Node 25), cargar nvm en esa terminal y volver a ejecutar `nvm use` antes de instalar o correr scripts.

Si falta pnpm, seguir su [guía oficial de instalación](https://pnpm.io/10.x/installation) para instalar la versión `10.33.0`.
No mezclar instalaciones de dependencias con npm o Yarn ni generar sus lockfiles.

`pnpm-workspace.yaml` configura versiones exactas al agregar paquetes y la comprobación estricta de engines y peers. `nodeVersion` define la versión contra la que pnpm comprueba compatibilidad; no cambia el Node activo de la terminal: para eso se usa `nvm use`.

## Frontend (base Vite)

Andamiaje de la app, sin páginas ni componentes de producto:

- `frontend/index.html`
- `frontend/vite.config.js` (plugin Tailwind y alias `@` hacia `src/`)
- `frontend/jsconfig.json` y `frontend/components.json` (shadcn/ui, estilo `base-nova`)
- `frontend/src/main.jsx` (monta un contenedor vacío; aún sin React Router)
- `frontend/src/index.css` (Tailwind, tokens Primer y aliases de color para shadcn)
- `frontend/src/lib/utils.js` y `frontend/src/components/ui/button.jsx`

```bash
nvm use
pnpm --filter commandhub-frontend dev
```

También: `pnpm --filter commandhub-frontend build` y `pnpm --filter commandhub-frontend preview`.

## Backend (API REST)

Punto de entrada Express alineado a la clase 19, con capas en `api/routes`, `api/controllers`, `services`, `middlewares` y `schemas`. Puerto `2026`. Endpoint de comprobación: `GET /api/estado`.

Variables de entorno (archivo `backend/.env`, fuera del repositorio; plantilla en `backend/.env.example`):

```
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/?appName=commandhub
MONGODB_DB=commandhub
```

```bash
nvm use
cp backend/.env.example backend/.env
# Completar MONGODB_URI y MONGODB_DB en backend/.env
pnpm --filter commandhub-backend dev
```

También: `pnpm --filter commandhub-backend start`. Los scripts cargan `.env` con `node --env-file` y, en desarrollo, reinician con `node --watch`.

## Dependencias aprobadas

| Paquete | Versión | Uso | Entorno |
| --- | --- | --- | --- |
| `react` | `19.3.1` | Componentes y estado | Frontend |
| `react-dom` | `19.3.1` | Renderizado en el navegador | Frontend |
| `react-router` | `8.4.0` | Navegación (declarado; aún no usado en `main.jsx`) | Frontend |
| `tailwindcss` | `4.3.3` | Utilidades CSS | Frontend |
| `@tailwindcss/vite` | `4.3.3` | Plugin de Tailwind para Vite | Frontend |
| `shadcn` | `4.22.1` | Componentes de interfaz | Frontend |
| `@base-ui/react` | `1.9.0` | Primitivas usadas por shadcn | Frontend |
| `class-variance-authority` | `0.7.1` | Variantes de componentes | Frontend |
| `cn` | `0.5.0` | Combinación de clases | Frontend |
| `lucide-react` | `1.60.0` | Iconos | Frontend |
| `tw-animate-css` | `1.4.0` | Animaciones de Tailwind | Frontend |
| `zod` | `4.6.7` | Validación de entradas | Frontend y backend |
| `express` | `5.3.0` | API REST | Backend |
| `mongodb` | `7.7.0` | Driver oficial de persistencia | Backend |
| `jsonwebtoken` | `9.0.3` | Firma y verificación de JWT | Backend |
| `bcryptjs` | `3.0.3` | Hash y comprobación de contraseñas | Backend |
| `vite` | `8.3.4` | Servidor de desarrollo y compilación | Solo desarrollo frontend |
| `@vitejs/plugin-react` | `6.1.2` | Integración de React con Vite | Solo desarrollo frontend |

La selección cubre las capacidades exigidas por la consigna: React y navegación, API REST, NoSQL, validación, JWT y protección de contraseñas. Las bibliotecas concretas fueron aprobadas por el usuario; no son todas nombres de paquetes exigidos por la consigna.

No se agregaron dependencias normales en la raíz ni dependencias de desarrollo en el backend. Se usarán las capacidades nativas de Node y del navegador para HTTP cliente, variables de entorno y reinicio en desarrollo cuando se configuren los puntos de entrada.

Para instalar únicamente las dependencias normales en un entorno de despliegue:

```bash
pnpm install --prod --frozen-lockfile
```

Ese comando omite Vite y su plugin. La compilación del frontend (`pnpm --filter commandhub-frontend build`) necesita las dependencias de desarrollo.

## Estado y verificaciones

Verificado el 20 de octubre de 2026 con Node `24.22.0` (vía `nvm use`) y pnpm `10.33.0`:

- Instalación del workspace y dependencias declaradas.
- `pnpm --filter commandhub-frontend build` completa con el entrypoint Vite base (17/10/2026).
- Backend (20/10/2026): etapa 1 cerrada. `GET /api/estado` respondió `{ "ok": true }` contra MongoDB Atlas. Capas en `api/routes`, `api/controllers`, `services`, `middlewares` y `schemas`.
- Índice de ejecución en `docs/ROADMAP.md`; etapas en `docs/ROADMAP-BACKEND.md` y `docs/ROADMAP-FRONTEND.md`.
- Frontend (20/10/2026): Tailwind CSS 4, shadcn/ui (`base-nova`) y el componente `Button`; `main.jsx` sigue sin router ni pantallas.

Pendientes: etapa 2 del backend (`docs/ROADMAP-BACKEND.md`, acceso a la cuenta). En el frontend, la etapa 1 de `docs/ROADMAP-FRONTEND.md` sigue abierta: falta enrutamiento y la separación de vistas / APIs. Las pantallas de producto esperan a que el roadmap de backend esté completo.

## Referencias del proyecto

- Alcance y requisitos: `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
- Ejecución: `docs/ROADMAP.md`, `docs/ROADMAP-BACKEND.md` y `docs/ROADMAP-FRONTEND.md`.
- Diseño visual: `docs/DESIGN-SYSTEM.md` y los tokens propios del proyecto.
- Estructura, sintaxis y organización del código: `DWN4AP-2026-2-clase-19/clase-19/back/` y `front/`, cuando el clon docente esté disponible localmente.

El clon docente está excluido de Git y del workspace de pnpm. No se instalan sus dependencias al instalar las de CommandHub y no se descarga al clonar este proyecto.

Fuentes técnicas: [Node.js LTS](https://nodejs.org/en/about/previous-releases), [configuración de pnpm](https://pnpm.io/10.x/settings), [React](https://react.dev/learn/build-a-react-app-from-scratch), [React Router](https://reactrouter.com/start/declarative/installation), [Vite](https://vite.dev/guide/), [Express](https://expressjs.com/en/starter/installing.html), [compatibilidad del driver MongoDB](https://www.mongodb.com/docs/drivers/compatibility/?driver-language=javascript&javascript-driver-framework=nodejs), [Zod](https://zod.dev/), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) y [bcryptjs](https://github.com/dcodeIO/bcrypt.js). Versiones y peers contrastados con el registro oficial `registry.npmjs.org`.
