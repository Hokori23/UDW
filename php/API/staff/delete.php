<?php

session_start(['cookie_lifetime' => 86400]);
require_once "../../SERVICE/StaffService.php";
require_once "../../FUNCTION/PublicFunction.php";

setHeaders();


$id = $_GET['id'];

if (!isset($id)) {
    $arr = setReturnJson(1, 'Params Wrong, [id]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}


$service = new StaffService();
echo $service->register($id,$_SESSION('id'));
