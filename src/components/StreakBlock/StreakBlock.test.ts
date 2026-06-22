import { describe, it, expect } from "vitest";
import { streakBlock } from "./StreakBlock";

describe("streakBlock", () => {
  it("exposes current and best streak hooks", () => {
    const html = streakBlock();
    expect(html).toContain('data-stat="currentStreak"');
    expect(html).toContain('data-stat="bestStreak"');
    expect(html).toContain("streak");
    expect(html).toContain("Best streak:");
    expect(html).toContain("<svg");
  });
});
