import type { Question } from "../../data/questions";
import { escapeHtml } from "../../lib/escape";
import { icon } from "../../lib/icon";
import { docLink } from "../DocLink/DocLink";
import styles from "./Feedback.module.css";

export function feedback(q: Question, chosenIndex: number, currentStreak: number): string {
  const isCorrect = chosenIndex === q.correctIndex;
  const resultIcon = isCorrect ? icon("check", 24) : icon("x", 24);
  const title = isCorrect ? "Correct!" : "Not quite.";

  const streakChip =
    isCorrect && currentStreak > 0
      ? `<p class="${styles.streakChip}">` +
        `<span class="${styles.streakFlame}">${icon("flame", 16)}</span>` +
        `<span>${currentStreak} in a row</span></p>`
      : "";

  const correctAnswer = isCorrect
    ? ""
    : `<p class="${styles.answer}">Correct answer: <strong>${escapeHtml(q.options[q.correctIndex])}</strong></p>`;

  const links = q.refs.map(docLink).join("");

  return (
    `<div class="${styles.feedback}${isCorrect ? "" : ` ${styles.incorrect}`}" data-feedback tabindex="-1" role="group" aria-label="Answer feedback">` +
    `<div class="${styles.result}">` +
    `<span class="${styles.resultLeft}">` +
    `<span class="${styles.badge}" aria-hidden="true">${resultIcon}</span>` +
    `<strong class="${styles.title}">${title}</strong>` +
    `</span>` +
    streakChip +
    `</div>` +
    correctAnswer +
    `<p class="${styles.explanation}">${escapeHtml(q.explanation)}</p>` +
    `<h2 class="${styles.docsLabel}">Read the docs</h2>` +
    `<ul class="${styles.docLinks}" role="list">${links}</ul>` +
    `</div>`
  );
}
