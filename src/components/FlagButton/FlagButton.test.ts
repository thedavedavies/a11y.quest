import { describe, it, expect } from "vitest";
import { flagButton } from "./FlagButton";

describe("flagButton", () => {
  it("renders a type=button carrying the flag action", () => {
    const html = flagButton();
    expect(html).toContain('type="button"');
    expect(html).toContain('data-action="flag"');
  });

  it("pairs the icon with visible text (never icon alone)", () => {
    const html = flagButton();
    expect(html).toContain("Something not right with this question?");
    expect(html).toContain("<svg");
    expect(html).toContain('aria-hidden="true"');
  });
});
