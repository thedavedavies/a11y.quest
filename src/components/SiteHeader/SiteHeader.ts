import { skipLink } from "../SkipLink/SkipLink";
import { themeToggle } from "../ThemeToggle/ThemeToggle";
import { icon } from "../../lib/icon";
import styles from "./SiteHeader.module.css";

export function siteHeader(): string {
  return (
    `<header class="${styles.header}">` +
    skipLink() +
    `<div class="${styles.identity}">` +
    `<img class="${styles.logo}" src="/favicon.svg" alt="" width="48" height="48" />` +
    `<div class="${styles.identityText}">` +
    `<h1 class="${styles.wordmark}">a11y<span class="${styles.dot}">.</span>quest</h1>` +
    `<p class="${styles.tagline}">128 questions to level up your accessibility game.` +
    `<button type="button" class="${styles.about}" data-about-open>` +
    `<span class="${styles.aboutIcon}">${icon("info", 16)}</span>` +
    `<span class="${styles.aboutLabel}">About this quiz</span>` +
    `</button>` +
    `</p>` +
    `</div>` +
    `</div>` +
    themeToggle() +
    `</header>`
  );
}
