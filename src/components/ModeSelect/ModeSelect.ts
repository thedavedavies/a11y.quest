import styles from "./ModeSelect.module.css";

const OPTIONS: { value: string; label: string }[] = [
  { value: "progress", label: "Level up: easy to hard" },
  { value: "random", label: "Shuffle: a random mix" },
];

const chevron =
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
  `stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
  `<path d="m6 9 6 6 6-6" /></svg>`;

export function modeSelect(): string {
  const options = OPTIONS.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  return (
    `<div class="${styles.field}">` +
    `<label class="${styles.label}" for="mode-select">Choose your difficulty setting</label>` +
    `<div class="${styles.control}">` +
    `<select class="${styles.select}" id="mode-select" data-mode>${options}</select>` +
    `<span class="${styles.chevron}">${chevron}</span>` +
    `</div>` +
    `</div>`
  );
}
