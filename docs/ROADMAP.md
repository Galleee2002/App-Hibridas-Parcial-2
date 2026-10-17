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

Estructura de código alineada a `DWN4AP-2026-2-clase-19/clase-19/`. Carpetas del proyecto: `backend/` y `frontend/`. El backend es solo API REST (sin vistas HTML de la clase). Los colores siguen los tokens Primer en `frontend/src/styles/tokens.css`; el preset de shadcn no los reemplaza.

## Cómo usar este roadmap

1. Completar y verificar una etapa antes de pasar a la siguiente.
2. No saltar etapas ni ampliar el alcance sin indicación explícita.
3. Actualizar el **estado** de cada etapa al cerrarla (`no iniciado` → `en curso` → `hecho`).
4. Queda fuera del MVP todo lo listado en el PRD sección 10 (terminal, compartir, favoritos, recuperación de contraseña, importación, etc.).

Prioridad del PRD (sección 12): acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros → mejoras visuales / cierre.

---

## Etapa 1 — Base del backend

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Tener un servidor Express listo para exponer la API REST y conectar MongoDB. |
| **Requisito** | Consigna: API REST, división en routers / controladores / servicios / middlewares / esquemas, base NoSQL. |
| **Dependencia** | Ninguna. Requiere red autorizada para instalar dependencias si aún no están. |

**Alcance**

- Inicializar `backend/` con Express, CORS, JSON y scripts `dev` / `start`.
- Conexión a MongoDB mediante variables de entorno (`.env` fuera del repo; `.env.example` en el repo).
- Carpetas: `api/routes`, `api/controllers`, `services`, `middlewares`, `schemas`.
- Endpoint de salud que confirme que el servidor responde y la base está conectada.

**Criterios de terminado**

- El servidor arranca en local.
- La conexión a MongoDB se confirma (por ejemplo, vía el endpoint de salud).
- No hay secretos en el repositorio.

---

## Etapa 2 — Base del frontend

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Tener la app React navegable, con estilo del proyecto y capa de API separada de las vistas. |
| **Requisito** | Consigna: componentes funcionales, hooks, routers, separación vistas / lógica de APIs, estado. PRD secciones 4 y 8 (interfaz clara y adaptable). DESIGN-SYSTEM (tokens + shadcn). |
| **Dependencia** | Ninguna respecto a la etapa 1 para el scaffold. Instalación de dependencias condicionada a red autorizada. |

**Alcance**

- Scaffold React (Vite) en `frontend/` con JavaScript.
- React Router, layout navegable y rutas placeholder.
- Tailwind CSS; import único de `frontend/src/styles/tokens.css`.
- Integración shadcn/ui con preset `b2DcW8Pfk`, conservando colores Primer.
- Cliente HTTP / helpers de API separados de las páginas.

**Criterios de terminado**

- La app arranca y muestra un layout con navegación.
- Las rutas principales existen aunque las pantallas estén vacías o como placeholder.
- Los tokens Primer se cargan; no se inventan valores visuales fuera del sistema.

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
| **Objetivo** | Dejar el producto entregable y alineado a la consigna y al PRD. |
| **Requisito** | Consigna: README detallado; validaciones y JWT ya cubiertos. PRD sección 8, criterios 8–10. |
| **Dependencia** | Etapas 6 y 7. |

**Alcance**

- Revisar mensajes de validación, estados vacíos, confirmaciones y uso en móvil / escritorio solo donde falte.
- README en la raíz: de qué trata el producto y cómo levantarlo (backend, frontend, variables de entorno).
- Contraste final con los 10 criterios de aceptación del PRD.
- No agregar funcionalidades nuevas.

**Criterios de terminado**

- Los 10 criterios de aceptación del PRD se cumplen.
- El README permite levantar el proyecto y entender de qué trata.
- Este roadmap refleja todas las etapas en estado `hecho`.

---

## Orden de ejecución

```text
1 Base backend ──┐
                 ├──► 3 Acceso ──► 4 Categorías ──► 5 Comandos ──► 6 Consulta ──┐
2 Base frontend ─┘         │                                                     ├──► 8 Cierre
                           └──────────────────► 7 Mi cuenta ────────────────────┘
```
