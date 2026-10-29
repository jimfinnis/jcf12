# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jim Finnis's personal/university website (published at `https://users.aber.ac.uk/jcf12/`). It's a static Hugo site built on the **Source Themes Academic** theme (now "Wowchemy"), pulled in as a git submodule at `themes/academic`. There is no test suite or linter. Build success plus a look at the rendered page is the check.

## Commands

- First-time setup: `git submodule update --init --recursive` (pulls the theme). Needs **Hugo extended**.
- Build: `hugo` (output goes to `public/`, which is gitignored along with `resources/`)
- Local preview: `./view.sh` (`hugo server --baseURL http://127.0.0.1/`) serves on port 1313. `viewext.sh` and `runOnVM` bind to an external/VM interface.
- New content: `hugo new --kind post blog/<name>`, or create a directory under `content/<section>/` by hand.
- Deploy to production: `./deploy` (builds, rsyncs `public/` to `jcf12@central.aber.ac.uk:public_html/`, then runs `fixwebperms`). `./deployToTest` deploys to `test.pale.org`. These publish the site, so don't run them unless asked.
- `update_academic.sh` updates the theme submodule. The site is pinned to an old Academic version (`netlify.toml` says Hugo 0.66) and may not survive theme upgrades.

## Architecture

- **Config** lives in `config/_default/` (`config.toml`, `params.toml`, `menus.toml`, `languages.toml`). The root `config.toml` is only a Blogdown/Forestry compatibility stub. Goldmark `unsafe = true` is set, so raw HTML in Markdown is allowed and used.
- **Home page** is a set of widget sections in `content/home/*.md`. Turn each on or off with `active`, and order them by `weight`. Other widget pages use `type: "widget_page"` in `index.md` front matter. Nav links are in `config/_default/menus.toml`.
- **Theme overrides**: files in the top-level `layouts/` shadow the theme's. Key ones:
  - `layouts/partials/site_head.html` is a copied-and-modified version of the theme's head partial. It injects per-page JS from the front-matter `topscripts` array (paths resolved via `resources.Get` from `assets/`).
  - `layouts/partials/custom_js.html` injects `scripts` (raw HTML) and `localscripts` (asset paths) at the end of the page.
  - `layouts/_default/list.html` and `layouts/examples/list.html` are list templates that hide pages with `hidden: true` when `hidethings = true` in `params.toml`. They also render `blocktitle`/`blocktext` headers between items.
- **Interactive teaching content**: JS lives in `assets/js/` (`quiz.js`, `slides.js`, `montepi.js`, `rainbow.js`, …) and pairs with custom shortcodes in `layouts/shortcodes/`. For example, a quiz page sets `topscripts=["js/quiz.js"]` and then uses `{{<quiz id>}}`, `{{<choice "...">}}`, `{{<postmsggood>}}`/`{{<postmsgbad>}}`. Other shortcodes include `spoiler`, `important`, `note`, `todo`, `canvas`, `svg`, `embed` (inlines a file, e.g. `assets/toptext.md`), `slides` and `download`. A page that uses a shortcode backed by JS must load that JS through front matter.
- **Content**: `content/teaching/` holds course pages (CS120, CS123, …). `content/teaching/CS123/examples/` is a multi-page tutorial series using `type="examples"`/`"example"`, ordered by `weight`. Publications, projects and talks follow the standard Academic content types. Page bundles keep their images and PDFs next to `index.md`.
- **Static files**: `static/` is copied verbatim. It includes generated Doxygen docs (`static/docs/AberLEDdocs/`), downloads and standalone tools.
- Custom styling goes in `assets/scss/custom.scss`.

## Running a 2020 theme on modern Hugo

The theme is from 2020, but the site is built with a much newer Hugo (0.154). When a theme template breaks, copy it into the matching path under top-level `layouts/` and fix the copy. Don't edit the `themes/academic` submodule. Overrides already in place for this reason: `partials/marketing/google_analytics.html`, `publication/single.html`, `authors/list.html`, `index.json`, `partials/widgets/people.html`, `partials/site_head.html`.

- `.Path` is now a logical path (`/authors/foo`), not a file path, so the old `path.Base (path.Split .Path).Dir` idiom now returns the parent section. Use `path.Base .Path`.
- Relative `ref`/`relref` from a leaf bundle's `index.md` resolve from the **parent section**, not the bundle directory. From `examples/refs/index.md`, link a sibling as `relref "refs2/"`, not `"../refs2/"`.
- Shortcodes used with a closing tag must evaluate `.Inner`, and every paired shortcode (e.g. `question`) must be explicitly closed.
