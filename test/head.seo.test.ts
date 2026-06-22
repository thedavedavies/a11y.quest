import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AUTHOR_NAME, AUTHOR_URL } from "../src/lib/config";

const dist = resolve(process.cwd(), "dist");
const doc = new DOMParser().parseFromString(
  readFileSync(resolve(dist, "index.html"), "utf8"),
  "text/html",
);

const ORIGIN = "https://a11y.quest";

const content = (selector: string): string | null =>
  doc.querySelector(selector)?.getAttribute("content") ?? null;

describe("document head: icons", () => {
  it("links an SVG favicon, an .ico fallback, and an apple-touch icon", () => {
    expect(doc.querySelector('link[rel="icon"][type="image/svg+xml"]')?.getAttribute("href")).toBe(
      "/favicon.svg",
    );
    expect(doc.querySelector('link[rel="icon"][href="/favicon.ico"]')?.getAttribute("sizes")).toBe(
      "any",
    );
    expect(doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute("href")).toBe(
      "/apple-touch-icon.png",
    );
  });

  it("does not link a web app manifest", () => {
    expect(doc.querySelector('link[rel="manifest"]')).toBeNull();
  });

  it("ships every referenced icon/OG asset in the build output", () => {
    for (const file of [
      "favicon.svg",
      "favicon.ico",
      "apple-touch-icon.png",
      "og-image.png",
      "robots.txt",
      "sitemap.xml",
    ]) {
      expect(existsSync(resolve(dist, file)), `missing dist/${file}`).toBe(true);
    }
  });

  it("does not ship a manifest or PWA-only icons", () => {
    for (const file of [
      "site.webmanifest",
      "icon-192.png",
      "icon-512.png",
      "icon-maskable-512.png",
    ]) {
      expect(existsSync(resolve(dist, file)), `unexpected dist/${file}`).toBe(false);
    }
  });

  it("declares a theme-colour for both light and dark", () => {
    const themeColors = doc.querySelectorAll('meta[name="theme-color"]');
    expect(themeColors.length).toBe(2);
    const media = [...themeColors].map((m) => m.getAttribute("media"));
    expect(media).toContain("(prefers-color-scheme: light)");
    expect(media).toContain("(prefers-color-scheme: dark)");
  });
});

describe("document head: canonical, robots, Open Graph and Twitter", () => {
  it("sets a canonical URL and an indexable robots policy", () => {
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${ORIGIN}/`);
    expect(content('meta[name="robots"]')).toContain("index");
  });

  it("exposes a complete Open Graph card with an absolute image URL", () => {
    expect(content('meta[property="og:type"]')).toBe("website");
    expect(content('meta[property="og:title"]')).toBeTruthy();
    expect(content('meta[property="og:description"]')).toBeTruthy();
    expect(content('meta[property="og:url"]')).toBe(`${ORIGIN}/`);
    expect(content('meta[property="og:image"]')).toBe(`${ORIGIN}/og-image.png`);
    expect(content('meta[property="og:image:width"]')).toBe("1200");
    expect(content('meta[property="og:image:height"]')).toBe("630");
    expect(content('meta[property="og:image:alt"]')).toBeTruthy();
  });

  it("exposes a large-image Twitter card", () => {
    expect(content('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(content('meta[name="twitter:image"]')).toBe(`${ORIGIN}/og-image.png`);
    expect(content('meta[name="twitter:image:alt"]')).toBeTruthy();
  });
});

describe("document head: JSON-LD structured data", () => {
  const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];

  it("embeds exactly one valid JSON-LD block", () => {
    expect(scripts).toHaveLength(1);
    expect(() => JSON.parse(scripts[0].textContent ?? "")).not.toThrow();
  });

  it("describes a free educational quiz: WebSite + WebApplication/LearningResource", () => {
    const data = JSON.parse(scripts[0].textContent ?? "");
    expect(data["@context"]).toBe("https://schema.org");
    const graph: Array<Record<string, unknown>> = data["@graph"];

    const website = graph.find((n) => n["@type"] === "WebSite");
    expect(website).toBeDefined();
    expect(website?.url).toBe(`${ORIGIN}/`);
    expect(website?.isAccessibleForFree).toBe(true);

    const app = graph.find((n) => {
      const t = n["@type"];
      return Array.isArray(t) && t.includes("WebApplication") && t.includes("LearningResource");
    });
    expect(app).toBeDefined();
    expect(app?.isAccessibleForFree).toBe(true);
    expect(app?.applicationCategory).toBe("EducationalApplication");
    expect((app?.offers as { price?: string })?.price).toBe("0");
    expect(Array.isArray(app?.teaches)).toBe(true);
    expect((app?.teaches as string[]).length).toBeGreaterThan(0);
  });

  it("names the author as a Person entity that the site and app reference", () => {
    const data = JSON.parse(scripts[0].textContent ?? "");
    const graph: Array<Record<string, unknown>> = data["@graph"];

    const person = graph.find((n) => n["@type"] === "Person");
    expect(person).toBeDefined();
    expect(person?.name).toBe(AUTHOR_NAME);
    expect(person?.url).toBe(AUTHOR_URL);

    const personId = person?.["@id"];
    const website = graph.find((n) => n["@type"] === "WebSite");
    const app = graph.find(
      (n) => Array.isArray(n["@type"]) && n["@type"].includes("WebApplication"),
    );
    expect((website?.author as { "@id"?: string })?.["@id"]).toBe(personId);
    expect((app?.author as { "@id"?: string })?.["@id"]).toBe(personId);
  });
});
