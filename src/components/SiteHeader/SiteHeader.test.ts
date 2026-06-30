import { describe, it, expect } from "vitest";
import { siteHeader } from "./SiteHeader";

describe("siteHeader", () => {
  it("renders the wordmark as the page h1 with the tagline", () => {
    const html = siteHeader();
    expect(html).toMatch(/<h1[^>]*>a11y.*quest<\/h1>/s);
    expect(html).toContain("128 questions to level up your accessibility game.");
  });

  it("does not use the mascot name or personal branding", () => {
    const html = siteHeader();
    expect(html).not.toContain("Ally");
    expect(html.toLowerCase()).not.toContain("dave");
  });

  it("shows the brand logo as a decorative image (the h1 carries the name)", () => {
    const html = siteHeader();
    expect(html).toMatch(/<img[^>]*src="\/favicon\.svg"[^>]*>/);
    expect(html).toMatch(/<img[^>]*alt=""[^>]*>/);
  });

  it("includes the theme toggle switch", () => {
    expect(siteHeader()).toContain("data-theme-toggle");
    expect(siteHeader()).toContain('role="switch"');
  });

  it("offers an About this quiz trigger without leaking personal branding", () => {
    const html = siteHeader();
    expect(html).toMatch(/<button[^>]*data-about-open[^>]*>/);
    expect(html).toContain("About this quiz");
    expect(html.toLowerCase()).not.toContain("dave");
  });

  it("contains the skip link so it is inside the banner landmark", () => {
    const html = siteHeader();
    expect(html).toContain('href="#main"');
    expect(html.indexOf('href="#main"')).toBeLessThan(html.indexOf("a11y"));
  });
});
