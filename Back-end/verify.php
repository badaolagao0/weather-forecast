<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    include('handlEmail.php');
    $p = new handleMail();
    $email = $_GET['email'] ?? "";
    $action = $_GET['action'] ?? "";
    $token = $p -> getTokenByEmail($email) ?? "";
    if ($action == 'register' && $p -> register($email, $token)){
        $success = array('response' => "200", 'message' => "Email verified successfully");
        echo json_encode($success);
        return;
    } elseif ($action == 'unsubscribe' && $p->unsubscribe($email, $token)){
        $success = array('response' => "200", 'message' => "Email verified successfully");
        echo json_encode($success);
        return;
    }else{
        $error = array('response' => "200", 'message' => "Can't verify Email!");
        echo json_encode($error);
        return;
    }
?>