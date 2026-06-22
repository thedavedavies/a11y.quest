import type { Question } from "../../data/questions";
import styles from "./DifficultyTag.module.css";

const LEVEL: Record<Question["difficulty"], { filled: number; label: string }> = {
  easy: { filled: 1, label: "Easy" },
  medium: { filled: 2, label: "Medium" },
  hard: { filled: 3, label: "Hard" },
};

export function difficultyTag(difficulty: Question["difficulty"]): string {
  const { filled, label } = LEVEL[difficulty];
  const dots = [0, 1, 2]
    .map((i) => `<span class="${styles.dot}${i < filled ? ` ${styles.dotFilled}` : ""}"></span>`)
    .join("");
  return (
    `<p class="${styles.tag} ${styles[difficulty]}">` +
    `<span class="${styles.dots}" data-filled="${filled}" aria-hidden="true">${dots}</span>` +
    `<span class="visually-hidden">Difficulty: </span>` +
    `<span>${label}</span>` +
    `</p>`
  );
}
