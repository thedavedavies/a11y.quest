import { describe, it, expect } from "vitest";
import { questionCard } from "./QuestionCard";
import { questions } from "../../data/questions";

const q = questions[0];

describe("questionCard", () => {
  it("renders the unanswered state: 4 options, a legend, Check, no feedback", () => {
    const html = questionCard(q, {
      answered: false,
      chosenIndex: null,
      questionNumber: 1,
      currentStreak: 0,
    });
    expect((html.match(/type="radio"/g) || []).length).toBe(4);
    expect(html).toContain("<legend");
    expect(html).toContain('data-action="check"');
    expect(html).not.toContain('data-action="next"');
    expect(html).not.toContain("data-feedback");
    expect(html).toContain(`data-question-id="${q.id}"`);
  });

  it("uses the question as the radio group's legend, with no nested heading", () => {
    const html = questionCard(q, {
      answered: false,
      chosenIndex: null,
      questionNumber: 1,
      currentStreak: 0,
    });
    expect(html).toMatch(/<legend[^>]*id="question-text"[^>]*>/);
    expect(html).not.toMatch(/<fieldset[^>]*aria-labelledby/);
    expect(html).not.toMatch(/<article[^>]*aria-labelledby/);
    expect(html).not.toContain("answer-instruction");
    expect(html).not.toMatch(/<fieldset[^>]*aria-describedby/);
  });

  it("renders the answered state: feedback + Next, and marks the correct option", () => {
    const html = questionCard(q, {
      answered: true,
      chosenIndex: q.correctIndex,
      questionNumber: 1,
      currentStreak: 1,
    });
    expect(html).toContain("data-feedback");
    expect(html).toContain('data-action="next"');
    expect(html).not.toContain('data-action="check"');
    expect(html).toContain("Correct!");
    expect((html.match(/disabled/g) || []).length).toBe(4);
  });

  it("includes an empty alert-role error region only while unanswered", () => {
    const unanswered = questionCard(q, {
      answered: false,
      chosenIndex: null,
      questionNumber: 1,
      currentStreak: 0,
    });
    expect(unanswered).toContain('role="alert"');
    expect(unanswered).toContain("data-error");
    expect(unanswered).toContain('id="answer-error"');
    const answered = questionCard(q, {
      answered: true,
      chosenIndex: q.correctIndex,
      questionNumber: 1,
      currentStreak: 1,
    });
    expect(answered).not.toContain("data-error");
  });

  it("escapes the question text", () => {
    const tricky = { ...q, question: "Use a <button>?" };
    expect(
      questionCard(tricky, {
        answered: false,
        chosenIndex: null,
        questionNumber: 1,
        currentStreak: 0,
      }),
    ).toContain("Use a &lt;button&gt;?");
  });

  it("renders backticked code in the question as escaped <code>", () => {
    const tricky = { ...q, question: "Use a `<button>` element." };
    expect(
      questionCard(tricky, {
        answered: false,
        chosenIndex: null,
        questionNumber: 1,
        currentStreak: 0,
      }),
    ).toContain("<code>&lt;button&gt;</code>");
  });
});
