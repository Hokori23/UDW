<?php

session_start();
require_once "../../SERVICE/StaffService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode($expiredState,JSON_UNESCAPED_UNICODE));
}


//Operator's id
$operatorId = $_SESSION['id'];

$id = $_GET['id'];
$name = $_GET['name'];
$email = $_GET['email'];
$address = $_GET['address'];
$birth = $_GET['birth'];
$phone_number = $_GET['phone_number'];
$qualification = $_GET['qualification'];
$expertise = $_GET['expertise'];
$role = $_GET['role'];

if (!isset($name) || !isset($email) || !isset($qualification) || !isset($expertise)) {
    $arr = setReturnJson(1, 'Params Wrong, [(id(DC Only),) name, email, (address, birth, phone_number,) qualification, expertise, (role(DC Only))]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$staff = new Staff();
$staff->setName($name);
$staff->setEmail($email);
$staff->setAddress($address);
$staff->setBirth($birth);
$staff->setPhoneNumber($phone_number);
$staff->setQua($qualification);
$staff->setExp($expertise);
$staff->setRole($role);

$service = new StaffService();

if(!isset($id)){
    //Modify By Staff
    $staff->setId($_SESSION['id']);
    echo $service->modifySelf($staff);
}else{
    //Modify By DC
    $staff->setId($id);
    echo $service->modifyByDC($staff,$operatorId);
}

