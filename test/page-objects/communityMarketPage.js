import BasePage from '../../framework/page/BasePage.js'
import { Label, Button, Dropdown, Checkbox, Table } from '../../framework/elements/index.js'
import Browser from '../../framework/browser/Browser.js';

class CommunityMarketPage extends BasePage {
    constructor() {
        super(new Label('//*[@class = "market_title_text"]', 'Community Market Title'), 'Community Market Page');
        
        this.showAdvancedOptions = new Label('//*[contains(@class, "advanced_button")]', 'Show Advanced Options Label');
        this.advancedOptionsWindow = new Label('//*[@id = "market_advancedsearch_dialog"]', 'Advanced Options Window Label');
        this.gameList = new Label('//*[@id = "market_advancedsearch_appselect"]', 'Game List Label');
        this.gameOption = (game_name) => new Label(`//div[contains(@class, "menu_item")]//span[contains(text(), "${game_name}")]`, 'Game Option Label');
        this.heroList = new Dropdown('//select[contains(@name, "Hero")]', 'Hero List Dropdown');
        this.rarityCheckbox = (rarity) => new Checkbox(`//*[contains(@id, "${rarity}")]`, 'Rarity Checkbox');
        this.searchButton = new Button('//div[contains(@class, "btn")]//span[contains(text(), "Search")]', 'Search Button');
        this.tableWithResults = new Table('//*[@id = "searchResultsTable"]', 'Table With Results');
        this.gameNameTag = new Label('//*[@class = "market_searchedForTerm"][1]', "Game Name Tag Label");
        this.heroTag = new Label('//*[@class = "market_searchedForTerm"][2]', "Hero Tag Label");
        this.rarityTag = new Label('//*[@class = "market_searchedForTerm"][3]', "Rarity Tag Label");
        this.firstItem = new Label('//*[@id = "resultlink_0"]', 'First Item Label');
        this.sortPrice = new Label('//div[@data-sorttype="price"]', 'Sort Price Label');
        this.normalPrice = new Label('//span[@class="normal_price"]', 'Normal Price Label');
        this.clickCount = 0;
    }
    
    async clickShowAdvancedOptions(){
        await this.showAdvancedOptions.click();
    }

    async isAdvancedOptionsWindowDisplayed() {
        await this.advancedOptionsWindow.state().waitForDisplayed();
        return (await this.advancedOptionsWindow.state().isDisplayed());
    }

    async selectGame(game_name) {
        await this.gameList.click();
        await this.gameOption(game_name).click();
    }

    async selectHero(hero) {
        await this.heroList.selectOptionByText(hero);
    }

    async selectRarity(rarity){
        await this.rarityCheckbox(rarity).click();
    }

    async clickSearch() {
        await this.searchButton.click();
    }

    async isTableWithResultsDisplayed() {
        await this.tableWithResults.state().waitForDisplayed();
        return (await this.tableWithResults.state().isDisplayed());
    }

    async areCorrectTagsDisplayed(tags) {
        const gameNameTagText = (await this.gameNameTag.getText()).trim();
        const heroTagText = (await this.heroTag.getText()).trim();
        const rarityTagText = (await this.rarityTag.getText()).trim();
        const tagTexts = [gameNameTagText, heroTagText, rarityTagText];
        return tags.every((tag, index) => tagTexts[index] === tag);
    }

    async clickFirstItem() {
        await this.firstItem.click();
    }

    async sortByPrice(order = 'ascending') {
        const isAscending = this.clickCount % 2 === 1;
        const isDescending = this.clickCount % 2 === 0;
        if ((order === 'ascending' && !isAscending) || (order === 'descending' && !isDescending)) {
            await browser.$(this.sortPrice.locator).click();
            this.clickCount++;
        }
    }
    
    async isPriceSortedInCorrectOrder(order = 'ascending') {
        await Browser.waitForDelay(3000);
        let priceElements = await $$(this.normalPrice.locator);
        let prices = [];
        for (const element of priceElements) {
            prices.push(await element.getText());
        } 
        let numericPrices = prices.map(price => parseFloat(price.replace('$', '').replace('USD', '').trim()));
        let correctness = numericPrices.every((price, index, arr) => {
            if (index === 0) return true;
            if (order === 'ascending') {
                return price >= arr[index - 1]; 
            } 
            else {
                return price <= arr[index - 1]; 
            }
        });
        return correctness;
    }  
}

export default new CommunityMarketPage();