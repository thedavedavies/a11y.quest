import { icon } from "../../lib/icon";
import styles from "./ShareModal.module.css";

export function shareModal(): string {
  return (
    `<dialog class="${styles.modal}" data-share-modal>` +
    `<div class="${styles.inner}">` +
    `<h2 class="${styles.title}" tabindex="-1" autofocus>Share your run</h2>` +
    `<div class="${styles.preview}">` +
    `<canvas class="${styles.canvas}" data-share-canvas role="img" aria-label="Your a11y.quest score card"></canvas>` +
    `</div>` +
    `<div class="${styles.actions}">` +
    `<div class="${styles.row}">` +
    actionButton({
      data: "data-share-download",
      icon: "download",
      label: "Download",
      variant: "primary",
    }) +
    actionButton({
      data: "data-share-copy-link",
      icon: "link",
      label: "Copy link",
      variant: "secondary",
    }) +
    `</div>` +
    `<div class="${styles.fallback}" data-share-fallback hidden>` +
    `<label class="${styles.fallbackLabel}" for="share-url">Copy this link</label>` +
    `<input class="${styles.url}" id="share-url" data-share-url type="text" readonly />` +
    `</div>` +
    `<div class="visually-hidden" role="status" aria-live="polite" data-share-status></div>` +
    `<button type="button" class="${styles.close}" data-share-close aria-label="Close and return to the quiz">${icon("x", 22)}</button>` +
    `</div>` +
    `</dialog>`
  );
}

interface ActionButtonProps {
  data: string;
  icon: Parameters<typeof icon>[0];
  label: string;
  variant: "primary" | "secondary";
}

function actionButton({ data, icon: name, label, variant }: ActionButtonProps): string {
  const cls = variant === "primary" ? styles.primary : styles.secondary;
  return (
    `<button type="button" class="${cls}" ${data}>` +
    `<span class="${styles.btnIcon}">${icon(name, 20)}</span>` +
    `<span data-label>${label}</span>` +
    `</button>`
  );
}
