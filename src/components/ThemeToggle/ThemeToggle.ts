import { icon } from "../../lib/icon";
import styles from "./ThemeToggle.module.css";

export function themeToggle(): string {
  return (
    `<button type="button" role="switch" aria-checked="false" class="${styles.toggle}" data-theme-toggle>` +
    `<span class="${styles.track}" aria-hidden="true">` +
    `<span class="${styles.knob}">` +
    `<span class="${styles.sun}">${icon("sun", 16)}</span>` +
    `<span class="${styles.moon}">${icon("moon", 16)}</span>` +
    `</span>` +
    `</span>` +
    `<span class="${styles.tooltip}">` +
    `<span class="${styles.tooltipChip}" data-tooltip-text>Switch to dark mode</span>` +
    `</span>` +
    `</button>`
  );
}
