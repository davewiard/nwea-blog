<?php

require_once('../php/blog.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// check if this is GET or POST request
if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') === 'GET') {
  try {
    $blog = new Blog();
    $allPosts = $blog->getAllPosts();
  } catch (Exception $e) {
    print 'Exception : ' . $e->getMessage();
  }

  return $allPosts;
}

// TODO
// Should an error be sent back to the browser that the request was invalid?

?>
