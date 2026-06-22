import { describe, it, expect } from "vitest";
import { questionMeta } from "./QuestionMeta";
import { questions } from "../../data/questions";

describe("questionMeta", () => {
  it("combines difficulty, topic, and the counter", () => {
    const html = questionMeta(questions[0], 3);
    expect(html).toContain("Difficulty: ");
    expect(html).toContain("Topic: ");
    expect(html).toContain("Question 3");
  });
});
