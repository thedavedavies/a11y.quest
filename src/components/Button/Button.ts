import { escapeHtml } from "../../lib/escape";
import { icon, type IconName } from "../../lib/icon";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  action: string;
  trailingIcon?: IconName;
}

export function button({ label, action, trailingIcon }: ButtonProps): string {
  return (
    `<button type="button" class="${styles.btn}" data-action="${action}">` +
    `<span>${escapeHtml(label)}</span>` +
    (trailingIcon ? `<span class="${styles.icon}">${icon(trailingIcon, 20)}</span>` : "") +
    `</button>`
  );
}
