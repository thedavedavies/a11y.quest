import { describe, it, expect } from "vitest";
import { topicTag, humanize } from "./TopicTag";

describe("topicTag", () => {
  it("humanizes known slugs", () => {
    expect(humanize("semantic-html")).toBe("Semantic HTML");
    expect(humanize("aria")).toBe("ARIA");
  });

  it("preserves acronyms and standards names", () => {
    expect(humanize("vpat")).toBe("VPAT");
    expect(humanize("atag")).toBe("ATAG");
    expect(humanize("sdlc")).toBe("SDLC");
    expect(humanize("wcag2ict")).toBe("WCAG2ICT");
    expect(humanize("en-301-549")).toBe("EN 301 549");
  });

  it("sentence-cases unknown slugs", () => {
    expect(humanize("focus-order")).toBe("Focus order");
    expect(humanize("target-size")).toBe("Target size");
  });

  it("uses explicit labels for internal punctuation", () => {
    expect(humanize("pause-stop-hide")).toBe("Pause, stop, hide");
  });

  it("prefixes the label for screen readers and includes an icon", () => {
    const html = topicTag("contrast");
    expect(html).toContain("Topic: ");
    expect(html).toContain("Colour contrast");
    expect(html).toContain("<svg");
  });

  it("escapes the topic label", () => {
    expect(topicTag("<x>")).toContain("&lt;x&gt;");
  });
});
