import { describe, it, expect } from "vitest";
import { statBlock } from "./StatBlock";

describe("statBlock", () => {
  it("renders the label and a data-stat value hook", () => {
    const html = statBlock({ label: "Answered", stat: "answered" });
    expect(html).toContain("Answered");
    expect(html).toContain('data-stat="answered"');
    expect(html).toContain(">0<");
  });

  it("supports a custom initial value", () => {
    expect(statBlock({ label: "Accuracy", stat: "accuracy", initial: "0%" })).toContain(">0%<");
  });
});
