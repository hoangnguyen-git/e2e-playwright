import { test, expect, type Page, type Locator } from '@playwright/test';

export class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
  
    constructor(page: Page) {
      this.username = page.locator('xpath=//label[text()="Username"]/parent::div/following-sibling::div/input');
      this.password = page.locator('input[type="password"]');
      this.loginButton = page.locator('#login');
    }
  
    async enterUsername(username: string) {
      await this.username.fill(username)
    }

    async enterPassword(password: string) {
      await this.password.fill(password)
    }

    async clickOnLoginButton() {
      await this.loginButton.click();
    }
  
    async login(username: string, password: string) {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickOnLoginButton();
    }
  }