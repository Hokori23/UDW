<?php

require_once "../../ACTION/StaffAction.php";
require_once '../../VO/Staff.php';
require_once '../../FUNCTION/PublicFunction.php';

class StaffService
{
    private $action;
    private $timeAction;

    public function __construct()
    {
        $this->action = new StaffAction();
        $this->timeAction = new Staff_TimeAction();
    }


    public function checkStaffRole($operatorId)
    {
        $retrieveStaff = $this->action->RetrieveByIdNoPassword($operatorId);
        return $retrieveStaff[0]['role'];
    }

    public function getSelf($id)
    {
        $retrieveStaff = $this->action->RetrieveByIdNoPassword($id);
        if ($retrieveStaff != -1) {
            $final = setReturnJson(0, $retrieveStaff[0]);
        } else {
            $final = setReturnJson(1, "Staff Account is not existed");
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function login($id, $password)
    {
        $retrieveStaff = $this->action->RetrieveById($id);

        if ($retrieveStaff != -1) {
            $realPassword = $retrieveStaff[0]['password'];
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

    public function register($staff)
    {
        //Encrypt Password

        $staff->setPassword(sha256($staff->getPassword(), false));
        $retrieveStaff = $this->action->RetrieveById($staff->getId());
        if ($retrieveStaff != -1) {
            $final = setReturnJson(1, "ID has already existed");
        } else {
            if ($this->action->CreateStaff($staff)) {
                /**Init Staff Time */
                $this->timeAction->CreateStaff_Time(new Staff_Time($staff->getId(), '[]'));


                /**Set Session */
                $_SESSION['time'] = time();
                $_SESSION['id'] = $staff->getId();

                /**Register Successfully */
                $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($staff->getId())[0]);
            } else {

                $final = setReturnJson(1, "Register Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function modifySelf($staff)
    {
        //Default Role
        $staff->setRole(3);
        $retrieveStaff = $this->action->RetrieveById($staff->getId());
        if ($retrieveStaff == 1) {
            $final = setReturnJson(1, "Account is not existed");
        } else {
            if ($this->action->UpdateStaff($staff)) {
                $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($staff->getId())[0]);
            } else {

                $final = setReturnJson(1, "Modify Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    /**DC Only */
    public function modifyByDC($staff, $operatorId)
    {
        if ($this->checkStaffRole($operatorId) > 1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            $retrieveStaff = $this->action->RetrieveById($staff->getId());
            if ($retrieveStaff == 1) {
                $final = setReturnJson(1, "Account is not existed");
            } else {
                if ($this->action->UpdateStaff($staff)) {
                    $final = setReturnJson(0, $this->action->RetrieveByIdNoPassword($staff->getId())[0]);
                } else {

                    $final = setReturnJson(1, "Modify Failed");
                }
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    /**DC Only */
    public function queryAll($operatorId)
    {
        $role = $this->checkStaffRole($operatorId);
        if ($role > 1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            $staffArr = $this->action->RetrieveAllNoPassword();
            if ($staffArr != -1) {
                $final = setReturnJson(0, $staffArr);
            } else {
                $final = setReturnJson(1, "Get Staff Details Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    /**DC Only */
    public function createByDC($staff, $operatorId)
    {
        if ($this->checkStaffRole($operatorId) > 1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            return $this->register($staff);
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    /**DC Only */
    public function deleteByDC($id, $operatorId)
    {
        if ($this->checkStaffRole($operatorId) > 1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            if ($this->action->delete($id) == 1) {
                $final = setReturnJson(0, "Delete Successfully");
            } else {
                $final = setReturnJson(1, "Delete Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function staffTime($staff_time, $operatorId)
    {
        $flag = 0;
        if ($this->checkStaffRole($operatorId) > 3) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            if($this->timeAction->RetrieveById($operatorId)!=-1){
                $flag = $this->timeAction->UpdateStaff_Time($staff_time);
                
            }else{
                $flag = $this->timeAction->CreateStaff_Time($staff_time);
            }
            if ($flag) {
                $final = setReturnJson(0, "Update Time Successfully");
            } else {
                $final = setReturnJson(1, "Update Time Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }
}
