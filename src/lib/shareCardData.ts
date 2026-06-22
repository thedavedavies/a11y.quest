import { accuracy, type RunState } from "./run";

export const CARD_W = 1200;
export const CARD_H = 630;

export type CardTheme = "light" | "dark";

export interface Palette {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  line: string;
  shadow: string;
  hero: string;
  flame: string;
  dot: string;
}

export const TILE_FILL = "#FFC233";
export const TILE_INK = "#1F1A2E";

const LIGHT: Palette = {
  bg: "#FBF4E6",
  panel: "#FFFCF5",
  text: "#1F1A2E",
  muted: "#4A4458",
  line: "#1F1A2E",
  shadow: "#1F1A2E",
  hero: "#0E7C71",
  flame: "#C2381B",
  dot: "#6B3FA0",
};

const DARK: Palette = {
  bg: "#0A0A0B",
  panel: "#141417",
  text: "#F2F3F5",
  muted: "#9AA1AC",
  line: "#6E707C",
  shadow: "#000000",
  hero: "#4ADE80",
  flame: "#FF8B82",
  dot: "#C8A2F0",
};

export function paletteFor(theme: CardTheme): Palette {
  return theme === "dark" ? DARK : LIGHT;
}

interface CardStats {
  accuracy: string;
  answered: string;
  correct: string;
  bestStreak: string;
}

export function cardStats(run: RunState): CardStats {
  return {
    accuracy: `${accuracy(run)}%`,
    answered: String(run.answered),
    correct: String(run.correct),
    bestStreak: String(run.bestStreak),
  };
}

export function shareSummary(run: RunState): string {
  return (
    `My a11y.quest run: ${accuracy(run)}% accuracy, ` +
    `${run.correct} of ${run.answered} correct, best streak ${run.bestStreak}.`
  );
}
