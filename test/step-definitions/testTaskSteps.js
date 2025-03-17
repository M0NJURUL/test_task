import { assert } from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework'
import Browser from '../../framework/browser/Browser.js'
import mainPage from '../page-objects/mainPage.js';
import communityMarketPage from '../page-objects/communityMarketPage.js';
import itemPage from '../page-objects/itemPage.js';

Given(/^I open '(.*)'$/, async(url) => {
    await Browser.openUrl(url);
});

Then(/^Main page is opened$/, async() => {
    assert.isTrue(await mainPage.isPageOpened(), 'Main page is not opened');
});

When(/^I navigate to Community Market$/, async() => {
    await mainPage.clickCommunityMarket();
});

Then(/^Community Market page is opened$/, async() => {
    assert.isTrue(await communityMarketPage.isPageOpened(), 'Community Market page is not opened');
});

When(/^I click "Show advanced options"$/, async() => {
    await communityMarketPage.clickShowAdvancedOptions(); 
});

Then(/^Window with advanced options is displayed$/, async() => {
    assert.isTrue(await communityMarketPage.isAdvancedOptionsWindowDisplayed(), 'Window with advanced options is not displayed');
});

When(/^I select game "(.*)"$/, async(game_name) => {
    await communityMarketPage.selectGame(game_name);
});

When(/I select hero "(.*)"/, async(hero) => {
    await communityMarketPage.selectHero(hero);
});

When(/I select rarity "(.*)"/, async(rarity) => {
    await communityMarketPage.selectRarity(rarity);
});

When(/I click on "Search"/, async() => {
    await communityMarketPage.clickSearch();
});

Then(/^Table with results is loaded$/, async() => {
    assert.isTrue(await communityMarketPage.isTableWithResultsDisplayed(), 'Table with results is not loaded');
})

Then(/^Correct tags "(.*)", "(.*)", and "(.*)" in "Showing results for" are displayed$/, async(game, hero, rarity) => {
    assert.isTrue(await communityMarketPage.areCorrectTagsDisplayed(game, hero, rarity), 'Correct tags in "Showing results for" are not displayed');
});

When(/^I click first item$/, async() => {
    await communityMarketPage.clickFirstItem();
});

Then(/^Item page is opened$/, async() => {
    assert.isTrue(await itemPage.isPageOpened(), 'Item page is not opened')
});

Then(/^Item info "(.*)", "(.*)", and "(.*)" is correct for selected filters$/, async(game, hero, rarity) => {
    assert.isTrue(await itemPage.isItemInfoCorrectForSelectedFilters(game, hero, rarity), 'Item info is not correct for selected filters')
});

When(/^I sort price by (.*) order$/, async(order) => {
    await communityMarketPage.sortByPrice(order);
});

Then(/^Prices are sorted in correct order "(.*)"$/, async(order) => {
    assert.isTrue(await communityMarketPage.isPriceSortedInCorrectOrder(order), 'Prices are not sorted in correct order')
});