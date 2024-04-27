<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    include("history.php");
    $p = new saveHistory();
    $location = $_REQUEST['location'] ?? "";
    $temp = $_REQUEST['temp'] ?? "";
    $wind = $_REQUEST['wind'] ?? "";
    $humidity = $_REQUEST['humidity'] ?? "";
    $date = $_REQUEST['date'] ?? "";
    $state = $_REQUEST['text'] ?? "";
    if (!$location || !$temp || !$wind || !$humidity || !$date || !$state || !($p -> insertHistory($location, $temp, $wind, $humidity, $date, $state))){
        $error = array('error' => "Can't insert to DB.");
        echo json_encode($error);
        return;        
    } else {
        $success = array('response' => "200");
        echo json_encode($success);
        return;
    }
?>