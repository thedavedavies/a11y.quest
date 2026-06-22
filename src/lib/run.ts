export interface RunState {
  answered: number;
  correct: number;
  currentStreak: number;
  bestStreak: number;
}

export function emptyRun(): RunState {
  return { answered: 0, correct: 0, currentStreak: 0, bestStreak: 0 };
}

export function accuracy(run: RunState): number {
  if (run.answered <= 0) return 0;
  return Math.round((run.correct / run.answered) * 100);
}

export function recordAnswer(run: RunState, isCorrect: boolean): RunState {
  const currentStreak = isCorrect ? run.currentStreak + 1 : 0;
  return {
    answered: run.answered + 1,
    correct: run.correct + (isCorrect ? 1 : 0),
    currentStreak,
    bestStreak: Math.max(run.bestStreak, currentStreak),
  };
}

function toFiniteInt(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : 0;
}

export function sanitizeRun(value: unknown): RunState {
  const v = (value ?? {}) as Record<string, unknown>;
  const answered = Math.max(0, toFiniteInt(v.answered));
  const correct = Math.min(answered, Math.max(0, toFiniteInt(v.correct)));
  const currentStreak = Math.min(answered, Math.max(0, toFiniteInt(v.currentStreak)));
  const bestStreak = Math.min(
    answered,
    Math.max(currentStreak, Math.max(0, toFiniteInt(v.bestStreak))),
  );
  return { answered, correct, currentStreak, bestStreak };
}
