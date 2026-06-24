import type { Question } from "../../data/questions";
import { escapeHtml, renderInlineCode } from "../../lib/escape";
import { questionMeta } from "../QuestionMeta/QuestionMeta";
import { optionCard, type OptionState } from "../OptionCard/OptionCard";
import { feedback } from "../Feedback/Feedback";
import { button } from "../Button/Button";
import { flagButton } from "../FlagButton/FlagButton";
import styles from "./QuestionCard.module.css";

export interface CardState {
  answered: boolean;
  chosenIndex: number | null;
  questionNumber: number;
  currentStreak: number;
}

function optionStateFor(index: number, q: Question, state: CardState): OptionState {
  if (!state.answered) return "idle";
  if (index === q.correctIndex) return "correct";
  if (index === state.chosenIndex) return "incorrect";
  return "idle";
}

export function questionCard(q: Question, state: CardState): string {
  const options = q.options
    .map((text, index) =>
      optionCard({
        text,
        index,
        answered: state.answered,
        checked: state.answered && index === state.chosenIndex,
        state: optionStateFor(index, q, state),
      }),
    )
    .join("");

  const actions = state.answered
    ? button({ label: "Next question", action: "next", trailingIcon: "arrow-right" })
    : button({ label: "Check answer", action: "check" });

  return (
    `<article class="${styles.card}" data-card data-question-id="${escapeHtml(q.id)}">` +
    questionMeta(q, state.questionNumber) +
    `<fieldset class="${styles.fieldset}">` +
    `<legend class="${styles.legend}" id="question-text">${renderInlineCode(q.question)}</legend>` +
    `<div class="${styles.options}">` +
    options +
    `</div>` +
    `</fieldset>` +
    (state.answered && state.chosenIndex !== null
      ? feedback(q, state.chosenIndex, state.currentStreak)
      : "") +
    (state.answered
      ? ""
      : `<p class="${styles.error}" id="answer-error" data-error role="alert"></p>`) +
    `<div class="${styles.actions}">${actions}</div>` +
    flagButton() +
    `</article>`
  );
}
