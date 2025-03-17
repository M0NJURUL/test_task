import BasePage from '../../framework/page/BasePage.js'
import { Label, Button } from '../../framework/elements/index.js'

class mainPage extends BasePage {
    constructor() {
        super(new Label('//div[contains(@class, "home_featured")]', 'Home Featured Games'), 'Main Page');
        
        this.community = new Label('//*[contains(text(), "COMMUNITY")]', 'Community Label');
        this.communityMarket = new Label('(//*[contains(text(), "Market") and @class = "submenuitem"])[2]', 'Community Market Label');
    }

    async clickCommunityMarket() {
        await this.community.moveTo();
        await this.communityMarket.click();
    }
}

export default new mainPage();