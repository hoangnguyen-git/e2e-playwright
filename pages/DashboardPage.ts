import { test, expect, Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly login: Locator;
    readonly cbpMarketPlace: Locator;
    readonly productList: Locator;
  
    constructor(page: Page) {
      this.login = page.getByRole('link', { name: 'Login' });
      this.cbpMarketPlace = page.getByText('CBP Marketplace');
      this.productList = page.locator('li.product_card');
    }
  
    async goto() {
      await test.step('Go to Admin Page', async () => {
        await this.page.goto('/#/admin');
        await expect(this.pageHeader, 'Admin page loaded').toBeVisible();
      });
    }
  
    async login1(username: string, password: string) {
      await test.step(`Log in using with username: ${username} and password: ${password}`, async () => {
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.loginButton.click();
      });
    }
  }