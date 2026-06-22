import { questions } from "../data/questions";
import { questionCard } from "../components/QuestionCard/QuestionCard";
import { icon } from "./icon";
import { pickNextIndex } from "./select";
import { initShareModal } from "./shareModal";
import {
  accuracy,
  clearSeen,
  emptyRun,
  loadRun,
  loadSeen,
  recordAnswer,
  saveRun,
  saveSeen,
  type RunState,
} from "./store";

export function initQuiz(root: ParentNode = document): void {
  const quiz = root.querySelector<HTMLElement>("[data-quiz]");
  const stageEl = root.querySelector<HTMLElement>("[data-stage]");
  const liveEl = root.querySelector<HTMLElement>("[data-live]");
  if (!quiz || !stageEl || !liveEl) return;
  const stage: HTMLElement = stageEl;
  const live: HTMLElement = liveEl;

  const idList = questions.map((q) => q.id);
  const known = new Set(idList);

  let answered = false;
  let chosenIndex: number | null = null;
  let run = loadRun();
  const seen = new Set([...loadSeen()].filter((id) => known.has(id)));

  let currentIndex = pickNextIndex(idList, seen, findCurrentIndex(stage));

  renderScore(root, run);
  renderCard();
  stage.removeAttribute("data-booting");
  quiz.removeAttribute("data-score-booting");

  initShareModal({ getRun: () => run, root });

  function renderCard(): void {
    const q = questions[currentIndex];
    stage.innerHTML = questionCard(q, {
      answered,
      chosenIndex,
      questionNumber: answered ? run.answered : run.answered + 1,
      currentStreak: run.currentStreak,
    });
  }

  function handleCheck(): void {
    if (answered) return;
    const card = stage.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const chosen = card.querySelector<HTMLInputElement>('input[name="answer"]:checked');
    if (!chosen) {
      showAnswerError(card);
      return;
    }
    clearAnswerError(card);

    const q = questions[currentIndex];
    chosenIndex = Number(chosen.value);
    const isCorrect = chosenIndex === q.correctIndex;

    run = recordAnswer(run, isCorrect);
    saveRun(run);
    renderScore(root, run);

    seen.add(q.id);
    if (seen.size >= idList.length) seen.clear();
    saveSeen(seen);

    answered = true;
    renderCard();
    announceResult(live, isCorrect, run);

    stage.querySelector<HTMLElement>("[data-feedback]")?.focus();
  }

  function handleNext(): void {
    currentIndex = pickNextIndex(idList, seen, currentIndex);
    answered = false;
    chosenIndex = null;
    renderCard();
    live.textContent = "";
    stage.querySelector<HTMLInputElement>('input[name="answer"]')?.focus();
  }

  function handleReset(): void {
    run = emptyRun();
    saveRun(run);
    seen.clear();
    clearSeen();
    renderScore(root, run);
    answered = false;
    chosenIndex = null;
    currentIndex = pickNextIndex(idList, seen, currentIndex);
    renderCard();
    live.textContent = "Run reset. Your score is back to zero.";
  }

  quiz.addEventListener("click", (event) => {
    const action = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-action]")
      ?.dataset.action;
    if (action === "check") handleCheck();
    else if (action === "next") handleNext();
    else if (action === "reset") handleReset();
  });

  stage.addEventListener("change", (event) => {
    if ((event.target as HTMLElement | null)?.matches?.('input[name="answer"]')) {
      const card = stage.querySelector<HTMLElement>("[data-card]");
      if (card) clearAnswerError(card);
    }
  });
}

const ANSWER_ERROR = "Choose an answer before checking it.";

function showAnswerError(card: HTMLElement): void {
  const errorEl = card.querySelector<HTMLElement>("[data-error]");
  const fieldset = card.querySelector<HTMLElement>("fieldset");
  if (errorEl) errorEl.innerHTML = `${icon("alert", 18)}<span>${ANSWER_ERROR}</span>`;
  if (fieldset) {
    fieldset.setAttribute("aria-invalid", "true");
    if (errorEl?.id) fieldset.setAttribute("aria-describedby", errorEl.id);
  }
  card.querySelector<HTMLInputElement>('input[name="answer"]')?.focus();
}

function clearAnswerError(card: HTMLElement): void {
  const errorEl = card.querySelector<HTMLElement>("[data-error]");
  if (errorEl) errorEl.textContent = "";
  const fieldset = card.querySelector<HTMLElement>("fieldset");
  if (fieldset) {
    fieldset.removeAttribute("aria-invalid");
    fieldset.removeAttribute("aria-describedby");
  }
}

function findCurrentIndex(stage: HTMLElement): number {
  const id = stage.querySelector<HTMLElement>("[data-card]")?.dataset.questionId;
  const index = questions.findIndex((q) => q.id === id);
  return index >= 0 ? index : 0;
}

function renderScore(root: ParentNode, run: RunState): void {
  const set = (stat: string, value: string) => {
    const el = root.querySelector<HTMLElement>(`[data-stat="${stat}"]`);
    if (el) el.textContent = value;
  };
  set("answered", String(run.answered));
  set("correct", String(run.correct));
  set("accuracy", `${accuracy(run)}%`);
  set("currentStreak", String(run.currentStreak));
  set("bestStreak", String(run.bestStreak));

  const shareBtn = root.querySelector<HTMLButtonElement>('[data-action="share"]');
  if (shareBtn) shareBtn.disabled = run.answered <= 0;
}

function announceResult(live: HTMLElement, isCorrect: boolean, run: RunState): void {
  const lead = isCorrect ? "Correct." : "Incorrect.";
  live.textContent =
    `${lead} Run so far: ${run.answered} answered, ${run.correct} correct, ` +
    `${accuracy(run)} percent accuracy. Current streak ${run.currentStreak}, best streak ${run.bestStreak}.`;
}
