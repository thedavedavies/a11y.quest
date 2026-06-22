import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { sharedBanner } from "./SharedBanner";
import { initSharedBanner } from "../../lib/sharedBanner";
import type { RunState } from "../../lib/store";

const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const RUN: RunState = { answered: 10, correct: 5, currentStreak: 2, bestStreak: 3 };
const RUN_KEY = "a11yquest:run:v1";

describe("sharedBanner markup", () => {
  const html = sharedBanner(RUN);

  it("is a section named by its heading and states the shared score", () => {
    expect(html).toMatch(/<section[^>]*aria-labelledby="shared-heading"/);
    expect(html).toContain("Can you beat 50% accuracy?");
    expect(html).toContain("10 questions");
    expect(html).toContain("got 5 right");
    expect(html).toContain("best streak of 3");
  });

  it("pluralises a single answered question", () => {
    expect(sharedBanner({ answered: 1, correct: 1, currentStreak: 1, bestStreak: 1 })).toContain(
      "1 question,",
    );
  });

  it("has a labelled dismiss control and a start CTA", () => {
    expect(html).toMatch(/data-shared-dismiss[^>]*aria-label="Dismiss this challenge"/);
    expect(html).toContain("data-shared-start");
  });
});

describe("sharedBanner accessibility (axe-core, WCAG 2.2 AA)", () => {
  it("has no violations", async () => {
    document.body.innerHTML = `<main id="main">${sharedBanner(RUN)}</main>`;
    const results = await axe.run(document.querySelector<HTMLElement>("#main")!, {
      runOnly: { type: "tag", values: WCAG_AA_TAGS },
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
  });
});

describe("initSharedBanner controller", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML =
      `<main id="main" tabindex="-1"><div data-quiz><input name="answer" type="radio" /></div></main>`;
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/");
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("shows no banner without a share param", () => {
    initSharedBanner(document);
    expect(document.querySelector("[data-shared-banner]")).toBeNull();
  });

  it("renders the challenge from a valid token, above the quiz, and strips the param", () => {
    window.history.replaceState({}, "", "/?s=a10c5k2b3");
    initSharedBanner(document);

    const banner = document.querySelector("[data-shared-banner]");
    expect(banner).not.toBeNull();
    expect(document.querySelector("#shared-heading")?.textContent).toContain("50%");
    expect(document.querySelector("#main")?.firstElementChild).toBe(banner);
    expect(window.location.search).toBe("");
  });

  it("never overwrites the visitor's own stored run (display-only)", () => {
    const own = JSON.stringify({ answered: 99, correct: 80, currentStreak: 1, bestStreak: 7 });
    localStorage.setItem(RUN_KEY, own);
    window.history.replaceState({}, "", "/?s=a10c5k2b3");

    initSharedBanner(document);

    expect(localStorage.getItem(RUN_KEY)).toBe(own);
  });

  it("ignores an empty (all-zero) run and a malformed token", () => {
    window.history.replaceState({}, "", "/?s=a0c0k0b0");
    initSharedBanner(document);
    expect(document.querySelector("[data-shared-banner]")).toBeNull();

    window.history.replaceState({}, "", "/?s=not-a-token");
    initSharedBanner(document);
    expect(document.querySelector("[data-shared-banner]")).toBeNull();
  });

  it("starts a run: removes the banner and focuses the first option", () => {
    window.history.replaceState({}, "", "/?s=a10c5k2b3");
    initSharedBanner(document);

    document.querySelector<HTMLButtonElement>("[data-shared-start]")!.click();

    expect(document.querySelector("[data-shared-banner]")).toBeNull();
    expect(document.activeElement).toBe(
      document.querySelector('[data-quiz] input[name="answer"]'),
    );
  });

  it("dismisses: removes the banner and keeps focus on main", () => {
    window.history.replaceState({}, "", "/?s=a10c5k2b3");
    initSharedBanner(document);

    document.querySelector<HTMLButtonElement>("[data-shared-dismiss]")!.click();

    expect(document.querySelector("[data-shared-banner]")).toBeNull();
    expect(document.activeElement).toBe(document.querySelector("#main"));
  });
});
