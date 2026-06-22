import { describe, it, expect } from "vitest";
import { siteFooter } from "./SiteFooter";
import { AUTHOR_URL } from "../../lib/config";

describe("siteFooter", () => {
  it("renders the credit inside a footer (contentinfo) landmark", () => {
    const html = siteFooter();
    expect(html).toMatch(/^<footer/);
    expect(html).toContain("Who even built this thing?");
  });

  it("links to the author's site, opening a new tab safely and indicating it", () => {
    const html = siteFooter();
    expect(html).toContain(`href="${AUTHOR_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain("noopener");
    expect(html).toContain("(opens in a new tab)");
  });

  it("keeps the link editorial and followed for SEO (no nofollow)", () => {
    const html = siteFooter();
    expect(html).not.toContain("nofollow");
    expect(html).toMatch(/rel="[^"]*author[^"]*"/);
  });
});
