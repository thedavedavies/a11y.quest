import { accuracy, emptyRun, recordAnswer, sanitizeRun, type RunState } from "./run";

export { accuracy, emptyRun, recordAnswer, sanitizeRun, type RunState };

const STORAGE_KEY = "a11yquest:run:v1";

function safeStorage(): Storage | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const probe = "__a11yquest_probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return null;
  }
}

export function loadRun(storage: Storage | null = safeStorage()): RunState {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return emptyRun();
    return sanitizeRun(JSON.parse(raw));
  } catch {
    return emptyRun();
  }
}

export function saveRun(run: RunState, storage: Storage | null = safeStorage()): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(run));
  } catch {}
}

const SEEN_KEY = "a11yquest:seen:v1";

export function loadSeen(storage: Storage | null = safeStorage()): Set<string> {
  try {
    const raw = storage?.getItem(SEEN_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

export function saveSeen(seen: ReadonlySet<string>, storage: Storage | null = safeStorage()): void {
  try {
    storage?.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {}
}

export function clearSeen(storage: Storage | null = safeStorage()): void {
  try {
    storage?.removeItem(SEEN_KEY);
  } catch {}
}

export type Mode = "progress" | "random";
const MODE_KEY = "a11yquest:mode:v1";

export function loadMode(storage: Storage | null = safeStorage()): Mode {
  try {
    const value = storage?.getItem(MODE_KEY);
    return value === "random" ? "random" : "progress";
  } catch {
    return "progress";
  }
}

export function saveMode(mode: Mode, storage: Storage | null = safeStorage()): void {
  try {
    storage?.setItem(MODE_KEY, mode);
  } catch {}
}

const QUEST_COMPLETE_KEY = "a11yquest:quest-complete:v1";

export function loadQuestComplete(storage: Storage | null = safeStorage()): boolean {
  try {
    return storage?.getItem(QUEST_COMPLETE_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveQuestComplete(done: boolean, storage: Storage | null = safeStorage()): void {
  try {
    if (done) storage?.setItem(QUEST_COMPLETE_KEY, "1");
    else storage?.removeItem(QUEST_COMPLETE_KEY);
  } catch {}
}

export type Theme = "light" | "dark";
const THEME_KEY = "a11yquest:theme:v1";

export function loadTheme(storage: Storage | null = safeStorage()): Theme | null {
  try {
    const value = storage?.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: Theme, storage: Storage | null = safeStorage()): void {
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {}
}
