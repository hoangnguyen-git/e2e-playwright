import { type Page, type Locator } from '@playwright/test';

export class ProductPage {
    private page: Page;
    readonly loginButton: Locator;
    readonly cart: Locator;
    readonly cbpMarket: Locator;
    readonly cartCount: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.locator('text=Login');
      this.cart = page.locator('text=Cart');
      this.cbpMarket = page.locator('text=CBP Marketplace');
      this.cartCount = page.locator('#cart-count');
    }
  
    async clickOnLogin() {
      await this.loginButton.click()
    }

    async waitForProductPageLoad() {
      await this.cart.waitFor()
    }

    async clickOnMarketPlace() {
      await this.cbpMarket.click();
    }

    async getNumberItemsInCart() {
      await this.cartCount.innerText();
    }

    async clickOnProduct(productNumber: number) {
      await this.page.click(`#go-to-product-details-${productNumber}`);
    }
  }