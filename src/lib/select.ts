export function pickNextIndex(
  ids: readonly string[],
  seen: ReadonlySet<string>,
  currentIndex: number,
  rng: () => number = Math.random,
): number {
  const n = ids.length;
  if (n <= 1) return 0;

  let pool: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!seen.has(ids[i])) pool.push(i);
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
