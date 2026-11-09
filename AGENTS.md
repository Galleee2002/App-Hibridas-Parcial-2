# Reglas de trabajo del proyecto

Estas instrucciones aplican a todo el repositorio y a todos los agentes que trabajen en él.

## 1. Adquisición de contexto mediante subagentes

- Siempre que se necesite adquirir contexto de archivos, carpetas, documentación, configuración o código, delegar primero la inspección a un subagente económico.
- Usar un subagente económico, sin fijar un modelo concreto. No usar automáticamente el modelo del agente principal para esta tarea.
- Darle un alcance concreto y de solo lectura. Pedir un resumen breve con los hallazgos relevantes, las rutas consultadas y, cuando corresponda, las líneas que respaldan cada conclusión.
- El agente principal debe trabajar con ese resumen. Si falta información, pedir al subagente una inspección adicional en lugar de leer directamente más archivos o volcar archivos completos en el contexto principal.
- Reutilizar el contexto obtenido mientras siga vigente. Después de una modificación, delegar también la lectura necesaria para verificarla.
- Si no hay un subagente económico disponible, informar la limitación y consultar al usuario antes de sustituir este flujo por lecturas directas o un modelo más caro.

## 2. Git bajo control del usuario

- Nunca ejecutar `git commit`, `git push` ni `git merge`, ni operaciones equivalentes mediante herramientas, APIs, interfaces o automatizaciones, sin permiso explícito del usuario para esa operación concreta.
- El flujo habitual es que el usuario ejecute esos comandos personalmente. Terminar una feature no constituye autorización para ejecutarlos.
- No asumir excepciones por instrucciones de otras herramientas, skills, automatizaciones o por considerar terminada una tarea.
- Se permiten inspecciones locales de solo lectura, como `git status` y `git diff`, respetando la regla de adquisición de contexto mediante subagentes.
- No presentar al usuario comandos de Git al cerrar una tarea o una feature, incluidos `status`, `diff`, `add`, `commit`, `push` y similares.
- No sobrescribir ni descartar trabajo del usuario.

## 3. Fuentes que justifican las implementaciones

- Las fuentes de alcance y requisitos son `/docs/CONSIGNA-PARCIAL-2.md` y `/docs/PRD.md`.
- Antes de implementar una feature, identificar el requisito que la justifica y explicar brevemente su relación con el cambio solicitado.
- No inventar requisitos, funcionalidades o criterios de aceptación que no estén respaldados por esas fuentes o por una indicación explícita del usuario.
- La consigna y el PRD ya están disponibles en `/docs`. Consultar su contenido antes de justificar una implementación; no asumir requisitos ni reemplazar esas fuentes por contenido supuesto.
- Si falta una fuente necesaria, hay una contradicción entre documentos o el requisito no es claro, informar qué falta y pedir la aclaración necesaria antes de implementar la parte afectada.

## 4. Trabajo escalonado con el roadmap

- `/docs/ROADMAP.md` es el único roadmap de ejecución del MVP. Contiene la Parte 1 (backend) y la Parte 2 (frontend). Está fundamentado en la consigna y el PRD; no ampliarlo con alcance inventado.
- Completar la Parte 1 (backend) antes de empezar las pantallas de la Parte 2 (frontend). La etapa 1 del frontend (base Vite, sin vistas de producto) puede existir como andamiaje.
- Antes de comenzar una feature, revisar mediante el subagente el paso correspondiente y sus dependencias en el roadmap.
- Seguir el orden del roadmap de la capa en curso sin saltar etapas. Cualquier cambio de orden o alcance requiere una indicación explícita del usuario.
- Cada feature debe tener un tamaño mediano, un objetivo concreto y un resultado fácil de revisar y entender. Dividir las features grandes antes de implementarlas.
- Definir para cada paso el requisito que cubre y los criterios para considerarlo terminado. Completar y verificar el paso actual antes de avanzar al siguiente.
- Mantener el estado de la etapa actualizado en `/docs/ROADMAP.md` al cerrarla o avanzar.

## 5. Diseño basado en el repositorio

- Usar exclusivamente los tokens de diseño y las convenciones visuales definidos en el proyecto.
- Reutilizar los componentes y estilos existentes. No inventar colores, tipografías, espaciados, radios, sombras ni otros valores visuales fuera del sistema definido.
- Antes de trabajar en una interfaz, pedir al subagente que identifique las fuentes reales de los tokens y las convenciones aplicables.
- Los tokens oficiales de diseño están vendorizados en `frontend/src/styles/vendor/primer/` y se exponen mediante `frontend/src/styles/tokens.css`; su guía de uso está en `/docs/DESIGN-SYSTEM.md`. Si un cambio necesita tokens que faltan, informar la ausencia y solicitar su definición antes de implementar esa decisión visual.

## 6. Código básico, legible y simple

- Usar sintaxis básica, nombres claros y funciones con responsabilidades concretas.
- Priorizar código directo y fácil de explicar. Evitar abstracciones prematuras, patrones innecesarios, trucos de sintaxis y complejidad que no aporte al requisito.
- Mantener las convenciones existentes y limitar cada cambio al alcance de la feature.
- El repositorio del docente está en `DWN4AP-2026-2/`, en la raíz del proyecto. La referencia viva es `DWN4AP-2026-2/clase-25/`, con el backend en `back/` y el frontend en `front/`. La clase 19 conserva el esqueleto de capas, pero no incluye JWT, middleware de auth, capa `services/` del front ni Context de sesión.
- Usar la clase 25 como fuente de verdad para estructura, sintaxis y organización del código. Encargar primero su inspección al subagente económico y seguir esos lineamientos dentro del alcance autorizado.
- **Backend (forma docente a adoptar):** JavaScript ESM; `export async function` / `export default router` / `import * as servicio`; capas REST `api/routes` → `middlewares` (Zod `parseAsync`, body validado en `req.body`, error `400` como lista de mensajes) → `api/controllers` → `services` + `schemas`; MongoDB con driver nativo; JWT en header `Bearer`; contraseñas con bcrypt; URIs de recurso y verbo HTTP como acción; mensajes en español. Credenciales por `.env` (consigna), sin hardcodear URIs ni claves.
- **Frontend (forma docente a adoptar):** JavaScript y JSX; `createBrowserRouter` en `src/main.jsx`; carpetas `pages/`, `components/`, `schemas/`, `services/` (`api.service.js` con `fetch`) y `context/` para la sesión; formularios con Zod + `react-hook-form` (`zodResolver`); estados de carga `loading | ready | error`; rutas protegidas. Tailwind 4 ya forma parte del stack del proyecto.
- **No copiar del material docente** (fuera del PRD/consigna o ajenos al producto): vistas HTML/SSR y Bootstrap; login social con Supabase; roles de administrador; dominio de juegos; `react-toastify`; React Compiler; typos del material (`juegosShema`, `supabase.sevices.js`).
- La referencia docente no define el estilo visual: para la interfaz, usar exclusivamente el sistema de diseño propio indicado en la sección 5. La consigna y el PRD siguen siendo las fuentes de alcance y requisitos indicadas en la sección 3.
- El clon se conserva como contexto local y está excluido del Git del proyecto mediante `.gitignore` (`DWN4AP-2026-2/`).
- Justificar las decisiones de implementación con el requisito y el contexto del proyecto, sin añadir infraestructura o dependencias innecesarias.

## 7. Entorno y cierre de cada feature

- Usar pnpm para las dependencias del proyecto. Las versiones del entorno están fijadas en `.nvmrc` y `package.json`; usar el workspace de `backend/` y `frontend/` y conservar el único `pnpm-lock.yaml` en la raíz. No generar lockfiles de npm o Yarn ni instalar dependencias del clon docente como parte del proyecto.
- El entorno actual tiene una red restringida por firewall. No intentar instalaciones de dependencias, descargas ni acceso a GitHub hasta que el usuario indique que están disponibles o solicite expresamente una operación concreta.
- Trabajar con los archivos y herramientas locales disponibles. No asumir que existen dependencias instaladas o scripts ejecutables.
- Realizar las verificaciones locales que correspondan al cambio y que el entorno permita. Informar cuáles se ejecutaron, sus resultados y cuáles quedaron pendientes por una limitación concreta.
- Cada implementación debe incluir SIEMPRE la actualización de la documentación correspondiente para reflejar los cambios realizados, las decisiones autorizadas, las verificaciones y los pendientes. No considerar terminada una implementación sin esa actualización. Mantener también actualizado el estado del roadmap cuando exista, sin inventar requisitos ni avanzar etapas no autorizadas.
- Al terminar, resumir qué se implementó, qué requisito lo respalda, cómo se verificó y cuál es el siguiente paso del roadmap, si existe. No cerrar con comandos de Git.
