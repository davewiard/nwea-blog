<?php

/**
 * TODO
 * Update this documentation so it makes more sense.
 * 
 * This class is used to connect to an SQLite3 database instance, select all
 * of the blog entries, and return them to the caller in JSON format. It also
 * handles all PUT requests.
 *
 * @author     Dave Wiard
 * @version    1.0
 * ...
 */
class Blog {

  private $dbPath = '../db/blog.db';
  private $dbType = 'sqlite';

  private $title;
  private $body;

  private $db;

  private function connectToDatabase() {
    # connect to blog.db database
    try {
      $this->db = new PDO($this->dbType . ':' . $this->dbPath);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (Exception $e) {
      // this should return the exception in a readable manner, not just false
      return false;
    }

    return true;
  }

  public function getAllPosts() {
    // connect to the database if not already connected
    if ($this->db == null) {
      if (!$this->connectToDatabase()) {
        // return a JSON-formatted error string so the browser can report on this
        return json_encode("");
      }
    }

    $sql = "SELECT * FROM posts";

    try {
      // don't use query here if you're going to select with a WHERE clause
      // instead, use prepare and pass in arguments to prevent SQL injection
      $stmt = $this->db->query($sql);
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($result);

      // in a real-world API you'd want to enclose these results in a Larger
      // object with more data, perhaps with status codes and error text or
      // other useful metadata like the API version
      print $json;
    } catch (Exception $e) {
      // return a JSON-formatted error string so the browser can report on this
      return json_encode("");
    }
  }

  public function setBody($body) {
    $this->body = $body;
  }

  public function setTitle($title) {
    $this->title = $title;
  }

  public function putEntry() {
    // connect to the database if not already connected
    if ($this->db == null) {
      if (!$this->connectToDatabase()) {
        // return a JSON-formatted error string so the browser can report on this
        return json_encode("");
      }
    }

    // TODO
    // error checking here to validate that title and body have been set

    $sql = "INSERT INTO posts (title, body) VALUES (:title, :body)";
    try {
      $stmt = $this->db->prepare($sql);
      $stmt->bindParam(':title', $this->title, PDO::PARAM_STR);
      $stmt->bindParam(':body', $this->body, PDO::PARAM_STR);
      $stmt->execute();
    } catch (Exception $e) {
      print 'Exception : ' . $e->getMessage();

      // return a JSON-formatted error string so the browser can report on this
      return json_encode("");
    }
  }
}

?>
