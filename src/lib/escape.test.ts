import { describe, it, expect } from "vitest";
import { escapeHtml, renderInlineCode } from "./escape";

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`& < > " '`)).toBe("&amp; &lt; &gt; &quot; &#39;");
  });
});

describe("renderInlineCode", () => {
  it("behaves like escapeHtml when there are no backticks", () => {
    expect(renderInlineCode("Use a <button>?")).toBe("Use a &lt;button&gt;?");
  });

  it("promotes a backtick span to a <code> element", () => {
    expect(renderInlineCode("the `tabindex` attribute")).toBe(
      "the <code>tabindex</code> attribute",
    );
  });

  it("escapes markup inside a code span (no raw tags leak through)", () => {
    expect(renderInlineCode("Use `<button>` here")).toBe("Use <code>&lt;button&gt;</code> here");
    expect(renderInlineCode('A `<a href="#">` link')).toBe(
      "A <code>&lt;a href=&quot;#&quot;&gt;</code> link",
    );
  });

  it("handles several spans in one string", () => {
    expect(renderInlineCode("`<nav>` and `<nav>` need names")).toBe(
      "<code>&lt;nav&gt;</code> and <code>&lt;nav&gt;</code> need names",
    );
  });

  it("leaves a lone backtick untouched", () => {
    expect(renderInlineCode("a ` b")).toBe("a ` b");
  });
});
