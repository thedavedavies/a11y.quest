import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scan(page: Page): Promise<string[]> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze();
  return results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`);
}

test.describe("real-browser accessibility (axe-core, WCAG 2.2 AA incl. contrast)", () => {
  test("initial unanswered page has no violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-card]")).toBeVisible();
    expect(await scan(page)).toEqual([]);
  });

  test("the answer-feedback state has no violations", async ({ page }) => {
    await page.goto("/");
    await page.locator('input[name="answer"]').first().check();
    await page.locator('[data-action="check"]').click();
    await expect(page.locator("[data-feedback]")).toBeVisible();
    expect(await scan(page)).toEqual([]);
  });
});
