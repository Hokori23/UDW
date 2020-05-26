<?php

session_start();
require_once "../../SERVICE/UnitService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode($expiredState,JSON_UNESCAPED_UNICODE));
}

//Operator's id
$operatorId = $_SESSION['id'];


//Params
$unit_id = $_GET['unit_id'];
$student_id = $_GET['student_id'];
$time = $_GET['time'];
$type = $_GET['type'];

if (!isset($unit_id)||!isset($student_id)||isset($type)) {
    $arr = setReturnJson(1, 'Params Wrong, [unit_id, student_id, (time, )type]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$unit_enrollment = new Unit_Enrollment($unit_id,$student_id,$time,$type);


$service = new UnitService();
echo $service->Enrollment($unit_enrollment,$operatorId);
