# CommandHub — Product Requirements Document (PRD)

**Versión:** 1.0  
**Estado:** Definición inicial  
**Tipo de proyecto:** Aplicación web académica  
**Alcance:** Producto mínimo viable (MVP)

## 1. Resumen del producto

CommandHub es una biblioteca personal de comandos de programación y administración de sistemas. Permite a cada usuario registrar, organizar, consultar y reutilizar comandos que utiliza habitualmente, por ejemplo, de Git, Linux o herramientas de desarrollo.

El producto funciona como un repositorio privado de referencias rápidas: cada comando está acompañado de una explicación comprensible y pertenece a una categoría.

## 2. Problema que resuelve

Los desarrolladores suelen encontrar comandos útiles que después olvidan o guardan en notas dispersas. Recuperarlos implica volver a buscar documentación o revisar archivos anteriores.

CommandHub centraliza esos comandos en un único lugar y facilita encontrarlos cuando se necesitan.

## 3. Público objetivo

Estudiantes de programación, desarrolladores principiantes y personas que utilizan comandos de terminal en sus proyectos.

**Usuario principal:** una persona que desea construir y mantener su propia biblioteca de comandos, sin compartirla con otros usuarios.

## 4. Objetivos

- Centralizar comandos útiles y sus explicaciones.
- Facilitar la consulta rápida de comandos guardados.
- Organizar la información mediante categorías personalizadas.
- Permitir que cada usuario administre únicamente su propio contenido.
- Ofrecer una experiencia simple, clara y adaptable a dispositivos móviles y de escritorio.

## 5. Entidades del producto

### Usuarios
Personas registradas que acceden a su biblioteca privada mediante una cuenta.

### Comandos
Cada registro representa un comando útil. Contiene:
- **Título:** nombre breve y reconocible.
- **Comando:** instrucción que se desea guardar.
- **Descripción:** explicación de lo que hace.
- **Categoría:** grupo al que pertenece.

### Categorías
Agrupan comandos por tecnología o temática, por ejemplo: Git, Linux, Docker o Windows. Contienen un nombre y, opcionalmente, una descripción breve.

**Reglas:** cada comando pertenece a una sola categoría; cada usuario administra sus propias categorías y comandos.

## 6. Funcionalidades obligatorias del MVP

### 6.1. Acceso a la cuenta
- Registrarse con nombre, correo electrónico y contraseña.
- Iniciar sesión.
- Cerrar sesión.
- Acceder al contenido personal únicamente después de iniciar sesión.

### 6.2. Gestión de comandos
- Crear un comando con título, instrucción, descripción y categoría.
- Ver un listado de los comandos propios.
- Consultar la información de un comando.
- Editar un comando existente.
- Eliminar un comando, previa confirmación.
- Buscar comandos propios por título.
- Filtrar el listado por categoría.
- Copiar el texto del comando con una acción sencilla.

### 6.3. Gestión de categorías
- Crear categorías personales.
- Ver las categorías existentes.
- Cambiar el nombre o descripción de una categoría.
- Eliminar una categoría solo cuando no tiene comandos asociados. Si tiene comandos, se debe informar el motivo y no eliminarla.

### 6.4. Gestión básica de la cuenta
- Consultar el nombre y correo de la cuenta.
- Editar el nombre visible.
- Mantener el correo como identificador sin edición en el MVP.

## 7. Vistas esperadas

1. **Registro:** creación de cuenta.
2. **Ingreso:** acceso a la aplicación.
3. **Mis comandos:** listado principal con búsqueda, filtro por categoría y acceso a las acciones de cada comando.
4. **Formulario de comando:** crear o editar un comando.
5. **Categorías:** listado y administración de categorías.
6. **Mi cuenta:** visualización de información personal y edición del nombre.

La información de un comando se puede consultar desde el listado o en una vista de detalle sencilla; no es obligatorio crear una página adicional.

## 8. Experiencia de usuario esperada

- Interfaz minimalista y fácil de comprender.
- Navegación simple entre comandos, categorías y cuenta.
- Textos legibles y comandos visualmente diferenciados de sus explicaciones.
- Mensajes claros cuando un formulario es inválido o una acción falla.
- Confirmación antes de eliminar contenido.
- Mensajes de estado vacío cuando todavía no hay comandos o categorías.
- Uso cómodo tanto en computadora como en celular.

## 9. Reglas de negocio

- Cada usuario ve y modifica exclusivamente sus propios registros.
- El correo electrónico no puede estar asociado a más de una cuenta.
- Los campos título, comando y categoría son obligatorios al guardar un comando; la descripción también es obligatoria para que cada registro sea útil como referencia.
- El nombre de una categoría es obligatorio y no se repite dentro de la biblioteca de un mismo usuario.
- Un comando debe estar asociado a una categoría existente del usuario.
- Eliminar un comando no elimina su categoría.
- Las eliminaciones requieren confirmación.

## 10. Fuera del alcance (versión 1.0)

- Ejecutar comandos dentro de la aplicación.
- Integración con terminales, GitHub o servicios externos.
- Biblioteca pública, perfiles públicos o contenido compartido.
- Equipos, roles administrativos o colaboración entre usuarios.
- Inteligencia artificial y generación automática de comandos.
- Importación y exportación de archivos.
- Valoraciones, comentarios o estadísticas avanzadas.
- Carpetas anidadas, etiquetas múltiples o favoritos.
- Recuperación de contraseña por correo y notificaciones.

Estas funciones no deben agregarse por iniciativa propia durante el desarrollo del MVP.

## 11. Criterios de aceptación del producto

Se considera terminado el MVP cuando:

1. Una persona puede crear una cuenta, iniciar sesión y cerrar sesión.
2. Cada usuario puede crear, consultar, editar y eliminar sus comandos.
3. Cada usuario puede crear, consultar, editar y eliminar categorías respetando las reglas establecidas.
4. Los comandos quedan asociados a una categoría válida.
5. La búsqueda por título y el filtro por categoría permiten localizar comandos propios.
6. La acción de copiar permite reutilizar el texto del comando.
7. Ningún usuario puede acceder ni modificar contenido de otra cuenta.
8. Los formularios informan errores de validación y las acciones presentan estados comprensibles.
9. Las vistas principales son utilizables en pantallas móviles y de escritorio.
10. El producto se ajusta a los requisitos académicos del Parcial 2 de Aplicaciones Híbridas.

## 12. Restricciones y prioridades

**Prioridad principal:** terminar un producto pequeño, funcional y coherente antes de incorporar mejoras.

El proyecto responde a un parcial académico que requiere autenticación, usuarios, al menos dos entidades adicionales y operaciones de creación, lectura, actualización y eliminación. También requiere una experiencia web con distintas vistas, validaciones y comunicación entre sus partes. Los detalles de arquitectura e implementación se documentarán por separado.

En caso de falta de tiempo, se prioriza: acceso a cuenta → categorías → comandos → consulta de comandos → búsqueda y filtros → mejoras visuales.

## 13. Política de cambios

Este PRD es la fuente de verdad sobre el **producto y su alcance**. Las decisiones técnicas no deben incorporarse aquí.

Cualquier funcionalidad nueva, cambio de reglas o ampliación del MVP debe revisarse y aprobarse antes de actualizar este documento. Si una propuesta contradice el PRD, se debe solicitar una decisión en lugar de implementarla automáticamente.
