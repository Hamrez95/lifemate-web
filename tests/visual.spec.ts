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
  await page.evaluate(async () => {
    const max = document.documentElement.scrollHeight;
    for (let y = 0; y < max; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 35));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete), undefined, { timeout: 10_000 });
  await expect(page.locator("main")).toBeVisible();
  const brokenImages = await page.locator("img").evaluateAll((images) =>
    images
      .map((image) => image as HTMLImageElement)
      .filter((image) => image.naturalWidth === 0)
      .map((image) => image.getAttribute("src"))
  );
  expect(brokenImages, `Broken images: ${brokenImages.join(", ")}`).toEqual([]);
}

test("capture core visual QA matrix", async ({ page }) => {
  test.setTimeout(180_000);
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
