
import { expect } from "chai";
import  {config}  from "../config";
import { BrowsWrapper } from "../lib/browser";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

describe("Test 01",()=>{
    let browser:BrowsWrapper;
    let loginPage:LoginPage;
    let inventoryPage:InventoryPage;
before(
    async ()=>{
        browser =new BrowsWrapper();
        loginPage=new LoginPage(browser);
        inventoryPage=new InventoryPage(browser);
      
    }
);
after(async ()=>{
    await browser.quit();
});
it ("step1",async ()=>{
    await browser.gotoUrl(config.baseUrl);
    await loginPage.login(config.userName,config.password);
    const logo= await inventoryPage.waitIsPresent();
    const expectedLogo="Swag Labs";
    expect(logo,` ${expectedLogo} is expected, but got ${logo}`).equal(expectedLogo);
    

});

});