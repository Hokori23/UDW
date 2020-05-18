<?php

session_start();
require_once "../../ACTION/StudentAction.php";
require_once '../../VO/Student.php';
require_once '../../FUNCTION/PublicFunction.php';

header('content-type:application/json');

$id = $_GET['student_id'];
$name = $_GET['name'];
$email = $_GET['email'];
$password = $_GET['password'];
$address = $_GET['address'];
$birth = $_GET['birth'];
$phone_number = $_GET['phone_number'];

if (!isset($id) || !isset($name) || !isset($email) || !isset($password) || !isset($address) || !isset($birth) || !isset($phone_number)) {
    $arr = setReturnJson(1, 'Params Wrong, [id, name, email, password, address, birth, phone_number]');
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
echo $service->register($student);
