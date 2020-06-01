<?php

session_start(['cookie_lifetime' => 86400]);
require_once "../../SERVICE/UnitService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die(json_encode($expiredState, JSON_UNESCAPED_UNICODE));
}

//Operator's id
$operatorId = $_SESSION['id'];


//Params
$id = $_GET['student_id'];
$unit_id = $_GET['unit_id'];
$time = $_GET['time'];
$type = $_GET['type'];

if (!isset($unit_id) || !isset($time) || !isset($type)) {
    $arr = setReturnJson(1, 'Params Wrong, [(student_id, )unit_id, time, type]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}
if(!isset($id)){
    $id = $operatorId;
}
$unit_enrollment = new Unit_Enrollment($unit_id, $id, $time, $type);


$service = new UnitService();
echo $service->Enrollment($unit_enrollment, $operatorId);
