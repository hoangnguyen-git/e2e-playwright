import { test, expect } from "../fixtures/base-page";
// import { expect } from "@playwright/test";

const userName = process.env.USERNAME!;
const password = process.env.PASSWORD!;

test.describe.configure({ mode: "serial" });

test("Delete all items in the cart", async ({ request }) => {
  const allItems = await request.get("/items");
  expect(allItems.ok()).toBeTruthy();
  expect(allItems.status()).toBe(200);
  const items = Object(await allItems.json()).length;
  for (let i = 1; i <= items; i++) {
    const deleteItem = await request.delete(`/items/${i}`);
    expect(deleteItem.ok()).toBeTruthy();
  }
});

test("Should add products to cart", async ({ page, loginPage, productDetailPage, productPage, cartPage }) => {
  await productPage.goTo(process.env.URL);

  await productPage.clickOnLogin();
  await loginPage.login(userName, password);
  await productPage.waitForProductPageLoad();

  await productPage.clickOnMarketPlace();
  await productPage.clickOnProduct(1);
  await productDetailPage.addToCart();
  await expect(productDetailPage.cartCount).toHaveText("1");
  await productDetailPage.goBack();
  await productPage.clickOnProduct(5);
  await productDetailPage.addToCart();
  await expect(productDetailPage.cartCount).toHaveText("2");

  await productDetailPage.goToCart();

  expect(page.url()).toContain("/cart/");
  expect(await cartPage.cartTotal.innerText()).toBe("Total: 804.95");
});
