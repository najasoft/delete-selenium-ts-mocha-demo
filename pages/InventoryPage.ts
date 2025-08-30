import { By, WebElement } from "selenium-webdriver";
import { BrowsWrapper } from "../lib/browser";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage{
   
    constructor (protected browser:BrowsWrapper){
        super(browser);
    }

    // Locators
    private readonly appLogo=By.css(".app_logo");
    private readonly productsLocator = By.css("button[data-test='add-to-cart-sauce-labs-backpack']");
    
    private readonly cartBadge = By.css("span[data-test='shopping-cart-badge']");
    private readonly menuIcon = By.css("button#react-burger-menu-btn");
    private readonly logoutBtn=By.css("a[data-test='logout-sidebar-link'");

    public async waitIsPresent():Promise<string>{
        const elt=await this.waitVisible(this.appLogo);
        const logo=await elt.getText();
        return logo;
    }
    public async addFirstProductToCart():Promise<void>{
        await this.waitVisible(this.productsLocator);
        const product:WebElement =( await this.browser.findElements(this.productsLocator))[0];
        await this.browser.scrollTo(product);
        await product.click();
    }
  public async   getCartItems(): Promise<number> {
      const badge = await this.waitVisible(this.cartBadge);
      const count:number =  parseInt(await badge.getText());
      return count;
      
    
    }
    public async logoutIsdisplayed(): Promise<boolean>{
        const menu = await this.waitVisible(this.menuIcon);
        await menu.click();
        try {
            const logout = await this.waitVisible(this.logoutBtn);
             return await logout.isDisplayed();
        }
        catch (err) { return false; }
        
       
    }
}