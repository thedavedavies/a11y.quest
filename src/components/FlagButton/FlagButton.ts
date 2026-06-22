import { icon } from "../../lib/icon";
import styles from "./FlagButton.module.css";

export function flagButton(): string {
  return (
    `<button type="button" class="${styles.flag}" data-action="flag">` +
    `<span class="${styles.icon}">${icon("flag", 18)}</span>` +
    `<span>Something not right with this question?</span>` +
    `</button>`
  );
}
