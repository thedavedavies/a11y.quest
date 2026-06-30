import { afterEach, describe, expect, it } from "vitest";
import { aboutModal } from "./AboutModal";
import { initAboutModal } from "../../lib/aboutModal";

function mount(): { dialog: HTMLDialogElement; openBtn: HTMLButtonElement } {
  document.body.innerHTML =
    `<button type="button" data-about-open>About this quiz</button>` + aboutModal();

  const dialog = document.querySelector<HTMLDialogElement>("[data-about-modal]")!;
  dialog.showModal = function () {
    this.setAttribute("open", "");
  };
  dialog.close = function () {
    this.removeAttribute("open");
  };
  initAboutModal(document);
  return {
    dialog,
    openBtn: document.querySelector<HTMLButtonElement>("[data-about-open]")!,
  };
}

describe("initAboutModal controller", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  });

  it("opens the dialog when the trigger is clicked", () => {
    const { dialog, openBtn } = mount();
    openBtn.click();
    expect(dialog.hasAttribute("open")).toBe(true);
  });

  it("returns focus to the trigger when closed with the close button", () => {
    const { dialog, openBtn } = mount();
    openBtn.click();
    dialog.querySelector<HTMLButtonElement>("[data-about-close]")!.click();

    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(openBtn);
  });

  it("returns focus to the trigger when closed with Escape", () => {
    const { dialog, openBtn } = mount();
    openBtn.click();
    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(openBtn);
  });
});
