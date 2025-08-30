import { By } from "selenium-webdriver";
import { BrowsWrapper } from "../lib/browser";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    constructor(protected browser:BrowsWrapper){
        super(browser);
    }

    // Locators
    private readonly userNameField=By.css("#user-name");
    private readonly passwordField=By.css("#password");
    private readonly loginButton=By.css("#login-button");


    public async login(username:string,password:string):Promise<void>{
        await this.type(this.userNameField,username);
        await this.type(this.passwordField,password);
        await this.click(this.loginButton);

    }
}