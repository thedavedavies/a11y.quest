import { icon } from "../../lib/icon";
import styles from "./StreakBlock.module.css";

export function streakBlock(): string {
  return (
    `<div class="${styles.streak}">` +
    `<span class="${styles.flame}">${icon("flame", 26)}</span>` +
    `<div class="${styles.nums}">` +
    `<span class="${styles.current}"><span data-stat="currentStreak">0</span> streak</span>` +
    `<span class="${styles.best}">Best streak: <span data-stat="bestStreak">0</span></span>` +
    `</div>` +
    `</div>`
  );
}
