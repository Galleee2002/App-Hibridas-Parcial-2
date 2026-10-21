# Sistema de diseño

## Propósito y alcance

Este documento establece los tokens visuales disponibles para la futura interfaz de CommandHub. El PRD pide una experiencia simple, clara y adaptable a móviles y escritorio (secciones 4 y 8); la consigna del Parcial 2 requiere una interfaz React organizada en vistas y componentes. Ninguna de esas fuentes prescribe una marca o una paleta propia. Para contar con una base consistente sin inventar valores, el proyecto conserva los tokens CSS oficiales de GitHub Primer Primitives.

Los tokens Primer siguen siendo la fuente de color, tipografía, espaciado y radio. El frontend ya carga Tailwind CSS 4 y shadcn/ui; los aliases de shadcn en `frontend/src/index.css` apuntan a esos tokens y no los reemplazan. No se instala Primer React.

## Preset de shadcn/ui acordado

Por decisión explícita del usuario, se utilizará el preset `b2DcW8Pfk` al integrar shadcn/ui. Los colores siguen definidos por los tokens Primer expuestos en `frontend/src/styles/tokens.css`; la paleta de shadcn no los reemplaza. También se conservan las convenciones visuales existentes del proyecto.

**Estado:** Tailwind CSS 4 y shadcn/ui están inicializados. `frontend/components.json` declara el estilo `base-nova`. Los aliases de color viven en `frontend/src/index.css` y apuntan a `tokens.css`. El identificador `b2DcW8Pfk` no figura en `components.json`; no se modificó `tokens.css`.

## Fuente y archivos

Se vendorizó `@primer/primitives` versión `11.10.0`, publicada bajo licencia MIT por GitHub. Se conservaron sin edición los archivos CSS oficiales de tamaño, tipografía, espaciado y temas `light`/`dark`, junto con `LICENSE`, bajo `frontend/src/styles/vendor/primer/`. El manifiesto `frontend/src/styles/vendor/primer/SOURCE.json` registra el origen y el SHA-256 de cada archivo.

El paquete se obtuvo desde jsDelivr con versión fijada en cada URL y TLS validado; la respuesta indicó `x-jsd-version: 11.10.0`. La verificación directa del tarball del registro npm no estuvo disponible porque el entorno rechazó su certificado TLS. Por eso no se declara una integridad SRI de tarball; los hashes SHA-256 del contenido vendorizado sí permiten revisar estos archivos. La fuente de release identifica el commit `3f51f80`.

El entrypoint de tokens es `frontend/src/styles/tokens.css`. Importa de forma explícita los archivos locales y no consulta npm ni una CDN durante la ejecución. La hoja de la app `frontend/src/index.css` carga Tailwind, esos tokens y la hoja de shadcn:

```css
@import "tailwindcss";
@import "./styles/tokens.css";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
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

### Mapeo a Tailwind y shadcn/ui

Los aliases de shadcn se definen en `:root` de `frontend/src/index.css` y apuntan a tokens Primer. Tailwind los consume mediante `@theme inline` en el mismo archivo.

| Alias shadcn | Token Primer |
| --- | --- |
| `--background` | `--bgColor-default` |
| `--foreground` | `--fgColor-default` |
| `--card` / `--popover` | `--bgColor-default` |
| `--card-foreground` / `--popover-foreground` | `--fgColor-default` |
| `--primary` | `--bgColor-accent-emphasis` |
| `--primary-foreground` | `--fgColor-onEmphasis` |
| `--secondary` | `--bgColor-muted` |
| `--secondary-foreground` | `--fgColor-default` |
| `--muted` | `--bgColor-muted` |
| `--muted-foreground` | `--fgColor-muted` |
| `--accent` | `--bgColor-accent-muted` |
| `--accent-foreground` | `--fgColor-accent` |
| `--destructive` | `--bgColor-danger-emphasis` |
| `--border` / `--input` | `--borderColor-default` |
| `--ring` | `--borderColor-accent-emphasis` |
| `--radius` | `--overlay-borderRadius` |

También se exponen `--font-sans` (`--fontStack-sansSerif`) y `--font-heading` (`--fontStack-sansSerifDisplay`). No inventar colores ni radios fuera de este mapeo y de `tokens.css`.

## Actualización de los archivos vendorizados

Para actualizar Primer, primero se debe elegir una versión publicada, revisar sus notas de cambio y actualizar en conjunto los CSS, la licencia, los hashes y la procedencia de `SOURCE.json`. No editar los CSS dentro del directorio `vendor/`; cualquier decisión propia debe vivir en archivos separados del proyecto. La licencia MIT acompañante debe conservarse al redistribuir estos archivos.

## Referencias oficiales

- [Primer Primitives: guía de uso, imports y temas](https://primer.style/product/primitives/)
- [Primer Primitives: colores](https://primer.style/product/primitives/color/)
- [Primer Primitives: tipografía](https://primer.style/product/primitives/typography/)
- [Repositorio oficial `primer/primitives`](https://github.com/primer/primitives)
- [Release `@primer/primitives@11.10.0`](https://github.com/primer/primitives/releases/tag/%40primer%2Fprimitives%4011.10.0)
