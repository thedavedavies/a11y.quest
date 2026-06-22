# Contributing to a11y.quest

Thanks for helping make a11y.quest better. The most valuable contributions are new questions
and fixes to existing ones, but code and docs improvements are welcome too.

## Ways to contribute

- **Add questions.** The question bank is the heart of the project. See below.
- **Fix a question.** Wrong answer, unclear wording, a dead link, or outdated guidance: open
  a PR, or use the in-app "report a problem" flag, which prefills a GitHub issue.
- **Improve the app.** Bug fixes, accessibility improvements, and refinements.

## The accessibility bar

a11y.quest is an accessibility tool, so it must be exemplary at its own subject. Every change
is constrained by **WCAG 2.2 AA**. Concretely:

- Semantic HTML first; reach for ARIA only when no native element fits, following the
  [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).
- Full keyboard operability, a logical tab order, and a visible focus state on every control.
- Never convey state (selected, correct, focused) by colour alone: pair it with text, an
  icon, or a shape.
- Touch targets at least 44x44px.
- Respect `prefers-reduced-motion` with calm or instant fallbacks.
- Use the semantic colour tokens in `src/styles/tokens.css`; do not hardcode colours.

If a change cannot meet AA, it does not ship, however good it looks.

## Adding a question

Questions live in `src/data/questions.ts` and are typed. Append an entry to the `questions`
array that matches this shape:

```ts
interface Question {
  id: string; // stable unique id, e.g. "name-role-value-001"
  topic: string; // e.g. "semantic-html", "aria", "contrast"
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: [string, string, string, string]; // exactly 4
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string; // plain-English why
  refs: { label: string; url: string }[]; // one or more source links
}
```

Guidelines:

- Exactly four options, exactly one correct.
- Give a stable, unique `id` that will not be reused.
- Write the `explanation` in plain English: say why the right answer is right, and when it
  helps, why a tempting wrong one is wrong.
- Include at least one `refs` link to an authoritative source (WCAG, the WAI-ARIA APG, or MDN).
- Keep the voice encouraging, and plain. No em dashes; use commas, colons,
  parentheses, or separate sentences.

## Dev workflow

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Before opening a PR, make sure these pass:

```bash
npm run lint    # eslint, including accessibility rules
npm run check   # type checks
npm run test    # unit and integration tests, incl. axe-core
```

`npm run test:browser` runs a real-browser accessibility pass with Playwright (it checks what
jsdom cannot, such as colour contrast and focus visibility). For any UI change, also do a
manual keyboard pass and a quick screen-reader smoke test. New behaviour should come with a
test; rendered output is checked against axe-core.

## Commits and pull requests

- Follow [Conventional Commits](https://www.conventionalcommits.org): `type(scope): summary`,
  for example `feat(share): add edge OG image` or `fix(quiz): keep focus on the feedback region`.
- Keep each commit to one logical concern (a feature or a component group), not one per file.
- Keep pull requests focused, and call out the accessibility impact of any UI change.

## Code style

- Use the semantic tokens in `src/styles/tokens.css`; never hardcode hex values in components.
- Comments earn their place: a non-obvious why, a gotcha, or a spec being satisfied. Do not
  narrate what the code already says.

Thanks again. Every good question makes someone a little better at building accessible things.
