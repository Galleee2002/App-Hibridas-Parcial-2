# Sistema de diseño

## Propósito y alcance

Este documento establece los tokens visuales disponibles para la interfaz de CommandHub. El PRD pide una experiencia simple, clara y adaptable a móviles y escritorio (secciones 4 y 8); la consigna del Parcial 2 requiere una interfaz React organizada en vistas y componentes. Ninguna de esas fuentes prescribe una marca o una paleta propia.

Por decisión explícita del usuario, los tokens viven **versionados como variables CSS** en `frontend/src/styles/tokens.css`. No se descargan ni se vendorizan hojas de `@primer/primitives` desde GitHub, npm ni CDN. Tailwind CSS 4 consume esos tokens a través del puente shadcn y `@theme` en `frontend/src/index.css`.

El isotipo del sitio es el archivo que aportó el usuario. Vive en `frontend/public/favicon.png` y `frontend/index.html` lo declara con `<link rel="icon" type="image/png" href="/favicon.png" />`. No forma parte de los tokens.

## Preset de shadcn/ui acordado

Por decisión explícita del usuario, se utiliza el preset `b2DcW8Pfk` al integrar shadcn/ui. Los colores siguen definidos por las variables de `frontend/src/styles/tokens.css`; la paleta de shadcn no las reemplaza. También se conservan las convenciones visuales existentes del proyecto.

**Estado:** Tailwind CSS 4 y shadcn/ui están inicializados. `frontend/components.json` declara el estilo `base-nova`. Los aliases de color viven en `frontend/src/index.css` y apuntan a `tokens.css`.

## Fuente y archivos

El entrypoint de tokens es `frontend/src/styles/tokens.css`. Define en el propio repositorio:

- tipografías (`--fontStack-sansSerif`, `--fontStack-sansSerifDisplay`)
- radio (`--overlay-borderRadius`)
- espaciado y texto base (`--space-*`, `--text-body-size-medium`)
- colores semánticos light/dark (`--bgColor-*`, `--fgColor-*`, `--borderColor-*`)

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
<html data-color-mode="auto" data-light-theme="light" data-dark-theme="dark">
```

`data-color-mode` acepta `light`, `dark` o `auto`. En `auto`, `tokens.css` usa `prefers-color-scheme` para elegir la paleta oscura. Los atributos `data-light-theme` / `data-dark-theme` se conservan por compatibilidad con el marcado existente.

## Consumo y nombres

En CSS se consumen con `var(...)`, por ejemplo:

```css
.command-code {
  color: var(--fgColor-default);
  background-color: var(--bgColor-muted);
  padding: var(--space-md);
  font-size: var(--text-body-size-medium);
}
```

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
