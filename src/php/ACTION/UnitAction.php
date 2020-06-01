<?php
require_once '../../VO/Database.php';
require_once '../../VO/Unit.php';

class UnitAction
{
    //Object to Array
    private function toArray($unit)
    {
        $unitArr = array();
        $unitArr['unit_id'] = $unit->getId();
        $unitArr['name'] = $unit->getName();
        $unitArr['uc_id'] = $unit->getUC();
        $unitArr['lecturer_id'] = $unit->getLecturer();
        $unitArr['tutor_id'] = $unit->getTutor();
        $unitArr['capacity'] = $unit->getCapacity();
        $unitArr['description'] = $unit->getDescription();
        $unitArr['semester'] = $unit->getSemester();
        $unitArr['campus'] = $unit->getCampus();
        return $unitArr;
    }

    //Object to Array(Unit Details)
    private function toArrayDetails($unit, $unit_time, $uc_id, $lecturer_id, $tutor_id)
    {
        $unitArr = array();
        $unitArr['unit_id'] = $unit->getId();
        $unitArr['name'] = $unit->getName();
        $unitArr['uc_name'] = $unit->getUC();
        $unitArr['lecturer_name'] = $unit->getLecturer();
        $unitArr['tutor_name'] = $unit->getTutor();
        $unitArr['capacity'] = $unit->getCapacity();
        $unitArr['description'] = $unit->getDescription();
        $unitArr['semester'] = $unit->getSemester();
        $unitArr['campus'] = $unit->getCampus();
        $unitArr['time'] = $unit_time->getTime();
        $unitArr['type'] = $unit_time->getType();
        $unitArr['uc_id'] = $uc_id;
        $unitArr['lecturer_id'] = $lecturer_id;
        $unitArr['tutor_id'] = $tutor_id;
        return $unitArr;
    }

    //Object to Array(Each Student Unit Details)
    private function toArrayEachDetails($unit, $unit_time, $student_id)
    {
        $unitArr = array();
        $unitArr['unit_id'] = $unit->getId();
        $unitArr['name'] = $unit->getName();
        $unitArr['uc_name'] = $unit->getUC();
        $unitArr['lecturer_name'] = $unit->getLecturer();
        $unitArr['tutor_name'] = $unit->getTutor();
        $unitArr['capacity'] = $unit->getCapacity();
        $unitArr['description'] = $unit->getDescription();
        $unitArr['semester'] = $unit->getSemester();
        $unitArr['campus'] = $unit->getCampus();
        $unitArr['time'] = $unit_time->getTime();
        $unitArr['type'] = $unit_time->getType();
        $unitArr['student_id'] = $student_id;
        return $unitArr;
    }

    //Object to Array(Each Enrolled Student Unit Details)
    private function toArrayEachEnrolledDetails($unit, $unit_time, $student_id,$student_name)
    {
        $unitArr = array();
        $unitArr['unit_id'] = $unit->getId();
        $unitArr['name'] = $unit->getName();
        $unitArr['uc_name'] = $unit->getUC();
        $unitArr['lecturer_name'] = $unit->getLecturer();
        $unitArr['tutor_name'] = $unit->getTutor();
        $unitArr['capacity'] = $unit->getCapacity();
        $unitArr['description'] = $unit->getDescription();
        $unitArr['semester'] = $unit->getSemester();
        $unitArr['campus'] = $unit->getCampus();
        $unitArr['time'] = $unit_time->getTime();
        $unitArr['type'] = $unit_time->getType();
        $unitArr['student_id'] = $student_id;
        $unitArr['student_name'] = $student_name;
        return $unitArr;
    }


    //Retrieve All Units' Info
    public function RetrieveAll()
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit_details";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_name']);
            $unit->setLecturer($row['lecturer_name']);
            $unit->setTutor($row['tutor_name']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $unit_time = new Unit_Time($row['unit_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArrayDetails($unit, $unit_time, $row['uc_id'], $row['lecturer_id'], $row['tutor_id']);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve All Enrolled Student Detail
    public function RetrieveAllStudent()
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit_enroll_details";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_name']);
            $unit->setLecturer($row['lecturer_name']);
            $unit->setTutor($row['tutor_name']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $unit_time = new Unit_Time($row['unit_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArrayEachEnrolledDetails($unit, $unit_time, $row['student_id'],$row['student_name']);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve Each Student Enrolled Units' Info
    public function RetrieveEachAll($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit_enroll_details WHERE student_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_name']);
            $unit->setLecturer($row['lecturer_name']);
            $unit->setTutor($row['tutor_name']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $unit_time = new Unit_Time($row['unit_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArrayEachDetails($unit, $unit_time, $row['student_id']);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve Unit's Info By Id
    public function RetrieveById($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit_details WHERE unit_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_name']);
            $unit->setLecturer($row['lecturer_name']);
            $unit->setTutor($row['tutor_name']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $unit_time = new Unit_Time($row['unit_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArrayDetails($unit, $unit_time, $row['uc_id'], $row['lecturer_id'], $row['tutor_id']);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Create(DC)
    public function CreateUnit($unit)
    {
        $conn = new Database();
        $name = $unit->getName();
        $uc = $unit->getUC();
        $lecturer = $unit->getLecturer();
        $capacity = $unit->getCapacity();
        $description = $unit->getDescription();
        $semester = $unit->getSemester();
        $campus = $unit->getCampus();

        $sql = "INSERT INTO unit (
                                    name,
                                    uc_id,
                                    lecturer_id,
                                    capacity,
                                    description,
                                    semester,
                                    campus
                                    ) VALUES(
                                    '${name}',
                                    '${uc}',
                                    '${lecturer}',
                                    '${capacity}',
                                    '${description}',
                                    '${semester}',
                                    '${campus}'
                                    )";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            $unit->setId($this->getLastId());
            return $this->toArray($unit);
        } else {
            return -1;
        }
    }

    //Update(DC)
    public function UpdateUnitByDC($unit)
    {
        $conn = new Database();
        $id = $unit->getId();
        $name = $unit->getName();
        $uc = $unit->getUC();
        $lecturer = $unit->getLecturer();
        $capacity = $unit->getCapacity();
        $description = $unit->getDescription();
        $semester = $unit->getSemester();
        $campus = $unit->getCampus();

        $sql = "UPDATE unit SET
                                name = '${name}',
                                uc_id = '${uc}',
                                lecturer_id = '${lecturer}',
                                capacity = '${capacity}',
                                description = '${description}',
                                semester = '${semester}',
                                campus = '${campus}'
                            WHERE unit_id = '${id}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return $this->toArray($unit);
        } else {
            return -1;
        }
    }

    //Update(UC)
    public function UpdateUnitByUC($unit)
    {
        $conn = new Database();
        $id = $unit->getId();
        $lecturer = $unit->getLecturer();
        $tutor = $unit->getTutor();

        $sql = "UPDATE unit SET
                                lecturer_id = '${lecturer}',
                                tutor_id = '${tutor}'
                            WHERE unit_id = '${id}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return $this->toArray($unit);
        } else {
            return -1;
        }
    }

    //Delete(DC)
    public function Delete($id)
    {
        $conn = new Database();
        $sql = "DELETE FROM unit WHERE unit_id = '${id}'";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }

    public function getLastId()
    {
        $conn = new Database();
        $sql = "select max(unit_id) from unit";
        $res = $conn->querySQL($sql);
        $row = $res->fetch_assoc();
        $conn->closeConn();
        return $row['max(unit_id)'];
    }
}

class Unit_TimeAction
{
    //Object to Array
    private function toArray($unit_time)
    {
        $unit_timeArr = array();
        $unit_timeArr['unit_id'] = $unit_time->getId();
        $unit_timeArr['time'] = $unit_time->getTime();
        $unit_timeArr['type'] = $unit_time->getType();
        return $unit_timeArr;
    }

    public function Create($unit_time)
    {
        $conn = new Database();
        $unit_id = $unit_time->getId();
        $time = $unit_time->getTime();
        $type = $unit_time->getType();

        $sql = "INSERT INTO unit_time (
                                        unit_id,
                                        time,
                                        type
                                        ) VALUES(
                                        '${unit_id}',
                                        '${time}',
                                        '${type}'
                                        )";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }

    public function RetrieveByIdAndType($id,$type)
    {
        $conn = new Database();
    $sql = "SELECT * FROM unit_time WHERE unit_id = '${id}' AND type = '${type}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit_Time($row['unit_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArray($unit);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return 1;
        }
    }

    public function Update($unit_time)
    {
        $conn = new Database();
        $unit_id = $unit_time->getId();
        $time = $unit_time->getTime();
        $type = $unit_time->getType();

        $sql = "UPDATE unit_time    SET
                                        time = '${time}'
                                    WHERE
                                        unit_id = '${unit_id}'
                                    AND 
                                        type = '${type}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }
}

class Unit_EnrollmentAction
{
    //Object to Array
    private function toArray($unit_enrollment)
    {
        $unit_enrollmentArr = array();
        $unit_enrollmentArr['unit_id'] = $unit_enrollment->getId();
        $unit_enrollmentArr['student_id'] = $unit_enrollment->getStudent();
        $unit_enrollmentArr['time'] = $unit_enrollment->getTime();
        $unit_enrollmentArr['type'] = $unit_enrollment->getType();
        return $unit_enrollmentArr;
    }

    public function Create($unit_enrollment)
    {
        $conn = new Database();
        $unit_id = $unit_enrollment->getId();
        $student_id = $unit_enrollment->getStudent();
        $time = $unit_enrollment->getTime();
        $type = $unit_enrollment->getType();

        $sql = "INSERT INTO unit_enrollment (
                                        unit_id,
                                        student_id,
                                        time,
                                        type
                                        ) VALUES(
                                        '${unit_id}',
                                        '${student_id}',
                                        '${time}',
                                        '${type}'
                                        )";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }

    public function RetrieveByUnitIdAndStudentIdAndType($unit_id, $student_id, $type)
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit_enrollment WHERE unit_id = '${unit_id}' AND student_id = '${student_id}' AND type = '${type}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit_Enrollment($row['unit_id'], $row['student_id'], $row['time'], $row['type']);
            $resArr[$i] = $this->toArray($unit);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return 1;
        }
    }

    public function Update($unit_enrollment)
    {
        $conn = new Database();
        $unit_id = $unit_enrollment->getId();
        $student_id = $unit_enrollment->getStudent();
        $time = $unit_enrollment->getTime();
        $type = $unit_enrollment->getType();

        $sql = "UPDATE unit_enrollment SET
                                time = '${time}'
                            WHERE   unit_id = '${unit_id}'
                            AND     student_id = '${student_id}'
                            AND     type = '${type}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }
    public function Delete($unit_enrollment)
    {
        $unit_id = $unit_enrollment->getId();
        $student_id = $unit_enrollment->getStudent();
        $conn = new Database();
        $sql = "DELETE FROM unit_enrollment WHERE unit_id = '${unit_id}' AND student_id = '${student_id}'";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }
}
