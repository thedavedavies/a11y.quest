import { describe, it, expect } from "vitest";
import { pickNextIndex } from "../src/lib/select";

const ids = ["a", "b", "c", "d", "e"];

describe("pickNextIndex", () => {
  it("never returns the current index when alternatives exist", () => {
    for (let current = 0; current < ids.length; current++) {
      for (let r = 0; r < 1; r += 0.05) {
        const next = pickNextIndex(ids, new Set(), current, () => r);
        expect(next).not.toBe(current);
        expect(next).toBeGreaterThanOrEqual(0);
        expect(next).toBeLessThan(ids.length);
      }
    }
  });

  it("never returns an already-seen question while unseen ones remain", () => {
    const seen = new Set(["a", "b", "c"]);
    for (let r = 0; r < 1; r += 0.02) {
      const next = pickNextIndex(ids, seen, 3, () => r);
      expect(seen.has(ids[next])).toBe(false);
      expect([3, 4]).toContain(next);
    }
  });

  it("excludes the current question even from the unseen pool", () => {
    const seen = new Set(["a", "b"]);
    const picks = new Set<number>();
    for (let r = 0; r < 1; r += 0.01) picks.add(pickNextIndex(ids, seen, 2, () => r));
    expect(picks.has(2)).toBe(false);
    expect([...picks].every((i) => i === 3 || i === 4)).toBe(true);
  });

  it("starts a fresh pass (no immediate repeat) once every question is seen", () => {
    const seen = new Set(ids);
    for (let r = 0; r < 1; r += 0.05) {
      const next = pickNextIndex(ids, seen, 2, () => r);
      expect(next).not.toBe(2);
      expect(next).toBeGreaterThanOrEqual(0);
      expect(next).toBeLessThan(ids.length);
    }
  });

  it("returns 0 for a one-question or empty bank", () => {
    expect(pickNextIndex(["only"], new Set(), 0)).toBe(0);
    expect(pickNextIndex([], new Set(), 0)).toBe(0);
  });

  it("is deterministic for a given rng", () => {
    const a = pickNextIndex(ids, new Set(["a"]), 1, () => 0.42);
    const b = pickNextIndex(ids, new Set(["a"]), 1, () => 0.42);
    expect(a).toBe(b);
  });
});
