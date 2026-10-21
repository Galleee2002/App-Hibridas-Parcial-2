# Roadmap frontend — CommandHub MVP

**Producto:** CommandHub (biblioteca personal de comandos)  
**Capa:** interfaz en `frontend/`  
**Estado general:** en curso  
**Índice:** [ROADMAP.md](./ROADMAP.md)  
**Fuentes de alcance:** [CONSIGNA-PARCIAL-2.md](./CONSIGNA-PARCIAL-2.md), [PRD.md](./PRD.md)  
**Reglas de trabajo:** [AGENTS.md](../AGENTS.md)  
**Diseño visual:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

Las pantallas de producto (etapas 2 a 7) empiezan cuando [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md) está completo. La etapa 1 puede avanzar como andamiaje, sin vistas de producto. Completar y verificar una etapa antes de pasar a la siguiente. No saltar etapas ni ampliar el alcance sin indicación explícita. Actualizar el **estado** de cada etapa al cerrarla. Queda fuera del MVP lo listado en el PRD sección 10.

Prioridad del PRD (sección 12): acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros → mejoras visuales / cierre.

## Forma de trabajo

La organización sigue `DWN4AP-2026-2-clase-19/clase-19/front/`:

- Router en `src/main.jsx`.
- Pantallas en `src/pages`.
- Componentes en `src/components`.
- Validación Zod en `src/schemas`.

La sesión se gestiona con Context (consigna). No se copian roles ni el criterio de sesión del ejemplo docente. El estilo visual usa [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) y los tokens Primer; la clase 19 no define la interfaz de CommandHub.

---

## Etapa 1 — Base de la app

| Campo | Valor |
| --- | --- |
| **Estado** | en curso |
| **Objetivo** | Tener la app React con enrutamiento, componentes funcionales, estado y vistas separadas de la lógica de APIs. |
| **Requisito** | Consigna: componentes funcionales y hooks, división de componentes, routers, separación vistas / APIs, manejo de estado. Stack acordado (Tailwind, shadcn) y [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md). |
| **Dependencia** | Ninguna. No incluye pantallas de producto. |

**Alcance**

- Aplicación React en `frontend/` con JavaScript, componentes funcionales y hooks.
- React Router para las páginas del producto.
- Separación entre vistas y lógica de consumo de la API.
- Tailwind CSS y shadcn/ui (preset `b2DcW8Pfk`), usando los tokens Primer del proyecto.

**Hecho hasta ahora**

- Entrypoint Vite (`index.html`, `vite.config.js` con plugin Tailwind y alias `@`, `src/main.jsx`, `src/index.css`) y scripts `dev` / `build` / `preview`.
- Tailwind CSS 4 (`tailwindcss`, `@tailwindcss/vite`) y puente de color hacia shadcn/ui en `src/index.css`, usando los tokens Primer.
- shadcn/ui inicializado: `components.json` (estilo `base-nova`), `jsconfig.json`, `src/lib/utils.js` y el componente `src/components/ui/button.jsx`.
- Sin React Router en `main.jsx`. Sin páginas ni componentes de producto.

**Criterios de terminado**

- La app React arranca con enrutamiento y la separación de capas pedida por la consigna.
- El estilo usa el sistema de diseño del proyecto (sin inventar valores visuales).

---

## Etapa 2 — Registro e ingreso

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Registro, login y logout; contenido privado solo con sesión. |
| **Requisito** | Consigna: JWT, Context, validación en el frontend. PRD 6.1. Vistas Registro e Ingreso (sección 7). |
| **Dependencia** | Etapa 1 de este archivo. [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md) completo. Consume la etapa 2 de backend. |

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

## Etapa 3 — Categorías

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Administrar las categorías personales desde la interfaz. |
| **Requisito** | PRD 6.3, vista Categorías (sección 7) y reglas de negocio (sección 9). |
| **Dependencia** | Etapa 2 de este archivo. Consume la etapa 3 de [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md). |

**Alcance**

- Vista de administración de categorías.
- Crear, listar, editar y eliminar categorías propias.
- Informar el motivo cuando no se puede eliminar una categoría con comandos asociados.

**Criterios de terminado**

- El usuario autenticado administra sus categorías desde la vista.
- La eliminación bloqueada por comandos asociados muestra un mensaje comprensible.

---

## Etapa 4 — Formulario y listado de comandos

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Crear, consultar, editar y eliminar comandos desde la interfaz. |
| **Requisito** | PRD 6.2 (crear, ver, editar, eliminar; sin búsqueda, filtro ni copiar aún). Vista Formulario de comando (sección 7). |
| **Dependencia** | Etapa 3 de este archivo. Consume la etapa 4 de [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md). |

**Alcance**

- Formulario de comando (crear / editar): título, instrucción, descripción y categoría existente del usuario (todos obligatorios).
- Listado y consulta de comandos propios.
- Confirmación antes de eliminar; eliminar un comando no elimina su categoría.

**Criterios de terminado**

- El usuario crea, consulta, edita y elimina solo sus comandos.
- Todo comando queda asociado a una categoría válida propia.
- Hay confirmación antes de eliminar.

---

## Etapa 5 — Mis comandos: búsqueda, filtro y copiar

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Facilitar encontrar y reutilizar comandos desde el listado principal. |
| **Requisito** | PRD 6.2 (búsqueda, filtro, copiar), vistas esperadas (sección 7), criterios de aceptación 5 y 6. |
| **Dependencia** | Etapa 4 de este archivo. Consume la etapa 5 de [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md). |

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

## Etapa 6 — Mi cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Consultar datos de la cuenta y editar el nombre visible. |
| **Requisito** | PRD 6.4 y vista “Mi cuenta”. |
| **Dependencia** | Etapa 2 de este archivo. Consume la etapa 6 de [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md). No bloquea las etapas 3–5. |

**Alcance**

- Ver nombre y correo.
- Editar solo el nombre.
- Correo fijo (sin edición en el MVP).

**Criterios de terminado**

- El usuario ve su nombre y correo.
- Puede actualizar el nombre y el cambio se refleja tras guardar.

---

## Etapa 7 — Cierre del MVP

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
| **Objetivo** | Dejar el producto entregable según la consigna y el PRD. |
| **Requisito** | Consigna: README detallado. PRD sección 8 y criterios de aceptación 8–10. |
| **Dependencia** | Etapas 5 y 6 de este archivo. [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md) completo. |

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
1 Base React ──► 2 Registro e ingreso ──► 3 Categorías ──► 4 Comandos ──► 5 Mis comandos ──┐
                        │                                                                  ├──► 7 Cierre
                        └──────────────────────────► 6 Mi cuenta ──────────────────────────┘
```
