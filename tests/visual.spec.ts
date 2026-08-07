import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const visualDir = join(process.cwd(), "test-results", "visual");
const corePages = ["fa", "fa/wellmate", "fa/caremate", "fa/ecosystem"] as const;
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

async function ready(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main")).toBeVisible();
}

test("capture core visual QA matrix", async ({ page }) => {
  await mkdir(visualDir, { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });

  for (const route of corePages) {
    const slug = route.replaceAll("/", "-");
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`/${route}`);
      await ready(page);
      await page.screenshot({ path: join(visualDir, `${slug}-${viewport.name}-light.png`), fullPage: true, animations: "disabled" });
    }

    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/${route}`);
    await ready(page);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.screenshot({ path: join(visualDir, `${slug}-desktop-dark.png`), fullPage: true, animations: "disabled" });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  }
});
