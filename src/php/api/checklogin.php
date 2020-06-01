<?php

session_start(['cookie_lifetime' => 86400]);
require_once "../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode($expiredState,JSON_UNESCAPED_UNICODE));
}else{
    die (json_encode(setReturnJson(0,"Logined"),JSON_UNESCAPED_UNICODE));
}