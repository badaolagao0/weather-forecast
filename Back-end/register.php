<?php
    include('sendRequestMail.php');
    require_once("handlEmail.php");
    $p = new handleMail();
    $email = !isset($_GET['email'])? "":$_GET['email'];
    $verificationToken = bin2hex(random_bytes(16));
    $sub = 'Email Verification (Register)';
    $body = 'Click the link to verify your email: http://localhost/verify.php?token='.$verificationToken.'&email='.$email.'&action=register';
    if ($p -> insertEmail($email, $verificationToken) && sendVerificationEmail($email, $verificationToken, $sub, $body)) {
        $success = array('response' => "200", 'message' => "Verification email sent successfully to $email");
        echo json_encode($success);
        return;
    } else {
        $error = array('error' => "Can't send Verification email.");
        echo json_encode($error);
        return; 
    }
?>