# Roadmap — CommandHub MVP

**Producto:** CommandHub (biblioteca personal de comandos)  
**Estado general:** en curso  
**Fuentes de alcance:** [CONSIGNA-PARCIAL-2.md](./CONSIGNA-PARCIAL-2.md), [PRD.md](./PRD.md)  
**Reglas de trabajo:** [AGENTS.md](../AGENTS.md)  
**Diseño visual:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

## Guías por capa

| Capa | Documento | Estado |
| --- | --- | --- |
| API REST | [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md) | en curso |
| Interfaz | [ROADMAP-FRONTEND.md](./ROADMAP-FRONTEND.md) | en curso |

El detalle de cada etapa vive en esos archivos. Este índice no duplica su alcance.

## Stack acordado

| Capa | Tecnología |
| --- | --- |
| Frontend | React (JavaScript), React Router, Context, Tailwind CSS, shadcn/ui (preset `b2DcW8Pfk`) |
| Backend | Express.js (JavaScript, ES modules) |
| Base de datos | MongoDB (driver nativo) |
| Validación | Zod (backend y frontend) |
| Auth | JWT, contraseñas hasheadas |

Estructura de código alineada a `DWN4AP-2026-2-clase-19/clase-19/`. Carpetas del proyecto: `backend/` y `frontend/`. El backend es solo API REST. Los colores siguen los tokens Primer en `frontend/src/styles/tokens.css`; el preset de shadcn no los reemplaza.

## Orden de ejecución

Primero se completan las funcionalidades de la API. Después se suman las pantallas que las consumen.

```text
ROADMAP-BACKEND
  1 Base API ──► 2 Acceso ──► 3 Categorías ──► 4 Comandos ──► 5 Consulta ──┐
                       │                                                    │
                       └──────────────────► 6 Mi cuenta ────────────────────┘

ROADMAP-FRONTEND (pantallas de producto cuando el backend esté completo)
  1 Base React ──► 2 Registro e ingreso ──► 3 Categorías ──► 4 Comandos ──► 5 Mis comandos ──┐
                              │                                                              ├──► 7 Cierre
                              └──────────────────────────► 6 Mi cuenta ──────────────────────┘
```

Prioridad del PRD (sección 12), dentro de cada archivo: acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros → mejoras visuales / cierre.

Completar y verificar una etapa antes de pasar a la siguiente **dentro de cada archivo**. No saltar etapas ni ampliar el alcance sin indicación explícita. Actualizar el **estado** de la etapa en su roadmap al cerrarla. Queda fuera del MVP lo listado en el PRD sección 10.

La etapa 1 del frontend (base Vite) puede avanzar como andamiaje, sin vistas de producto. Las pantallas (etapas 2 a 7 del frontend) empiezan cuando el roadmap de backend está completo.

## Siguiente paso

Etapa 1 de [ROADMAP-BACKEND.md](./ROADMAP-BACKEND.md): verificar el ping a MongoDB con un `backend/.env` real.
