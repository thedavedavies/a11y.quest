import type { Mode } from "./store";

export type Difficulty = "easy" | "medium" | "hard";

const TIER_ORDER: readonly Difficulty[] = ["easy", "medium", "hard"];

// The lowest tier (easy -> medium -> hard) that still has an unanswered
// question. Returns null once every tier is cleared, so the caller can fall
// back to the full pool and the quest rolls into an endless mixed reshuffle.
export function progressTier(
  byDifficulty: Readonly<Record<Difficulty, readonly string[]>>,
  seen: ReadonlySet<string>,
): Difficulty | null {
  for (const tier of TIER_ORDER) {
    if (byDifficulty[tier].some((id) => !seen.has(id))) return tier;
  }
  return null;
}

// Which ids the next pick may draw from. Random mode (and a finished quest)
// open up the whole bank; progress mode narrows to the current tier.
export function eligibleIds(
  mode: Mode,
  questComplete: boolean,
  byDifficulty: Readonly<Record<Difficulty, readonly string[]>>,
  seen: ReadonlySet<string>,
): ReadonlySet<string> | undefined {
  if (mode === "random" || questComplete) return undefined;
  const tier = progressTier(byDifficulty, seen);
  return tier ? new Set(byDifficulty[tier]) : undefined;
}

export function pickNextIndex(
  ids: readonly string[],
  seen: ReadonlySet<string>,
  currentIndex: number,
  rng: () => number = Math.random,
  eligible?: ReadonlySet<string>,
): number {
  const n = ids.length;
  if (n <= 1) return 0;

  const allowed = (i: number) => !eligible || eligible.has(ids[i]);

  let pool: number[] = [];
  for (let i = 0; i < n; i++) {
    if (allowed(i) && !seen.has(ids[i])) pool.push(i);
  }

  if (pool.length === 0) {
    for (let i = 0; i < n; i++) if (allowed(i)) pool.push(i);
  }

  if (pool.length === 0) {
    for (let i = 0; i < n; i++) pool.push(i);
  }

  if (pool.length > 1) {
    const without = pool.filter((i) => i !== currentIndex);
    if (without.length > 0) pool = without;
  }

  let r = Math.floor(rng() * pool.length);
  if (!Number.isFinite(r) || r < 0) r = 0;
  if (r > pool.length - 1) r = pool.length - 1;
  return pool[r];
}
