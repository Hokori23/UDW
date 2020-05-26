<?php

require_once "../../ACTION/StudentAction.php";
require_once '../../VO/Student.php';
require_once '../../FUNCTION/PublicFunction.php';

class StudentService
{
    private $action;

    public function __construct()
    {
        $this->action = new StudentAction();
    }

    public function getSelf($id)
    {
        $retrieveStudent = $this->action->RetrieveByIdNoPassword($id);
        if ($retrieveStudent != -1) {
            $final = setReturnJson(0, $retrieveStudent[0]);
        } else {
            $final = setReturnJson(1, "Student Account is not existed");
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function login($id, $password)
    {
        $retrieveStudent = $this->action->RetrieveById($id);

        if ($retrieveStudent != -1) {
            $realPassword = $retrieveStudent[0]['password'];
            if ($realPassword == sha256($password, false)) {

                /**Set Session */
                $_SESSION['time'] = time();
                $_SESSION['id'] = $id;

                /**Login Successfully */
                $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($id)[0]);
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
        //Encrypt Password
        $student->setPassword(sha256($student->getPassword(), false));

        $retrieveStudent = $this->action->RetrieveById($student->getId());
        if ($retrieveStudent != -1) {
            $final = setReturnJson(1, "ID has already existed");
        } else {
            if ($this->action->CreateStudent($student)) {

                /**Set Session */
                $_SESSION['time'] = time();
                $_SESSION['id'] = $student->getId();

                /**Register Successfully */
                $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($student->getId())[0]);
            } else {

                $final = setReturnJson(1, "Register Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function modify($student)
    {

        $retrieveStudent = $this->action->RetrieveById($student->getId());
        if ($retrieveStudent == 1) {
            $final = setReturnJson(1, "Account is not existed");
        } else {
            if ($this->action->UpdateStudent($student)) {
                $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($student->getId())[0]);
            } else {

                $final = setReturnJson(1, "Modify Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }
}
