<?php

require_once "../../ACTION/UnitAction.php";
require_once "../../ACTION/StaffAction.php";
require_once "../../ACTION/StudentAction.php";
require_once '../../VO/Unit.php';
require_once '../../FUNCTION/PublicFunction.php';


class UnitService
{
    private $action;
    private $timeAction;
    private $enrollmentAction;
    private $staffAction;
    private $studentAction;

    public function __construct()
    {
        $this->action = new UnitAction();
        $this->timeAction = new Unit_TimeAction();
        $this->enrollmentAction = new Unit_EnrollmentAction();
        $this->staffAction = new StaffAction();
        $this->studentAction = new StudentAction();
    }

    public function checkStaffRole($operatorId)
    {
        $retrieveStaff = $this->staffAction->RetrieveByIdNoPassword($operatorId);
        return $retrieveStaff[0]['role'];
    }

    public function checkStudentRole($operatorId)
    {
        $retrieveStudent = $this->studentAction->RetrieveByIdNoPassword($operatorId);
        if ($retrieveStudent != -1) {
            return $retrieveStudent[0]['role'];
        } else {
            return -1;
        }
    }

    /**DC Only */
    public function Create($unit, $operatorId)
    {
        $role = $this->checkStaffRole($operatorId);
        if ($role > 1 || $role == -1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            if ($this->action->CreateUnit($unit)) {
                $final = setReturnJson(0, $this->action->RetrieveById($this->action->getLastId())[0]);
            } else {
                $final = setReturnJson(1, "Create Unit Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    /**DC、UC Only */
    public function UpdateUnit($unit, $operatorId)
    {
        $role = $this->checkStaffRole($operatorId);
        if ($role > 2 || $role == -1) {
            $final = setReturnJson(1, "No permission to access");
        } else if ($role == 1) {
            if ($this->action->UpdateUnitByDC($unit)) {
                $final = setReturnJson(0, $this->action->RetrieveById($unit->getId())[0]);
            } else {
                $final = setReturnJson(1, "Modify Unit Failed");
            }
        } else if ($role == 2) {
            if ($this->action->UpdateUnitByUC($unit)) {
                $final = setReturnJson(0, $this->action->RetrieveById($unit->getId())[0]);
            } else {
                $final = setReturnJson(1, "Modify Unit Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function Delete($id, $operatorId)
    {
        $role = $this->checkStaffRole($operatorId);
        if ($role > 1 || $role == -1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            if ($this->action->Delete($id)) {
                $final = setReturnJson(0, "Delete Unit Successfully");
            } else {
                $final = setReturnJson(1, "Delete Unit Failed");
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function ModifyTime($unit_time, $operatorId)
    {
        $role = $this->checkStaffRole($operatorId);


        if ($role != 2) {
            $final = setReturnJson(1, "No permission to access");
        } else {

            if ($this->timeAction->RetrieveByIdAndType($unit_time->getId(),$unit_time->getType()) != -1) {
                if ($this->timeAction->Update($unit_time)) {
                    // $final = setReturnJson(0, $this->action->RetrieveById($unit_time->getId())[0]);
                    $final = setReturnJson(0, "Update");
                } else {
                    $final = setReturnJson(1, "Modify Unit Time Failed");
                }
            } else {
                if ($this->timeAction->Create($unit_time)) {
                    // $final = setReturnJson(0, $this->action->RetrieveById($unit_time->getId())[0]);
                    $final = setReturnJson(0, "Create");
                } else {
                    $final = setReturnJson(1, "Modify Unit Time Failed");
                }
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    // Unit Detail Page
    public function UnitDetails()
    {
        $unitArr = $this->action->RetrieveAll();
        if ($unitArr != -1) {
            $final = setReturnJson(0, $unitArr);
        } else {
            $final = setReturnJson(1, "Get Unit Details Failed");
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    // All Student Unit Detail Page
    public function AllStudentUnitDetails($operatorId)
    {
        $role = $this->checkStaffRole($operatorId);
        if ($role > 3 || $role == -1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            $unitArr = $this->action->RetrieveAllStudent();
            if ($unitArr != -1) {
                $final = setReturnJson(0, $unitArr);
            } else {
                $final = setReturnJson(1, array());
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    // Each Student Unit Detail Page
    public function EachStudentUnitDetails($operatorId)
    {
        $role = $this->checkStudentRole($operatorId);
        if ($role < 4 || $role == -1) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            $unitArr = $this->action->RetrieveEachAll($operatorId);
            if ($unitArr != -1) {
                $final = setReturnJson(0, $unitArr);
            } else {
                $final = setReturnJson(1, array());
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }

    public function Enrollment($unit_enrollment, $operatorId)
    {
        // $final = setReturnJson(0,$unit_enrollment->getTime());
        if ($this->checkStudentRole($operatorId) != 4 && $this->checkStaffRole($operatorId) != 2) {
            $final = setReturnJson(1, "No permission to access");
        } else {
            if ($this->action->RetrieveById($unit_enrollment->getId()) == -1) {
                $final = setReturnJson(1, "Unit is not exsited");
                return json_encode($final, JSON_UNESCAPED_UNICODE);
            }

            if ($this->enrollmentAction->RetrieveByUnitIdAndStudentIdAndType($unit_enrollment->getId(), $unit_enrollment->getStudent(), $unit_enrollment->getType()) != -1) {

                if ($this->enrollmentAction->Update($unit_enrollment)) {
                    $final = setReturnJson(0, "Enroll Successfully");
                } else {
                    $final = setReturnJson(1, "Enroll Failed");
                }
            } else {

                if ($this->enrollmentAction->Create($unit_enrollment)) {
                    $final = setReturnJson(0, "Enroll Successfully");
                } else {
                    $final = setReturnJson(1, "Enroll Failed");
                }
            }
        }
        return json_encode($final, JSON_UNESCAPED_UNICODE);
    }
}
