import { describe, it, expect } from "vitest";
import { optionCard } from "./OptionCard";

describe("optionCard", () => {
  it("renders a native radio associated with its label", () => {
    const html = optionCard({
      text: "A",
      index: 2,
      answered: false,
      checked: false,
      state: "idle",
    });
    expect(html).toContain('type="radio"');
    expect(html).toContain('name="answer"');
    expect(html).toContain('value="2"');
    expect(html).toContain('id="answer-2"');
    expect(html).toContain('for="answer-2"');
    expect(html).not.toContain("disabled");
    expect(html).not.toContain("aria-describedby");
  });

  it("escapes option text that contains literal markup", () => {
    const html = optionCard({
      text: "<button>",
      index: 0,
      answered: false,
      checked: false,
      state: "idle",
    });
    expect(html).toContain("&lt;button&gt;");
    expect(html).not.toContain("<button>");
  });

  it("disables and adds a describedby status to the correct option once answered", () => {
    const html = optionCard({
      text: "A",
      index: 0,
      answered: true,
      checked: true,
      state: "correct",
    });
    expect(html).toContain("disabled");
    expect(html).toContain('aria-describedby="answer-0-status"');
    expect(html).toContain('id="answer-0-status"');
    expect(html).toContain("Correct answer");
    expect(html).toContain("<svg");
  });

  it("labels the chosen wrong option", () => {
    const html = optionCard({
      text: "A",
      index: 1,
      answered: true,
      checked: true,
      state: "incorrect",
    });
    expect(html).toContain("Your answer, incorrect");
  });
});
