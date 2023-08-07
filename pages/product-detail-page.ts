import { type Page, type Locator } from "@playwright/test";

export class ProductDetailPage {
  private readonly addToCartButton: Locator;
  private readonly backButton: Locator;
  private readonly cart: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.addToCartButton = page.locator("#add-to-cart");
    this.backButton = page.locator("#go-back");
    this.cartCount = page.locator("#cart-count");
    this.cart = page.locator("#go-to-cart");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async goToCart() {
    await this.cart.click();
  }
}
