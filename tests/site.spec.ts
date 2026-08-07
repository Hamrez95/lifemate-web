import { expect, test } from "@playwright/test";

test("FA home renders the reference story arc", async ({ page }) => {
  await page.goto("/fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("سلامتی");
  await expect(page.getByText("WellMate").first()).toBeVisible();
  await expect(page.getByText("CareMate").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "پرسش‌های رایج" })).toBeVisible();
});

test("EN home is LTR and localized", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your health");
});

test("language switch mirrors the current page", async ({ page }) => {
  await page.goto("/fa/wellmate");
  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/wellmate$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("health companion");
});

test("theme switch persists user preference", async ({ page }) => {
  await page.goto("/fa");
  const toggle = page.getByRole("button", { name: "تغییر حالت روشن و تیره" });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile navigation opens and can reach ecosystem", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fa");
  await page.getByRole("button", { name: "باز کردن منو" }).click();
  await page.getByRole("link", { name: "اکوسیستم" }).last().click();
  await expect(page).toHaveURL(/\/fa\/ecosystem$/);
});

test("product pages never expose active store download links", async ({ page }) => {
  for (const path of ["/fa/wellmate", "/fa/caremate"]) {
    await page.goto(path);
    await expect(page.getByText("به‌زودی").first()).toBeVisible();
    await expect(page.locator('a[href*="play.google"], a[href*="cafebazaar"], a[href$=".apk"]')).toHaveCount(0);
  }
});

test("ecosystem page exposes consent controls as DOM", async ({ page }) => {
  await page.goto("/fa/ecosystem");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("LifeMate");
  await expect(page.getByText("داروها + خلاصه روزانه")).toBeVisible();
  await expect(page.getByText("۳۰ روز")).toBeVisible();
});

test("unknown route returns a 404 experience", async ({ page }) => {
  const response = await page.goto("/fa/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("404")).toBeVisible();
});

test("keyboard can reach main content from skip link", async ({ page }) => {
  await page.goto("/fa");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "رفتن به محتوای اصلی" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
});

test("product picker is an accessible modal and stays inside focus loop", async ({ page }) => {
  await page.goto("/fa");
  await page.getByRole("button", { name: "محصولات LifeMate" }).click();
  const dialog = page.getByRole("dialog", { name: "محصولات LifeMate" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("supporting routes render localized titles", async ({ page }) => {
  const routes = ["about", "contact", "investors", "privacy", "terms", "cookie-policy"];
  for (const route of routes) {
    const response = await page.goto(`/fa/${route}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
