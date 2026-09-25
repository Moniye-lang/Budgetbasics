import { test, expect } from '@playwright/test';

test.describe('AETHER Audio E-Commerce Store Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render page title and navbar brand', async ({ page }) => {
    await expect(page).toHaveTitle(/AETHER/i);
    const brand = page.locator('header a').first();
    await expect(brand).toContainText('AETHER');
  });

  test('hero product customizer updates selected colorway', async ({ page }) => {
    const silverBtn = page.locator('#colorway-btn-space-silver');
    await expect(silverBtn).toBeVisible();
    await silverBtn.click();

    // Check add to cart button text reflects Space Silver
    const addToCartBtn = page.locator('#hero-add-to-cart-btn');
    await expect(addToCartBtn).toContainText('Space Silver');
  });

  test('adding product opens cart drawer with 15-minute retention lock', async ({ page }) => {
    const addToCartBtn = page.locator('#hero-add-to-cart-btn');
    await addToCartBtn.click();

    // Cart drawer should be visible
    const retentionTimer = page.locator('#retention-timer-display');
    await expect(retentionTimer).toBeVisible();
    await expect(retentionTimer).toContainText(/1[4-5]:/);
  });

  test('cart promo code applies discount accurately', async ({ page }) => {
    // Open cart
    const cartBtn = page.locator('#nav-cart-btn');
    await cartBtn.click();

    // Fill promo code
    const promoInput = page.locator('#promo-code-input');
    await promoInput.fill('TASTE20');

    const applyBtn = page.locator('#apply-promo-btn');
    await applyBtn.click();

    await expect(page.locator('text=Promo code applied!')).toBeVisible();
  });

  test('product catalog filters by category and searches items', async ({ page }) => {
    // Click DACs category pill
    const dacPill = page.locator('#category-pill-dacs');
    await dacPill.click();

    await expect(page.locator('#product-card-aether-core-dac')).toBeVisible();

    // Search query
    const searchInput = page.locator('#catalog-search-input');
    await searchInput.fill('Vox');
    await expect(page.locator('#product-card-aether-vox-mic')).toBeVisible();
  });

  test('express checkout flow completes order', async ({ page }) => {
    // Open cart and proceed to checkout
    const cartBtn = page.locator('#nav-cart-btn');
    await cartBtn.click();

    const checkoutBtn = page.locator('#checkout-btn');
    await checkoutBtn.click();

    // Checkout modal is visible
    const submitPaymentBtn = page.locator('#submit-payment-btn');
    await expect(submitPaymentBtn).toBeVisible();
    await submitPaymentBtn.click();

    // Order confirmation
    await expect(page.locator('#order-success-view')).toBeVisible({ timeout: 4000 });
  });
});
