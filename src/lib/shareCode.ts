import { sanitizeRun, type RunState } from "./run";

export const SHARE_PARAM = "s";

const MAX_FIELD = 999_999;

const FIELD = "(\\d{1,6})";
const SHARE_RE = new RegExp(`^a${FIELD}c${FIELD}k${FIELD}b${FIELD}$`);

const clampField = (n: number): number => Math.min(MAX_FIELD, Math.max(0, n));

export function encodeRun(run: RunState): string {
  const r = sanitizeRun(run);
  return (
    `a${clampField(r.answered)}` +
    `c${clampField(r.correct)}` +
    `k${clampField(r.currentStreak)}` +
    `b${clampField(r.bestStreak)}`
  );
}

export function decodeRun(token: string | null | undefined): RunState | null {
  if (!token) return null;
  const m = SHARE_RE.exec(token);
  if (!m) return null;
  return sanitizeRun({
    answered: Number(m[1]),
    correct: Number(m[2]),
    currentStreak: Number(m[3]),
    bestStreak: Number(m[4]),
  });
}

export function buildShareUrl(origin: string, run: RunState): string {
  const base = origin.replace(/\/+$/, "");
  return `${base}/?${SHARE_PARAM}=${encodeURIComponent(encodeRun(run))}`;
}
