import { loadTheme, saveTheme, type Theme } from "./store";

const TRANSITION_CLASS = "theme-transition";
const TRANSITION_MS = 320;

function systemTheme(): Theme {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function effectiveTheme(): Theme {
  return loadTheme() ?? systemTheme();
}

function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

function withThemeTransition(change: () => void): void {
  if (prefersReducedMotion()) {
    change();
    return;
  }
  const root = document.documentElement;
  root.classList.add(TRANSITION_CLASS);
  change();
  window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
}

function reflect(toggle: HTMLElement, theme: Theme): void {
  const isDark = theme === "dark";
  toggle.setAttribute("aria-checked", String(isDark));
  const tip = toggle.querySelector<HTMLElement>("[data-tooltip-text]");
  if (tip) tip.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
}

export function initThemeToggle(root: ParentNode = document): void {
  const toggle = root.querySelector<HTMLElement>("[data-theme-toggle]");
  if (!toggle) return;

  reflect(toggle, effectiveTheme());

  toggle.addEventListener("click", () => {
    const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
    withThemeTransition(() => {
      applyTheme(next);
      saveTheme(next);
      reflect(toggle, next);
    });
  });

  toggle.addEventListener("keydown", (event) => {
    if ((event as KeyboardEvent).key === "Escape") toggle.setAttribute("data-tooltip-hidden", "");
  });
  toggle.addEventListener("blur", () => toggle.removeAttribute("data-tooltip-hidden"));
  toggle.addEventListener("mouseleave", () => toggle.removeAttribute("data-tooltip-hidden"));

  if (typeof matchMedia !== "undefined") {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (loadTheme() === null) withThemeTransition(() => reflect(toggle, systemTheme()));
    });
  }
}
