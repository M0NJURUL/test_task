Feature: Steam Community Market item search

  Background: 
    Given I open 'https://store.steampowered.com/'
    Then Main page is opened
    When I navigate to Community Market
    Then Community Market page is opened
    When I click "Show advanced options"
    Then Window with advanced options is displayed

  Scenario Outline:
    When I select game "<game name>"
    And I select hero "<hero>"
    And I select rarity "<rarity>"
    When I click on "Search"
    Then Table with results is loaded
    And Correct tags "<game name>", "<hero>", and "<rarity>" in "Showing results for" are displayed    
    When I click first item
    Then Item page is opened
    And Item info "<game name>", "<hero>", and "<rarity>" is correct for selected filters

  Examples:
    | game name | hero             | rarity   |
    | Dota 2    | Phantom Assassin | Rare     |

  Scenario Outline:
    When I select game "<game name>"
    And I select hero "<hero>"
    And I select rarity "<rarity>"
    When I click on "Search"
    Then Table with results is loaded
    And Correct tags "<game name>", "<hero>", and "<rarity>" in "Showing results for" are displayed
    When I sort price by ascending order
    Then Prices are sorted in correct order "ascending"
    When I sort price by descending order
    Then Prices are sorted in correct order "descending"

  Examples:
    | game name | hero      | rarity   |
    | Dota 2    | Anti-Mage | Uncommon |
