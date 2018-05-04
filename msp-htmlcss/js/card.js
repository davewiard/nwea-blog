let $cell = $('.card');

// open and close card when clicked on card
$cell.find('.js-expander').click(function() {
  let $thisCell = $(this).closest('.card');

  if ($thisCell.hasClass('is-collapsed')) {
    $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
    $thisCell.removeClass('is-collapsed').addClass('is-expanded');

    if ($cell.not($thisCell).hasClass('is-inactive')) {
      // do nothing, this cell/card is already inactive and
      // does not need to be collapsed
    } else {
      $cell.not($thisCell).addClass('is-inactive');
    }

    // scroll card into view
    //    $($thisCell).focus();
    let cardTop = $($thisCell)[0].offsetTop;
    console.log(cardTop);
    console.log($($thisCell)[0].outerHeight);

    $("html,body").animate({scrollTop:$($thisCell)[0].offsetTop}, 1000);
  } else {
    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    $cell.not($thisCell).removeClass('is-inactive');
  }
});


//close card when click on cross
$cell.find('.js-collapser').click(function() {
  let $thisCell = $(this).closest('.card');
  $thisCell.removeClass('is-expanded').addClass('is-collapsed');
  $cell.not($thisCell).removeClass('is-inactive');

});
