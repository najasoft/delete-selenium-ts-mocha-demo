import { By, WebElement } from "selenium-webdriver";
import { BrowsWrapper } from "../lib/browser";

export class BasePage{
    constructor(protected browser:BrowsWrapper){

    }

   public  async waitVisible (locator:By,timeout?:number):Promise<WebElement>{
        return await this.browser.waitVisible(locator,timeout);

    }
    
public async find(locator:By):Promise<WebElement>{
    return await this.browser.find(locator);
}

public async type (locator:By,text:string):Promise<void>{
  const elt=  await this.browser.find(locator);
  await elt.sendKeys(text);

}

public async click (locator:By):Promise<void>{
    await this.browser.click(locator);
}

public async getTitle():Promise<string>{
    const title=await this.browser.getTitle();
    return title;
}
public async getCurrentUrl():Promise<string>{
return await this.browser.getUrl();
}

}