import type { Question } from "../data/questions";
import { GITHUB_REPO } from "./config";

export const REPORT_LABEL = "question-report";

const MAX_NOTE = 500;
const MAX_QUESTION = 240;
const URL_CEILING = 1900;

export function truncate(text: string, max: number): string {
  if (max <= 0) return "";
  const t = text.trim();
  const chars = Array.from(t);
  if (chars.length <= max) return t;
  return (
    chars
      .slice(0, max - 1)
      .join("")
      .trimEnd() + "…"
  );
}

function longestBacktickRun(text: string): number {
  return (text.match(/`+/g) ?? []).reduce((longest, run) => Math.max(longest, run.length), 0);
}

export interface ReportInput {
  question: Question;
  note: string;
}

export function buildReportTitle({ question }: ReportInput): string {
  return `Question report: ${question.id}`;
}

export function buildReportBody({ question, note }: ReportInput): string {
  const trimmedNote = truncate(note ?? "", MAX_NOTE);
  const excerpt = truncate(question.question, MAX_QUESTION);
  const fence = "`".repeat(Math.max(3, longestBacktickRun(excerpt) + 1));
  return [
    `**Question ID:** \`${question.id}\``,
    `**Topic:** ${question.topic}`,
    `**Difficulty:** ${question.difficulty}`,
    "",
    "**Question (excerpt):**",
    fence,
    excerpt,
    fence,
    "",
    "**Reporter's note:**",
    trimmedNote.length > 0 ? trimmedNote : "_(none provided)_",
    "",
    "---",
    "_Filed from the in-app report flag on a11y.quest._",
  ].join("\n");
}

interface NewIssueParams {
  title: string;
  body: string;
  labels?: string[];
}

export function buildIssueUrl(repo: string, { title, body, labels }: NewIssueParams): string {
  const params = [`title=${encodeURIComponent(title)}`, `body=${encodeURIComponent(body)}`];
  if (labels && labels.length > 0) {
    params.push(`labels=${labels.map((l) => encodeURIComponent(l)).join(",")}`);
  }
  return `https://github.com/${repo}/issues/new?${params.join("&")}`;
}

export function reportIssueUrl(input: ReportInput): string {
  const build = (note: string): string =>
    buildIssueUrl(GITHUB_REPO, {
      title: buildReportTitle(input),
      body: buildReportBody({ ...input, note }),
      labels: [REPORT_LABEL],
    });

  let url = build(input.note ?? "");
  if (url.length <= URL_CEILING) return url;
  const chars = Array.from(input.note ?? "");
  let keep = chars.length;
  while (url.length > URL_CEILING && keep > 0) {
    keep = Math.max(0, keep - 16);
    url = build(chars.slice(0, keep).join(""));
  }
  return url;
}
