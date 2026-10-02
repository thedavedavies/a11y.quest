import { ESLint } from "eslint";
import { expect, it } from "vitest";

// eslint-plugin-astro 3 drops every astro/jsx-a11y rule without an error when
// it cannot resolve the a11y plugin, so lint alone would stay green.
it("applies the astro/jsx-a11y rules to .astro files", async () => {
  const [result] = await new ESLint().lintText('<img src="x" />', {
    filePath: "src/pages/probe.astro",
  });
  expect(result.messages.map((m) => m.ruleId)).toContain("astro/jsx-a11y/alt-text");
});
