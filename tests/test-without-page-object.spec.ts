import { expect, test } from "@playwright/test";

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

test("Should add products to cart", async ({ page }) => {
  await page.goto(process.env.URL);

  await page.click("text=Login");
  await page.fill(
    'xpath=//label[text()="Username"]/parent::div/following-sibling::div/input',
    userName
  );
  await page.fill('input[type="password"]', password);
  await page.click("button#login");
  await page.locator("text=Cart").waitFor();

  await page.click('text=CBP Marketplace');
  await page.click("#go-to-product-details-1");
  await page.click("#add-to-cart");
  await expect(page.locator("#cart-count")).toHaveText("1");

  await page.click("#go-back");
  await page.click("#go-to-product-details-5");
  await page.click("#add-to-cart");
  await expect(page.locator("#cart-count")).toHaveText("2");

  await page.click("#go-to-cart");

  const cartTotal = await page.locator("#cart-total").innerText();
  expect(cartTotal).toBe("Total: 804.95");
});
