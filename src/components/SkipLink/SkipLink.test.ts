import { describe, it, expect } from "vitest";
import { skipLink } from "./SkipLink";

describe("skipLink", () => {
  it("targets the main region with descriptive text", () => {
    const html = skipLink();
    expect(html).toContain('href="#main"');
    expect(html).toContain("Skip to the quiz");
  });
});
