import { describe, it, expect } from "vitest";
import {
  accuracy,
  clearSeen,
  emptyRun,
  loadRun,
  loadSeen,
  recordAnswer,
  saveRun,
  saveSeen,
} from "../src/lib/store";

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key) => (map.has(key) ? (map.get(key) as string) : null),
    key: (i) => Array.from(map.keys())[i] ?? null,
    removeItem: (key) => void map.delete(key),
    setItem: (key, value) => void map.set(key, String(value)),
  } satisfies Storage;
}

describe("run state helpers", () => {
  it("starts empty", () => {
    expect(emptyRun()).toEqual({ answered: 0, correct: 0, currentStreak: 0, bestStreak: 0 });
  });

  it("computes accuracy as a rounded percentage, 0 when nothing answered", () => {
    expect(accuracy(emptyRun())).toBe(0);
    expect(accuracy({ answered: 3, correct: 2, currentStreak: 0, bestStreak: 0 })).toBe(67);
    expect(accuracy({ answered: 4, correct: 4, currentStreak: 4, bestStreak: 4 })).toBe(100);
  });

  it("increments streak on a correct answer and tracks the best", () => {
    let run = emptyRun();
    run = recordAnswer(run, true);
    run = recordAnswer(run, true);
    expect(run).toEqual({ answered: 2, correct: 2, currentStreak: 2, bestStreak: 2 });
  });

  it("resets the current streak on a wrong answer but keeps the best", () => {
    let run = recordAnswer(recordAnswer(emptyRun(), true), true);
    run = recordAnswer(run, false);
    expect(run).toEqual({ answered: 3, correct: 2, currentStreak: 0, bestStreak: 2 });
  });
});

describe("persistence", () => {
  it("round-trips through storage", () => {
    const storage = memoryStorage();
    const run = recordAnswer(emptyRun(), true);
    saveRun(run, storage);
    expect(loadRun(storage)).toEqual(run);
  });

  it("returns an empty run when nothing is stored", () => {
    expect(loadRun(memoryStorage())).toEqual(emptyRun());
  });

  it("recovers from corrupt JSON", () => {
    const storage = memoryStorage();
    storage.setItem("a11yquest:run:v1", "{not json");
    expect(loadRun(storage)).toEqual(emptyRun());
  });

  it("sanitizes inconsistent stored values", () => {
    const storage = memoryStorage();
    storage.setItem(
      "a11yquest:run:v1",
      JSON.stringify({ answered: 2, correct: 9, currentStreak: -3, bestStreak: 1 }),
    );
    expect(loadRun(storage)).toEqual({
      answered: 2,
      correct: 2,
      currentStreak: 0,
      bestStreak: 1,
    });
  });
});

describe("seen-questions persistence (no-repeat within a session)", () => {
  it("round-trips a set of ids", () => {
    const storage = memoryStorage();
    saveSeen(new Set(["q1", "q2"]), storage);
    expect(loadSeen(storage)).toEqual(new Set(["q1", "q2"]));
  });

  it("returns an empty set when nothing is stored", () => {
    expect(loadSeen(memoryStorage())).toEqual(new Set());
  });

  it("recovers from corrupt or non-array JSON", () => {
    const storage = memoryStorage();
    storage.setItem("a11yquest:seen:v1", "{not json");
    expect(loadSeen(storage)).toEqual(new Set());
    storage.setItem("a11yquest:seen:v1", JSON.stringify({ not: "an array" }));
    expect(loadSeen(storage)).toEqual(new Set());
  });

  it("drops non-string entries", () => {
    const storage = memoryStorage();
    storage.setItem("a11yquest:seen:v1", JSON.stringify(["ok", 3, null, "fine"]));
    expect(loadSeen(storage)).toEqual(new Set(["ok", "fine"]));
  });

  it("clearSeen removes the stored set", () => {
    const storage = memoryStorage();
    saveSeen(new Set(["x"]), storage);
    clearSeen(storage);
    expect(loadSeen(storage)).toEqual(new Set());
  });
});
