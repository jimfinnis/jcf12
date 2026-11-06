# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jim Finnis's personal/university website (published at `https://users.aber.ac.uk/jcf12/`). It's a static Hugo site built on the **Source Themes Academic** theme (now "Wowchemy"), vendored into the repo at `themes/academic` (a frozen April 2020 copy; it used to be a submodule). There is no test suite or linter. Build success plus a look at the rendered page is the check.

## Commands

- Needs **Hugo extended**.
- Build: `hugo` (output goes to `public/`, which is gitignored along with `resources/`)
- Local preview: `./view.sh` (`hugo server --baseURL http://127.0.0.1/`) serves on port 1313. `viewext.sh` and `runOnVM` bind to an external/VM interface.
- New content: `hugo new --kind post blog/<name>`, or create a directory under `content/<section>/` by hand.
- Deploy to production: `./deploy` (builds, rsyncs `public/` to `jcf12@central.aber.ac.uk:public_html/`, then runs `fixwebperms`). `./deployToTest` deploys to `test.pale.org`. These publish the site, so don't run them unless asked.

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

The theme is from 2020, but the site is built with a much newer Hugo (0.154). When a theme template breaks, prefer copying it into the matching path under top-level `layouts/` and fixing the copy, so local changes stay separate from the original theme. Overrides already in place for this reason: `partials/marketing/google_analytics.html`, `publication/single.html`, `authors/list.html`, `index.json`, `partials/widgets/people.html`, `partials/site_head.html`.

- `.Path` is now a logical path (`/authors/foo`), not a file path, so the old `path.Base (path.Split .Path).Dir` idiom now returns the parent section. Use `path.Base .Path`.
- Relative `ref`/`relref` from a leaf bundle's `index.md` resolve from the **parent section**, not the bundle directory. From `examples/refs/index.md`, link a sibling as `relref "refs2/"`, not `"../refs2/"`.
- Shortcodes used with a closing tag must evaluate `.Inner`, and every paired shortcode (e.g. `question`) must be explicitly closed.

## Examly (`static/examly/`)

A standalone two-page webapp copied verbatim from its own project. It lives in `static/` rather than `content/` because Hugo would otherwise wrap `index.html` in the theme layout and not publish `edit.html`. The notes below came from that project's own CLAUDE.md; paths are relative to `static/examly/`.

### What it is

Examly is a no-build browser app for marking exam scripts. The marking screen renders a list of
questions (each with lettered sub-questions) on an HTML5 `<canvas>`, and lets a marker navigate
between them and enter marks entirely from the keyboard, deliberately kept free of UI chrome. A
second page lets you edit the marking scheme itself (which questions/sub-questions exist and how
many marks each is worth); the scheme is persisted in `localStorage` so both pages see the same
data without a backend.

The whole app is plain vanilla JS/HTML — no framework, no modules, no build step:

- `index.html` / `script.js` — the marking screen: an 800x800 `<canvas id="canv">`, all state,
  drawing, and keyboard input handling. The only non-canvas UI is a small "edit marking scheme"
  link to `edit.html`.
- `edit.html` / `edit.js` — the marking-scheme editor: a plain form-based DOM UI (add/remove
  questions and sub-questions, edit question numbers/letters/marks available) that reads and
  writes the scheme via `scheme.js`. `subqMarks(sq)`/`questionMarks(q)` compute a sub-question's
  and a question's total marks (a sub-question with parts is worth the sum of its parts, ignoring
  its own stale `marks` field) and back both the disabled per-sub-question marks field and each
  question's `.qtotal` display. Most edits (add/remove question, sub-question, or part) just
  mutate `scheme` and call `render()` to rebuild the whole form from scratch; editing a marks value
  in place is the one exception — it updates the affected total(s) directly via closured element
  references instead of a full re-render, so a mark edit doesn't disturb whatever else is being
  edited or reset scroll position. "save to file"/"load from file" export/import the in-memory
  `scheme` as a downloaded/uploaded JSON file (via a `Blob`+`URL.createObjectURL` download and a
  hidden `#fileInput`), independent of `localStorage`, for moving a scheme to another machine;
  importing replaces `scheme` and re-renders but does **not** call `saveScheme()` itself, so (like
  every other edit) it only persists once "save" is clicked.
- `scheme.js` — shared by both pages. Owns the `localStorage` key (`examly.scheme`), the
  `DEFAULT_SCHEME` fallback, and `loadScheme()`/`saveScheme()`. The stored format is a plain JSON
  array of `{qnum, subqs: [{letter, marks, parts}]}`, where `parts` is optional — when present
  (and non-empty) it's `[{numeral, marks}]` and the sub-question's own `marks` is ignored in favour
  of the sum of its parts (e.g. `4 a (i)`/`4 a (ii)`, for sub-questions with a roman-numeral
  sublevel). The marking screen wraps this into `Question`/`SubQuestion`/`Part` instances on load;
  the editor operates on the plain objects directly and only calls `saveScheme()` when the marker
  clicks "save".

Marks entered on the marking screen (`marksGiven`) are session-only and are *not* persisted —
only the scheme (the questions/sub-questions/marks-available structure) survives a reload, via
`localStorage`. Editing the scheme and returning to the marking screen resets all marks to 0.

Note: `<canvas>` is not a void element — always write `<canvas ...></canvas>` (or wrap sibling
markup separately), never a self-closing `<canvas ... />`. HTML parsers ignore the trailing `/`
and treat anything that follows as fallback content *inside* the canvas, which is not rendered
while canvas is supported (this caused the original "edit marking scheme" link to be invisible).

### Running it

There is no build/test/lint tooling. Just open `index.html` in a browser (or serve the directory
with any static file server), e.g.:

```shell
python3 -m http.server -d static/examly
```

### Architecture

- `drawBox(ctx,x,y,width,label,given,marks,selected,qselected,labelSize)` — the one low-level
  routine that draws a markable box (label above, `given/marks` box below, coloured by
  selected/qselected). Both a leaf sub-question and an individual part are drawn by calling this
  once; nothing else draws a box, so box appearance only needs to change in one place.
- `Part` — one roman-numeral sublevel of a sub-question (`numeral`, `marks` available,
  `marksGiven`), e.g. the `(i)` in `4 a (i)`.
- `SubQuestion` — one lettered part of a question. Either a leaf (`marks`/`marksGiven` directly)
  or, if it has a `parts` array, a container whose `totalMarks()`/`totalGiven()` sum its `Part`s —
  `hasParts()` tells you which. A leaf draws as a single `drawBox` labelled with its letter; a
  sub-question with parts draws *one box per part* instead (each labelled `letter(numeral)`, e.g.
  `b(i)`), always — not just when selected — so parts read as first-class boxes in place of the
  sub-question's own box, not as an expanding detail view. `width()` reports how much horizontal
  space that takes (one `SUBQWIDTH`-wide box for a leaf, `parts.length` `PARTWIDTH`-wide boxes for
  a container), which `Question.draw` uses to lay out sub-questions at their actual width instead
  of a fixed column.
- `Question` — a numbered question holding an array of `SubQuestion`s plus `selSQ` (index of the
  currently selected sub-question within it). Draws its row at a fixed `ROW_HEIGHT`, delegating to
  each `SubQuestion.draw` and showing a running total for the question; the total's x position is
  pushed right of wherever the last sub-question's boxes actually ended (`Math.max(700, x+40)`) so
  a wide multi-part sub-question can't run it over.
- `qs` — the module-level array of `Question` objects, built at load time from `loadScheme()`
  (see `scheme.js`). To mark a different exam, use the `edit.html` editor rather than editing code.
- `selQ` — module-level index of the currently selected `Question` in `qs`.
- Rendering is immediate-mode: `draw()` clears the canvas and redraws every question from current
  state on a fixed grid (each question's row is always `ROW_HEIGHT` tall) — there's no diffing or
  dirty-tracking.

#### Selection model and navigation (`handleKey`)

Selection is a path: `selQ` (which question) → `Question.selSQ` (which sub-question) →
`SubQuestion.selPart` (which part, only meaningful when `hasParts()`). All interaction goes
through a single `keydown` listener that dispatches on `event.key`:

- `ArrowUp` / `ArrowDown` — move between questions (`selQ`).
- `ArrowLeft` / `ArrowRight` — move the selected *leaf* by one, via the module-level `moveLeaf(d)`:
  if the current sub-question has parts, step through its parts first; only once you'd move past
  its first/last part does selection move to the previous/next sub-question (`Question.moveLeaf`),
  and only once that runs off the end of the sub-question list does it roll into the next question
  (wrapping at `qs.length`). This is the same forward-only-rollover, backward-wraps-in-place
  pattern recursed at each level: moving left past the start of a list wraps to its end *without*
  bubbling up a level, but moving right past the end always bubbles up and advances the parent.
- `PageUp` / `PageDown` — jump to the first/last question, first sub-question
  (`Question.selectFirstSQ`).
- A letter key (`a`-`z`) jumps directly to the sub-question at that index within the current
  question (`a` = first sub-question, `b` = second, etc.) via `Question.enterSQ`, resetting to its
  first part if it has any.
- A digit key (`0`-`9`) sets the mark on the currently selected leaf (the selected part if the
  sub-question has parts, otherwise the sub-question itself) via `SubQuestion.setMark`, which only
  applies it if it doesn't exceed that leaf's `marks`, then auto-advances via `moveLeaf(1)`.

Every keypress ends by calling `draw()` to re-render the full canvas from state.
