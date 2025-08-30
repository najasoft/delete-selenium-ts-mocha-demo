import { By } from "selenium-webdriver";
import { BrowsWrapper } from "../lib/browser";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage{
   
    constructor (protected browser:BrowsWrapper){
        super(browser);
    }

    // Locators
    private readonly appLogo=By.css(".app_logo");
    private readonly productsLocator = By.css("button[data-test='add-to-cart-sauce-labs-backpack'");
    
    private readonly cartBadge = By.css(".shopping_cart_badge");

    public async waitIsPresent():Promise<string>{
        const elt=await this.waitVisible(this.appLogo);
        const logo=await elt.getText();
        return logo;
    }
    public async addFirstProductToCart():Promise<void>{
        const product=await this.waitVisible(this.productsLocator);
        await product.click();
    }
  public async   getCartItems(): Promise<number> {
      const badge = await this.waitVisible(this.cartBadge,10000);
      const count:number =  parseInt(await badge.getText());
      return count;
      
    
    }
}