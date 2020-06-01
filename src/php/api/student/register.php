<?php

session_start();
require_once "../../SERVICE/StudentService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$address = $_POST['address'];
$birth = $_POST['birth'];
$phone_number = $_POST['phone_number'];

if (!isset($id) || !isset($name) || !isset($email) || !isset($password)) {
    $arr = setReturnJson(1, 'Params Wrong, [id, name, email, password(, address, birth, phone_number)]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$student = new Student();
$student->setId($id);
$student->setName($name);
$student->setEmail($email);
$student->setPassword($password);
$student->setAddress($address);
$student->setBirth($birth);
$student->setPhoneNumber($phone_number);

//default role -> 4:Student
$student->setRole(4);


$service = new StudentService();
echo $service->register($student);
