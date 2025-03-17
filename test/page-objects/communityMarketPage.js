import BasePage from '../../framework/page/BasePage.js'
import { Label, Button, Dropdown, Checkbox, Table } from '../../framework/elements/index.js'

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
        this.searchTags = new Label('//*[@class = "market_search_results_header"]//a[@class = "market_searchedForTerm"]', 'Search Tags Level');
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
        const tagElements = await this.searchTags.getAllElements();
        let tagTexts = [];
        for (const element of tagElements) {
            tagTexts.push((await element.getText()).trim());
        }
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
        await this.firstItem.state().waitForDisplayed();
        let priceElements = await this.normalPrice.getAllElements();
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