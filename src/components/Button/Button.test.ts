import { describe, it, expect } from "vitest";
import { button } from "./Button";

describe("button", () => {
  it("renders a type=button with the label and data-action", () => {
    const html = button({ label: "Check answer", action: "check" });
    expect(html).toContain('type="button"');
    expect(html).toContain('data-action="check"');
    expect(html).toContain("Check answer");
  });

  it("includes a decorative trailing icon when given", () => {
    const html = button({ label: "Next question", action: "next", trailingIcon: "arrow-right" });
    expect(html).toContain("<svg");
    expect(html).toContain('aria-hidden="true"');
  });

  it("escapes the label", () => {
    expect(button({ label: "<x>", action: "a" })).toContain("&lt;x&gt;");
  });
});
