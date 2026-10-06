# Cómo funciona el código

[Read in English](ARCHITECTURE.md)

Este es un portafolio de una sola página hecho con **Angular 21** (componentes standalone y signals), traducido con **Transloco** y publicado en **Firebase Hosting**. El diseño está inspirado en Tetris: el área de contenido es "el pozo" y las piezas (tetrominós) decoran la página.

## Estructura de carpetas

```
content/                 Datos del portafolio (perfil, proyectos, habilidades) en JSON
public/
  i18n/en.json, es.json  Textos de la interfaz en cada idioma
  images/, documents/    Archivos estáticos (imagen de inicio, CV en PDF)
src/
  main.ts                Arranca la aplicación
  styles.css             Estilos globales y variables de color (--neon-*)
  app/
    app.config.ts        Proveedores globales: router, HTTP, Transloco, repositorio de contenido
    app.routes.ts        Relación URL → página
    core/                Servicios de toda la app (contenido, idioma, guard, título de página)
    domain/              Tipos de datos (modelos) y el contrato del repositorio
    data-access/         Lee los archivos JSON de content/
    layout/              Marco común de todas las páginas: cabecera, menú, estadísticas, siguiente pieza
    features/            Una carpeta por página: home, about, projects, skills, contact
    shared/ui/           Piezas reutilizables: tetrominó, tarjeta de proyecto
```

Cada componente tiene su archivo `.ts` (lógica), `.html` (plantilla) y `.css` (estilos).

## Cómo se carga una página

1. `main.ts` arranca el componente `App`, que solo contiene un `<router-outlet>`.
2. `app.routes.ts` lee la URL. Todas las URL empiezan por el idioma: `/es/projects`, `/en/about`. Al entrar en `/` se redirige a `/es` (idioma por defecto).
3. `languageGuard` revisa el idioma de la URL. Si es válido (`es` o `en`) lo activa; si no, lo cambia por `es` y conserva el resto de la URL.
4. Se muestra el layout `Shell` y dentro de su `<router-outlet>` se carga la página de esa sección. Las páginas se cargan de forma diferida (`loadComponent`): cada una se descarga solo cuando se visita.
5. `PageTitleStrategy` traduce la clave `title` de la ruta (por ejemplo `pages.projects`) y la pone como título de la pestaña del navegador.

## Layout (`layout/`)

- **Shell**: la cuadrícula de la página. En móvil todo va en una columna; desde 64rem (1024px) pasa a tres columnas: menú, pozo de contenido y panel lateral.
- **Header**: el nombre, el rol y los botones de idioma ES/EN. Al pulsar un idioma se llama a `LanguageService.switchTo()`, que cambia solo la primera parte de la URL, así que te quedas en la misma página.
- **SideNav**: el menú principal. En pantallas de menos de 64rem muestra un **botón hamburguesa**; una signal `open` muestra u oculta la lista, y al elegir un enlace se cierra. En escritorio la lista siempre está visible y el botón se oculta.
- **NextPiece**: muestra un tetrominó que cambia cada 3 segundos (se desactiva si el usuario prefiere reducir el movimiento).
- **StatsPanel**: nivel, número de proyectos y número de habilidades, calculados a partir de los archivos de contenido.

## Contenido (`content/` → `core/content/`)

Los datos que se muestran en el sitio están separados del código:

- `domain/repositories/content.repository.ts` define **qué** contenido existe (perfil, proyectos, habilidades).
- `data-access/local-content.repository.ts` lo implementa importando los JSON de `content/`.
- `core/content/content.facade.ts` es lo que usan los componentes. Expone el perfil, los proyectos, los proyectos destacados, las categorías de habilidades y las estadísticas calculadas.

Para cambiar los datos del sitio solo hay que editar JSON:

| Archivo | Qué contiene |
| --- | --- |
| `content/profile.json` | Nombre, nivel y redes sociales |
| `content/projects.json` | Proyectos (ver [Agregar un proyecto](#agregar-un-proyecto)) |
| `content/skills.json` | Categorías de habilidades, cada habilidad con nivel del 1 al 5 |

Si algún día los datos pasan a una API o a una base de datos, solo hace falta una nueva clase de repositorio; los componentes no cambian.

### Agregar un proyecto

Añade un objeto al arreglo de `content/projects.json`:

```json
{
  "slug": "mi-proyecto",
  "name": { "es": "Mi proyecto", "en": "My project" },
  "description": { "es": "Qué hace y por qué.", "en": "What it does and why." },
  "featured": true,
  "shape": "T",
  "technologies": ["Python", "MySQL"],
  "repositoryUrl": "https://github.com/usuario/mi-proyecto",
  "demoUrl": null
}
```

- `slug`: identificador único, en minúsculas y con guiones.
- `shape`: color e icono de la tarjeta, uno de `I`, `O`, `T`, `S`, `Z`, `J`, `L`.
- `repositoryUrl` / `demoUrl`: usa `null` para ocultar el enlace.

La página de Proyectos y el contador de proyectos de las estadísticas se actualizan solos.

## Traducciones (`public/i18n/`)

- Los textos de la interfaz (menús, títulos, párrafos) están en `en.json` y `es.json` con las mismas claves, y las plantillas los muestran con el pipe `transloco`: `{{ 'nav.home' | transloco }}`.
- `TranslocoHttpLoader` descarga el archivo del idioma activo.
- `LanguageService` expone el idioma actual como signal (`current()`) y actualiza el atributo `<html lang>`.
- **Los proyectos** son la excepción: su nombre y descripción se escriben en los dos idiomas dentro de `content/projects.json`, para que un proyecto nuevo se agregue en un solo lugar. La tarjeta elige el texto con `project().name[language.current()]`.
- Los títulos de las categorías de habilidades usan `skills.categories.<id>` en los archivos de traducción, así que una categoría nueva necesita su título en `en.json` y en `es.json`.

## Estilos

- Los colores y las fuentes son variables CSS en `src/styles.css` (`--neon-cyan`, `--background`, `--font-display`...).
- Las clases `neon-box` y `neon-text` añaden el efecto de brillo; cada componente define `--neon-color` para elegir su color.
- Cada forma de tetrominó tiene un color fijo (`TETROMINO_COLORS` en `shared/ui/tetromino/tetromino.ts`), que también es el color de la tarjeta de proyecto que usa esa forma.
- Los estilos son mobile-first: las reglas base son para teléfonos y `@media (min-width: 48rem)` / `(min-width: 64rem)` añaden el diseño de tablet y escritorio.

## Pruebas y despliegue

- `npm test` ejecuta las pruebas unitarias con Vitest (archivos `*.spec.ts`).
- `npm run build` genera el sitio en `dist/portfolio/browser`.
- Cada push a `development` o `main` ejecuta `.github/workflows/firebase-hosting.yml`: instala, prueba, compila y publica en Firebase Hosting. Si las pruebas fallan, no se publica nada.
