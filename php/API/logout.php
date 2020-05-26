<?php

session_destroy();
require_once "../FUNCTION/PublicFunction.php";

setHeaders();


//Check SESSION Time
$expiredState = expired();
if ($expiredState) {
    die (json_encode(setReturnJson(0,"Log Out"),JSON_UNESCAPED_UNICODE));
}else{
    die (json_encode(setReturnJson(0,"Log Out Failed"),JSON_UNESCAPED_UNICODE));
}