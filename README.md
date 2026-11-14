# CommandHub — App Híbridas Parcial 2

Biblioteca personal de comandos definida en `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
Cada persona registra una cuenta, organiza categorías y guarda, busca y copia sus propios comandos. La API REST y las pantallas del MVP ya están armadas.

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

## Frontend

React con `createBrowserRouter`, Context de sesión, Tailwind CSS 4 y los tokens de `frontend/src/styles/tokens.css`. El consumo de la API está en `frontend/src/services/` (`api.service.js` y hooks `useApi*`). Los formularios usan Zod y `react-hook-form`.

Pantallas ya disponibles, con la sesión iniciada salvo registro, ingreso y salir:

- `/` — inicio privado
- `/registro`, `/ingreso`, `/salir`
- `/categorias` y alta, edición y eliminación
- `/comandos` — listado propio, búsqueda por título, filtro por categoría y copiar; alta, edición y eliminación
- `/cuenta` — ver nombre y correo; editar solo el nombre

`VITE_API_URL` es opcional. Si no está definida, el cliente usa `http://localhost:2026`. La plantilla está en `frontend/.env.example`.

```bash
nvm use
pnpm --filter commandhub-frontend dev
```

También: `pnpm --filter commandhub-frontend build` y `pnpm --filter commandhub-frontend preview`. Vite publica el frontend en su puerto de desarrollo habitual (`5173`). El backend tiene que estar en el puerto `2026`.

## Backend (API REST)

Punto de entrada Express alineado a la clase 26, con capas en `api/routes`, `api/controllers`, `services`, `middlewares` y `schemas`. Puerto `2026`. Las rutas de categorías y comandos, y el perfil, piden `Authorization: Bearer <token>`.

Endpoints actuales:

- `GET /api/estado` — comprobación de API y MongoDB
- `POST /api/usuarios` — registro (`nombre`, `correo`, `contraseña`)
- `POST /api/login` — ingreso; responde con JWT y datos públicos del usuario
- `GET /api/usuarios/me` — perfil del usuario autenticado
- `PUT /api/usuarios/me` — actualiza el nombre; el correo no se edita
- `GET /api/categorias` y `GET /api/categorias/:id`
- `POST /api/categorias`, `PUT /api/categorias/:id`, `DELETE /api/categorias/:id` — no borra una categoría que todavía tiene comandos
- `GET /api/comandos` — listado propio; acepta `titulo` y `categoriaId`
- `GET /api/comandos/:id`, `POST /api/comandos`, `PUT /api/comandos/:id`, `DELETE /api/comandos/:id`

Variables de entorno (archivo `backend/.env`, fuera del repositorio; plantilla en `backend/.env.example`). Ese archivo no se commitea: se entrega aparte, como pide la consigna.

```
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/?appName=commandhub
MONGODB_DB=commandhub
JWT_SECRET=cambia_este_secreto
```

```bash
nvm use
cp backend/.env.example backend/.env
# Completar MONGODB_URI, MONGODB_DB y JWT_SECRET en backend/.env
pnpm --filter commandhub-backend dev
```

También: `pnpm --filter commandhub-backend start`. Los scripts cargan `.env` con `node --env-file` y, en desarrollo, reinician con `node --watch`.

## Dependencias aprobadas

| Paquete | Versión | Uso | Entorno |
| --- | --- | --- | --- |
| `react` | `19.3.1` | Componentes y estado | Frontend |
| `react-dom` | `19.3.1` | Renderizado en el navegador | Frontend |
| `react-router` | `8.4.0` | Navegación con `createBrowserRouter` | Frontend |
| `react-hook-form` | `7.91.0` | Formularios | Frontend |
| `@hookform/resolvers` | `7.0.5` | Conecta Zod con los formularios | Frontend |
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

El 14/11/2026 el README quedó alineado al roadmap cerrado: Parte 1 (backend) y Parte 2 (frontend) terminadas. El cierre se recorrió en el navegador contra el backend en el puerto `2026`. Las pruebas de las etapas de backend siguen registradas en `docs/ROADMAP.md`.

## Referencias del proyecto

- Alcance y requisitos: `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
- Ejecución: `docs/ROADMAP.md`.
- Diseño visual: `docs/DESIGN-SYSTEM.md` y los tokens propios del proyecto.
- Estructura, sintaxis y organización del código: `DWN4AP-2026-2/clase-26/back/` y `front/`. Las diferencias autorizadas están en `AGENTS.md`.

El clon docente está excluido de Git y del workspace de pnpm. No se instalan sus dependencias al instalar las de CommandHub y no se descarga al clonar este proyecto.

Fuentes técnicas: [Node.js LTS](https://nodejs.org/en/about/previous-releases), [configuración de pnpm](https://pnpm.io/10.x/settings), [React](https://react.dev/learn/build-a-react-app-from-scratch), [React Router](https://reactrouter.com/start/declarative/installation), [Vite](https://vite.dev/guide/), [Express](https://expressjs.com/en/starter/installing.html), [compatibilidad del driver MongoDB](https://www.mongodb.com/docs/drivers/compatibility/?driver-language=javascript&javascript-driver-framework=nodejs), [Zod](https://zod.dev/), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) y [bcryptjs](https://github.com/dcodeIO/bcrypt.js). Versiones y peers contrastados con el registro oficial `registry.npmjs.org`.
