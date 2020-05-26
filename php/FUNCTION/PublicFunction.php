<?php

//Return JSON Array
function setReturnJson($errcode, $data)
{
    $arr = array(
        "errcode" => $errcode,
        "data" => $data
    );
    return $arr;
}

//Response Format
function myEcho($code, $message)
{
    echo json_encode(setReturnJson($code, $message), JSON_UNESCAPED_UNICODE);
}

//Check Login State

function expired()
{
    $expireTime = 1000 * 60 * 60 * 24; //1 day;
    $id = $_SESSION['id'];
    if(!isset($id)){
        return setReturnJson(401, "You haven't login, please log in");
    }
    if (time() - $_SESSION['time'] > $expireTime) {
        //Expired
        return setReturnJson(401, "Login has expired, please log in again");
    } else {
        //Refresh Session time
        $_SESSION["time"] = time();
        return 0;
    }
}

//Encrypt
function sha256($data, $rawOutput = false)
{
    if (!is_scalar($data)) {
        return false;
    }
    $data = (string) $data;
    $rawOutput = !!$rawOutput;
    return hash('sha256', $data, $rawOutput);
}

//CORS
function setHeaders(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Methods:GET, POST");
    header("Content-type: application/json");
}
