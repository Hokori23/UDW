<?php

session_start();
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
$name = $_GET['name'];
$uc = $_GET['uc_id'];
$lecturer = $_GET['lecturer_id'];
$capacity = $_GET['capacity'];
$description = $_GET['description'];
$semester = $_GET['semester'];
$campus = $_GET['campus'];

if (!isset($name) || !isset($capacity)) {
    $arr = setReturnJson(1, 'Params Wrong, [name(, uc_id, lecturer_id), capacity(, description, semester, campus)]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$unit = new Unit();
$unit->setName($name);
$unit->setUc($uc);
$unit->setLecturer($lecturer);
$unit->setCapacity($capacity);
$unit->setDescription($description);
$unit->setSemester($semester);
$unit->setCampus($campus);


$service = new UnitService();
echo $service->Create($unit, $OperatorId);
