# Roadmap backend — CommandHub MVP

**Producto:** CommandHub (biblioteca personal de comandos)  
**Capa:** API REST en `backend/`  
**Estado general:** en curso  
**Índice:** [ROADMAP.md](./ROADMAP.md)  
**Fuentes de alcance:** [CONSIGNA-PARCIAL-2.md](./CONSIGNA-PARCIAL-2.md), [PRD.md](./PRD.md)  
**Reglas de trabajo:** [AGENTS.md](../AGENTS.md)

Completar este archivo antes de empezar las pantallas de [ROADMAP-FRONTEND.md](./ROADMAP-FRONTEND.md). Completar y verificar una etapa antes de pasar a la siguiente. No saltar etapas ni ampliar el alcance sin indicación explícita. Actualizar el **estado** de cada etapa al cerrarla. Queda fuera del MVP lo listado en el PRD sección 10.

Prioridad del PRD (sección 12): acceso a cuenta → categorías → comandos → consulta → búsqueda y filtros.

## Forma de trabajo

La estructura y la sintaxis siguen `DWN4AP-2026-2-clase-19/clase-19/back/`:

- Capas: `api/routes`, `api/controllers`, `services`, `middlewares` y `schemas`.
- Las URIs nombran recursos; el verbo HTTP indica la acción.
- El backend es solo API REST.

No se copian las entidades ni las reglas del ejemplo docente (juegos, roles, reseñas, política de contraseña). El alcance es el PRD: nombre, correo y contraseña para el registro.

---

## Etapa 1 — Base de la API

| Campo | Valor |
| --- | --- |
| **Estado** | en curso |
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

**Avance (17/10/2026):** capas y servidor listos (`main.js`, `GET /api/estado`, scripts `dev`/`start`, `.env.example`). Falta verificar el ping con un `backend/.env` real (Atlas o Mongo local).

---

## Etapa 2 — Acceso a la cuenta

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
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

---

## Etapa 3 — Categorías

| Campo | Valor |
| --- | --- |
| **Estado** | no iniciado |
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

---

## Etapa 4 — Comandos (CRUD)

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

## Etapa 5 — Consulta, búsqueda y filtro

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

## Etapa 6 — Mi cuenta

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

## Orden de ejecución

```text
1 Base API ──► 2 Acceso ──► 3 Categorías ──► 4 Comandos ──► 5 Consulta
                  │
                  └──────────────────► 6 Mi cuenta
```
