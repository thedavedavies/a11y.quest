import { decodeRun } from "../src/lib/shareCode";
import { accuracy } from "../src/lib/run";

class SetAttr {
  constructor(
    private attr: string,
    private value: string,
  ) {}
  element(el: Element): void {
    el.setAttribute(this.attr, this.value);
  }
}

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("s");
  const response = await next();

  const isDocument = url.pathname === "/" || url.pathname === "/index.html";
  const isHtml = (response.headers.get("content-type") ?? "").includes("text/html");
  if (!token || !isDocument || !isHtml) return response;

  const run = decodeRun(token);
  if (!run || run.answered <= 0) return response;

  const acc = accuracy(run);
  const ogImage = `${url.origin}/og/score?s=${encodeURIComponent(token)}`;
  const shareUrl = `${url.origin}/?s=${encodeURIComponent(token)}`;
  const title = `${acc}% accuracy on a11y.quest`;
  const description =
    `${acc}% accuracy over ${run.answered} question${run.answered === 1 ? "" : "s"}, ` +
    `${run.correct} correct, best streak ${run.bestStreak}. Can you beat it?`;
  const alt =
    `a11y.quest score card: ${acc}% accuracy, ${run.correct} of ${run.answered} ` +
    `correct, best streak ${run.bestStreak}.`;

  return new HTMLRewriter()
    .on('meta[property="og:image"]', new SetAttr("content", ogImage))
    .on('meta[name="twitter:image"]', new SetAttr("content", ogImage))
    .on('meta[property="og:image:alt"]', new SetAttr("content", alt))
    .on('meta[name="twitter:image:alt"]', new SetAttr("content", alt))
    .on('meta[property="og:title"]', new SetAttr("content", title))
    .on('meta[name="twitter:title"]', new SetAttr("content", title))
    .on('meta[property="og:description"]', new SetAttr("content", description))
    .on('meta[name="twitter:description"]', new SetAttr("content", description))
    .on('meta[property="og:url"]', new SetAttr("content", shareUrl))
    .transform(response);
};
