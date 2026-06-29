import { describe, it, expect } from "vitest";
import { pickNextIndex, progressTier, eligibleIds } from "./select";

const byDifficulty = {
  easy: ["e1", "e2"],
  medium: ["m1"],
  hard: ["h1"],
} as const;

describe("progressTier", () => {
  it("stays on easy while any easy question is unseen", () => {
    expect(progressTier(byDifficulty, new Set())).toBe("easy");
    expect(progressTier(byDifficulty, new Set(["e1"]))).toBe("easy");
  });

  it("advances to medium once easy is exhausted", () => {
    expect(progressTier(byDifficulty, new Set(["e1", "e2"]))).toBe("medium");
  });

  it("advances to hard once easy and medium are exhausted", () => {
    expect(progressTier(byDifficulty, new Set(["e1", "e2", "m1"]))).toBe("hard");
  });

  it("returns null once every tier is cleared", () => {
    expect(progressTier(byDifficulty, new Set(["e1", "e2", "m1", "h1"]))).toBeNull();
  });
});

describe("eligibleIds", () => {
  it("opens the whole bank in random mode", () => {
    expect(eligibleIds("random", false, byDifficulty, new Set())).toBeUndefined();
  });

  it("narrows to the current tier in progress mode", () => {
    expect([...eligibleIds("progress", false, byDifficulty, new Set())!]).toEqual(["e1", "e2"]);
    expect([...eligibleIds("progress", false, byDifficulty, new Set(["e1", "e2"]))!]).toEqual([
      "m1",
    ]);
  });

  it("opens the whole bank once the quest is complete, even in progress mode", () => {
    expect(eligibleIds("progress", true, byDifficulty, new Set())).toBeUndefined();
  });
});

describe("pickNextIndex with an eligible set (progress mode)", () => {
  const ids = ["e1", "e2", "m1", "h1"];

  it("only returns indices inside the eligible set", () => {
    const eligible = new Set(["e1", "e2"]);
    for (let i = 0; i < 50; i++) {
      const idx = pickNextIndex(ids, new Set(), -1, () => i / 50, eligible);
      expect(["e1", "e2"]).toContain(ids[idx]);
    }
  });

  it("prefers an unseen eligible question", () => {
    const idx = pickNextIndex(ids, new Set(["e1"]), -1, () => 0, new Set(["e1", "e2"]));
    expect(ids[idx]).toBe("e2");
  });

  it("reshuffles within the eligible set when all of it is seen", () => {
    const idx = pickNextIndex(ids, new Set(["e1", "e2"]), -1, () => 0, new Set(["e1", "e2"]));
    expect(["e1", "e2"]).toContain(ids[idx]);
  });
});

describe("pickNextIndex without an eligible set (random mode)", () => {
  const ids = ["e1", "e2", "m1", "h1"];

  it("draws from the whole list", () => {
    const idx = pickNextIndex(ids, new Set(), -1, () => 0.99);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(ids.length);
  });

  it("avoids repeating the current question when alternatives exist", () => {
    const idx = pickNextIndex(ids, new Set(), 0, () => 0);
    expect(idx).not.toBe(0);
  });
});
