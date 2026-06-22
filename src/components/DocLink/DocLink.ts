import type { DocRef } from "../../data/questions";
import { escapeHtml } from "../../lib/escape";
import { icon } from "../../lib/icon";
import styles from "./DocLink.module.css";

export function docLink(ref: DocRef): string {
  return (
    `<li class="${styles.item}">` +
    `<a class="${styles.link}" href="${escapeHtml(ref.url)}" target="_blank" rel="noopener noreferrer">` +
    `<span class="${styles.icon}">${icon("external-link", 17)}</span>` +
    `<span>${escapeHtml(ref.label)}</span>` +
    `<span class="visually-hidden"> (opens in a new tab)</span>` +
    `</a></li>`
  );
}
