/*
 * reset the form
 */
function ResetForm() {
  $('#newTradeDate').val('');
  $('#newTradeSymbolInput').val('');
  $('#newTradeSectorInput').val('');
  $('#newTradeBrokerInput').val('Robinhood');
  $('#newTradePortfolioInput').val('Robinhood');
  $('#newTradeShares').val('');
  $('#newTradePricePerShare').val('');
  $('#newTradePreTax').attr('checked', false);
}

$('#newTradeCancel').click(function(e) {
  e.preventDefault();     // don't scroll to the top of the page
  ResetForm();
});


/*
 * Add a class to the given object. If the given value is > 0.00
 * the color will be green, otherwise it will be red.
 */
function setCurrencyTextColor(value, object, colorClass) {
  if (parseFloat(value) > parseFloat(0.00)) {
    object.addClass(colorClass[0]);
  } else {
    object.addClass(colorClass[1]);
  }
} /* setCurrencyTextColor */


let trades = [];
let tradeData = [];

let allTodaysReturn = 0.00;
let allTotalReturn = 0.00;
let allEquityValue = 0.00;


// get trade data
$.ajax({
  url: window.location.protocol + '//' + window.location.host + '/demo/msp-htmlcss/php/trades.php',
  async: false
}).then(function(data) {
  trades = JSON.parse(data);
});

//console.log(trades);


/**
 * loop over all trades, reshape data to make it easier to merge records into
 * single cards
 */
$.each(trades, function(index, trade) {
  let obj = {};

  // determine if the current trade's symbol matches one already in tradeData
  // TODO
  // Refactor this loop as a foreach with a lambda expression + filter
  for (let i = 0; i < tradeData.length; i++) {
    if (trade.symbol_id === tradeData[i].symbol_id) {
//      console.log(tradeData[i]);
      obj = tradeData[i];
      break;
    }
  }

//  console.log(obj);

  if (!obj.hasOwnProperty('symbol_id')) {
    // match symbol_id in trades to id in symbols
    obj.symbol_id = trade.symbol_id;
    obj.symbol_symbol = trade.symbol_symbol;
    obj.symbol_name = trade.symbol_name;

    // match portfolio_id in trades to id in portfolios
    obj.portfolio = trade.portfolio_name;

    // match sector_id in trades to id in sectors
    obj.sector = trade.sector_name;
  }

  // initialize and populate the transaction array if it hasn't been done previously
  if (!obj.hasOwnProperty('transaction')) {
    obj.transaction = [];
    tradeData.push(obj);
  }

  //
  // Create new object specific to a single transaction/trade. This will get
  // appended to an array of transactions/trades per symbol. The effect here
  // is to merge all trades of a symbol name into one object so the trades
  // can be summed into a "symbol total" leaving just one card per symbol.
  //
  let trans = {
    broker_id: trade.broker_id,
    broker_name: trade.broker_name,
    pretax: (trade.pretax === 't') ? true : false,
    pricePerShare: trade.price_per_share,
    shares: trade.shares,
    tradeDate: trade.trade_date
  };

//  console.log(trans);
//  console.log(obj);

  obj.transaction.push(trans);
});


// sort the tradeData array by the symbol
tradeData = tradeData.sort(function(a, b) {
  let x = a.symbol_symbol.toUpperCase();
  let y = b.symbol_symbol.toUpperCase();

  if (x < y) {
    return -1
  } else if (x > y) {
    return 1;
  }

  return 0;
});

//console.log(tradeData);

// loop across all tradeData entries and create cards
$.each(tradeData, function(index, data) {
  let html = '<div class="card [ is-collapsed ]" id="' + data.symbol_symbol + '">';

  html += `
    <div class="card--upper [ js-expander ]">
      <div class="symbol">`;

  html += data.symbol_symbol;

  html += `</div>
      <div class="latest-price bold justify-right">$0.00</div>
      <div class="shares">`;

  let shares = 0;
  for (let i = 0; i < data.transaction.length; i++) {
    shares += parseFloat(data.transaction[i].shares);
  }

  html += shares.toFixed(4);

  html += ` Shares</div>
        <div class="todays-change bold justify-right">$0.00</div>
    </div> <!-- .card--upper -->
    <div class="card--expander [ js-collapser ]">
      <hr />
      <div class="card--expander--info--container">
        <span class="name">`;

  html += data.symbol_name;

  html += `</span>
            <span class="equity-value-label">Equity Value</span>
            <span class="equity-value justify-right">$0.00</span>
            <span class="total-return-label">Total Return</span>
            <span class="total-return justify-right">$0.00</span>
            <span class="todays-return-label">Today's Return</span>
            <span class="todays-return justify-right">$0.00</span>
            <div class="chart">`;

  html += '<canvas id="' + data.symbol_symbol + '-chart"></canvas>';

  html += `</div>
        </div>
    </div> <!-- .card--expanding -->
</div> <!-- .card -->`;

  let current = $('#card-container').html();
  current += html;
  $('#card-container').html(current);
});




/**
 * Populate the "Enter New Trade" form with current values to help prevent
 * typos on symbol names, sector names, etc.
 */
let selectOptions = {
  brokers: new Set(),
  portfolios: new Set(),
  symbols: new Set(),
  sectors: new Set()
};

$("#newTradeBrokerDataList").empty();
$("#newTradePortfolioDataList").empty();
$("#newTradeSectorDataList").empty();
$("#newTradeSymbolDataList").empty();

// loop through all tradeData entries and pull out symbol, sector, portfolio, and
// broker values
$.each(tradeData, function(index, trade) {
  let sym = { "symbol_symbol": trade.symbol_symbol, "symbol_name": trade.symbol_name };
  if (!selectOptions.symbols.has(sym.symbol_symbol)) {
    selectOptions.symbols.add(sym);
  }

  trade.transaction.forEach(function(trans) {
    selectOptions.brokers.add(trans.broker_name);
  });

  selectOptions.portfolios.add(trade.portfolio);
  selectOptions.sectors.add(trade.sector);
});

//console.log(selectOptions);

for (symbol of selectOptions.symbols) {
  let opt = $("<option>" + symbol.symbol_name + "</option>").attr('value', symbol.symbol_symbol);
  $("#newTradeSymbolDataList").append(opt);
}

// TODO
// This needs to be sorted alphabetically
for (sector of selectOptions.sectors) {
  let opt = $("<option>" + sector + "</option>");
  $("#newTradeSectorDataList").append(opt);
}

// TODO
// This needs to be sorted alphabetically
for (portfolio of selectOptions.portfolios) {
  let opt = $("<option>" + portfolio + "</option>");
  $("#newTradePortfolioDataList").append(opt);
}

// TODO
// This needs to be sorted alphabetically
for (broker of selectOptions.brokers) {
  let opt = $("<option>" + broker + "</option>");
  $("#newTradeBrokerDataList").append(opt);
}


/**
 * retrieve stock data from IEX API service
 */

 let baseUrl = 'https://api.iextrading.com/1.0/stock/market/batch';
let baseParameters = '?displayPercent=true&types=quote,chart&range=1d';

// get a list of unique symbols separated by commas
// this list gets injected into the IEX API request
symbols = [];
$.each(tradeData, function(index, data) {
  symbols.push(data.symbol_symbol);
});
let symbolList = symbols.join(',');


/**
 * create the promise for retreiving stock and chart data and execute
 * on the results
 */
$.ajax({
  url: baseUrl + baseParameters + '&symbols=' + symbolList
}).then(function(data) {
  $.each(data, function(index, d) {
    let symbol = d.quote.symbol;
    let latestPrice = d.quote.latestPrice;
    let change = d.quote.change;
    let changePercent = d.quote.changePercent;
    let chartData = [];
    let labels = [];
    let chartInterval = 12;

//  console.log(symbol);
//  console.log(d.chart);

    // filter out chart data that has marketAverage property equal to 0
    let chartDataFiltered = d.chart.filter((el) => (el.marketAverage !== 0));
//    console.log(chartDataFiltered.length);

    // chartInterval determines the number of data points for the chart
    if (chartDataFiltered.length < 20) {
      chartInterval = 1;
    } else if (chartDataFiltered.length < 120) {
      chartInterval = parseInt(chartDataFiltered.length / 12);
    }

//    console.log(chartInterval);

    // keep only 5-minute interval chart data
    $.each(chartDataFiltered, function(index, d) {
      if (index === 0 || index === (chartDataFiltered.length - 1)) {
//        console.log(index);
        chartData.push(d.marketAverage);
        labels.push(d.minute);
      } else {
        if (index % chartInterval === 0) {
          // don't keep the data point if it isn't valid
          if (d.marketAverage > 0) {
            chartData.push(d.marketAverage);

            // keep a label with the minute the data point came from
            labels.push(d.minute);
          }
        }
      }
    });

//    console.log(chartData);
//    console.log(labels);

    // update latestPrice
    $('#' + symbol).find('div.latest-price').text('$' + latestPrice.toFixed(2));

    // update todays-change
    setCurrencyTextColor( Math.round(change * 100),
                          $('#' + symbol).find('div.todays-change'),
                          ["text-green", "text-red"] );
    $('#' + symbol).find('div.todays-change')
                   .text('$' + Math.abs(change).toFixed(2) + ' (' + Math.abs(changePercent).toFixed(2) + '%)');

    // update expanding card data
    $.each(tradeData, function(index, trade) {
//      console.log(trade);
      if (trade.symbol_symbol === symbol) {
        let shares = 0;
        let purchasePrice = 0.00;
        for (let i = 0; i < trade.transaction.length; i++) {
          shares += parseFloat(trade.transaction[i].shares);
          purchasePrice += parseFloat(trade.transaction[i].pricePerShare) * parseFloat(trade.transaction[i].shares);
        }

        // update equity value
        let equityValue = (shares * parseFloat(latestPrice)).toFixed(2);
        allEquityValue += parseFloat(equityValue);
        $('#' + symbol).find('span.equity-value').text('$' + equityValue);

        // update total return
        let totalReturn = (equityValue - purchasePrice).toFixed(2);
        allTotalReturn += parseFloat(totalReturn);
        setCurrencyTextColor(totalReturn, $('#' + symbol).find('span.total-return'), ["text-green", "text-red"]);
        $('#' + symbol).find('span.total-return').text('$' + Math.abs(totalReturn).toFixed(2));

        // update today's return
        let todaysReturn = (shares * parseFloat(change)).toFixed(2);
        allTodaysReturn += parseFloat(todaysReturn);
        setCurrencyTextColor(todaysReturn, $('#' + symbol).find('span.todays-return'), ["text-green", "text-red"]);
        $('#' + symbol).find('span.todays-return').text('$' + Math.abs(todaysReturn).toFixed(2));
      }
    });

    // update the chart
    let ctx = $('#' + symbol + '-chart')[0].getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price Per Share',
          data: chartData,
          backgroundColor: [
            'rgba(79, 195, 247, 0.2)'   // light-blue-300
          ],
          borderColor: [
            'rgba(3, 169, 244, 1)'      // light-blue-500
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });


    // update the card's background color to indicate it is "ready"
    $('#' + symbol).css("background-color", "#E0E0E0");
  });

  // update globals
  $('#allEquityValue').text('$' + allEquityValue.toFixed(2));

  setCurrencyTextColor(allTotalReturn, $('#allTotalReturn'), ["text-green", "text-red"]);
  $('#allTotalReturn').text('$' + Math.abs(allTotalReturn).toFixed(2));

  setCurrencyTextColor(allTodaysReturn, $('#allTodaysReturn'), ["text-green", "text-red"]);
  $('#allTodaysReturn').text('$' + Math.abs(allTodaysReturn).toFixed(2));

  if (parseFloat(allTodaysReturn) > parseFloat(0.00)) {
    $('#st-trigger-effects').addClass('bg-green');
  } else {
    $('#st-trigger-effects').addClass('bg-red');
  }

  // change the display of each card to indicate the data has
  // finished loading into the cards
  $('.progress').addClass("hide");
});
