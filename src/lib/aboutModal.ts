import { lockScroll } from "./scrollLock";

export function initAboutModal(root: ParentNode = document): void {
  const dialog = root.querySelector<HTMLDialogElement>("[data-about-modal]");
  const openers = root.querySelectorAll<HTMLElement>("[data-about-open]");
  if (!dialog || typeof dialog.showModal !== "function" || openers.length === 0) return;

  let active = false;
  let trigger: HTMLElement | null = null;
  let unlock: (() => void) | null = null;

  function open(triggerEl: HTMLElement): void {
    if (dialog!.open) return;
    active = true;
    trigger = triggerEl;
    unlock = lockScroll();
    dialog!.showModal();
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

  openers.forEach((el) => el.addEventListener("click", () => open(el)));

  dialog
    .querySelectorAll<HTMLElement>("[data-about-close]")
    .forEach((el) => el.addEventListener("click", requestClose));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") requestClose();
  });

  dialog.addEventListener("close", cleanup);
}
