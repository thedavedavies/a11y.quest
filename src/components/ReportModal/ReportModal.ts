import { icon } from "../../lib/icon";
import styles from "./ReportModal.module.css";

export function reportModal(): string {
  return (
    `<dialog class="${styles.modal}" data-report-modal>` +
    `<div class="${styles.inner}">` +
    `<h2 class="${styles.title}" tabindex="-1" autofocus>Something not right?</h2>` +
    `<p class="${styles.intro}">Let me know what's wrong, and I'll get it fixed.</p>` +
    `<div class="${styles.field}">` +
    `<label class="${styles.fieldLabel}" for="report-note">What is wrong? <span class="${styles.optional}">(optional)</span></label>` +
    `<textarea class="${styles.textarea}" id="report-note" name="report-note" rows="3" maxlength="500" data-report-note></textarea>` +
    `</div>` +
    `<div class="${styles.actions}">` +
    `<a class="${styles.primary}" data-report-link href="#" target="_blank" rel="noopener noreferrer">` +
    `<span class="${styles.primaryIcon}">${icon("external-link", 18)}</span>` +
    `<span class="${styles.primaryText}">Open a prefilled GitHub issue` +
    `<span class="visually-hidden"> (opens in a new tab)</span>` +
    `</span>` +
    `</a>` +
    `<div class="${styles.minorActions}">` +
    `<button type="button" class="${styles.cancel}" data-report-close>Cancel</button>` +
    `</div>` +
    `</div>` +
    `<button type="button" class="${styles.close}" data-report-close aria-label="Close and return to the quiz">${icon("x", 22)}</button>` +
    `</div>` +
    `</dialog>`
  );
}
