/**
 * json2html template for building the blog post cards consisting of only
 * a title and body text
 */
let template = {
  '<>':'div', 'class':'col-12', 'html':[
    {'<>':'div', 'class':'card', 'id': 'post_id-${post_id}', 'html': [
      {'<>': 'div', 'class': 'card-header bg-secondary text-white', 'html': '#${post_id}: ${title}'},
      {'<>': 'div', 'class': 'card-body', 'html': '${body}'}
    ]}
  ]
};


/**
 * Display an Android-style snackbar message.
 */
function showSnackbar(text) {
  $('#snackbar').text(text);

  // Show the snackbar then, after 3 seconds, remove the show class from DIV
  $('#snackbar').addClass('show');
  setTimeout(function(){
    $('#snackbar').removeClass('show');
  }, 3000);
}


/**
 * Submits the current blog post entry, clears the form, and reloads the
 * blog posts
 */
function submitPost() {
  let title = $('input[name=newBlogTitle]').val();
  let body = $('textarea[name=newBlogBody]').val();

  // don't submit blank values
  if (title.length <= 0) {
    showSnackbar('Title cannot be blank.');
    return;
  } else if (body.length <= 0) {
    showSnackbar('Body cannot be blank.');
    return;
  }

  let saveData = $.ajax({
        method: "POST",
        url: window.location.protocol + '//' + window.location.host + '/post/',
        data: { "title": title, "body": body }
  }).done(function(response) {

    // TODO
    // The "post_id" portion of the title is missing at this point so it cannot
    // be displayed with the title without refreshing the data from the database.
    // This was done intentionally to prevent having to make another full round-trip
    // to the database to get all posts after the new one was successfully inserted.
    let data = { "title": title, "body": body };
    let html = json2html.transform(data, template);
    $('#allBlogEntries > .row').append(html);

    $('input[name=newBlogTitle]').val('');
    $('textarea[name=newBlogBody]').val('');

    showSnackbar('Sucessfully added blog post!')
  }).fail(function(response) {
    // TODO
    // This needs to be tested
    showSnackbar('Failed to insert blog post!');
  });
}


/**
 * retrieve all posts from the database and populate cards
 */
function getPosts() {
  // clear the current set of blog posts
  $('#allBlogEntries > .row').empty();

  // create the promise for retreiving stock and chart data and execute
  // on the results
  $.ajax({
    url: window.location.protocol + '//' + window.location.host + '/posts/'
  }).then(function(data) {
    $.each(JSON.parse(data), function(index, d) {
      let html = json2html.transform(d, template);
      $('#allBlogEntries > .row').append(html);
    });
  })
}


/**
 * This loads all the existing blog posts when the page first loads
 */
$(document).ready(function() {
  // register onClick event for the submit button
  $('#newBlogSubmit').click(submitPost);

  // load the current set of blog posts
  getPosts()
});
