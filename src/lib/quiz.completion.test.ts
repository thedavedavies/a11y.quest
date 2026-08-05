import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { questions } from "../data/questions";
import { shareModal } from "../components/ShareModal/ShareModal";
import { initQuiz } from "./quiz";

const ALL_IDS = questions.map((q) => q.id);

function mount(seen: readonly string[], questComplete = false): HTMLDialogElement {
  localStorage.setItem("a11yquest:seen:v1", JSON.stringify(seen));
  if (questComplete) localStorage.setItem("a11yquest:quest-complete:v1", "1");

  document.body.innerHTML =
    `<div data-quiz>` +
    `<div data-stage></div>` +
    `<div data-live></div>` +
    `<button type="button" data-action="share">Share</button>` +
    `</div>` +
    shareModal();

  const dialog = document.querySelector<HTMLDialogElement>("[data-share-modal]")!;
  dialog.showModal = function () {
    this.setAttribute("open", "");
  };
  dialog.close = function () {
    this.removeAttribute("open");
  };

  initQuiz(document);
  return dialog;
}

function answerCurrentQuestion(): void {
  const radio = document.querySelector<HTMLInputElement>('input[name="answer"]')!;
  radio.checked = true;
  document.querySelector<HTMLButtonElement>('[data-action="check"]')!.click();
}

describe("quiz completion celebration", () => {
  const realGetContext = HTMLCanvasElement.prototype.getContext;

  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
    localStorage.clear();
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    localStorage.clear();
    document.body.innerHTML = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  });

  it("celebrates when the last unseen question is answered", () => {
    const dialog = mount(ALL_IDS.slice(0, -1));

    answerCurrentQuestion();

    expect(dialog.hasAttribute("open")).toBe(true);
    expect(dialog.querySelector<HTMLElement>("[data-share-title]")!.textContent).toMatch(
      /quest complete/i,
    );
    expect(dialog.querySelector<HTMLElement>("[data-share-intro]")!.textContent).toContain(
      String(ALL_IDS.length),
    );
  });

  it("stays quiet on every question before the last one", () => {
    const dialog = mount(ALL_IDS.slice(0, -2));

    answerCurrentQuestion();

    expect(dialog.hasAttribute("open")).toBe(false);
  });

  // The quest-complete flag predates this feature, so anyone who had already
  // cleared the bank carries it. Gating the celebration on it would hide the
  // moment from exactly the people who earned it first.
  it("celebrates a sweep by someone who already carries the quest-complete flag", () => {
    const dialog = mount(ALL_IDS.slice(0, -1), true);

    answerCurrentQuestion();

    expect(dialog.hasAttribute("open")).toBe(true);
    expect(dialog.querySelector<HTMLElement>("[data-share-title]")!.textContent).toMatch(
      /quest complete/i,
    );
  });

  it("keeps serving questions after the celebration", () => {
    const dialog = mount(ALL_IDS.slice(0, -1));
    answerCurrentQuestion();
    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

    document.querySelector<HTMLButtonElement>('[data-action="next"]')!.click();

    expect(document.querySelector("[data-card]")).not.toBeNull();
    expect(document.querySelectorAll('input[name="answer"]').length).toBeGreaterThan(0);
  });
});
