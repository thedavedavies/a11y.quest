export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Escape first so any markup in the text is inert, then promote `code` spans to
// <code>. Order matters: escaping leaves backticks untouched, and the only raw
// tags in the result are the <code> wrappers we add.
export function renderInlineCode(input: string): string {
  return escapeHtml(input).replace(/`([^`]+)`/g, "<code>$1</code>");
}
