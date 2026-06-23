# a11y.quest

[![CI](https://github.com/thedavedavies/a11y.quest/actions/workflows/ci.yml/badge.svg)](https://github.com/thedavedavies/a11y.quest/actions/workflows/ci.yml)

An endless web-accessibility drill. Answer a question, see whether you were right with a
plain-English explanation and links to the source docs, then keep going. Your run (answered,
correct, accuracy, current streak, best streak) is saved locally. No login, no backend.

Live at **https://a11y.quest**.

## What it tests

Technical web accessibility: WCAG 2.2 success criteria, WAI-ARIA, semantic HTML, keyboard
and focus, screen readers and assistive tech, colour contrast, and name/role/value. It is
aimed at the technical accessibility crowd, whether you are learning, brushing up, or
prepping for a certification.

## Accessibility is the point

This is an accessibility tool, so it holds itself to its own subject. Every decision is
constrained by WCAG 2.2 AA: semantic HTML first, full keyboard operability, a visible focus
state, a skip link, state never conveyed by colour alone, reduced-motion fallbacks, and answer
feedback announced through polite live regions. If something cannot meet AA, it does not ship.

## Features

- An endless loop of multiple-choice questions, served in a fresh random order with no
  repeats until the whole bank has been seen.
- Instant feedback with a plain-English explanation and links to the authoritative docs.
- A persistent run score: answered, correct, accuracy, current streak, and best streak.
- A warm light theme and a clean dark theme that follow your system preference and remember
  your choice.
- A shareable score card (with a server-rendered social image) and a report-a-problem flow
  that prefills a GitHub issue.

## Tech stack

- [Astro](https://astro.build) with TypeScript, no UI framework: components render to HTML strings.
- Plain CSS with design tokens driven by the CSS `light-dark()` function.
- [Cloudflare Pages](https://pages.cloudflare.com) for hosting, with Pages Functions for the
  share-card OG image and per-share meta tags.
- Vitest (with axe-core) and Playwright for testing.

## Getting started

You need Node 20 or newer.

```bash
npm install
npm run dev        # local dev server
```

Other scripts:

```bash
npm run build         # production build
npm run preview       # preview the production build
npm run check         # astro + TypeScript checks
npm run lint          # eslint, including accessibility rules
npm run test          # unit and integration tests, incl. axe-core checks
npm run test:browser  # Playwright accessibility pass in a real browser
```

## Contributing

Contributions are welcome, especially new questions. See [CONTRIBUTING.md](CONTRIBUTING.md)
for the question format, the accessibility bar every change must meet, and the dev workflow.
Spotted a wrong or unclear question? Use the in-app "report a problem" flag, or open an issue.

## License

[MIT](LICENSE) (c) Dave Davies
