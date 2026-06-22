import { describe, it, expect } from "vitest";
import { SHARE_PARAM, encodeRun, decodeRun, buildShareUrl } from "./shareCode";
import type { RunState } from "./store";

const run = (over: Partial<RunState> = {}): RunState => ({
  answered: 42,
  correct: 38,
  currentStreak: 5,
  bestStreak: 11,
  ...over,
});

describe("encodeRun", () => {
  it("formats the four fields as a letter-tagged token", () => {
    expect(encodeRun(run())).toBe("a42c38k5b11");
  });

  it("clamps impossible combinations before encoding (correct/streak <= answered)", () => {
    expect(encodeRun(run({ answered: 3, correct: 99, currentStreak: 99, bestStreak: 99 }))).toBe(
      "a3c3k3b3",
    );
  });

  it("never emits a field wider than the decoder accepts (6 digits)", () => {
    const token = encodeRun(
      run({
        answered: 9_999_999,
        correct: 9_999_999,
        currentStreak: 9_999_999,
        bestStreak: 9_999_999,
      }),
    );
    expect(token).toBe("a999999c999999k999999b999999");
    expect(decodeRun(token)).not.toBeNull();
  });
});

describe("decodeRun", () => {
  it("round-trips an encoded run", () => {
    expect(decodeRun(encodeRun(run()))).toEqual(run());
  });

  it("returns null for absent or empty input", () => {
    expect(decodeRun(null)).toBeNull();
    expect(decodeRun(undefined)).toBeNull();
    expect(decodeRun("")).toBeNull();
  });

  it("returns null for malformed tokens", () => {
    for (const bad of [
      "a42c38k5",
      "a42c38k5b11x",
      "xa42c38k5b11",
      "a42c38b11k5",
      "answered",
      "a42c38k5b9999999",
      "A42C38K5B11",
    ]) {
      expect(decodeRun(bad)).toBeNull();
    }
  });

  it("clamps a structurally valid but impossible token instead of trusting it", () => {
    expect(decodeRun("a10c50k50b50")).toEqual({
      answered: 10,
      correct: 10,
      currentStreak: 10,
      bestStreak: 10,
    });
  });

  it("accepts a valid all-zero (empty) run; meaningfulness is the caller's call", () => {
    expect(decodeRun("a0c0k0b0")).toEqual({
      answered: 0,
      correct: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
  });
});

describe("buildShareUrl", () => {
  it("appends the token as the share param on the root route", () => {
    expect(buildShareUrl("https://a11y.quest", run())).toBe(
      `https://a11y.quest/?${SHARE_PARAM}=a42c38k5b11`,
    );
  });

  it("does not double the slash when the origin has a trailing one", () => {
    expect(buildShareUrl("https://a11y.quest/", run())).toBe(
      `https://a11y.quest/?${SHARE_PARAM}=a42c38k5b11`,
    );
  });

  it("produces a URL whose param decodes back to the same run (end-to-end)", () => {
    const r = run({ answered: 7, correct: 4, currentStreak: 2, bestStreak: 3 });
    const url = new URL(buildShareUrl("https://a11y.quest", r));
    expect(decodeRun(url.searchParams.get(SHARE_PARAM))).toEqual(r);
  });
});
