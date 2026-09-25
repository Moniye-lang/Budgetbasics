import { test, expect } from '@playwright/test';

test.describe('Nexus AI DevTools Application Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render page title and navbar brand', async ({ page }) => {
    await expect(page).toHaveTitle(/Nexus AI/);
    const brand = page.locator('header a').first();
    await expect(brand).toContainText('nexus');
  });

  test('hero primary CTA should be visible and clickable', async ({ page }) => {
    const heroCta = page.locator('#hero-primary-cta');
    await expect(heroCta).toBeVisible();
    await heroCta.click();
    await expect(page.locator('#playground')).toBeVisible();
  });

  test('interactive playground should switch presets and run AST synthesis', async ({ page }) => {
    // Check default tab
    const diffTab = page.locator('#playground-tab-diff');
    await expect(diffTab).toBeVisible();

    // Click AST tree tab
    const astTab = page.locator('#playground-tab-ast');
    await astTab.click();
    await expect(page.locator('text=AST Semantic Graph Nodes')).toBeVisible();

    // Switch model to Nexus-v3.4
    const modelBtn = page.locator('#model-select-nexus');
    await modelBtn.click();
    await expect(modelBtn).toHaveClass(/bg-brand-500/);

    // Click Transform & Verify button
    const runBtn = page.locator('#playground-run-btn');
    await runBtn.click();
    await expect(runBtn).toContainText('Analyzing AST...');

    // Wait for synthesis to finish
    await expect(runBtn).toContainText('Transform & Verify', { timeout: 3000 });
  });

  test('CLI terminal should run commands on chip click and text input', async ({ page }) => {
    // Click doctor chip
    const chip = page.locator('#cli-chip-nexus-doctor');
    await chip.click();

    // Terminal should show doctor output
    await expect(page.locator('text=Nexus AST Engine v3.4.2')).toBeVisible();

    // Type custom command into input
    const input = page.locator('#cli-input-field');
    await input.fill('nexus status');
    await input.press('Enter');

    await expect(page.locator('text=Command "nexus status" finished with exit code 0')).toBeVisible();
  });

  test('pricing calculator updates price when seats slider changes', async ({ page }) => {
    const priceDisplay = page.locator('#calculated-price');
    await expect(priceDisplay).toBeVisible();
    const initialPrice = await priceDisplay.innerText();

    // Toggle annual vs monthly
    const monthlyBtn = page.locator('#pricing-toggle-monthly');
    await monthlyBtn.click();
    const updatedPriceMonthly = await priceDisplay.innerText();
    expect(updatedPriceMonthly).not.toEqual(initialPrice);
  });
});
