import { AUTHOR_URL } from "../../lib/config";
import { icon } from "../../lib/icon";
import styles from "./AboutModal.module.css";

export function aboutModal(): string {
  return (
    `<dialog class="${styles.modal}" data-about-modal>` +
    `<div class="${styles.inner}">` +
    `<h2 class="${styles.title}" tabindex="-1" autofocus>Why this quiz exists</h2>` +
    `<div class="${styles.body}">` +
    `<p>Hi, I'm Dave \u{1F44B} I built a11y.quest as a drill to help me study for the Web ` +
    `Accessibility Specialist (WAS) exam. It isn't an official resource from the IAAP ` +
    `(the folks who run the exam), just my own study tool. ` +
    `The questions test what the spec says, so the ` +
    `"right" answer is the one that ticks the technical boxes. Possibly, it's not always the one that serves ` +
    `real people best.</p>` +
    `<p>Real accessibility is always about humans and context.</p>` +
    `<p>If that's something you care about, come and say hello at ` +
    `<a class="${styles.link}" href="${AUTHOR_URL}" target="_blank" rel="author noopener">` +
    `davedavies.dev` +
    `<span class="${styles.linkIcon}">${icon("external-link", 15)}</span>` +
    `<span class="visually-hidden"> (opens in a new tab)</span>` +
    `</a>.</p>` +
    `</div>` +
    `<button type="button" class="${styles.close}" data-about-close aria-label="Close and return to the quiz">${icon("x", 22)}</button>` +
    `</div>` +
    `</dialog>`
  );
}
