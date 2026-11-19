# Zoneless Calculator

**Angular without `zone.js`.** A small calculator built to answer one question with evidence:
what does it actually take to drop the zone and keep the application correct? The answer here is
that change detection has to be triggered explicitly, and the test suite is what proves it.

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Karma](https://img.shields.io/badge/Karma-33A9E8?style=flat-square&logo=karma&logoColor=white)](https://karma-runner.github.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

---

## What it demonstrates

- **Zoneless change detection.** `provideExperimentalZonelessChangeDetection()` replaces
  `provideZoneChangeDetection()`. The zone-based line stays in the file, commented, so the
  difference is visible in one place.
- **Explicit signals.** State lives in Angular signals, so a template re-renders when the signal
  it reads changes — no monkey-patched async API is involved.
- **Tested behaviour, not just rendered output.** Five spec files cover the service, both
  components and the view: the calculator computes the right result, and the button component
  emits the right action.
- **The build runs the tests.** `ng build` is preceded by the integration suite, so a broken
  behaviour blocks the artifact instead of shipping with it.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Angular 18 with `provideExperimentalZonelessChangeDetection` |
| State | Angular signals |
| Language | TypeScript 5.5 |
| Styling | Tailwind CSS 3 |
| Tests | Karma + Jasmine, run headless in Chrome |

---

## Getting started

```console
bun install      # or: npm install
bun run start    # or: npm start
```

The dev server listens on `http://localhost:4200`.

---

## Commands

| Command | What it does |
| --- | --- |
| `bun run start` | Dev server with live reload |
| `bun run build` | Runs the integration tests, then the production build |
| `bun run watch` | Development build in watch mode |
| `bun run test` | Karma test runner in watch mode |
| `bun run test:integration` | Single headless run of the whole suite |
| `bun run test:coverage` | Single headless run with a coverage report |
| `bun run test:full` | Headless run with coverage, no progress output |

---

## Running the tests

The suite runs in a real browser, so Chrome must be available. On WSL2 or a headless Linux
box, install Chrome once and make sure the shared libraries it needs are present:

```console
# Chrome for Testing
bunx puppeteer browsers install chrome
```

If Chrome cannot start because of missing libraries:

```console
sudo apt-get update
sudo apt-get install -y fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
  libatspi2.0-0 libgbm1 libgtk-3-0 libnspr4 libnss3 libvulkan1 libxcomposite1 \
  libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils
```

---

## Project layout

```text
src/app/
├── calculator/
│   ├── components/
│   │   ├── calculator/          # the display and the operation grid
│   │   └── calculator-button/   # one button, one action
│   ├── services/
│   │   └── calculator.service.ts # the arithmetic, in signals
│   ├── views/
│   │   └── calculator-view/     # composes the two components
│   └── constants/               # key and operator tables
├── app.config.ts                # where zoneless change detection is enabled
└── app.routes.ts
```

---

## Status

Reference implementation. It exists to document the zoneless decision and to keep that decision
under test — not as a product.

---

## License

[MIT](./LICENSE)
