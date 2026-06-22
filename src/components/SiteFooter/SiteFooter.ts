import { AUTHOR_URL } from "../../lib/config";
import { icon } from "../../lib/icon";
import styles from "./SiteFooter.module.css";

export function siteFooter(): string {
  return (
    `<footer class="${styles.footer}">` +
    `<p class="${styles.credit}">` +
    `<a class="${styles.link}" href="${AUTHOR_URL}" target="_blank" rel="author noopener">` +
    `<span>Who even built this thing?</span>` +
    `<span class="${styles.icon}">${icon("external-link", 15)}</span>` +
    `<span class="visually-hidden"> (opens in a new tab)</span>` +
    `</a>` +
    `</p>` +
    `</footer>`
  );
}
