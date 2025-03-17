import BasePage from '../../framework/page/BasePage.js'
import { Label } from '../../framework/elements/index.js'

class ItemPage extends BasePage {
    constructor() {
        super(new Label('//*[@id = "largeiteminfo_warning"]', 'Item Info Warning'), 'Item Page');
        
        this.gameNameInfo = new Label('//*[contains(@id, "info_game_name")]', 'Game Name Info Label');
        this.heroInfo = new Label('//*[contains(text(), "Used By:") and @class = "descriptor"]', 'Hero Info Label');
        this.rarityInfo = new Label('//*[contains(@id, "info_item_type")]', 'Rarity Info Label');
    }

    async isItemInfoCorrectForSelectedFilters(tags) {
        const gameText = await this.gameNameInfo.getText();
        const heroText = await this.heroInfo.getText();
        const rarityText = await this.rarityInfo.getText();
        const infoTexts = [gameText, heroText, rarityText];
        return tags.every((tag, index) => infoTexts[index].includes(tag));
    }  
}   

export default new ItemPage();