# Roadmap — CommandHub MVP

**Producto:** CommandHub (biblioteca personal de comandos)  
**Estado general:** no iniciado  
**Fuentes de alcance:** [CONSIGNA-PARCIAL-2.md](./CONSIGNA-PARCIAL-2.md), [PRD.md](./PRD.md)  
**Diseño visual:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

## Stack acordado

| Capa | Tecnología |
| --- | --- |
| Frontend | React (JavaScript), React Router, Context, Tailwind CSS, shadcn/ui (preset `b2DcW8Pfk`) |
| Backend | Express.js (JavaScript, ES modules) |
| Base de datos | MongoDB (driver nativo) |
| Validación | Zod (backend y frontend) |
| Auth | JWT, contraseñas hasheadas |

Estructura de código alineada a `DWN4AP-2026-2-clase-19/clase-19/`. Carpetas del proyecto: `backend/` y `frontend/`. El backend es solo API REST. Los colores siguen los tokens Primer en `frontend/src/styles/tokens.css`; el preset de shadcn no los reemplaza.

Completar y verificar una etapa antes de pasar a la siguiente. No saltar etapas ni ampliar el alcance sin indicación explícita. Actualizar el **estado** de cada etapa al cerrarla. Queda fuera del MVP lo listado en el PRD sección 10.

Prioridad del PRD (sección 12): acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros → mejoras visuales / cierre.

---

## Etapa 1 — Backend (API REST + MongoDB)

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
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

---

## Etapa 2 — Frontend (React)

| Campo | Valor |
| --- | --- |
| **Estado** | en curso |
| **Objetivo** | Tener la app React con enrutamiento, componentes funcionales, estado y vistas separadas de la lógica de APIs. |
| **Requisito** | Consigna: componentes funcionales y hooks, división de componentes, routers, separación vistas / APIs, manejo de estado. Stack acordado (Tailwind, shadcn) y [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). |
| **Dependencia** | Ninguna respecto a la etapa 1. |

**Alcance**

- Aplicación React en `frontend/` con JavaScript, componentes funcionales y hooks.
- React Router para las páginas del producto.
- Separación entre vistas y lógica de consumo de la API.
- Tailwind CSS y shadcn/ui (preset `b2DcW8Pfk`), usando los tokens Primer del proyecto.

**Hecho hasta ahora**

- Entrypoint Vite (`index.html`, `vite.config.js`, `src/main.jsx`, `src/index.css` con tokens) y scripts `dev` / `build` / `preview`. Sin páginas ni componentes de producto.

**Criterios de terminado**

- La app React arranca con enrutamiento y la separación de capas pedida por la consigna.
- El estilo usa el sistema de diseño del proyecto (sin inventar valores visuales).

---

## Etapa 3 — Acceso a la cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Registro, login y logout con JWT; contenido privado solo con sesión. |
| **Requisito** | Consigna: JWT, usuarios, login/registro, contraseñas encriptadas, Context, validación en ambos lados. PRD 6.1. |
| **Dependencia** | Etapas 1 y 2. |

**Alcance**

- Registro: nombre, correo, contraseña hasheada; correo único.
- Login y logout con JWT.
- Middleware de autenticación en el backend.
- Context de auth y rutas protegidas en el frontend.
- Validación de formularios en backend y frontend.
- Vistas: Registro e Ingreso.

**Criterios de terminado**

- Una persona puede crear cuenta, iniciar sesión y cerrar sesión.
- Sin token válido no se accede al contenido privado.
- Los errores de validación se informan de forma clara.

---

## Etapa 4 — Categorías

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | CRUD de categorías personales del usuario. |
| **Requisito** | Consigna: al menos dos entidades además de usuarios; CRUD. PRD 6.3 y reglas de negocio (sección 9). |
| **Dependencia** | Etapa 3. |

**Alcance**

- Crear, listar, editar y eliminar categorías propias.
- Nombre obligatorio y único por usuario; descripción opcional.
- No eliminar una categoría si tiene comandos asociados; informar el motivo.
- Vista de administración de categorías.
- Cada usuario solo ve y modifica las suyas.

**Criterios de terminado**

- CRUD de categorías funciona para el usuario autenticado.
- La unicidad del nombre por usuario se respeta.
- La eliminación bloqueada por comandos asociados muestra un mensaje comprensible.

---

## Etapa 5 — Comandos (CRUD)

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | CRUD de comandos asociados a una categoría propia. |
| **Requisito** | Consigna: tercera entidad y CRUD. PRD 6.2 (crear, ver, editar, eliminar; sin búsqueda, filtro ni copiar aún). |
| **Dependencia** | Etapa 4. |

**Alcance**

- Crear y editar comando: título, instrucción, descripción y categoría existente del usuario (todos obligatorios).
- Listado y consulta de comandos propios.
- Eliminar con confirmación; eliminar un comando no elimina su categoría.
- Formulario de comando (crear / editar).
- Aislamiento por usuario.

**Criterios de terminado**

- El usuario crea, consulta, edita y elimina solo sus comandos.
- Todo comando queda asociado a una categoría válida propia.
- Hay confirmación antes de eliminar.

---

## Etapa 6 — Consulta, búsqueda, filtro y copiar

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Facilitar encontrar y reutilizar comandos desde el listado principal. |
| **Requisito** | PRD 6.2 (búsqueda, filtro, copiar), vistas esperadas (sección 7), criterios de aceptación 5 y 6. |
| **Dependencia** | Etapa 5. |

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

## Etapa 7 — Mi cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Consultar datos de la cuenta y editar el nombre visible. |
| **Requisito** | PRD 6.4 y vista “Mi cuenta”. |
| **Dependencia** | Etapa 3. No bloquea las etapas 4–6. |

**Alcance**

- Ver nombre y correo.
- Editar solo el nombre.
- Correo fijo (sin edición en el MVP).

**Criterios de terminado**

- El usuario ve su nombre y correo.
- Puede actualizar el nombre y el cambio se refleja tras guardar.

---

## Etapa 8 — Cierre del MVP

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Dejar el producto entregable según la consigna y el PRD. |
| **Requisito** | Consigna: README detallado. PRD sección 8 y criterios de aceptación 8–10. |
| **Dependencia** | Etapas 6 y 7. |

**Alcance**

- Completar mensajes de validación, estados vacíos, confirmaciones y uso en móvil / escritorio donde aún falte (PRD sección 8).
- README: de qué trata el producto y cómo levantarlo.
- No agregar funcionalidades nuevas.

**Criterios de terminado**

- Se cumplen los criterios de aceptación del PRD.
- El README permite entender el producto y levantarlo.

---

## Orden de ejecución

```text
1 Backend ──┐
            ├──► 3 Acceso ──► 4 Categorías ──► 5 Comandos ──► 6 Consulta ──┐
2 Frontend ─┘         │                                                     ├──► 8 Cierre
                      └──────────────────► 7 Mi cuenta ────────────────────┘
```
