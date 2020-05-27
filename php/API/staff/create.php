<?php

session_start(['cookie_lifetime' => 86400]);
require_once "../../SERVICE/StaffService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$address = $_POST['address'];
$birth = $_POST['birth'];
$phone_number = $_POST['phone_number'];
$qualification = $_POST['qualification'];
$expertise = $_POST['expertise'];
$role = $_POST['role'];

if (!isset($id) || !isset($name) || !isset($email) || !isset($password) || !isset($qualification) || !isset($expertise)||!isset($role)) {
    $arr = setReturnJson(1, 'Params Wrong, [id, name, email, password, (address, birth, phone_number,) qualification, expertise, role]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$staff = new Staff();
$staff->setId($id);
$staff->setName($name);
$staff->setEmail($email);
$staff->setPassword($password);
$staff->setAddress($address);
$staff->setBirth($birth);
$staff->setPhoneNumber($phone_number);
$staff->setQua($qualification);
$staff->setExp($expertise);
$staff->setRole($role||3);


$service = new StaffService();
echo $service->createByDC($staff,$_SESSION('id'));
