import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    private page: Page;
    readonly cartTotal: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.cartTotal = page.locator('#cart-total');
    }
  }