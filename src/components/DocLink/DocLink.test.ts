import { describe, it, expect } from "vitest";
import { docLink } from "./DocLink";

describe("docLink", () => {
  const ref = { label: "WCAG 4.1.2 Name, Role, Value", url: "https://example.com/x?a=1&b=2" };

  it("opens in a new tab with a visible indicator and safe rel", () => {
    const html = docLink(ref);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("(opens in a new tab)");
  });

  it("uses descriptive link text and escapes the url and label", () => {
    const html = docLink(ref);
    expect(html).toContain("WCAG 4.1.2 Name, Role, Value");
    expect(html).toContain("a=1&amp;b=2");
  });
});
