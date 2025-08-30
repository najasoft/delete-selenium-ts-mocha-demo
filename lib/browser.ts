import {
    Browser,
    Builder,
    By,
    ThenableWebDriver,
    WebElement,
    until,
} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { config } from "../config";
import fs from "fs";
import path from "path";
export class BrowsWrapper {
    public async findElements(locator: By):Promise<WebElement[]> {
        return await this.driver.findElements(locator);
    }
    private readonly driver: ThenableWebDriver;
    private readonly defaultTimeout = config.defaultTimeout;
    constructor() {
        const options = new chrome.Options();
       options.addArguments("--headless=new");
        options.addArguments("--start-maximized");
        const builder = new Builder().forBrowser(Browser.CHROME);
        builder.setChromeOptions(options);
        this.driver = builder.build();
    }

    public async gotoUrl(url: string): Promise<void> {
        
        await this.driver.get(url);
    }

    public async waitVisible(
        locator: By,
        timeout = this.defaultTimeout
    ): Promise<WebElement> {
        const elt = await this.driver.wait(
            until.elementLocated(locator),
            this.defaultTimeout
        );
        await this.driver.wait(until.elementIsVisible(elt), this.defaultTimeout);
        return elt;
    }
    public async quit(): Promise<void> {
        await this.driver.quit();
    }

    public async find(locator: By): Promise<WebElement> {
        const elt = await this.waitVisible(locator);
        return elt;
    }

    public async type(locator: By, text: string): Promise<void> {
        const elt = await this.find(locator);
        await elt.sendKeys(text);
    }
    public async click(locator: By): Promise<void> {
        const elt = await this.waitVisible(locator);
        await elt.click();
    }

    public async getTitle():Promise<string>{
        const title=await this.driver.getTitle();
        return title;
    }

    public async getUrl():Promise<string>{
        const url:string=await this.driver.getCurrentUrl();
        return url;
    }
    public async takeScreenshot(fileName?:string): Promise<void>{
        const screenshot = await this.driver.takeScreenshot();
        const name = fileName ? fileName : `scr_${Date.now()}`;
        const filePath=path.join(process.cwd(),`/results/${name}.png`);
        fs.writeFileSync(filePath, screenshot, "base64");
        
    }
    
    public async scrollTo(elt: WebElement): Promise<void>{
        await this.driver.executeScript("arguments[0].scrollIntoView(true)", elt);
        
    }
}
