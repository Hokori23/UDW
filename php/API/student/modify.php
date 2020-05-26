<?php

session_start();
require_once "../../SERVICE/StudentService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();



//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode($expiredState,JSON_UNESCAPED_UNICODE));
}

$id = $_SESSION['id'];
$name = $_GET['name'];
$email = $_GET['email'];
$address = $_GET['address'];
$birth = $_GET['birth'];
$phone_number = $_GET['phone_number'];

if (!isset($id) || !isset($name) || !isset($email)) {
    $arr = setReturnJson(1, 'Params Wrong, [name, email, address, birth, phone_number)]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$student = new Student();
$student->setId($id);
$student->setName($name);
$student->setEmail($email);
$student->setAddress($address);
$student->setBirth($birth);
$student->setPhoneNumber($phone_number);


$service = new StudentService();
echo $service->modify($student);
