import { describe, it, expect } from "vitest";
import { questionCounter } from "./QuestionCounter";

describe("questionCounter", () => {
  it("renders the question number", () => {
    expect(questionCounter(1)).toContain("Question 1");
    expect(questionCounter(42)).toContain("Question 42");
  });
});
