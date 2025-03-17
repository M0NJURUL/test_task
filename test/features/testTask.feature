Feature: Steam Community Market item search

  Background: 
    Given I open "main page"
    Then Main page is opened
    When I navigate to Community Market
    Then Community Market page is opened
    When I click "Show advanced options"
    Then Window with advanced options is displayed

  Scenario: Search for items with specific filters
    When I select game "Dota 2"
    And I select hero "Phantom Assassin"
    And I select rarity "Rare"
    When I click on "Search"
    Then Table with results is loaded
    And Correct tags "Dota 2, Phantom Assassin, Rare" in "Showing results for" are displayed    
    When I click first item
    Then Item page is opened
    And Item info "Dota 2, Phantom Assassin, Rare" is correct for selected filters

  Scenario: Sort prices and validate order
    When I select game "Dota 2"
    And I select hero "Anti-Mage"
    And I select rarity "Uncommon"
    When I click on "Search"
    Then Table with results is loaded
    And Correct tags "Dota 2, Phantom Assassin, Rare" in "Showing results for" are displayed    
    When I sort price by ascending order
    Then Prices are sorted in correct order "ascending"
    When I sort price by descending order
    Then Prices are sorted in correct order "descending"
