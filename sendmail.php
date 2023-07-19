<?php
$name = $_POST['name'];
$url = $_POST['url'];
$message = $_POST['message'];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо 
$mail->setFrom('откуда@mail.ru');
// Кому отправить
$mail->addAddress('opdif@mail.ru');
// Тема письма
$mail->Subject = 'Тестовое письмо';

// Тело письма
$body = '<h1>Письмо</h1>';

if(!empty($_POST['name'])){
    $body .= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if(!empty($_POST['url'])){
    $body .= '<p><strong>Email:</strong> '.$_POST['url'].'</p>';
}

if(!empty($_POST['message'])){
    $body .= '<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body;

// Отправляем
try {
    $mail->send();
    $message = 'Данные отправлены';
} catch (Exception $e) {
    $message = 'Ошибка: '.$mail->ErrorInfo;
}

$response = ['message' => $message];
header("Content-type: application/json");
echo json_encode($response);
?>