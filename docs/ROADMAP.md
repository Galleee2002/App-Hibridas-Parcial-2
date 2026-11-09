# Roadmap — CommandHub MVP

**Producto:** CommandHub (biblioteca personal de comandos)  
**Estado general:** en curso  
**Fuentes de alcance:** [CONSIGNA-PARCIAL-2.md](./CONSIGNA-PARCIAL-2.md), [PRD.md](./PRD.md)  
**Reglas de trabajo:** [AGENTS.md](../AGENTS.md)  
**Diseño visual:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

Este archivo es el único roadmap de ejecución del MVP. Primero se completan las etapas de la API. Después se suman las pantallas que las consumen. Completar y verificar una etapa antes de pasar a la siguiente. No saltar etapas ni ampliar el alcance sin indicación explícita. Actualizar el **estado** de cada etapa al cerrarla. Queda fuera del MVP lo listado en el PRD sección 10.

Prioridad del PRD (sección 12): acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros → mejoras visuales / cierre.

## Stack acordado

| Capa | Tecnología |
| --- | --- |
| Frontend | React (JavaScript), React Router, Context, Tailwind CSS, shadcn/ui (preset `b2DcW8Pfk`) |
| Backend | Express.js (JavaScript, ES modules) |
| Base de datos | MongoDB (driver nativo) |
| Validación | Zod (backend y frontend) |
| Auth | JWT, contraseñas hasheadas |

Estructura de código alineada a `DWN4AP-2026-2/clase-25/` (`back/` y `front/`). Carpetas del proyecto: `backend/` y `frontend/`. El backend es solo API REST. Los colores siguen los tokens Primer en `frontend/src/styles/tokens.css`; el preset de shadcn no los reemplaza.

## Orden de ejecución

```text
Parte 1 — Backend
  1 Base API ──► 2 Acceso ──► 3 Categorías ──► 4 Comandos ──► 5 Consulta ──┐
                       │                                                    │
                       └──────────────────► 6 Mi cuenta ────────────────────┘

Parte 2 — Frontend (pantallas de producto cuando el backend esté completo)
  1 Base React ──► 2 Registro e ingreso ──► 3 Categorías ──► 4 Comandos ──► 5 Mis comandos ──┐
                              │                                                              ├──► 7 Cierre
                              └──────────────────────────► 6 Mi cuenta ──────────────────────┘
```

La etapa 1 del frontend (base Vite) puede avanzar como andamiaje, sin vistas de producto. Las pantallas (etapas 2 a 7 del frontend) empiezan cuando la Parte 1 (backend) está completa.

## Siguiente paso

Etapa 4 de la Parte 1 (backend): comandos (CRUD autenticado).

---

# Parte 1 — Backend (API REST)

**Capa:** API REST en `backend/`  
**Estado general:** en curso

## Forma de trabajo (backend)

La estructura y la sintaxis siguen `DWN4AP-2026-2/clase-25/back/`, adaptadas a CommandHub:

- Capas REST: `api/routes` → `middlewares` (Zod) → `api/controllers` → `services`, más `schemas`.
- JavaScript ESM: `export async function`, `export default router`, `import * as servicio`.
- Las URIs nombran recursos; el verbo HTTP indica la acción.
- Validación con Zod (`parseAsync`); el body validado reemplaza `req.body`; errores `400` como lista de mensajes.
- JWT en header `Bearer`; contraseñas con bcrypt.
- MongoDB con driver nativo; credenciales por `.env` (consigna), fuera del repositorio.
- Mensajes en español.
- El backend es solo API REST (sin vistas HTML/SSR del material docente).

No se copian las entidades ni las reglas del ejemplo docente (juegos, roles, reseñas, política de contraseña, login social). El alcance es el PRD: nombre, correo y contraseña para el registro.

---

## Backend — Etapa 1 — Base de la API

| Campo | Valor |
| --- | --- |
| **Estado** | terminada |
| **Objetivo** | Tener la API REST en Express conectada a MongoDB, con la división de capas que pide la consigna. |
| **Requisito** | Consigna: API REST, base NoSQL, división en controladores, routers, servicios, middlewares y esquemas. Entregar `.env` aparte. |
| **Dependencia** | Ninguna. |

**Alcance**

- Servidor Express que exponga una API REST.
- Conexión a MongoDB con credenciales por variables de entorno (`.env` fuera del repositorio).
- Organización en routers, controladores, servicios, middlewares y esquemas.

**Criterios de terminado**

- El backend expone una API REST y se conecta a MongoDB.
- La estructura de capas está en su lugar para las siguientes etapas.

**Cierre (20/10/2026):** `GET /api/estado` respondió `{ "ok": true }` contra MongoDB Atlas con `backend/.env` local. Capas en su lugar: `api/routes`, `api/controllers`, `services`, `middlewares` y `schemas`. Los esquemas Zod de dominio quedan para la etapa 2.

---

## Backend — Etapa 2 — Acceso a la cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | terminada |
| **Objetivo** | Registro e ingreso con JWT; recursos privados solo con sesión. |
| **Requisito** | Consigna: JWT, usuarios, login/registro, contraseñas encriptadas, validación en el backend. PRD 6.1. |
| **Dependencia** | Etapa 1. |

**Alcance**

- Registro: nombre, correo, contraseña hasheada; correo único.
- Ingreso que emite JWT.
- Middleware de autenticación.
- Validación de las entradas en el backend.

**Criterios de terminado**

- Una persona puede crear una cuenta e iniciar sesión.
- Sin token válido no se accede a los recursos privados.
- Los errores de validación se informan de forma clara.

**Cierre (09/11/2026):** `POST /api/usuarios` (registro con Zod + bcrypt, correo único), `POST /api/login` (JWT Bearer, `JWT_SECRET` en `.env`) y `GET /api/usuarios/me` protegido con `validateToken`. Errores de validación como lista `400` en español. Capas: `schemas/usuarios.js`, middlewares Zod/auth, `services/usuarios.services.js`, controller y routes montados en `main.js`. Verificado localmente: body inválido → `400` (lista), `GET /api/usuarios/me` sin token o con token inválido → `401`. Pendiente por red/TLS hacia Atlas: registro `201`, duplicado `409`, login `200` y `me` con token válido.

---

## Backend — Etapa 3 — Categorías

| Campo | Valor |
| --- | --- |
| **Estado** | terminada |
| **Objetivo** | CRUD de categorías personales del usuario. |
| **Requisito** | Consigna: al menos dos entidades además de usuarios; CRUD. PRD 6.3 y reglas de negocio (sección 9). |
| **Dependencia** | Etapa 2. |

**Alcance**

- Crear, listar, editar y eliminar categorías propias.
- Nombre obligatorio y único por usuario; descripción opcional.
- No eliminar una categoría si tiene comandos asociados; informar el motivo.
- Cada usuario solo ve y modifica las suyas.

**Criterios de terminado**

- CRUD de categorías funciona para el usuario autenticado.
- La unicidad del nombre por usuario se respeta.
- La eliminación bloqueada por comandos asociados informa el motivo.

**Cierre (09/11/2026):** `GET/POST /api/categorias`, `GET/PUT/DELETE /api/categorias/:id` protegidos con `validateToken`; Zod en crear/actualizar (`nombre` obligatorio, `descripcion` opcional); aislamiento por `usuarioId`; índice único `{ usuarioId, nombre }`; borrado físico con chequeo preventivo en colección `comandos` (`409` con motivo si hay asociados). Capas: `schemas/categorias.js`, `middlewares/categorias.validate.js`, `services/categorias.services.js`, controller y routes montados en `main.js`. Verificado localmente: sin token o token inválido → `401`; body inválido en `POST`/`PUT` → `400` (lista en español); schema Zod normaliza `descripcion` vacía. Pendiente por red/TLS hacia Atlas: CRUD persistente `201`/`200`, unicidad `409`, aislamiento entre usuarios y bloqueo de borrado con comando asociado.

---

## Backend — Etapa 4 — Comandos (CRUD)

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | CRUD de comandos asociados a una categoría propia. |
| **Requisito** | Consigna: tercera entidad y CRUD. PRD 6.2 (crear, ver, editar, eliminar; sin búsqueda ni filtro aún). |
| **Dependencia** | Etapa 3. |

**Alcance**

- Crear y editar comando: título, instrucción, descripción y categoría existente del usuario (todos obligatorios).
- Listado y consulta de comandos propios.
- Eliminar un comando no elimina su categoría.
- Aislamiento por usuario.

**Criterios de terminado**

- El usuario crea, consulta, edita y elimina solo sus comandos.
- Todo comando queda asociado a una categoría válida propia.

---

## Backend — Etapa 5 — Consulta, búsqueda y filtro

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Localizar comandos propios desde el listado. |
| **Requisito** | PRD 6.2 (búsqueda y filtro), criterios de aceptación 5. |
| **Dependencia** | Etapa 4. |

**Alcance**

- Búsqueda por título en el listado de comandos propios.
- Filtro por categoría en el listado de comandos propios.

La acción de copiar el texto del comando queda en el frontend.

**Criterios de terminado**

- Se puede localizar un comando propio por título y por categoría.

---

## Backend — Etapa 6 — Mi cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Consultar datos de la cuenta y editar el nombre visible. |
| **Requisito** | PRD 6.4. |
| **Dependencia** | Etapa 2. No bloquea las etapas 3–5. |

**Alcance**

- Ver nombre y correo.
- Editar solo el nombre.
- Correo fijo (sin edición en el MVP).

**Criterios de terminado**

- El usuario autenticado obtiene su nombre y correo.
- Puede actualizar el nombre y el cambio queda persistido.

---

# Parte 2 — Frontend (interfaz)

**Capa:** interfaz en `frontend/`  
**Estado general:** en curso  
**Diseño visual:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

Las pantallas de producto (etapas 2 a 7) empiezan cuando la Parte 1 (backend) está completa. La etapa 1 puede avanzar como andamiaje, sin vistas de producto.

## Forma de trabajo (frontend)

La organización sigue `DWN4AP-2026-2/clase-25/front/`, adaptada a CommandHub:

- Router con `createBrowserRouter` en `src/main.jsx`.
- Pantallas en `src/pages`.
- Componentes en `src/components`.
- Validación Zod en `src/schemas`; formularios con `react-hook-form` y `zodResolver`.
- Consumo de API en `src/services` (`api.service.js` con `fetch`).
- Sesión con Context en `src/context` (consigna); rutas protegidas.
- Estados de carga típicos: `loading | ready | error`.

No se copian roles ni el criterio de sesión del ejemplo docente. El estilo visual usa [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) y los tokens Primer; la clase 25 no define la interfaz de CommandHub.

---

## Frontend — Etapa 1 — Base de la app

| Campo | Valor |
| --- | --- |
| **Estado** | en curso |
| **Objetivo** | Tener la app React con enrutamiento, componentes funcionales, estado y vistas separadas de la lógica de APIs. |
| **Requisito** | Consigna: componentes funcionales y hooks, división de componentes, routers, separación vistas / APIs, manejo de estado. Stack acordado (Tailwind, shadcn) y [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). |
| **Dependencia** | Ninguna. No incluye pantallas de producto. |

**Alcance**

- Aplicación React en `frontend/` con JavaScript, componentes funcionales y hooks.
- React Router para las páginas del producto.
- Separación entre vistas y lógica de consumo de la API (`services/`).
- Tailwind CSS y shadcn/ui (preset `b2DcW8Pfk`), usando los tokens Primer del proyecto.

**Hecho hasta ahora**

- Entrypoint Vite (`index.html`, `vite.config.js` con plugin Tailwind y alias `@`, `src/main.jsx`, `src/index.css`) y scripts `dev` / `build` / `preview`.
- Tailwind CSS 4 (`tailwindcss`, `@tailwindcss/vite`) y puente de color hacia shadcn/ui en `src/index.css`, usando los tokens Primer.
- shadcn/ui inicializado: `components.json` (estilo `base-nova`), `jsconfig.json`, `src/lib/utils.js` y el componente `src/components/ui/button.jsx`.
- Sin React Router en `main.jsx`. Sin `services/` ni `context/`. Sin páginas ni componentes de producto.

**Pendiente de andamiaje (alineado a clase 25, sin vistas de producto)**

- Router en `src/main.jsx`.
- Capas `src/services/` y `src/context/`.

**Criterios de terminado**

- La app React arranca con enrutamiento y la separación de capas pedida por la consigna.
- El estilo usa el sistema de diseño del proyecto (sin inventar valores visuales).

---

## Frontend — Etapa 2 — Registro e ingreso

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Registro, login y logout; contenido privado solo con sesión. |
| **Requisito** | Consigna: JWT, Context, validación en el frontend. PRD 6.1. Vistas Registro e Ingreso (sección 7). |
| **Dependencia** | Etapa 1 de frontend. Parte 1 (backend) completa. Consume la etapa 2 de backend. |

**Alcance**

- Vistas: Registro e Ingreso.
- Context de autenticación y rutas protegidas.
- Cerrar sesión.
- Validación de formularios en el frontend.

**Criterios de terminado**

- Una persona puede crear cuenta, iniciar sesión y cerrar sesión.
- Sin token válido no se accede al contenido privado.
- Los errores de validación se informan de forma clara.

---

## Frontend — Etapa 3 — Categorías

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Administrar las categorías personales desde la interfaz. |
| **Requisito** | PRD 6.3, vista Categorías (sección 7) y reglas de negocio (sección 9). |
| **Dependencia** | Etapa 2 de frontend. Consume la etapa 3 de backend. |

**Alcance**

- Vista de administración de categorías.
- Crear, listar, editar y eliminar categorías propias.
- Informar el motivo cuando no se puede eliminar una categoría con comandos asociados.

**Criterios de terminado**

- El usuario autenticado administra sus categorías desde la vista.
- La eliminación bloqueada por comandos asociados muestra un mensaje comprensible.

---

## Frontend — Etapa 4 — Formulario y listado de comandos

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Crear, consultar, editar y eliminar comandos desde la interfaz. |
| **Requisito** | PRD 6.2 (crear, ver, editar, eliminar; sin búsqueda, filtro ni copiar aún). Vista Formulario de comando (sección 7). |
| **Dependencia** | Etapa 3 de frontend. Consume la etapa 4 de backend. |

**Alcance**

- Formulario de comando (crear / editar): título, instrucción, descripción y categoría existente del usuario (todos obligatorios).
- Listado y consulta de comandos propios.
- Confirmación antes de eliminar; eliminar un comando no elimina su categoría.

**Criterios de terminado**

- El usuario crea, consulta, edita y elimina solo sus comandos.
- Todo comando queda asociado a una categoría válida propia.
- Hay confirmación antes de eliminar.

---

## Frontend — Etapa 5 — Mis comandos: búsqueda, filtro y copiar

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Facilitar encontrar y reutilizar comandos desde el listado principal. |
| **Requisito** | PRD 6.2 (búsqueda, filtro, copiar), vistas esperadas (sección 7), criterios de aceptación 5 y 6. |
| **Dependencia** | Etapa 4 de frontend. Consume la etapa 5 de backend. |

**Alcance**

- Vista “Mis comandos” como listado principal.
- Detalle simple desde el listado (sin página de detalle obligatoria).
- Búsqueda por título.
- Filtro por categoría.
- Acción para copiar el texto del comando.
- Estados vacíos cuando no hay resultados o no hay comandos.

**Criterios de terminado**

- Se puede localizar un comando propio por título y por categoría.
- La acción de copiar permite reutilizar la instrucción.
- El listado permanece usable con y sin resultados.

---

## Frontend — Etapa 6 — Mi cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Consultar datos de la cuenta y editar el nombre visible. |
| **Requisito** | PRD 6.4 y vista “Mi cuenta”. |
| **Dependencia** | Etapa 2 de frontend. Consume la etapa 6 de backend. No bloquea las etapas 3–5. |

**Alcance**

- Ver nombre y correo.
- Editar solo el nombre.
- Correo fijo (sin edición en el MVP).

**Criterios de terminado**

- El usuario ve su nombre y correo.
- Puede actualizar el nombre y el cambio se refleja tras guardar.

---

## Frontend — Etapa 7 — Cierre del MVP

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Dejar el producto entregable según la consigna y el PRD. |
| **Requisito** | Consigna: README detallado. PRD sección 8 y criterios de aceptación 8–10. |
| **Dependencia** | Etapas 5 y 6 de frontend. Parte 1 (backend) completa. |

**Alcance**

- Completar mensajes de validación, estados vacíos, confirmaciones y uso en móvil / escritorio donde aún falte (PRD sección 8).
- README: de qué trata el producto y cómo levantarlo.
- No agregar funcionalidades nuevas.

**Criterios de terminado**

- Se cumplen los criterios de aceptación del PRD.
- El README permite entender el producto y levantarlo.
