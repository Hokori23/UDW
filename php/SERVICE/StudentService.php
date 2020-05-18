<?php

require_once "../../ACTION/StudentAction.php";
require_once '../../VO/Student.php';
require_once '../../FUNCTION/PublicFunction.php';

class StudentService
{
    private $action = new StudentAction();

    public function login($id, $password)
    {
        $retrieveStudent = $this->action->RetrieveById($id);
        if ($retrieveStudent != -1) {
            $realPassword = $retrieveStudent[0]->getPassword();
            if ($realPassword == $password) {

                /**Set Session */
                $_SESSION['time'] = time();

                /**Login Successfully */
                $final = setReturnJson(0, "Login Successfully");
            } else {

                $final = setReturnJson(1, "Password is wrong");
            }
        } else {

            $final = setReturnJson(1, "Account is not existed");
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }
    public function register($student)
    {
        $retrieveStudent = $this->action->RetrieveById($student->getId());
        if ($retrieveStudent != -1) {
            $final = setReturnJson(1, "ID has already existed");
        } else {
            if ($this->action->CreateStudent($student)) {

                /**Register Successfully */
                $final = setReturnJson(0, "Register Successfully");
            } else {

                $final = setReturnJson(1, "Register Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }
}
