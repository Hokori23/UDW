<?php

session_start(['cookie_lifetime' => 86400]);
session_unset();
require_once "../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode(setReturnJson(0,"Log Out"),JSON_UNESCAPED_UNICODE));
}else{
    die (json_encode(setReturnJson(1,"Log Out Failed"),JSON_UNESCAPED_UNICODE));
}