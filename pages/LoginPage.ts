import { test, expect, Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
  
    constructor(page: Page) {
      this.username = page.getByTestId('login-header');
      this.password = page.getByTestId('username');
      this.loginButton = page.getByTestId('submit');
    }
  
    async goto() {
      await test.step('Go to Admin Page', async () => {
        await this.page.goto('/#/admin');
        await expect(this.pageHeader, 'Admin page loaded').toBeVisible();
      });
    }
  
    async login(username: string, password: string) {
      await test.step(`Log in using with username: ${username} and password: ${password}`, async () => {
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.loginButton.click();
      });
    }
  }