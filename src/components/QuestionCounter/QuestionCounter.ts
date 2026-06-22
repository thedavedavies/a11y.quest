import styles from "./QuestionCounter.module.css";

export function questionCounter(number: number): string {
  return `<p class="${styles.counter}" data-counter>Question ${number}</p>`;
}
