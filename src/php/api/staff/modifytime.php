<?php

session_start(['cookie_lifetime' => 86400]);
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

$time = $_GET['time'];
if (!isset($time)) {
    $arr = setReturnJson(1, 'Params Wrong, [time]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}
$staff_time = new Staff_Time($operatorId,$time);


$service = new StaffService();

echo $service->staffTime($staff_time,$operatorId);