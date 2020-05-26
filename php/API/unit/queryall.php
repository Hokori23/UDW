<?php

session_start();
require_once "../../SERVICE/UnitService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();

$service = new UnitService();
echo $service->UnitDetails();
