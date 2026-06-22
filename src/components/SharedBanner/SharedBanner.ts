import { icon } from "../../lib/icon";
import { accuracy, type RunState } from "../../lib/store";
import styles from "./SharedBanner.module.css";

export function sharedBanner(run: RunState): string {
  const acc = accuracy(run);
  const questions = `${run.answered} question${run.answered === 1 ? "" : "s"}`;
  return (
    `<section class="${styles.banner}" aria-labelledby="shared-heading" data-shared-banner>` +
    `<div class="${styles.body}">` +
    `<p class="${styles.eyebrow}"><span class="${styles.eyebrowIcon}">${icon("share", 18)}</span>` +
    `<span>Someone shared their run</span></p>` +
    `<h2 id="shared-heading" class="${styles.heading}">Can you beat ${acc}% accuracy?</h2>` +
    `<p class="${styles.detail}">They answered ${questions}, got ${run.correct} right, ` +
    `and reached a best streak of ${run.bestStreak}. Your turn.</p>` +
    `<button type="button" class="${styles.cta}" data-shared-start>` +
    `<span>Start your run</span>` +
    `<span class="${styles.ctaIcon}">${icon("arrow-right", 20)}</span>` +
    `</button>` +
    `</div>` +
    `<button type="button" class="${styles.close}" data-shared-dismiss aria-label="Dismiss this challenge">` +
    `${icon("x", 22)}</button>` +
    `</section>`
  );
}
