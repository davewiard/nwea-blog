<?php

require_once('../php/blog.php');

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// check if this is GET or POST request
if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') === 'POST') {
  try {
    $blog = new Blog();

    $postVars = array();
    parse_str(file_get_contents("php://input"), $postVars);

    $blog->setTitle($postVars["title"]);
    $blog->setBody($postVars["body"]);
    $blog->putEntry();

  } catch (Exception $e) {
    print 'Exception : ' . $e->getMessage();
  }

  return;
}

// TODO
// Should an error be sent back to the browser that the request was invalid?

?>
