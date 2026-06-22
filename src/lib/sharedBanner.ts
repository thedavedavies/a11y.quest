import { sharedBanner } from "../components/SharedBanner/SharedBanner";
import { decodeRun, SHARE_PARAM } from "./shareCode";

export function initSharedBanner(root: Document = document): void {
  const view = root.defaultView ?? window;
  const params = new URLSearchParams(view.location.search);
  const run = decodeRun(params.get(SHARE_PARAM));
  if (!run || run.answered <= 0) return;

  const main = root.getElementById("main");
  if (!main) return;

  const host = root.createElement("div");
  host.innerHTML = sharedBanner(run);
  const banner = host.firstElementChild as HTMLElement | null;
  if (!banner) return;
  main.insertBefore(banner, main.firstChild);

  params.delete(SHARE_PARAM);
  const query = params.toString();
  const cleanUrl = view.location.pathname + (query ? `?${query}` : "") + view.location.hash;
  try {
    view.history.replaceState(view.history.state, "", cleanUrl);
  } catch {}

  const focusQuiz = (): void => {
    const firstRadio = root.querySelector<HTMLInputElement>('[data-quiz] input[name="answer"]');
    (firstRadio ?? main).focus();
  };

  const dismiss = (then: () => void): void => {
    then();
    banner.remove();
  };

  banner
    .querySelector<HTMLElement>("[data-shared-start]")
    ?.addEventListener("click", () => dismiss(focusQuiz));
  banner
    .querySelector<HTMLElement>("[data-shared-dismiss]")
    ?.addEventListener("click", () => dismiss(() => main.focus()));
}
