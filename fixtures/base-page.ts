import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { ProductDetailPage } from '../pages/product-detail-page';
import { CartPage } from '../pages/cart-page';

export const test = baseTest.extend<{
    loginPage: LoginPage;
    productPage: ProductPage;
    productDetailPage: ProductDetailPage;
    cartPage: CartPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
})

export { expect } from '@playwright/test';