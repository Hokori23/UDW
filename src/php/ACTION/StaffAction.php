<?php
require_once '../../VO/Database.php';
require_once '../../VO/Staff.php';

class StaffAction
{
    //Object to Array
    private function toArray($staff)
    {
        $staffArr = array();
        $staffArr['staff_id'] = $staff->getId();
        $staffArr['name'] = $staff->getName();
        $staffArr['email'] = $staff->getEmail();
        $staffArr['password'] = $staff->getPassword();
        $staffArr['address'] = $staff->getAddress();
        $staffArr['birth'] = $staff->getBirth();
        $staffArr['phone_number'] = $staff->getPhoneNumber();
        $staffArr['qualification'] = $staff->getQua();
        $staffArr['expertise'] = $staff->getExp();
        $staffArr['role'] = $staff->getRole();
        return $staffArr;
    }
    //Object to Array
    private function toArrayDetails($staff,$staff_time)
    {
        $staffArr = array();
        $staffArr['staff_id'] = $staff->getId();
        $staffArr['name'] = $staff->getName();
        $staffArr['email'] = $staff->getEmail();
        $staffArr['password'] = $staff->getPassword();
        $staffArr['address'] = $staff->getAddress();
        $staffArr['birth'] = $staff->getBirth();
        $staffArr['phone_number'] = $staff->getPhoneNumber();
        $staffArr['qualification'] = $staff->getQua();
        $staffArr['expertise'] = $staff->getExp();
        $staffArr['role'] = $staff->getRole();
        $staffArr['time'] = $staff_time->getTime();
        return $staffArr;
    }

    //Retrieve Staff's Info By Id
    public function RetrieveById($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM staff WHERE staff_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $staff = new Staff();
            $staff->setId($row['staff_id']);
            $staff->setName($row['name']);
            $staff->setEmail($row['email']);
            $staff->setPassword($row['password']);
            $staff->setAddress($row['address']);
            $staff->setBirth($row['birth']);
            $staff->setPhoneNumber($row['phone_number']);
            $staff->setQua($row['qualification']);
            $staff->setExp($row['expertise']);
            $staff->setRole($row['role']);
            $resArr[$i] = $this->toArray($staff);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve Staff's Info By Id(No Password)
    public function RetrieveByIdNoPassword($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM staff_details WHERE staff_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $staff = new Staff();
            $staff->setId($row['staff_id']);
            $staff->setName($row['name']);
            $staff->setEmail($row['email']);
            $staff->setAddress($row['address']);
            $staff->setBirth($row['birth']);
            $staff->setPhoneNumber($row['phone_number']);
            $staff->setQua($row['qualification']);
            $staff->setExp($row['expertise']);
            $staff->setRole($row['role']);
            $staff_time = new Staff_Time($row['staff_id'],$row['time']);
            $resArr[$i] = $this->toArrayDetails($staff,$staff_time);
            $i++;
        }
        $conn->closeConn();
        if ($res->num_rows === 0) {
            return -1;
        } else {
            return $resArr;
        }
    }

    //Retrieve All Staff's Details
    public function RetrieveAllNoPassword()
    {
        $conn = new Database();
        $sql = "SELECT * FROM staff_details";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $staff = new Staff();
            $staff->setId($row['staff_id']);
            $staff->setName($row['name']);
            $staff->setEmail($row['email']);
            $staff->setPassword(null);
            $staff->setAddress($row['address']);
            $staff->setBirth($row['birth']);
            $staff->setPhoneNumber($row['phone_number']);
            $staff->setQua($row['qualification']);
            $staff->setExp($row['expertise']);
            $staff->setRole($row['role']);
            $staff_time = new Staff_Time($row['staff_id'],$row['time']);
            $resArr[$i] = $this->toArrayDetails($staff,$staff_time);
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
    public function CreateStaff($staff)
    {
        $conn = new Database();
        $id = $staff->getId();
        $name = $staff->getName();
        $email = $staff->getEmail();
        $password = $staff->getPassword();
        $address = $staff->getAddress();
        $birth = $staff->getBirth();
        $phone_number = $staff->getPhoneNumber();
        $qualification = $staff->getQua();
        $expertise = $staff->getExp();
        $role = $staff->getRole();

        $sql = "INSERT INTO staff VALUES(
                                            '${id}',
                                            '${name}',
                                            '${email}',
                                            '${password}',
                                            '${address}',
                                            '${birth}',
                                            '${phone_number}',
                                            '${qualification}',
                                            '${expertise}',
                                            '${role}'
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
    public function UpdateStaff($staff)
    {
        $conn = new Database();
        $id = $staff->getId();
        $name = $staff->getName();
        $email = $staff->getEmail();
        $address = $staff->getAddress();
        $birth = $staff->getBirth();
        $phone_number = $staff->getPhoneNumber();
        $qualification = $staff->getQua();
        $expertise = $staff->getExp();
        $role = $staff->getRole();

        $sql = "UPDATE staff    SET
                                    name = '${name}',
                                    email = '${email}',
                                    address = '${address}',
                                    birth = '${birth}',
                                    phone_number = '${phone_number}',
                                    qualification = '${qualification}',
                                    expertise = '${expertise}',
                                    role = '${role}'
                                WHERE staff_id = '${id}'
                                ";
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
        $sql = "DELETE FROM staff WHERE staff_id = '${id}'";
        $res = $conn->execSQL($sql);
        $conn->closeConn();
        if ($res == 1) {
            return 1;
        } else {
            return -1;
        }
    }
}

class Staff_TimeAction
{
    //Object to Array
    private function toArray($staff_time)
    {
        $staff_timeArr = array();
        $staff_timeArr['staff_id'] = $staff_time->getId();
        $staff_timeArr['time'] = $staff_time->getTime();
        return $staff_timeArr;
    }

    //Retrieve Staff Available Time By Id
    public function RetrieveById($id)
    {
        $conn = new Database();
        $sql = "SELECT * FROM staff_time WHERE staff_id = '${id}'";
        $res = $conn->querySQL($sql);
        $resArr = array();
        $i = 0;
        while ($row = $res->fetch_assoc()) {
            $staff_time = new Staff_time($row['staff_time_id'],$row['time']);
            $resArr[$i] = $this->toArray($staff_time);
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
    public function CreateStaff_Time($staff_time)
    {
        $conn = new Database();
        $id = $staff_time->getId();
        $time = $staff_time->getTime();

        $sql = "INSERT INTO staff_time VALUES(
                                            '${id}',
                                            '${time}'
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
    public function UpdateStaff_Time($staff_time)
    {
        $conn = new Database();
        $id = $staff_time->getId();
        $time = $staff_time->getTime();

        $sql = "UPDATE staff_time   SET
                                        time = '${time}'
                                    WHERE staff_id = '${id}'
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
