import { skipLink } from "../SkipLink/SkipLink";
import { themeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./SiteHeader.module.css";

export function siteHeader(): string {
  return (
    `<header class="${styles.header}">` +
    skipLink() +
    `<div class="${styles.identity}">` +
    `<img class="${styles.logo}" src="/favicon.svg" alt="" width="48" height="48" />` +
    `<div class="${styles.identityText}">` +
    `<h1 class="${styles.wordmark}">a11y<span class="${styles.dot}">.</span>quest</h1>` +
    `<p class="${styles.tagline}">An endless web accessibility drill.</p>` +
    `</div>` +
    `</div>` +
    themeToggle() +
    `</header>`
  );
}
