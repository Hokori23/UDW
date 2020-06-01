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
$name = $_GET['name'];
$uc = $_GET['uc_id'];
$capacity = $_GET['capacity'];
$description = $_GET['description'];
$semester = $_GET['semester'];
$campus = $_GET['campus'];

/**DC、UC */
$unit_id = $_GET['unit_id'];
$lecturer = $_GET['lecturer_id'];

/**UC Only */
$tutor_id = $_GET['tutor_id'];


if (!isset($name) || !isset($capacity)) {
    $arr = setReturnJson(1, 'Params Wrong, [name(DC Only)(, uc_id(DC Only), lecturer_id(DC Only), tutor_id(UC Only)), capacity(DC Only)(, description(DC Only), semester(DC Only), campus(DC Only))]');
    die(json_encode($arr, JSON_UNESCAPED_UNICODE));
}

$unit = new Unit();
$unit->setId($unit_id);
$unit->setName($name);
$unit->setUc($uc);
$unit->setLecturer($lecturer);
$unit->setTutor($tutor_id);
$unit->setCapacity($capacity);
$unit->setDescription($description);
$unit->setSemester($semester);
$unit->setCampus($campus);


$service = new UnitService();
echo $service->UpdateUnit($unit, $operatorId);
