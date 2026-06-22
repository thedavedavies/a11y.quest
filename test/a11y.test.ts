import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import axe from "axe-core";
import { beforeEach, describe, expect, it } from "vitest";
import { questions } from "../src/data/questions";
import { questionCard, type CardState } from "../src/components/QuestionCard/QuestionCard";

const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const EXTRA_RULES = ["heading-order"];

const builtHtml = readFileSync(resolve(process.cwd(), "dist/index.html"), "utf8");

function mountBuiltPage(): void {
  const parsed = new DOMParser().parseFromString(builtHtml, "text/html");
  document.documentElement.lang = parsed.documentElement.getAttribute("lang") ?? "en";
  document.title = parsed.title;
  document.body.innerHTML = parsed.body.innerHTML;
}

function renderCard(q: (typeof questions)[number], state: CardState): void {
  const stage = document.querySelector<HTMLElement>("[data-stage]");
  if (!stage) throw new Error("stage not present in built HTML");
  stage.innerHTML = questionCard(q, state);
}

async function audit(): Promise<{ violations: string[]; incomplete: string[] }> {
  const ids = (list: axe.Result[]): string[] => list.map((r) => `${r.id} (${r.nodes.length})`);
  const wcag = await axe.run(document, {
    runOnly: { type: "tag", values: WCAG_AA_TAGS },
    rules: { "color-contrast": { enabled: false } },
  });
  const extra = await axe.run(document, { runOnly: { type: "rule", values: EXTRA_RULES } });
  return {
    violations: [...ids(wcag.violations), ...ids(extra.violations)],
    incomplete: [...ids(wcag.incomplete), ...ids(extra.incomplete)],
  };
}

async function expectClean(): Promise<void> {
  const { violations, incomplete } = await audit();
  expect(violations).toEqual([]);
  expect(incomplete).toEqual([]);
}

describe("quiz accessibility (axe-core, WCAG 2.2 AA)", () => {
  beforeEach(() => {
    mountBuiltPage();
  });

  it("ships the quiz as the page, with a question, options, score, and skip link", () => {
    const card = document.querySelector<HTMLElement>("[data-card]");
    expect(card?.dataset.questionId).toBe(questions[0].id);
    expect(document.querySelectorAll('input[type="radio"][name="answer"]')).toHaveLength(4);
    expect(document.querySelector("main#main [data-stage]")).not.toBeNull();
    expect(document.querySelector('[data-stat="bestStreak"]')).not.toBeNull();
    expect(document.querySelector('a[href="#main"]')).not.toBeNull();
  });

  it("ships the per-question report flag and the report dialog", () => {
    expect(document.querySelector('[data-action="flag"]')).not.toBeNull();
    const dialog = document.querySelector("dialog[data-report-modal]");
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute("role")).toBeNull();
    expect(dialog?.hasAttribute("aria-modal")).toBe(false);
    const heading = dialog?.querySelector<HTMLElement>("h2");
    expect(heading?.textContent).toContain("Something not right?");
    expect(heading?.getAttribute("tabindex")).toBe("-1");
    expect(heading?.hasAttribute("autofocus")).toBe(true);
    expect(dialog?.querySelector("textarea#report-note")?.hasAttribute("autofocus")).toBe(false);
    const link = dialog?.querySelector<HTMLAnchorElement>("[data-report-link]");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link?.textContent).toContain("opens in a new tab");
  });

  it("has no violations in the initial, unanswered state", async () => {
    await expectClean();
  });

  it("has no violations after a correct answer is checked", async () => {
    const q = questions[0];
    renderCard(q, { answered: true, chosenIndex: q.correctIndex, questionNumber: 1, currentStreak: 1 });
    await expectClean();
  });

  it("has no violations after an incorrect answer is checked", async () => {
    const q = questions[0];
    const wrong = q.correctIndex === 0 ? 1 : 0;
    renderCard(q, { answered: true, chosenIndex: wrong, questionNumber: 1, currentStreak: 0 });
    await expectClean();
  });

  it("has no violations on a hard-difficulty question", async () => {
    const hardQ = questions.find((q) => q.difficulty === "hard") ?? questions[0];
    renderCard(hardQ, { answered: false, chosenIndex: null, questionNumber: 1, currentStreak: 0 });
    await expectClean();
  });

  it("has no violations at a high question number", async () => {
    const q = questions[2] ?? questions[0];
    renderCard(q, { answered: false, chosenIndex: null, questionNumber: 42, currentStreak: 5 });
    await expectClean();
  });

  it("has no violations in an answered state with multiple doc links", async () => {
    const q = questions.find((q) => q.refs.length > 1) ?? questions[0];
    renderCard(q, { answered: true, chosenIndex: q.correctIndex, questionNumber: 100, currentStreak: 50 });
    await expectClean();
  });
});
