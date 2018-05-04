<?php

	require_once('functions.php');

	/* retrieve POST data into local variables */
	$trade_date = $_POST['trade_date'];
	$symbol = $_POST['symbol'];
	$sector = $_POST['sector'];
	$brokerName = $_POST['broker'];
	$portfolioName = $_POST['portfolio'];
	$shares = $_POST['shares'];
	$pricePerShare = $_POST['price_per_share'];
	$pretax = $_POST['pretax'];

	/* global scope variables */
	$db = openDatabaseConnection();

	/* insert the broker name if it doesn't already exist */
	$brokers = getBrokerData($db);
	if (inArrayOfArrays($brokers, $brokerName) === false) {
		/* broker is not already in the database */
		$result = putBroker($db, $brokerName);
	}

	/* insert the portfolio name if it doesn't already exist */
	$portfolios = getPortfolioData($db);
	if (inArrayOfArrays($portfolios, $portfolioName) === false) {
		/* portfolio is not already in the database */
		$result = putPortfolio($db, $portfolioName);
	}

	/* insert the sector name if it doesn't already exist */
	$sectors = getSectorData($db);
	if (inArrayOfArrays($sectors, $sector) === false) {
		/* sector is not already in the database */
		$result = putSector($db, $sector);
	}

	/* insert the symbol if it doesn't already exist */
	$symbols = getSymbolData($db);
	if (inArrayOfArrays($symbols, $symbol) === false) {
		/* symbol is not already in the database */
		$url = 'https://api.iextrading.com/1.0/stock/' . $symbol . '/quote';
		$quote_json = file_get_contents($url);
		$quote = json_decode($quote_json, true);
		$name = $quote['companyName'];
		$result = putSymbol($db, $symbol, $name);
	}

	// get the ID of the broker
	$brokerRow = getBroker($db, $brokerName);
	$broker_id = $brokerRow['id'];

	// get the ID of the portfolio
	$portfolioRow = getPortfolio($db, $portfolioName);
	$portfolio_id = $portfolioRow['id'];

	// get the ID of the sector
	$sectorRow = getSector($db, $sector);
	$sector_id = $sectorRow['id'];

	// get the ID of the symbol
	$symbolRow = getSymbol($db, $symbol);
	$symbol_id = $symbolRow['id'];

	putTrade($db, $trade_date, $shares, $pricePerShare, $pretax,
				$broker_id, $sector_id, $symbol_id, $portfolio_id);

	closeDatabaseConnection($db);

 //  var_dump($_POST);

?>
