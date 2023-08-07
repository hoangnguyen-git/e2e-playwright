import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly cartTotal: Locator;
  
    constructor(page: Page) {
      this.cartTotal = page.locator('#cart-total');
    }
  }