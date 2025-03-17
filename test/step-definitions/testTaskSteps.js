import { assert } from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework'
import Browser from '../../framework/browser/Browser.js'
import MainPage from '../page-objects/mainPage.js';
import CommunityMarketPage from '../page-objects/communityMarketPage.js';
import ItemPage from '../page-objects/itemPage.js';

const mainPageURL = 'https://store.steampowered.com/';

Given(/^I open "main page"$/, async() => {
    await Browser.openUrl(mainPageURL);
});

Then(/^Main page is opened$/, async() => {
    assert.isTrue(await MainPage.isPageOpened(), 'Main page is not opened');
});

When(/^I navigate to Community Market$/, async() => {
    await MainPage.clickCommunityMarket();
});

Then(/^Community Market page is opened$/, async() => {
    assert.isTrue(await CommunityMarketPage.isPageOpened(), 'Community Market page is not opened');
});

When(/^I click "Show advanced options"$/, async() => {
    await CommunityMarketPage.clickShowAdvancedOptions(); 
});

Then(/^Window with advanced options is displayed$/, async() => {
    assert.isTrue(await CommunityMarketPage.isAdvancedOptionsWindowDisplayed(), 'Window with advanced options is not displayed');
});

When(/^I select game "(.*)"$/, async(game_name) => {
    await CommunityMarketPage.selectGame(game_name);
});

When(/I select hero "(.*)"/, async(hero) => {
    await CommunityMarketPage.selectHero(hero);
});

When(/I select rarity "(.*)"/, async(rarity) => {
    await CommunityMarketPage.selectRarity(rarity);
});

When(/I click on "Search"/, async() => {
    await CommunityMarketPage.clickSearch();
});

Then(/^Table with results is loaded$/, async() => {
    assert.isTrue(await CommunityMarketPage.isTableWithResultsDisplayed(), 'Table with results is not loaded');
})

Then(/^Correct tags "(.*)", "(.*)", and "(.*)" in "Showing results for" are displayed$/, async(game, hero, rarity) => {
    assert.isTrue(await CommunityMarketPage.areCorrectTagsDisplayed(game, hero, rarity), 'Correct tags in "Showing results for" are not displayed');
});

When(/^I click first item$/, async() => {
    await CommunityMarketPage.clickFirstItem();
});

Then(/^Item page is opened$/, async() => {
    assert.isTrue(await ItemPage.isPageOpened(), 'Item page is not opened')
});

Then(/^Item info "(.*)", "(.*)", and "(.*)" is correct for selected filters$/, async(game, hero, rarity) => {
    assert.isTrue(await ItemPage.isItemInfoCorrectForSelectedFilters(game, hero, rarity), 'Item info is not correct for selected filters')
});

When(/^I sort price by (.*) order$/, async(order) => {
    await CommunityMarketPage.sortByPrice(order);
});

Then(/^Prices are sorted in correct order "(.*)"$/, async(order) => {
    assert.isTrue(await CommunityMarketPage.isPriceSortedInCorrectOrder(order), 'Prices are not sorted in correct order')
});