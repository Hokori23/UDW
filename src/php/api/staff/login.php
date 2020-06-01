<?php

session_start(['cookie_lifetime' => 86400]);

require_once '../../SERVICE/StaffService.php';
require_once '../../FUNCTION/PublicFunction.php';

setHeaders();

$id = $_POST['id'];
$password = $_POST['password'];

if (!isset($id) || !isset($password)) {
    $arr = setReturnJson(1, 'Params Wrong, [id, password]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$service = new StaffService();
echo $service->login($id, $password);
