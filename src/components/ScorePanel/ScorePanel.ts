import { icon } from "../../lib/icon";
import { modeSelect } from "../ModeSelect/ModeSelect";
import { statBlock } from "../StatBlock/StatBlock";
import { streakBlock } from "../StreakBlock/StreakBlock";
import styles from "./ScorePanel.module.css";

export function scorePanel(): string {
  return (
    `<section class="${styles.score}" aria-labelledby="score-heading">` +
    `<div class="${styles.header}">` +
    `<h2 id="score-heading" class="${styles.title}">Your run</h2>` +
    `</div>` +
    modeSelect() +
    `<div class="${styles.stats}">` +
    statBlock({ label: "Answered", stat: "answered" }) +
    statBlock({ label: "Correct", stat: "correct" }) +
    statBlock({ label: "Accuracy", stat: "accuracy", initial: "0%" }) +
    `</div>` +
    streakBlock() +
    `<div class="${styles.actions}">` +
    `<button type="button" class="${styles.share}" data-action="share" disabled>` +
    `<span class="${styles.btnIcon}">${icon("share", 16)}</span><span>Share</span>` +
    `</button>` +
    `<button type="button" class="${styles.reset}" data-action="reset">` +
    `<span class="${styles.btnIcon}">${icon("rotate-ccw", 16)}</span><span>Reset</span>` +
    `</button>` +
    `</div>` +
    `</section>`
  );
}
