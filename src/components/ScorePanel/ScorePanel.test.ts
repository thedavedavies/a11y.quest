import { describe, it, expect } from "vitest";
import { scorePanel } from "./ScorePanel";

describe("scorePanel", () => {
  it("is a labelled region with a heading and a reset control", () => {
    const html = scorePanel();
    expect(html).toContain('aria-labelledby="score-heading"');
    expect(html).toContain('id="score-heading"');
    expect(html).toContain("Your run");
    expect(html).toContain('data-action="reset"');
  });

  it("includes the three stats and the streak block", () => {
    const html = scorePanel();
    for (const stat of ["answered", "correct", "accuracy", "currentStreak", "bestStreak"]) {
      expect(html).toContain(`data-stat="${stat}"`);
    }
  });
});
