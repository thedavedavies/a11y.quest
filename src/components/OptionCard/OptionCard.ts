import { escapeHtml } from "../../lib/escape";
import { icon } from "../../lib/icon";
import styles from "./OptionCard.module.css";

export type OptionState = "idle" | "correct" | "incorrect";

interface OptionProps {
  text: string;
  index: number;
  answered: boolean;
  checked: boolean;
  state: OptionState;
}

export function optionCard({ text, index, answered, checked, state }: OptionProps): string {
  const id = `answer-${index}`;
  const statusId = `${id}-status`;
  const showStatus = answered && state !== "idle";
  const statusText = state === "correct" ? "Correct answer" : "Your answer, incorrect";
  const resultIcon = state === "correct" ? icon("check", 26) : state === "incorrect" ? icon("x", 26) : "";

  const inputAttrs = [
    `class="${styles.input}"`,
    `type="radio"`,
    `name="answer"`,
    `id="${id}"`,
    `value="${index}"`,
    checked ? "checked" : "",
    answered ? "disabled" : "",
    showStatus ? `aria-describedby="${statusId}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    `<div class="${styles.option}${state !== "idle" ? ` ${styles[state]}` : ""}" data-option>` +
    `<input ${inputAttrs} />` +
    `<label class="${styles.label}" for="${id}">` +
    `<span class="${styles.radio}" aria-hidden="true"><span class="${styles.dot}"></span></span>` +
    `<span class="${styles.text}">${escapeHtml(text)}</span>` +
    (resultIcon ? `<span class="${styles.stateIcon}">${resultIcon}</span>` : "") +
    `</label>` +
    (showStatus
      ? `<span class="visually-hidden" id="${statusId}">${statusText}</span>`
      : "") +
    `</div>`
  );
}
