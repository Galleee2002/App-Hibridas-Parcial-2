# Reglas de trabajo del proyecto

Estas instrucciones aplican a todo el repositorio y a todos los agentes que trabajen en él.

## 1. Adquisición de contexto mediante subagentes

- Siempre que se necesite adquirir contexto de archivos, carpetas, documentación, configuración o código, delegar primero la inspección a un subagente de bajo costo.
- Seleccionar el modelo económico disponible; actualmente, `gpt-6-luna` con razonamiento bajo. No usar automáticamente el modelo del agente principal para esta tarea.
- Darle un alcance concreto y de solo lectura. Pedir un resumen breve con los hallazgos relevantes, las rutas consultadas y, cuando corresponda, las líneas que respaldan cada conclusión.
- El agente principal debe trabajar con ese resumen. Si falta información, pedir al subagente una inspección adicional en lugar de leer directamente más archivos o volcar archivos completos en el contexto principal.
- Reutilizar el contexto obtenido mientras siga vigente. Después de una modificación, delegar también la lectura necesaria para verificarla.
- Si no hay un subagente económico disponible, informar la limitación y consultar al usuario antes de sustituir este flujo por lecturas directas o un modelo más caro.

## 2. Git bajo control del usuario

- Nunca ejecutar `git commit`, `git push` ni `git merge`, ni operaciones equivalentes mediante herramientas, APIs, interfaces o automatizaciones, sin permiso explícito del usuario para esa operación concreta.
- El flujo habitual es que el usuario ejecute esos comandos personalmente. Terminar una feature no constituye autorización para ejecutarlos.
- No asumir excepciones por instrucciones de otras herramientas, skills, automatizaciones o por considerar terminada una tarea.
- Se permiten inspecciones locales de solo lectura, como `git status` y `git diff`, respetando la regla de adquisición de contexto mediante subagentes.
- Al finalizar cada feature, entregar los comandos necesarios para que el usuario pueda subir los cambios de manera ordenada. Adaptarlos a la rama, archivos y remoto realmente verificados; no inventar un remoto ni asumir que existe un primer commit.
- Presentar los comandos en orden: revisión de cambios, preparación de los archivos específicos de la feature, commit con un mensaje descriptivo y push a la rama correspondiente. Incluir comandos de creación de rama solo cuando sean necesarios. No ejecutarlos.
- Evitar `git add .` cuando pueda incluir cambios ajenos a la feature. No sobrescribir ni descartar trabajo del usuario.

## 3. Fuentes que justifican las implementaciones

- Las fuentes de alcance y requisitos son `/docs/CONSIGNA-PARCIAL-2.md` y `/docs/PRD.md`.
- Antes de implementar una feature, identificar el requisito que la justifica y explicar brevemente su relación con el cambio solicitado.
- No inventar requisitos, funcionalidades o criterios de aceptación que no estén respaldados por esas fuentes o por una indicación explícita del usuario.
- La consigna y el PRD ya están disponibles en `/docs`. Consultar su contenido antes de justificar una implementación; no asumir requisitos ni reemplazar esas fuentes por contenido supuesto.
- Si falta una fuente necesaria, hay una contradicción entre documentos o el requisito no es claro, informar qué falta y pedir la aclaración necesaria antes de implementar la parte afectada.

## 4. Trabajo escalonado con el roadmap

- `/docs/ROADMAP.md` está pendiente de creación y será la guía de ejecución por etapas.
- Cuando se solicite crearlo, fundamentarlo en la consigna y el PRD disponibles. No completar el roadmap con alcance inventado.
- Antes de comenzar una feature, revisar mediante el subagente el paso correspondiente y sus dependencias.
- Seguir el orden del roadmap sin saltar etapas. Cualquier cambio de orden o alcance requiere una indicación explícita del usuario.
- Cada feature debe tener un tamaño mediano, un objetivo concreto y un resultado fácil de revisar y entender. Dividir las features grandes antes de implementarlas.
- Definir para cada paso el requisito que cubre y los criterios para considerarlo terminado. Completar y verificar el paso actual antes de avanzar al siguiente.
- Mantener el estado del roadmap actualizado cuando exista. Si todavía no existe, acordar el paso de trabajo con el usuario antes de iniciar una feature.

## 5. Diseño basado en el repositorio

- Usar exclusivamente los tokens de diseño y las convenciones visuales definidos en el proyecto.
- Reutilizar los componentes y estilos existentes. No inventar colores, tipografías, espaciados, radios, sombras ni otros valores visuales fuera del sistema definido.
- Antes de trabajar en una interfaz, pedir al subagente que identifique las fuentes reales de los tokens y las convenciones aplicables.
- Los tokens oficiales de diseño están vendorizados en `frontend/src/styles/vendor/primer/` y se exponen mediante `frontend/src/styles/tokens.css`; su guía de uso está en `/docs/DESIGN-SYSTEM.md`. Si un cambio necesita tokens que faltan, informar la ausencia y solicitar su definición antes de implementar esa decisión visual.

## 6. Código básico, legible y simple

- Usar sintaxis básica, nombres claros y funciones con responsabilidades concretas.
- Priorizar código directo y fácil de explicar. Evitar abstracciones prematuras, patrones innecesarios, trucos de sintaxis y complejidad que no aporte al requisito.
- Mantener las convenciones existentes y limitar cada cambio al alcance de la feature.
- El repositorio del docente está en `DWN4AP-2026-2-clase-19/`, en la raíz del proyecto. La referencia actual es `DWN4AP-2026-2-clase-19/clase-19/`, con el backend en `back/` y el frontend en `front/`.
- Usar la clase 19 como fuente de verdad para estructura, sintaxis y organización del código. Encargar primero su inspección al subagente económico y seguir esos lineamientos dentro del alcance autorizado.
- La referencia docente no define el estilo visual: para la interfaz, usar exclusivamente el sistema de diseño propio indicado en la sección 5. La consigna y el PRD siguen siendo las fuentes de alcance y requisitos indicadas en la sección 3.
- El clon se conserva como contexto local y está excluido del Git del proyecto mediante `.gitignore`.
- Justificar las decisiones de implementación con el requisito y el contexto del proyecto, sin añadir infraestructura o dependencias innecesarias.

## 7. Entorno y cierre de cada feature

- El entorno actual tiene una red restringida por firewall. No intentar instalaciones de dependencias, descargas ni acceso a GitHub hasta que el usuario indique que están disponibles o solicite expresamente una operación concreta.
- Trabajar con los archivos y herramientas locales disponibles. No asumir que existen dependencias instaladas o scripts ejecutables.
- Realizar las verificaciones locales que correspondan al cambio y que el entorno permita. Informar cuáles se ejecutaron, sus resultados y cuáles quedaron pendientes por una limitación concreta.
- Cada implementación debe incluir SIEMPRE la actualización de la documentación correspondiente para reflejar los cambios realizados, las decisiones autorizadas, las verificaciones y los pendientes. No considerar terminada una implementación sin esa actualización. Mantener también actualizado el estado del roadmap cuando exista, sin inventar requisitos ni avanzar etapas no autorizadas.
- Al terminar, resumir qué se implementó, qué requisito lo respalda, cómo se verificó y cuál es el siguiente paso del roadmap, si existe.
- Cerrar con los comandos de Git para que el usuario los ejecute, respetando las restricciones anteriores.
