import { expect, test } from "@playwright/test";

test.describe.configure({ mode: 'serial' });

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

test("Should add products to cart", async ({ page }) => {
  await page.goto(
    "https://e-commerce-microfronend-63d7f9bae764.herokuapp.com/products/"
  );

  await page.click("text=Login");
  await page.fill(
    'xpath=//label[text()="Username"]/parent::div/following-sibling::div/input',
    "donero"
  );
  await page.fill('input[type="password"]', "ewedon");
  await page.click("button#login");
  await page.locator("text=Cart").waitFor();

  await page.click("#go-to-product-details-1");
  await page.click("#add-to-cart");
  await expect(page.locator("#cart-count")).toHaveText("2");

  await page.click("#go-back");

  await page.click("#go-to-product-details-5");
  await page.click("#add-to-cart");
  await expect(page.locator("#cart-count")).toHaveText("2");

  await page.click("#go-to-cart");

  expect(page.url()).toContain(
    "https://e-commerce-microfronend-63d7f9bae764.herokuapp.com/cart/"
  );

  const cartTotal = await page.locator("#cart-total").innerText();
  expect(cartTotal).toBe("Total: 804.95");
});
