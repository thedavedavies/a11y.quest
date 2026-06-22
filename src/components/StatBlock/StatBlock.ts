import styles from "./StatBlock.module.css";

interface StatProps {
  label: string;
  stat: string;
  initial?: string;
}

export function statBlock({ label, stat, initial = "0" }: StatProps): string {
  return (
    `<div class="${styles.stat}">` +
    `<span class="${styles.value}" data-stat="${stat}">${initial}</span>` +
    `<span class="${styles.label}">${label}</span>` +
    `</div>`
  );
}
