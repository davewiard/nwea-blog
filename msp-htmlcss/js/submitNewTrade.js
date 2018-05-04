/*
 * save the form data to the database
 */
$('#newTradeSubmit').click(function(e) {
    e.preventDefault();     // don't submit the form through action

    let newTradeDate = $('#newTradeDate').val();
    let newTradeSymbol = $('#newTradeSymbolInput').val();
    let newTradeSector = $('#newTradeSectorInput').val();
    let newTradeBroker = $('#newTradeBrokerInput').val();
    let newTradePortfolio = $('#newTradePortfolioInput').val();
    let newTradeShares = $('#newTradeShares').val();
    let newTradePricePerShare = $('#newTradePricePerShare').val();
    let newTradePreTax = $('#newTradePreTax').is(':checked');

    let baseUrl = window.location.protocol + '//' + window.location.host + '/demo/msp-htmlcss/php';

    let newTradePairs = {
      'trade_date': newTradeDate,
      'symbol': newTradeSymbol,
      'sector': newTradeSector,
      'broker': newTradeBroker,
      'portfolio': newTradePortfolio,
      'shares': newTradeShares,
      'price_per_share': newTradePricePerShare,
      'pretax': newTradePreTax
    }

    $.ajax({
      url: baseUrl + '/newTrade.php',
      type: 'post',
      data: newTradePairs,
      success: function(result) {
        reset_form();
        $('#snackbar').text("Trade successfully submitted.")
                      .addClass('show');

        setTimeout(function() {
          $('#snackbar').removeClass('show');
        }, 3000);
      }
    });
});
