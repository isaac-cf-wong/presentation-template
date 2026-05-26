# Presentation Template 🎯

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Reveal.js](https://img.shields.io/badge/reveal.js-6.x-orange.svg)](https://revealjs.com/)
[![CI](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/ci.yml/badge.svg)](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/ci.yml)
[![Publish](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/publish.yml/badge.svg)](https://isaac-cf-wong.github.io/presentation-template/)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)
[![typos](https://img.shields.io/badge/spell--check-typos-brightgreen)](https://github.com/crate-ci/typos)

> **⚠️ Experimental Template Disclaimer**
>
> This presentation template is currently in **experimental stage**. While
> functional, it has not been fully tested in all environments and scenarios.
> Use at your own discretion for production presentations. Feedback and
> contributions are welcome to help improve stability and features.

A modern, responsive presentation template built with
[reveal.js](https://revealjs.com/) 6.x and a small Gulp pipeline. Slides are
authored as Markdown files in `slides/` and loaded into `index.html` via
reveal.js's built-in `data-markdown` support.

## ✨ Features

- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Built-in Themes** - All reveal.js 6.x themes available out of the box
- 🔄 **Smooth Transitions** - Slide transitions and gradient backgrounds
- 📝 **Markdown Slides** - Each slide deck section is an external `.md` file
- 🖼️ **Media Rich** - Images, videos, and syntax-highlighted code
- ➗ **Math Support** - LaTeX equations rendered with KaTeX
- 🔍 **Search & Zoom** - Built-in reveal.js search and zoom plugins
- 🎤 **Speaker Notes** - Press `S` to open the speaker view
- 📤 **PDF Export** - Print-friendly via `?print-pdf`
- 🚀 **GitHub Pages Deploy** - Automated publish workflow included

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x (matches the versions used in CI)
- npm

### Create Your Presentation

1. **Use this template:**
    - Click the "Use this template" button on GitHub, or clone directly:

    ```console
    git clone https://github.com/YOUR-USERNAME/YOUR-PRESENTATION-NAME.git
    cd YOUR-PRESENTATION-NAME
    ```

2. **Install dependencies:**

    ```console
    npm install
    ```

3. **Start the development server:**

    ```console
    npm start
    ```

    Starts a Gulp + `gulp-connect` server with live reload at
    `http://localhost:8000`.

4. **Build for production:**

    ```console
    npm run build
    ```

    Copies all presentation assets and the required reveal.js files into `dist/`
    ready for deployment.

5. **Preview the built output:**

    ```console
    npm run preview
    ```

    Serves the contents of `dist/` (no live reload) so you can verify the
    production build locally.

6. **Run the smoke test:**

    ```console
    npm test
    ```

    Verifies the required template files (`index.html`, `css/custom.css`,
    `js/custom.js`) are present.

## 📁 Project Structure

```console
presentation-template/
├── index.html                # Main reveal.js entry point
├── slides/                   # Markdown slide files (one per section)
│   ├── 01-title.md
│   ├── 02-about.md
│   ├── 03-features.md
│   ├── 04-getting-started.md
│   └── 05-conclusion.md
├── css/
│   └── custom.css            # Project-specific style overrides
├── js/
│   └── custom.js             # Custom JS (keyboard shortcuts, helpers)
├── images/                   # Image assets (with README placeholder)
├── videos/                   # Video assets (with README placeholder)
├── docs/
│   └── reveal-config.md      # Reveal.js configuration reference
├── gulpfile.js               # Gulp tasks (serve / build / preview / test)
├── package.json              # npm dependencies and scripts
├── pyproject.toml            # Python tooling (uv, prek, git-cliff)
├── cliff.toml                # git-cliff changelog configuration
├── .pre-commit-config.yaml   # Pre-commit hook configuration
└── .github/
    └──  workflows/            # CI, publish, release, CodeQL, etc.
```

`node_modules/reveal.js/` provides the reveal.js core and plugins; the Gulp
build copies the required subset of it into `dist/node_modules/` so the built
site is self-contained.

## 📝 Creating Slides

Slides are authored as Markdown files under `slides/` and pulled in by
`index.html` using reveal.js's `data-markdown` attribute. For example:

```html
<section data-markdown="slides/02-about.md"></section>

<!-- Split a single Markdown file into vertical slides using `---` -->
<section
    data-markdown="slides/03-features.md"
    data-separator-vertical="^---$"
></section>
```

Inside a Markdown file you can use any standard reveal.js features such as
fragments, speaker notes, fenced code blocks, and KaTeX math. See
[`docs/reveal-config.md`](docs/reveal-config.md) and the
[reveal.js documentation](https://revealjs.com/) for full syntax.

To add a new slide:

1. Create `slides/06-my-slide.md`
2. Add a new `<section data-markdown="slides/06-my-slide.md"></section>` to
   `index.html`

## 🎨 Customization

### Themes

All reveal.js 6.x themes are available from
`node_modules/reveal.js/dist/theme/`:

`beige`, `black` (default), `black-contrast`, `blood`, `dracula`, `league`,
`moon`, `night`, `serif`, `simple`, `sky`, `solarized`, `white`,
`white-contrast`.

Switch themes by editing the `<link id="theme">` tag in `index.html`:

```html
<link
    rel="stylesheet"
    href="node_modules/reveal.js/dist/theme/black.css"
    id="theme"
/>
```

### Custom Styling

`css/custom.css` is loaded after the reveal.js theme and is the recommended
place to override colors, fonts, and component styles. It already defines a
small set of CSS variables (`--main-color`, `--accent-color`, etc.) you can
tweak.

For a fully custom theme, copy an existing theme out of
`node_modules/reveal.js/dist/theme/` into `css/`, edit it, and point the
`<link id="theme">` tag at your new file.

## 🎮 Controls

- **Navigation**: Arrow keys, space bar, or on-screen controls
- **Fullscreen**: Press `F`
- **Speaker View**: Press `S`
- **Overview**: Press `ESC`
- **Pause / Blackout**: Press `B` or `.`
- **Search**: Press `Ctrl/Cmd + Shift + F`
- **Help**: Press `?` to see all keyboard shortcuts

The template also adds `T` as a custom shortcut to toggle between the `black`
and `white` themes (see `js/custom.js`).

## 📤 Export & Deployment

### Export to PDF

1. Append `?print-pdf` to the presentation URL
2. Open the print dialog (`Ctrl+P` / `Cmd+P`)
3. Choose "Save as PDF" with **Landscape** layout

### Deploy to GitHub Pages

This repository ships with a `Publish to GitHub Pages` workflow
([`.github/workflows/publish.yml`](.github/workflows/publish.yml)) that runs on
every push to `main`:

1. Installs dependencies with `npm ci`
2. Runs `npm test` and `npm run build`
3. Uploads `dist/` as a Pages artifact and deploys it

To enable it on your fork, go to **Settings → Pages** and set the source to
**GitHub Actions**. The presentation will be available at
`https://<your-username>.github.io/<your-repo>/`.

### Deploy to Netlify / Vercel / etc.

Any static host works. Run `npm run build` and publish the `dist/` directory (or
configure the host to run `npm run build` and serve `dist/`).

## 🧪 Tests & Quality Checks

The current testing surface is intentionally lightweight:

- **`npm test`** runs `gulp test`, which verifies that the required template
  files (`index.html`, `css/custom.css`, `js/custom.js`) are present. CI runs
  this on Node.js 18.x and 20.x against every push and pull request to `main`.
- **`npm run build`** is also exercised in CI to make sure the production copy
  step succeeds.

Pre-commit hooks (configured in
[`.pre-commit-config.yaml`](.pre-commit-config.yaml)) enforce code quality
locally and on [pre-commit.ci](https://pre-commit.ci):

- `pre-commit-hooks` — whitespace, line endings, YAML/JSON validity, large
  files, merge conflicts
- [`typos`](https://github.com/crate-ci/typos) — spell-check for Markdown and
  HTML
- [`prettier`](https://prettier.io/) — formatting for JS, CSS, HTML, Markdown,
  YAML
- [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2) —
  Markdown linting (see `.markdownlint.yaml`)
- [`stylelint`](https://stylelint.io/) — CSS linting (see `.stylelintrc.json`)
- [`uv-lock`](https://github.com/astral-sh/uv-pre-commit) — keeps the Python
  tooling lockfile in sync
- [`gitleaks`](https://github.com/gitleaks/gitleaks) — secret scanning

Lighthouse CI is available via the `@lhci/cli` devDependency for ad-hoc audits
(e.g. `npx lhci autorun`), but is not wired into an npm script or CI step in
this template — feel free to add one if you need it.

## ⚙️ Build System

Build tasks live in [`gulpfile.js`](gulpfile.js) and are exposed through npm
scripts:

| Command           | Gulp task | Description                                         |
| ----------------- | --------- | --------------------------------------------------- |
| `npm start`       | `serve`   | Dev server at `http://localhost:8000` (live reload) |
| `npm run build`   | `build`   | Cleans `dist/`, then copies the presentation        |
| `npm run preview` | `preview` | Serves the built `dist/` output                     |
| `npm test`        | `test`    | Verifies required template files exist              |

Additional Gulp tasks not exposed via npm: `gulp clean` (just removes `dist/`)
and `gulp serve:prod` (no-live-reload server with cache headers, suitable for
Lighthouse runs).

The `build` task:

- 🧹 Removes any existing `dist/` directory
- 📁 Copies `index.html`, `css/`, `js/`, `images/`, `videos/`, and `slides/`
- 📦 Copies the required subset of `node_modules/reveal.js/` (the `dist/` and
  `plugin/` folders) and `node_modules/reveal_external/`
- ✅ Produces a self-contained directory ready to serve from any static host

### Tooling

- **reveal.js 6.x** with the `markdown`, `highlight`, `notes`, `math` (KaTeX),
  `search`, and `zoom` plugins
- **`reveal_external`** for loading external slide files
- **Gulp 5.x** + `gulp-connect` for dev server and build
- **`yargs`** for `--root`, `--port`, `--host` CLI overrides on Gulp tasks
- **`http-server`** as a lightweight fallback static server (devDependency)
- **`@lhci/cli`** available for Lighthouse audits

## 🔧 Configuration

Reveal.js is initialized at the bottom of `index.html` with the following
defaults:

```javascript
Reveal.initialize({
    controls: true,
    controlsTutorial: true,
    progress: true,
    slideNumber: 'c/t',
    hash: true,
    center: true,
    touch: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    viewDistance: 3,
    mobileViewDistance: 2,
    plugins: [
        RevealMarkdown,
        RevealHighlight,
        RevealNotes,
        RevealMath.KaTeX,
        RevealSearch,
        RevealZoom,
    ],
})
```

See [`docs/reveal-config.md`](docs/reveal-config.md) for a wider tour of useful
options, or the
[full reveal.js configuration reference](https://revealjs.com/config/).

## 🤖 GitHub Workflows

This template ships with a number of GitHub Actions workflows under
[`.github/workflows/`](.github/workflows/):

- **`ci.yml`** — Test + build matrix on Node.js 18.x / 20.x
- **`publish.yml`** — Build and deploy `dist/` to GitHub Pages on push to `main`
- **`release.yml`** — Creates a GitHub Release with a
  [git-cliff](https://git-cliff.org/)-generated changelog
- **`draft-release.yml`** / **`scheduled-release.yml`** — Maintain a rolling
  draft release
- **`semantic-pr-title.yml`** — Enforces Conventional Commit-style PR titles
- **`codeql.yml`** — Static analysis with GitHub CodeQL

Dependency updates are handled by Dependabot
([`.github/dependabot.yml`](.github/dependabot.yml)) for both npm and GitHub
Actions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using a
   [Conventional Commit](https://www.conventionalcommits.org/) message
   (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request — the `semantic-pr-title` workflow will validate the
   title format

If you have [pre-commit](https://pre-commit.com/) installed, run
`pre-commit install` once and the hooks above will run automatically on every
commit.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- [reveal.js](https://revealjs.com/) - The presentation framework powering this
  template
- [Hakim El Hattab](https://github.com/hakimel) - Creator of reveal.js
- All the contributors who have helped improve this template

## 📧 Support

If you have any questions or need help:

- 📖 Check the [reveal.js documentation](https://revealjs.com/)
- 🐛
  [Report issues](https://github.com/isaac-cf-wong/presentation-template/issues)
- 💬
  [Start a discussion](https://github.com/isaac-cf-wong/presentation-template/discussions)

---

⭐ **If you found this template helpful, please give it a star!** ⭐
