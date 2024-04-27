<?php
    require_once('./phpmailer/Exception.php');
    require_once('./phpmailer/PHPMailer.php');
    require_once('./phpmailer/SMTP.php');

    include('sendMail.php');
    sendMail('doanquochuy1411@gmail.com');
?>