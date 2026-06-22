# a11y.quest - Claude Code project guide

## What this is

a11y.quest is a standalone, endless web-accessibility drill. The user lands directly on a
question, picks one of four answers, sees whether they were right with a plain-English
explanation and links to the source docs, then keeps going. A running score (answered,
correct, accuracy, current streak, best streak) persists in localStorage. No login, no
backend.

It is an open-source, standalone product with its own brand. Keep it self-contained and
easy for anyone to run or contribute to: no personal branding baked into the layout, a
light dependency footprint, and no hard dependencies on private services.

- Subject tested: technical web accessibility (WCAG success criteria, WAI-ARIA, semantic
  HTML, keyboard and focus, screen readers and assistive tech, colour contrast,
  name/role/value).
- Audience: the technical accessibility crowd (learning, brushing up, or prepping for a cert).
- UI copy voice: playful, encouraging, plain English. No em dashes in copy (use commas,
  colons, parentheses, or separate sentences).

## The prime directive

This is an accessibility tool, so it must be exemplary at its own subject. Every decision
is constrained by WCAG 2.2 AA. If something cannot meet AA, it does not ship, however good
it looks. Shipping an accessibility bug here is the worst possible failure.

Concrete requirements, everywhere:

- WCAG 2.2 AA. Verify, do not assume.
- Semantic HTML first. Reach for ARIA only when no native element fits, and follow the
  ARIA Authoring Practices (https://www.w3.org/WAI/ARIA/apg/).
- Full keyboard operability, logical tab order, and a visible focus state on every
  interactive element. Use --focus-ring; never `outline: none` without a stronger replacement.
- A skip link that targets the main quiz region.
- Never convey state (selected, correct, incorrect, focused) by colour alone. Pair colour
  with text, icon, or shape.
- Touch targets at least 44x44px.
- Respect `prefers-reduced-motion`: provide calm or instant fallbacks for all animation,
  including the theme toggle.
- Announce answer feedback and score changes to assistive tech via polite live regions.
- Doc/external links: descriptive link text (never "click here"), in the focus order, and
  indicate a new tab. A clear external-link icon counts as the visible cue on its own (no
  visible "new tab" text is required); also add a screen-reader-only "(opens in a new tab)"
  so assistive tech is told.
- Modals (report a problem, how it works): on open, move initial focus to the heading (or
  the first field), never the close button; the reading order then runs heading, intro, then
  the controls. Trap focus while open; return focus to the trigger on close; close on Escape.
  Give every control inside an accessible name.

## Colour discipline

Use the semantic tokens in `src/styles/tokens.css` only. Do not hardcode hex values in
components, and do not invent new foreground/background pairs without checking contrast first.

These specific pairings FAIL AA and must never be reintroduced (light theme):

- coral, teal, or amber as TEXT on cream/paper (use coral-deep, teal-deep, or plum instead).
- white/paper text on coral, amber, or teal fills (those bright fills take dark/ink text).
- ink (dark) text on plum or coral-deep fills (those dark fills take light/paper text).
- coral as a border or focus ring on cream (use plum).

Dark theme: use `--d-line` for real borders.

## Theme and toggle

Light/warm is the primary identity; dark is a clean dark theme.
Tokens use the CSS `light-dark()` function driven by `color-scheme`, so the default follows
the system preference. The toggle sets `data-theme="light"` or `data-theme="dark"` on the
`<html>` element and stores the choice in localStorage; absence of the attribute means
"follow system".

The toggle is graphical and playful (a day/night slider), but implemented as a real control:
`role="switch"` with `aria-checked`, an accessible name reflecting the action ("Switch to
dark mode" / "Switch to light mode"), keyboard operable (Enter and Space), a 44px target, a
visible focus state, and the meaningful graphic parts (sun, moon, track edge) at 3:1 or
better against their background in both states. Reduced-motion gets an instant swap.

## Question data shape

Questions live in `src/data/questions.ts` (typed) and are authored separately.

```ts
export interface DocRef {
  label: string;
  url: string;
}
export interface Question {
  id: string; // stable unique id, e.g. "name-role-value-001"
  topic: string; // e.g. "semantic-html", "aria", "contrast"
  difficulty: "easy" | "medium" | "hard";
  question: string; // may be long
  options: [string, string, string, string]; // exactly 4
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string; // plain-English why
  refs: DocRef[]; // one or more source links
}
```

Components must flex to long or short question and option text.

## Structure (suggested)

- `src/pages/index.astro` - the quiz page and entry point.
- `src/components/Quiz.*` - the client island: renders a question, handles select and check,
  shows feedback, advances. Owns the run state.
- `src/components/` - `ScorePanel`, `OptionCard`, `DifficultyTag`, `ThemeToggle`,
  `ReportModal`, `HowItWorksModal`, `SkipLink`.
- `src/lib/store.ts` - localStorage read/write for the run (answered, correct, streak, best)
  and the theme choice.
- `src/data/questions.ts` - the question bank.
- `src/styles/tokens.css` - design tokens (provided).

## Code style

- Comments earn their place. Add one only when it is vital to understanding the code: a
  non-obvious "why", a gotcha, or a spec/standard being satisfied. Do not narrate what the
  code already says, and delete comments the moment they go stale.

## Do not

- Do not add a landing page; the quiz is the entry point.
- Do not add login, accounts, or a backend.
- Do not use any browser storage beyond localStorage (score and theme only).
- Do not hardcode colours; use semantic tokens.

## Commands

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run preview` - preview the build
- `npm run lint` - eslint with accessibility rules
- `npm run test` - tests, including axe-core checks on rendered output

## Commits

Follow Conventional Commits: `type(scope): summary`.

- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
- Scope is optional and names an area: quiz, share, report, theme, questions, components,
  lib, styles, a11y.
- Summary is imperative and lowercase, no trailing period (e.g. `feat(share): add edge OG image`).
- Keep each commit to one logical concern (a feature or a component group), not one per file.

## Accessibility guardrails (set up early)

- ESLint with accessibility rules: `eslint-plugin-astro` (a11y rules for .astro) plus
  `eslint-plugin-jsx-a11y` if any JSX islands are used.
- axe-core assertions in component or integration tests; fail CI on violations.
- A manual keyboard pass and a screen-reader smoke test before merging any UI change.
