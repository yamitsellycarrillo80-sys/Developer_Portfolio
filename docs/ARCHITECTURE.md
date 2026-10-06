# How the code works

[Leer en español](ARQUITECTURA.md)

This is a single-page portfolio built with **Angular 21** (standalone components, signals), translated with **Transloco** and deployed to **Firebase Hosting**. The look is inspired by Tetris: the content area is "the well", and pieces (tetrominoes) decorate the layout.

## Folder structure

```
content/                 Portfolio data (profile, projects, skills) as JSON
public/
  i18n/en.json, es.json  Interface texts in each language
  images/, documents/    Static files (home picture, resume PDF)
src/
  main.ts                Starts the app
  styles.css             Global styles and colour variables (--neon-*)
  app/
    app.config.ts        Global providers: router, HTTP, Transloco, content repository
    app.routes.ts        URL → page mapping
    core/                App-wide services (content, language, guard, page title)
    domain/              Data types (models) and the repository contract
    data-access/         Reads the JSON files in content/
    layout/              Frame around every page: header, nav, stats, next piece
    features/            One folder per page: home, about, projects, skills, contact
    shared/ui/           Reusable pieces: tetromino, project card
```

Each component has its own `.ts` (logic), `.html` (template) and `.css` (styles) file.

## How a page loads

1. `main.ts` starts the `App` component, which only contains a `<router-outlet>`.
2. `app.routes.ts` reads the URL. Every URL starts with the language: `/es/projects`, `/en/about`. Visiting `/` redirects to `/es` (the default language).
3. `languageGuard` checks the language in the URL. If it is valid (`es` or `en`), it activates it; otherwise it swaps it for `es` and keeps the rest of the URL.
4. The `Shell` layout is shown, and the page for that section loads inside its `<router-outlet>`. Pages are lazy-loaded (`loadComponent`), so each one is downloaded only when visited.
5. `PageTitleStrategy` translates the route's `title` key (for example `pages.projects`) and sets it as the browser tab title.

## Layout (`layout/`)

- **Shell**: the page grid. On mobile everything stacks in one column; from 64rem (1024px) it becomes three columns: nav, content well and side panel.
- **Header**: the name, role and the ES/EN language buttons. Clicking a language calls `LanguageService.switchTo()`, which changes only the first part of the URL, so you stay on the same page.
- **SideNav**: the main menu. On screens narrower than 64rem it shows a **burger button**; an `open` signal shows or hides the list, and choosing a link closes it. On desktop the list is always visible and the button is hidden.
- **NextPiece**: shows a tetromino that changes every 3 seconds (turned off if the user prefers reduced motion).
- **StatsPanel**: level, number of projects and number of skills, calculated from the content files.

## Content (`content/` → `core/content/`)

The data shown on the site is kept apart from the code:

- `domain/repositories/content.repository.ts` defines **what** content exists (profile, projects, skills).
- `data-access/local-content.repository.ts` implements it by importing the JSON files in `content/`.
- `core/content/content.facade.ts` is what components use. It exposes the profile, projects, featured projects, skill categories and the computed stats.

To change the site's data, you only edit JSON:

| File | What it holds |
| --- | --- |
| `content/profile.json` | Name, level and social links |
| `content/projects.json` | Projects (see [Adding a project](../README.md#adding-a-project)) |
| `content/skills.json` | Skill categories, each skill rated 1 to 5 |

If the data ever moves to an API or a database, only a new repository class is needed; the components stay the same.

## Translations (`public/i18n/`)

- Interface texts (menus, titles, paragraphs) live in `en.json` and `es.json` under the same keys, and templates show them with the `transloco` pipe: `{{ 'nav.home' | transloco }}`.
- `TranslocoHttpLoader` downloads the file for the active language.
- `LanguageService` exposes the current language as a signal (`current()`) and updates the `<html lang>` attribute.
- **Projects** are the exception: their name and description are written in both languages inside `content/projects.json`, so a new project is added in one place. The project card picks the text with `project().name[language.current()]`.
- Skill category titles use `skills.categories.<id>` in the translation files, so a new category needs a title in both `en.json` and `es.json`.

## Styling

- Colours and fonts are CSS variables in `src/styles.css` (`--neon-cyan`, `--background`, `--font-display`...).
- The `neon-box` and `neon-text` classes add the glow effect; each component sets `--neon-color` to choose its colour.
- Each tetromino shape has a fixed colour (`TETROMINO_COLORS` in `shared/ui/tetromino/tetromino.ts`), which is also the colour of any project card using that shape.
- Styles are mobile-first: the base rules are for phones, and `@media (min-width: 48rem)` / `(min-width: 64rem)` add the tablet and desktop layouts.

## Tests and deployment

- `npm test` runs the unit tests with Vitest (`*.spec.ts` files).
- `npm run build` builds the site into `dist/portfolio/browser`.
- Every push to `development` or `main` runs `.github/workflows/firebase-hosting.yml`: install, test, build and deploy to Firebase Hosting. If the tests fail, nothing is deployed.
