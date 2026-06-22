import { describe, it, expect } from "vitest";
import { themeToggle } from "./ThemeToggle";

describe("themeToggle", () => {
  it("is a switch that takes its accessible name from visible text (no aria-label)", () => {
    const html = themeToggle();
    expect(html).toContain('type="button"');
    expect(html).toContain('role="switch"');
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain("data-theme-toggle");
    expect(html).not.toContain("aria-label");
  });

  it("names the button via its visible tooltip text", () => {
    const html = themeToggle();
    expect(html).toContain("data-tooltip-text");
    expect((html.match(/Switch to dark mode/g) || []).length).toBe(1);
  });

  it("keeps the track graphic out of the accessible name", () => {
    expect(themeToggle()).toMatch(/class="[^"]*track[^"]*"\s+aria-hidden="true"/);
  });

  it("includes both day and night glyphs", () => {
    expect((themeToggle().match(/<svg/g) || []).length).toBe(2);
  });
});
