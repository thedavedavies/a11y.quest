import styles from "./SkipLink.module.css";

export function skipLink(): string {
  return `<a class="${styles.skipLink}" href="#main">Skip to the quiz</a>`;
}
