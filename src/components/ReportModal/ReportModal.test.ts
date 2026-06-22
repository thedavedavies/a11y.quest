import axe from "axe-core";
import { describe, it, expect, beforeEach } from "vitest";
import { reportModal } from "./ReportModal";

const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

describe("reportModal markup", () => {
  const html = reportModal();

  it("is a native <dialog> with a plain heading and no ARIA on the dialog", () => {
    expect(html).toContain("<dialog");
    expect(html).toMatch(/<h2[^>]*>Something not right\?<\/h2>/);
    expect(html).not.toContain('role="dialog"');
    expect(html).not.toContain("aria-modal");
    expect(html).not.toContain("aria-labelledby");
    expect(html).not.toContain("aria-describedby");
  });

  it("puts initial focus on the heading (tabindex=-1 + autofocus)", () => {
    expect(html).toMatch(/<h2[^>]*tabindex="-1"[^>]*autofocus/);
    expect(html).not.toMatch(/<textarea[^>]*autofocus/);
  });

  it("has a labelled, keyboard-operable close control", () => {
    expect(html).toMatch(
      /<button[^>]*data-report-close[^>]*aria-label="Close and return to the quiz"/,
    );
  });

  it("opens GitHub in a new tab safely, indicating the new tab to assistive tech", () => {
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("opens in a new tab");
  });
});

describe("reportModal accessibility (axe-core, WCAG 2.2 AA)", () => {
  beforeEach(() => {
    document.body.innerHTML = reportModal();
  });

  it("has no violations when open", async () => {
    const dialog = document.querySelector<HTMLDialogElement>("[data-report-modal]")!;
    dialog.setAttribute("open", "");
    dialog.style.display = "block";

    const results = await axe.run(dialog, {
      runOnly: { type: "tag", values: WCAG_AA_TAGS },
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
  });
});
