# Sistema de diseño

## Propósito y alcance

Este documento establece los tokens visuales disponibles para la interfaz de CommandHub. El PRD pide una experiencia simple, clara y adaptable a móviles y escritorio (secciones 4 y 8); la consigna del Parcial 2 requiere una interfaz React organizada en vistas y componentes. Ninguna de esas fuentes prescribe una marca o una paleta propia.

Por decisión explícita del usuario, los tokens viven **versionados como variables CSS** en `frontend/src/styles/tokens.css`. No se descargan ni se vendorizan hojas de `@primer/primitives` desde GitHub, npm ni CDN. Tailwind CSS 4 consume esos tokens a través del puente shadcn y `@theme` en `frontend/src/index.css`.

El isotipo del sitio es el archivo que aportó el usuario. Vive en `frontend/public/favicon.png` y `frontend/index.html` lo declara con `<link rel="icon" type="image/png" href="/favicon.png" />`. No forma parte de los tokens.

El fondo de las pantallas usa la imagen que aportó el usuario, `frontend/public/fondo-circuitos.png` (el archivo original estaba solo en Descargas; `frontend/dist/` no se versiona). `index.css` la pinta fija detrás de `#root`, con opacidad `--bgImage-opacity` definida en `tokens.css`: `0.1` en claro y `0.55` en oscuro. El contenedor de `Layout` es transparente para que el circuito se vea en los márgenes. El texto vive en paneles `bg-background/85` con borde. La barra de navegación es sticky y usa `bg-background/80` con `backdrop-blur`.

La marca en el header es el texto CommandHub junto al icono `SquareTerminal` de `lucide-react` (ya instalado). Los iconos acompañan el texto existente; no reemplazan etiquetas. No se usa el logo de GitHub ni el paquete `@primer/primitives`. El acento sigue siendo el azul de los tokens.

Las pantallas entran con la animación `page-enter` (`--duration-base`, `--ease-out`). Hover, foco y la presión del botón usan `--duration-fast` (150 ms). `prefers-reduced-motion: reduce` anula el desplazamiento de entrada y el botón no escala. El comando se muestra con la clase `.snippet` (monoespacio, borde y superficie muted).

## Preset de shadcn/ui acordado

Por decisión explícita del usuario, se utiliza el preset `b2DcW8Pfk` al integrar shadcn/ui. Los colores siguen definidos por las variables de `frontend/src/styles/tokens.css`; la paleta de shadcn no las reemplaza. También se conservan las convenciones visuales existentes del proyecto.

**Estado:** Tailwind CSS 4 y shadcn/ui están inicializados. `frontend/components.json` declara el estilo `base-nova`. Los aliases de color viven en `frontend/src/index.css` y apuntan a `tokens.css`.

## Fuente y archivos

El entrypoint de tokens es `frontend/src/styles/tokens.css`. Define en el propio repositorio:

- tipografías (`--fontStack-sansSerif`, `--fontStack-sansSerifDisplay`)
- radio (`--overlay-borderRadius`)
- espaciado y texto base (`--space-*`, `--text-body-size-medium`)
- colores semánticos light/dark (`--bgColor-*`, `--fgColor-*`, `--borderColor-*`)
- opacidad del fondo ilustrado (`--bgImage-opacity`)
- motion (`--duration-fast` 150 ms, `--duration-base` 240 ms, `--ease-out`)

La hoja de la app `frontend/src/index.css` carga Tailwind, esos tokens y la hoja de shadcn:

```css
@import "tailwindcss";
@import "./styles/tokens.css";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

Tailwind v4 declara utilidades con `@theme` / `@theme inline` en CSS (configuración CSS-first), sin `tailwind.config.js` para estos colores.

La instalación, scripts y versiones se documentan en el `README.md` de la raíz.

## Temas y modos

Los tokens de color se aplican con atributos `data-*` en `<html>`:

```html
<html lang="es" data-color-mode="dark" data-light-theme="light" data-dark-theme="dark">
```

Por decisión explícita del usuario, la app queda fija en oscuro: `frontend/index.html` declara `data-color-mode="dark"` y `html` usa `color-scheme: dark`. No se consulta `prefers-color-scheme`. Los bloques `light` y `auto` de `tokens.css` siguen definidos, pero no se aplican. Los atributos `data-light-theme` / `data-dark-theme` se conservan por compatibilidad con el marcado existente.

## Consumo y nombres

En CSS se consumen con `var(...)`, por ejemplo:

```css
.snippet {
  border-radius: var(--overlay-borderRadius);
  border: 1px solid var(--borderColor-default);
  background-color: color-mix(in srgb, var(--bgColor-muted) 80%, transparent);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-body-size-medium);
}
```

En `index.css`, las clases de superficie son `.panel`, `.field`, `.field-icon`, `.snippet`, `.list-card`, `.nav-link`, `.back-link` y `.cancel-link`. Los campos de formulario usan `.field` en lugar de repetir la cadena de utilidades.

Se deben preferir esos tokens a valores visuales escritos directamente cuando exista un token adecuado. Cualquier decisión visual nueva debe agregarse en `tokens.css` (o documentarse aquí) antes de usarse en componentes.

### Mapeo a Tailwind y shadcn/ui

Los aliases de shadcn se definen en `:root` de `frontend/src/index.css` y apuntan a los tokens de `tokens.css`. Tailwind los consume mediante `@theme inline` en el mismo archivo.

| Alias shadcn | Token en `tokens.css` |
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

## Actualización de tokens

Para cambiar la paleta, tipografía, espaciado o radios, editar `frontend/src/styles/tokens.css` y actualizar esta guía si cambian nombres o el mapeo a shadcn. No reintroducir un árbol `vendor/` de CSS externos salvo decisión explícita nueva.
