import { describe, it, expect } from "vitest";
import { feedback } from "./Feedback";
import { questions } from "../../data/questions";

const q = questions[0];

describe("feedback", () => {
  it("announces a correct result with a streak chip and no 'correct answer' line", () => {
    const html = feedback(q, q.correctIndex, 3);
    expect(html).toContain("Correct!");
    expect(html).toContain("3 in a row");
    expect(html).not.toContain("Correct answer:");
  });

  it("announces an incorrect result and names the correct answer", () => {
    const wrong = q.correctIndex === 0 ? 1 : 0;
    const html = feedback(q, wrong, 0);
    expect(html).toContain("Not quite.");
    expect(html).toContain("Correct answer:");
    expect(html).not.toContain("in a row");
  });

  it("is a labelled, focusable group with the explanation and doc links", () => {
    const html = feedback(q, q.correctIndex, 1);
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Answer feedback"');
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain("Read the docs");
    expect(html).toContain(q.refs[0].label);
  });

  it("titles the docs section as an h2 so the page heading order does not skip a level", () => {
    const html = feedback(q, q.correctIndex, 1);
    expect(html).toMatch(/<h2[^>]*>Read the docs<\/h2>/);
    expect(html).not.toContain("<h3");
  });
});
