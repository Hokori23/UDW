<?php
require_once '../VO/Database.php';
require_once '../VO/Student.php';

class StudentAction
{
    //Object to Array
    private function toArray($student)
    {
        $studentArr = array();
        $studentArr['student_id'] = $student->getId();
        $studentArr['name'] = $student->getName();
        $studentArr['email'] = $student->getEmail();
        $studentArr['password'] = $student->getPassword();
        $studentArr['address'] = $student->getAddress();
        $studentArr['birth'] = $student->getBirth();
        $studentArr['phone_number'] = $student->getPhoneNumber();
        return $studentArr;
    }

    //Retrieve Student's Info By Id
    public function RetrieveById($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM student WHERE student_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $student = new Student();
            $student->setId($row['student_id']);
            $student->setName($row['name']);
            $student->setEmail($row['email']);
            $student->setPassword($row['password']);
            $student->setAddress($row['address']);
            $student->setBirth($row['birth']);
            $student->setPhoneNumber($row['phone_number']);
            $resArr[$i] = $this->toArray($student);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve Student's Info By Id(No Password)
    public function RetrieveByIdNoPassword($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM student WHERE student_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $student = new Student();
            $student->setId($row['student_id']);
            $student->setName($row['name']);
            $student->setEmail($row['email']);
            $student->setAddress($row['address']);
            $student->setBirth($row['birth']);
            $student->setPhoneNumber($row['phone_number']);
            $resArr[$i] = $this->toArray($student);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Create
    public function CreateStudent($student)
    {
        $conn = new Database();
        $id = $student->getId();
        $name = $student->getName();
        $email = $student->getEmail();
        $password = $student->getPassword();
        $address = $student->getAddress();
        $birth = $student->getBirth();
        $phone_number = $student->getPhoneNumber();

        $sql = "INSERT INTO student VALUES(
                                            '${id}',
                                            '${name}',
                                            '${email}',
                                            '${password}',
                                            '${address}',
                                            '${birth}',
                                            '${phone_number}'
                                            )";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }

    //Update
    public function UpdateStudent($student)
    {
        $conn = new Database();
        $id = $student->getId();
        $name = $student->getName();
        $email = $student->getEmail();
        $password = $student->getPassword();
        $address = $student->getAddress();
        $birth = $student->getBirth();
        $phone_number = $student->getPhoneNumber();

        $sql = "UPDATE student SET  name = '${$name}',
                                    email = '${email}',
                                    password = '${password}',
                                    address = '${address}'
                                    birth = '${birth}',
                                    phone_number = '${phone_number}'
                                WHERE student_id = '${id}'";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }

    //Delete
    public function Delete($id)
    {
        $conn = new Database();
        $sql = "DELETE FROM student WHERE student_id = '${id}'";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }
}
