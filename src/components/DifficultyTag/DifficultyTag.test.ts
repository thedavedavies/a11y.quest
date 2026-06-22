import { describe, it, expect } from "vitest";
import { difficultyTag } from "./DifficultyTag";

describe("difficultyTag", () => {
  it("shows the level label", () => {
    expect(difficultyTag("easy")).toContain("Easy");
    expect(difficultyTag("medium")).toContain("Medium");
    expect(difficultyTag("hard")).toContain("Hard");
  });

  it("prefixes the label for screen readers", () => {
    expect(difficultyTag("medium")).toContain("Difficulty: ");
  });

  it("fills one dot for easy, two for medium, three for hard", () => {
    expect(difficultyTag("easy")).toContain('data-filled="1"');
    expect(difficultyTag("medium")).toContain('data-filled="2"');
    expect(difficultyTag("hard")).toContain('data-filled="3"');
  });
});
