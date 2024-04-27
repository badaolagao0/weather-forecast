<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    include("handleApi.php");
    $p = new WeatherApi();
    $search = $_REQUEST['search'] ?? "";
    $amount = !isset($_REQUEST['amount']) ? "5" : $_REQUEST['amount'] ;
    $p -> weatherApi($search, $amount);
?>