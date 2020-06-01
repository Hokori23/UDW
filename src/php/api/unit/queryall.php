<?php

session_start(['cookie_lifetime' => 86400]);
require_once "../../SERVICE/UnitService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();

$service = new UnitService();
echo $service->UnitDetails();
