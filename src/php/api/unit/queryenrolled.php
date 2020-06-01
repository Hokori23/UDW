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

$service = new UnitService();
echo $service->AllStudentUnitDetails($_SESSION['id']);


