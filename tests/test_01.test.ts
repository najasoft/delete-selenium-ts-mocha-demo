import { expect } from "chai";
import { config } from "../config";
import { BrowsWrapper } from "../lib/browser";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

describe("Test 01", () => {
  let browser: BrowsWrapper;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  before(async () => {
    browser = new BrowsWrapper();
    loginPage = new LoginPage(browser);
    inventoryPage = new InventoryPage(browser);
  });
  after(async () => {
    await browser.quit();
  });
  it("step1", async () => {
    await browser.gotoUrl(config.baseUrl);
    await loginPage.login(config.userName, config.password);
    await inventoryPage.waitIsPresent();
  });
  it("step 2: title", async () => {
    const expectedTitle = "Swag Labs";
    const title = await inventoryPage.getTitle();
    expect(title, ` ${expectedTitle} is expected, but got ${title}`).equal(
      expectedTitle
    );
  });
  it("step 3 : current URL", async () => {
    const url = await inventoryPage.getCurrentUrl();
    expect(url, `${url} must contains inventory`).contains("inventory");
  });
  it("step 4: add products to cart", async () => {
    await inventoryPage.addFirstProductToCart();
  });
    it("step 5: Verify cart items count", async () => {
        const cartCount: number = await inventoryPage.getCartItems();
        expect(cartCount, `One item in cart is expected, but got ${cartCount}`).equals(1);
    });
});
