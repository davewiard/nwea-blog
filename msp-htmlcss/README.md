# My Stock Portfolio :: HTML | CSS | JavaScript

## Background

I started this project as a way of learning about HTML5, CSS3, and JavaScript so I deliberately chose not to use any additional frameworks or libraries that would "simplify" the project. Some of the core requirements of the project were:

* The page had to be a mobile-first responsive design
* No external libraries (e.g. Bootstrap) or frameworks (e.g. Angular.js, React.js) would be used
* The back-end API would be written in PHP
  * The PHP back-end was destined to be replaced but I originally did not know what it would be replaced with
  * I am still using the PHP back-end and have not yet decided on exactly what to use as a replacement
* The database would be MariaDB
  * After successfully implementing MariaDB as the database I swapped it out with PostgreSQL
* The data would be retrieved asynchronously via promises
* The data would be displayed in Material-like cards
* The cards would expand from minimal data to more complete data when clicked/tapped
* The expanded card would show a line chart of the day's performance
* The page needed to have a way to enter new trade/transaction data
  * When adding a new symbol, the symbol name would come from a 3rd party API
* The current quote data (used for calculating gains/losses) would come from a 3rd party API
  * The first version got data from Yahoo! Finance until they shut down their public API
  * The second version got data from Alpha Vantage but I had issues with stability
  * The third (and current) version gets data from IEX Trading
* A login page would be created/used eventually but as this is a personal project with limited external visibility I decided to make the login page a low priority item
