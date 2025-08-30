
import {Browser, Builder, By, ThenableWebDriver, WebElement, until} from "selenium-webdriver";
import  chrome  from "selenium-webdriver/chrome";
import { config } from "../config";
export class BrowsWrapper {
    private readonly driver:ThenableWebDriver;
    private readonly defaultTimeout=config.defaultTimeout;
    constructor(){
        const options = new chrome.Options();
        options.addArguments("--start-maximizedf");
        const builder =new Builder().forBrowser(Browser.CHROME);
        builder.setChromeOptions(options);
        this.driver=builder.build();        
    }

    public async gotoUrl(url:string):Promise<void>{
        await this.driver.get(url);
    }

    public async waitVisible(locator:By,timeout=this.defaultTimeout):Promise<WebElement>{
        const elt=await this.driver.wait(until.elementLocated(locator),this.defaultTimeout);
        await this.driver.wait(until.elementIsVisible(elt),this.defaultTimeout)
        return elt;
    }
    public async quit():Promise <void>{
        await this.driver.quit();
    }

    public async find(locator:By):Promise<WebElement>{
        const elt=await this.waitVisible(locator);
        return elt;
    }

    public async type (locator:By,text:string):Promise<void>{
        const elt= await this.find(locator);
        await elt.sendKeys(text);
    }
    public async click (locator:By):Promise<void>{
        const elt=await this.waitVisible(locator);
        await elt.click();
    }


}