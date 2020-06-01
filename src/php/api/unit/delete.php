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
/**DC Only*/
$id = $_GET['unit_id'];


if (!isset($id)) {
    $arr = setReturnJson(1, 'Params Wrong, [unit_id]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}



$service = new UnitService();
echo $service->Delete($id, $operatorId);
