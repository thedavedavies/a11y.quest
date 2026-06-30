import axe from "axe-core";
import { describe, it, expect, beforeEach } from "vitest";
import { aboutModal } from "./AboutModal";
import { AUTHOR_URL } from "../../lib/config";

const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

describe("aboutModal markup", () => {
  const html = aboutModal();

  it("is a native <dialog> with a plain heading and no ARIA on the dialog", () => {
    expect(html).toContain("<dialog");
    expect(html).toMatch(/<h2[^>]*>Why this quiz exists<\/h2>/);
    expect(html).not.toContain('role="dialog"');
    expect(html).not.toContain("aria-modal");
    expect(html).not.toContain("aria-labelledby");
    expect(html).not.toContain("aria-describedby");
  });

  it("puts initial focus on the heading (tabindex=-1 + autofocus)", () => {
    expect(html).toMatch(/<h2[^>]*tabindex="-1"[^>]*autofocus/);
  });

  it("has a labelled, keyboard-operable close control", () => {
    expect(html).toMatch(
      /<button[^>]*data-about-close[^>]*aria-label="Close and return to the quiz"/,
    );
  });

  it("links to the author's site, opening a new tab safely and indicating it", () => {
    expect(html).toContain(`href="${AUTHOR_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain("noopener");
    expect(html).toContain("opens in a new tab");
  });
});

describe("aboutModal accessibility (axe-core, WCAG 2.2 AA)", () => {
  beforeEach(() => {
    document.body.innerHTML = aboutModal();
  });

  it("has no violations when open", async () => {
    const dialog = document.querySelector<HTMLDialogElement>("[data-about-modal]")!;
    dialog.setAttribute("open", "");
    dialog.style.display = "block";

    const results = await axe.run(dialog, {
      runOnly: { type: "tag", values: WCAG_AA_TAGS },
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
  });
});
