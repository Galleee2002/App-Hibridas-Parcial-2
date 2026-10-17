# CommandHub — App Híbridas Parcial 2

Base del proyecto definido en `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
La etapa autorizada actual prepara las dependencias y el entorno; todavía no implementa funcionalidades de la aplicación.

## Entorno

- Node.js `24.22.0` LTS, fijado en `.nvmrc`.
- pnpm `10.33.0`, fijado en `package.json` mediante `packageManager`.
- Workspace con `backend/` y `frontend/`; un único `pnpm-lock.yaml` en la raíz.

Con nvm ya instalado y disponible en la terminal:

```bash
nvm install
nvm use
node --version
pnpm --version
pnpm install --frozen-lockfile
```

Las versiones esperadas son `v24.22.0` y `10.33.0`. Si falta pnpm, seguir su [guía oficial de instalación](https://pnpm.io/10.x/installation) para instalar la versión `10.33.0`.
No mezclar instalaciones de dependencias con npm o Yarn ni generar sus lockfiles.

`pnpm-workspace.yaml` configura versiones exactas al agregar paquetes y la comprobación estricta de engines y peers. `nodeVersion` define la versión contra la que pnpm comprueba compatibilidad; no cambia el Node activo de la terminal: para eso se usa `nvm use`.

## Dependencias aprobadas

| Paquete | Versión | Uso | Entorno |
| --- | --- | --- | --- |
| `react` | `19.3.1` | Componentes y estado | Frontend |
| `react-dom` | `19.3.1` | Renderizado en el navegador | Frontend |
| `react-router` | `8.4.0` | Navegación | Frontend |
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

Ese comando omite Vite y su plugin. La futura compilación del frontend necesitará instalar también las dependencias de desarrollo en la etapa de build, antes de desplegar sus archivos estáticos. Este comando instala paquetes; todavía no existe una aplicación lista para arrancar o desplegar.

## Estado y verificaciones

Verificado el 17 de octubre de 2026 con Node `24.22.0` y pnpm `10.33.0`:

- Descarga de Node mediante nvm, con checksum SHA-256 coincidente.
- Instalación del workspace sin advertencias de incompatibilidad de engines o peers.
- Reinstalación con `pnpm install --frozen-lockfile`, sin cambios de resolución.
- `pnpm audit --json`: cero vulnerabilidades conocidas informadas en la consulta.
- Prueba temporal del backend: respuesta HTTP de Express, validación con Zod, firma y verificación de JWT y comprobación de hashes, incluidos casos de rechazo.
- Prueba temporal del frontend: renderizado con React/React DOM/Router y compilación JSX con Vite y su plugin. Los archivos de prueba fueron eliminados al finalizar.
- Instalación de producción en un directorio temporal con `--prod --frozen-lockfile --offline --ignore-scripts`: dependencias normales disponibles; Vite y su plugin ausentes. El directorio temporal fue eliminado al finalizar.

La auditoría refleja el estado consultado y debe repetirse ante cambios de dependencias:

```bash
pnpm audit
```

Pendientes: definir el roadmap, los puntos de entrada y los scripts de la aplicación en la etapa que se autorice. No hay todavía un build de la aplicación completa ni una conexión real a MongoDB verificada. Las pruebas temporales verifican los paquetes instalados, no funcionalidades del MVP.

## Referencias del proyecto

- Alcance y requisitos: `docs/CONSIGNA-PARCIAL-2.md` y `docs/PRD.md`.
- Diseño visual: `docs/DESIGN-SYSTEM.md` y los tokens propios del proyecto.
- Estructura, sintaxis y organización del código: `DWN4AP-2026-2-clase-19/clase-19/back/` y `front/`, cuando el clon docente esté disponible localmente.

El clon docente está excluido de Git y del workspace de pnpm. No se instalan sus dependencias al instalar las de CommandHub y no se descarga al clonar este proyecto.

Fuentes técnicas: [Node.js LTS](https://nodejs.org/en/about/previous-releases), [configuración de pnpm](https://pnpm.io/10.x/settings), [React](https://react.dev/learn/build-a-react-app-from-scratch), [React Router](https://reactrouter.com/start/declarative/installation), [Vite](https://vite.dev/guide/), [Express](https://expressjs.com/en/starter/installing.html), [compatibilidad del driver MongoDB](https://www.mongodb.com/docs/drivers/compatibility/?driver-language=javascript&javascript-driver-framework=nodejs), [Zod](https://zod.dev/), [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) y [bcryptjs](https://github.com/dcodeIO/bcrypt.js). Versiones y peers contrastados con el registro oficial `registry.npmjs.org`.
