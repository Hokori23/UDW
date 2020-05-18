<?php
require_once '../VO/Database.php';
require_once '../VO/Unit.php';

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

    //Retrieve All Units' Info
    public function RetrieveAll()
    {
        $conn = new Database();
        $sql = "SELECT * FROM unit";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_id']);
            $unit->setLecturer($row['lecturer_id']);
            $unit->setTutor($row['tutor_id']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $resArr[$i] = $this->toArray($unit);
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
        $sql = "SELECT * FROM unit WHERE unit_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $unit = new Unit();
            $unit->setId($row['unit_id']);
            $unit->setName($row['name']);
            $unit->setUC($row['uc_id']);
            $unit->setLecturer($row['lecturer_id']);
            $unit->setTutor($row['tutor_id']);
            $unit->setCapacity($row['capacity']);
            $unit->setDescription($row['description']);
            $unit->setSemester($row['semester']);
            $unit->setCampus($row['campus']);
            $resArr[$i] = $this->toArray($unit);
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
            return 1;
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
                                name = '${$name}',
                                uc_id = '${uc}',
                                lecturer_id = '${lecturer}',
                                capacity = '${capacity}'
                                description = '${description}',
                                semester = '${semester}',
                                campus = '${campus}'
                            WHERE unit_id = '${id}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
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
                                tutor_id = '${tutor}',
                            WHERE unit_id = '${id}'
                                ";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
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
}
