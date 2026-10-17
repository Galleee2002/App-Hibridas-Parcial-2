# Sistema de diseño

## Propósito y alcance

Este documento establece los tokens visuales disponibles para la futura interfaz de CommandHub. El PRD pide una experiencia simple, clara y adaptable a móviles y escritorio (secciones 4 y 8); la consigna del Parcial 2 requiere una interfaz React organizada en vistas y componentes. Ninguna de esas fuentes prescribe una marca o una paleta propia. Para contar con una base consistente sin inventar valores, el proyecto conserva los tokens CSS oficiales de GitHub Primer Primitives.

La adopción actual se limita a los tokens: no instala Primer React, Tailwind ni shadcn/ui y no crea componentes, utilidades Tailwind o aliases de shadcn. Esas integraciones quedan para una etapa posterior, cuando el proyecto tenga una aplicación frontend y sus versiones/configuración estén definidas.

## Preset de shadcn/ui acordado

Por decisión explícita del usuario, se utilizará el preset `b2DcW8Pfk` al integrar shadcn/ui. Los colores seguirán definidos por los tokens Primer expuestos en `frontend/src/styles/tokens.css`; la paleta del preset no los reemplazará. También se conservarán las convenciones visuales existentes del proyecto.

**Estado: pendiente por restricción de firewall.** Quedan pendientes la decodificación de la configuración del preset `b2DcW8Pfk` y su integración. Se retomarán cuando el acceso de red necesario esté disponible y autorizado. Antes de aplicarlo, también se deberán definir las versiones y la configuración de la aplicación frontend. Se mantendrá la prioridad de los colores de `tokens.css` y de las convenciones visuales existentes. Esta decisión no incorpora dependencias ni modifica `tokens.css`.

## Fuente y archivos

Se vendorizó `@primer/primitives` versión `11.10.0`, publicada bajo licencia MIT por GitHub. Se conservaron sin edición los archivos CSS oficiales de tamaño, tipografía, espaciado y temas `light`/`dark`, junto con `LICENSE`, bajo `frontend/src/styles/vendor/primer/`. El manifiesto `frontend/src/styles/vendor/primer/SOURCE.json` registra el origen y el SHA-256 de cada archivo.

El paquete se obtuvo desde jsDelivr con versión fijada en cada URL y TLS validado; la respuesta indicó `x-jsd-version: 11.10.0`. La verificación directa del tarball del registro npm no estuvo disponible porque el entorno rechazó su certificado TLS. Por eso no se declara una integridad SRI de tarball; los hashes SHA-256 del contenido vendorizado sí permiten revisar estos archivos. La fuente de release identifica el commit `3f51f80`.

El entrypoint del proyecto es `frontend/src/styles/tokens.css`. Importa de forma explícita los archivos locales y no consulta npm ni una CDN durante la ejecución. La hoja de la app `frontend/src/index.css` los carga una sola vez:

```css
@import "./styles/tokens.css";
```

La instalación, scripts y versiones se documentan en el `README.md` de la raíz.

## Temas y modos

Primer aplica los tokens de color mediante atributos `data-*` en `body` u otro elemento DOM de alto nivel. En este proyecto se recomienda colocarlos en `<html>` para que el tema cubra toda la aplicación y sus descendientes:

```html
<html data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
```

`data-color-mode` acepta `light`, `dark` o `auto`. Para el modo automático, Primer selecciona el tema según la preferencia del sistema; los atributos de tema indican qué temas usar para cada modo. Los nombres coinciden con los temas CSS `light` y `dark`. En este proyecto se aplican en el `<html>` de `frontend/index.html`.

El entrypoint carga solamente los temas `light` y `dark`. Primer ofrece otros temas (por ejemplo, `dark_dimmed` y variantes de accesibilidad), pero no se incluyen hasta que un requisito del producto los necesite.

## Consumo y nombres

Los CSS exponen propiedades personalizadas. En CSS se consumen con `var(...)`, por ejemplo:

```css
.command-code {
  color: var(--fgColor-default);
  background-color: var(--bgColor-muted);
  padding: var(--space-md);
  font-size: var(--text-body-size-medium);
}
```

Los tokens de color funcionales expresan intención (fondo, texto, borde, estado); los de tamaño, espaciado y tipografía ofrecen escalas compartidas. Se importan las nueve hojas de tamaño y tipografía enumeradas por la guía oficial, la escala funcional de espaciado y los dos temas de color elegidos. Se deben preferir esos tokens a valores visuales escritos directamente cuando exista un token adecuado. El archivo `tokens.css` importa los CSS oficiales enteros para mantener las definiciones y comentarios originales. La selección actual cubre los fundamentos enumerados en el manifiesto; no incluye todas las escalas y temas que publica Primer.

### Posible mapeo futuro a Tailwind o shadcn/ui

La tabla muestra equivalencias candidatas para una futura capa de aliases. Los nombres de la columna Primer existen en los temas locales `light.css` y `dark.css`; los aliases de la primera columna son convenciones que usan Tailwind/shadcn y **no están implementados** en este repositorio.

| Alias candidato | Token Primer existente |
| --- | --- |
| `--background` | `--bgColor-default` |
| `--foreground` | `--fgColor-default` |
| `--primary` | `--bgColor-accent-emphasis` |
| `--primary-foreground` | `--fgColor-onEmphasis` |
| `--border` | `--borderColor-default` |

Un adaptador futuro deberá validar la convención de la versión concreta de Tailwind/shadcn antes de crear aliases; esta tabla no configura ni añade esas herramientas.

## Actualización de los archivos vendorizados

Para actualizar Primer, primero se debe elegir una versión publicada, revisar sus notas de cambio y actualizar en conjunto los CSS, la licencia, los hashes y la procedencia de `SOURCE.json`. No editar los CSS dentro del directorio `vendor/`; cualquier decisión propia debe vivir en archivos separados del proyecto. La licencia MIT acompañante debe conservarse al redistribuir estos archivos.

## Referencias oficiales

- [Primer Primitives: guía de uso, imports y temas](https://primer.style/product/primitives/)
- [Primer Primitives: colores](https://primer.style/product/primitives/color/)
- [Primer Primitives: tipografía](https://primer.style/product/primitives/typography/)
- [Repositorio oficial `primer/primitives`](https://github.com/primer/primitives)
- [Release `@primer/primitives@11.10.0`](https://github.com/primer/primitives/releases/tag/%40primer%2Fprimitives%4011.10.0)
