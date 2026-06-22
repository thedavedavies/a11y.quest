import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shareModal } from "./ShareModal";
import { initShareModal } from "../../lib/shareModal";
import { buildShareUrl } from "../../lib/shareCode";
import type { RunState } from "../../lib/store";

const RUN: RunState = { answered: 42, correct: 38, currentStreak: 5, bestStreak: 11 };

function mount(): { dialog: HTMLDialogElement; shareBtn: HTMLButtonElement } {
  document.body.innerHTML =
    `<div data-quiz><button type="button" data-action="share">Share</button></div>` +
    shareModal();
  const dialog = document.querySelector<HTMLDialogElement>("[data-share-modal]")!;
  dialog.showModal = function () {
    this.setAttribute("open", "");
  };
  dialog.close = function () {
    this.removeAttribute("open");
  };
  initShareModal({ getRun: () => RUN, root: document });
  return { dialog, shareBtn: document.querySelector<HTMLButtonElement>('[data-action="share"]')! };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("initShareModal controller", () => {
  const realGetContext = HTMLCanvasElement.prototype.getContext;
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = realGetContext;
    document.body.innerHTML = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
    vi.unstubAllGlobals();
  });

  it("opens for the current run, labelling the card and seeding the share link", () => {
    const { dialog, shareBtn } = mount();
    shareBtn.click();

    expect(dialog.hasAttribute("open")).toBe(true);
    const canvas = dialog.querySelector<HTMLCanvasElement>("[data-share-canvas]")!;
    expect(canvas.getAttribute("aria-label")).toContain("90% accuracy");
    expect(canvas.getAttribute("aria-label")).toContain("best streak 11");
    const url = dialog.querySelector<HTMLInputElement>("[data-share-url]")!;
    expect(url.value).toBe(buildShareUrl(window.location.origin, RUN));
  });

  it("copies the link and confirms it when the clipboard accepts the write", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    const { dialog, shareBtn } = mount();
    shareBtn.click();
    dialog.querySelector<HTMLButtonElement>("[data-share-copy-link]")!.click();
    await flush();

    expect(writeText).toHaveBeenCalledWith(buildShareUrl(window.location.origin, RUN));
    expect(dialog.querySelector<HTMLElement>("[data-share-status]")!.textContent).toMatch(/copied/i);
    expect(dialog.querySelector<HTMLElement>("[data-share-fallback]")!.hidden).toBe(true);
  });

  it("reveals the manual-copy fallback when the clipboard write is refused", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("blocked"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    const { dialog, shareBtn } = mount();
    shareBtn.click();
    dialog.querySelector<HTMLButtonElement>("[data-share-copy-link]")!.click();
    await flush();

    const fallback = dialog.querySelector<HTMLElement>("[data-share-fallback]")!;
    expect(fallback.hidden).toBe(false);
    expect(dialog.querySelector<HTMLInputElement>("[data-share-url]")!.value).toBe(
      buildShareUrl(window.location.origin, RUN),
    );
    expect(dialog.querySelector<HTMLElement>("[data-share-status]")!.textContent).toMatch(/blocked/i);
  });

  it("returns focus to the trigger when closed with Escape", () => {
    const { dialog, shareBtn } = mount();
    shareBtn.click();
    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(shareBtn);
  });

  it("offers exactly Download and Copy link", () => {
    const { dialog, shareBtn } = mount();
    shareBtn.click();
    expect(dialog.querySelector("[data-share-download]")).not.toBeNull();
    expect(dialog.querySelector("[data-share-copy-link]")).not.toBeNull();
    expect(dialog.querySelector("[data-share-copy-image]")).toBeNull();
    expect(dialog.querySelector("[data-share-native]")).toBeNull();
  });
});
