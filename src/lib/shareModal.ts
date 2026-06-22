import type { RunState } from "./store";
import { lockScroll } from "./scrollLock";
import {
  canvasToPngBlob,
  renderShareCard,
  shareSummary,
  type CardTheme,
} from "./shareCard";
import { buildShareUrl } from "./shareCode";

interface ShareModalOptions {
  getRun: () => RunState;
  root?: ParentNode;
}

const FILE_NAME = "a11y-quest-run.png";

export function initShareModal({ getRun, root = document }: ShareModalOptions): void {
  const quiz = root.querySelector<HTMLElement>("[data-quiz]");
  const dialog = root.querySelector<HTMLDialogElement>("[data-share-modal]");
  if (!quiz || !dialog || typeof dialog.showModal !== "function") return;

  const canvas = dialog.querySelector<HTMLCanvasElement>("[data-share-canvas]");
  const status = dialog.querySelector<HTMLElement>("[data-share-status]");
  const fallback = dialog.querySelector<HTMLElement>("[data-share-fallback]");
  const urlField = dialog.querySelector<HTMLInputElement>("[data-share-url]");
  const downloadBtn = dialog.querySelector<HTMLButtonElement>("[data-share-download]");
  const copyLinkBtn = dialog.querySelector<HTMLButtonElement>("[data-share-copy-link]");

  let active = false;
  let trigger: HTMLElement | null = null;
  let unlock: (() => void) | null = null;
  let run: RunState | null = null;
  let shareUrl = "";
  let restoreTimer: ReturnType<typeof setTimeout> | null = null;

  function announce(message: string): void {
    if (status) status.textContent = message;
  }

  function flash(button: HTMLButtonElement | null, message: string): void {
    const label = button?.querySelector<HTMLElement>("[data-label]");
    if (!label) return;
    const original = label.dataset.original ?? label.textContent ?? "";
    label.dataset.original = original;
    label.textContent = message;
    if (restoreTimer) clearTimeout(restoreTimer);
    restoreTimer = setTimeout(() => {
      label.textContent = label.dataset.original ?? original;
    }, 2000);
  }

  function resetLabels(): void {
    if (restoreTimer) {
      clearTimeout(restoreTimer);
      restoreTimer = null;
    }
    dialog!.querySelectorAll<HTMLElement>("[data-label]").forEach((label) => {
      if (label.dataset.original) label.textContent = label.dataset.original;
    });
  }

  function hideFallback(): void {
    if (fallback) fallback.hidden = true;
  }

  function effectiveTheme(): CardTheme {
    const attr = document.documentElement.dataset.theme;
    if (attr === "dark" || attr === "light") return attr;
    return typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  async function pngBlob(): Promise<Blob | null> {
    return canvas ? canvasToPngBlob(canvas) : null;
  }

  async function download(): Promise<void> {
    const blob = await pngBlob();
    if (!blob) return announce("Could not build the image to download.");
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = FILE_NAME;
    a.rel = "noopener";
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    flash(downloadBtn, "Saved!");
    announce("Score card image downloaded.");
  }

  async function copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(shareUrl);
      flash(copyLinkBtn, "Copied!");
      announce("Share link copied to your clipboard.");
      hideFallback();
    } catch {
      if (fallback && urlField) {
        fallback.hidden = false;
        urlField.value = shareUrl;
        urlField.focus();
        urlField.select();
      }
      announce("Copying was blocked here. The link is shown below to copy by hand.");
    }
  }

  function open(triggerEl: HTMLElement): void {
    if (dialog!.open) return;
    run = getRun();
    shareUrl = buildShareUrl(window.location.origin, run);
    active = true;
    trigger = triggerEl;

    resetLabels();
    hideFallback();
    if (status) status.textContent = "";
    if (urlField) urlField.value = shareUrl;
    if (canvas) canvas.setAttribute("aria-label", `Score card: ${shareSummary(run)}`);

    unlock = lockScroll();
    dialog!.showModal();
    if (canvas) void renderShareCard(canvas, run, effectiveTheme());
  }

  function cleanup(): void {
    if (!active) return;
    active = false;
    unlock?.();
    unlock = null;
    const triggerEl = trigger;
    trigger = null;
    triggerEl?.focus?.();
  }

  function requestClose(): void {
    dialog!.close();
    cleanup();
  }

  quiz.addEventListener("click", (event) => {
    const shareTrigger = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      '[data-action="share"]',
    );
    if (shareTrigger) open(shareTrigger);
  });

  downloadBtn?.addEventListener("click", download);
  copyLinkBtn?.addEventListener("click", copyLink);

  dialog.querySelectorAll<HTMLElement>("[data-share-close]").forEach((el) =>
    el.addEventListener("click", requestClose),
  );
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") requestClose();
  });
  dialog.addEventListener("close", cleanup);
}
