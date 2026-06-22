import { afterEach, describe, expect, it } from "vitest";
import { reportModal } from "./ReportModal";
import { initReportModal } from "../../lib/reportModal";
import { questions } from "../../data/questions";


const QID = questions[0].id;

function mount(): { dialog: HTMLDialogElement; flag: HTMLButtonElement } {
  document.body.innerHTML =
    `<div data-quiz><div data-card data-question-id="${QID}">` +
    `<button type="button" data-action="flag">flag</button>` +
    `</div></div>` +
    reportModal();

  const dialog = document.querySelector<HTMLDialogElement>("[data-report-modal]")!;
  dialog.showModal = function () {
    this.setAttribute("open", "");
  };
  dialog.close = function () {
    this.removeAttribute("open");
  };
  initReportModal(document);
  return { dialog, flag: document.querySelector<HTMLButtonElement>('[data-action="flag"]')! };
}

describe("initReportModal controller", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
  });

  it("seeds the link for the current question, then rebuilds it as the note changes", () => {
    const { dialog, flag } = mount();
    flag.click();
    const link = dialog.querySelector<HTMLAnchorElement>("[data-report-link]")!;

    expect(decodeURIComponent(link.href)).toContain(`**Question ID:** \`${QID}\``);
    expect(decodeURIComponent(link.href)).toContain("_(none provided)_");

    const note = dialog.querySelector<HTMLTextAreaElement>("[data-report-note]")!;
    note.value = "ref two is dead";
    note.dispatchEvent(new Event("input", { bubbles: true }));
    expect(decodeURIComponent(link.href)).toContain("ref two is dead");
  });

  it("clears the note on each fresh open", () => {
    const { dialog, flag } = mount();

    flag.click();
    dialog.querySelector<HTMLTextAreaElement>("[data-report-note]")!.value = "stale";
    dialog.close();

    flag.click();
    expect(dialog.querySelector<HTMLTextAreaElement>("[data-report-note]")!.value).toBe("");
  });
});
