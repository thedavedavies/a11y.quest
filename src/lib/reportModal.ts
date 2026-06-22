import { questions } from "../data/questions";
import { reportIssueUrl, type ReportInput } from "./report";
import { lockScroll } from "./scrollLock";

export function initReportModal(root: ParentNode = document): void {
  const quiz = root.querySelector<HTMLElement>("[data-quiz]");
  const dialog = root.querySelector<HTMLDialogElement>("[data-report-modal]");
  if (!quiz || !dialog || typeof dialog.showModal !== "function") return;

  const link = dialog.querySelector<HTMLAnchorElement>("[data-report-link]");
  const noteEl = dialog.querySelector<HTMLTextAreaElement>("[data-report-note]");

  const byId = new Map(questions.map((q) => [q.id, q] as const));

  let active = false;
  let currentId: string | null = null;
  let trigger: HTMLElement | null = null;
  let unlock: (() => void) | null = null;

  function currentInput(): ReportInput | null {
    const question = currentId ? byId.get(currentId) : undefined;
    if (!question) return null;
    return { question, note: noteEl?.value ?? "" };
  }

  function refreshLink(): void {
    const input = currentInput();
    if (!input || !link) return;
    try {
      link.href = reportIssueUrl(input);
    } catch {}
  }

  function open(triggerEl: HTMLElement, questionId: string): void {
    if (dialog!.open) return;
    active = true;
    currentId = questionId;
    trigger = triggerEl;
    if (noteEl) noteEl.value = "";
    refreshLink();
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
    currentId = null;
    triggerEl?.focus?.();
  }

  function requestClose(): void {
    dialog!.close();
    cleanup();
  }

  quiz.addEventListener("click", (event) => {
    const flag = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-action="flag"]');
    if (!flag) return;
    const id = flag.closest<HTMLElement>("[data-card]")?.dataset.questionId;
    if (id && byId.has(id)) open(flag, id);
  });

  noteEl?.addEventListener("input", refreshLink);

  dialog.querySelectorAll<HTMLElement>("[data-report-close]").forEach((el) =>
    el.addEventListener("click", requestClose),
  );

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") requestClose();
  });

  dialog.addEventListener("close", cleanup);
}
