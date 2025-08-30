import { By } from "selenium-webdriver";
import { BrowsWrapper } from "../lib/browser";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage{
    constructor (protected browser:BrowsWrapper){
        super(browser);
    }

    // Locators
    private readonly appLogo=By.css(".app_logo");

    public async waitIsPresent():Promise<string>{
        const elt=await this.waitVisible(this.appLogo);
        const logo=await elt.getText();
        return logo;
    }
}