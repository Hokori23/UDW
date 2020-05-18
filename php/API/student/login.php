<?php

session_start();
require_once "../../ACTION/StudentAction.php";
require_once '../../VO/Student.php';
require_once '../../FUNCTION/PublicFunction.php';

header('content-type:application/json');

$id = $_GET['student_id'];
$password = $_GET['password'];

if (!isset($id) || !isset($password)) {
    $arr = setReturnJson(1, 'Params Wrong, [id, password]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

// $expiredState = expired();
// if ($expiredState) {
//     echo $expiredState;
// }

$service = new StudentService();
echo $service->login($id, $password);
