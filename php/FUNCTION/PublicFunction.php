<?php

//Return JSON Array
function setReturnJson($errCode, $result)
{
    $arr = array(
        "errCode" => $errCode,
        "result" => $result
    );
    return $arr;
}

//Response Format
function myEcho($code, $message)
{
    echo json_encode(setReturnJson($code, $message), JSON_UNESCAPED_UNICODE);
}

//Check Login State
$expireTime = 1000 * 60 * 60 * 24; //1 day
function expired()
{
    if (time() - $_SESSION('time') > $this->expireTime) {
        //Expired
        return setReturnJson(1, "Login has expired, please log in again");
    } else {
        //Refresh Session time
        $_SESSION('time') = time();
        return 0;
    }
}
