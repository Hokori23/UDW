<?php

session_start(['cookie_lifetime' => 86400]);
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
$id = $_GET['unit_id'];
$time = $_GET['time'];
$type = $_GET['type'];


if (!isset($id) || !isset($time) || !isset($type)) {
    $arr = setReturnJson(1, 'Params Wrong, [unit_id, time, type]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}


$unit_time = new Unit_Time($id,$time,$type);

$service = new UnitService();
echo $service->ModifyTime($unit_time, $operatorId);
