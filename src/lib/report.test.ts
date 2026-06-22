import { describe, it, expect } from "vitest";
import { GITHUB_REPO } from "./config";
import {
  REPORT_LABEL,
  buildIssueUrl,
  buildReportBody,
  buildReportTitle,
  reportIssueUrl,
  truncate,
  type ReportInput,
} from "./report";
import type { Question } from "../data/questions";

const Q: Question = {
  id: "name-role-value-001",
  topic: "aria",
  difficulty: "medium",
  question: "Which markup gives the control an accessible name?",
  options: ["a", "b", "c", "d"],
  correctIndex: 2,
  explanation: "because",
  refs: [{ label: "APG", url: "https://www.w3.org/WAI/ARIA/apg/" }],
};

const input = (over: Partial<ReportInput> = {}): ReportInput => ({ question: Q, note: "", ...over });

describe("buildIssueUrl", () => {
  it("targets the configured repo's new-issue form", () => {
    const url = buildIssueUrl(GITHUB_REPO, { title: "t", body: "b" });
    expect(url.startsWith(`https://github.com/${GITHUB_REPO}/issues/new?`)).toBe(true);
  });

  it("encodes spaces (%20) and newlines (%0A) in the body", () => {
    const url = buildIssueUrl("o/r", { title: "hi there", body: "line one\nline two" });
    expect(url).toContain("title=hi%20there");
    expect(url).toContain("body=line%20one%0Aline%20two");
  });

  it("encodes each label and joins them with a literal comma", () => {
    const url = buildIssueUrl("o/r", { title: "t", body: "b", labels: ["question-report", "needs triage"] });
    expect(url).toContain("labels=question-report,needs%20triage");
  });

  it("omits the labels parameter when there are none", () => {
    expect(buildIssueUrl("o/r", { title: "t", body: "b" })).not.toContain("labels=");
    expect(buildIssueUrl("o/r", { title: "t", body: "b", labels: [] })).not.toContain("labels=");
  });

  it("never sends a template parameter (our body must win)", () => {
    expect(buildIssueUrl("o/r", { title: "t", body: "b" })).not.toContain("template=");
  });
});

describe("truncate", () => {
  it("leaves short text untouched", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("leaves text exactly at the cap untouched (no ellipsis)", () => {
    expect(truncate("a".repeat(10), 10)).toBe("a".repeat(10));
  });

  it("caps long text and adds a single ellipsis", () => {
    const out = truncate("a".repeat(50), 10);
    expect(out).toHaveLength(10);
    expect(out.endsWith("…")).toBe(true);
  });

  it("trims trailing whitespace before the ellipsis (result may be shorter than max)", () => {
    expect(truncate("abcdefgh     XYZ", 10)).toBe("abcdefgh…");
  });

  it("trims leading and trailing whitespace of the whole input", () => {
    expect(truncate("   hello   ", 10)).toBe("hello");
  });

  it("returns empty for a non-positive max instead of slicing from the end", () => {
    expect(truncate("hello", 0)).toBe("");
    expect(truncate("hello", -3)).toBe("");
  });

  it("never splits a surrogate pair (counts by code point)", () => {
    const out = truncate("😀😀😀😀😀😀", 4);
    expect(Array.from(out)).toHaveLength(4);
    expect(() => encodeURIComponent(out)).not.toThrow();
  });
});

describe("buildReportTitle", () => {
  it("is a stable title built from the question id", () => {
    expect(buildReportTitle(input())).toBe("Question report: name-role-value-001");
  });
});

describe("buildReportBody", () => {
  it("includes the machine fields", () => {
    const body = buildReportBody(input());
    expect(body).toContain("**Question ID:** `name-role-value-001`");
    expect(body).toContain("**Topic:** aria");
    expect(body).toContain("**Difficulty:** medium");
  });

  it("wraps the question excerpt in a fenced code block", () => {
    const body = buildReportBody(input());
    expect(body).toContain("```\nWhich markup gives the control an accessible name?\n```");
  });

  it("includes the note when present and a placeholder when absent", () => {
    expect(buildReportBody(input({ note: "the link 404s" }))).toContain("the link 404s");
    expect(buildReportBody(input({ note: "" }))).toContain("_(none provided)_");
  });

  it("caps a very long note", () => {
    const body = buildReportBody(input({ note: "x".repeat(2000) }));
    expect(body).toContain("…");
    expect(body).not.toContain("x".repeat(600));
  });

  it("widens the fence so a question containing ``` cannot break out of the block", () => {
    const tricky = { ...Q, question: "before\n```\nleaked markdown\n```\nafter" };
    const body = buildReportBody(input({ question: tricky }));
    expect(body).toContain("````\nbefore");
    expect(body).toContain("after\n````");
  });
});

describe("reportIssueUrl", () => {
  it("points at the repo, applies the report label, and stays well under the URL budget", () => {
    const longNote = "y".repeat(500);
    const longQuestion = { ...Q, question: "z".repeat(1000) };
    const url = reportIssueUrl(input({ question: longQuestion, note: longNote }));
    expect(url).toContain(`https://github.com/${GITHUB_REPO}/issues/new?`);
    expect(url).toContain(`labels=${REPORT_LABEL}`);
    expect(url.length).toBeLessThan(2000);
  });

  it("decodes to the composed title and body (end-to-end, not just substrings)", () => {
    const i = input({ note: "the marked answer is off" });
    const params = new URL(reportIssueUrl(i)).searchParams;
    expect(params.get("title")).toBe(buildReportTitle(i));
    const body = params.get("body") ?? "";
    expect(body).toContain("**Question ID:** `name-role-value-001`");
    expect(body).toContain("the marked answer is off");
    expect(params.get("labels")).toBe(REPORT_LABEL);
  });

  it("keeps the URL under budget and never throws for multibyte notes (CJK, emoji)", () => {
    for (const note of ["世界".repeat(400), "😀".repeat(400)]) {
      let url = "";
      expect(() => {
        url = reportIssueUrl(input({ note }));
      }).not.toThrow();
      expect(url.length).toBeLessThan(2000);
    }
  });
});
