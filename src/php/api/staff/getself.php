<?php

session_start(['cookie_lifetime' => 86400]);

require_once '../../SERVICE/StaffService.php';
require_once '../../FUNCTION/PublicFunction.php';

setHeaders();



//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode($expiredState,JSON_UNESCAPED_UNICODE));
}

//Operator's id
$operatorId = $_SESSION['id'];

$service = new StaffService();
echo $service->getSelf($operatorId);
