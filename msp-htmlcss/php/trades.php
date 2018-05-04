<?php

/*
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
*/

require_once('functions.php');

$db = openDatabaseConnection();
$trades = getTradeData($db);
echo json_encode($trades);
closeDatabaseConnection($db);

?>
