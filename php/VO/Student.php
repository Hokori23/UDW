<?php

class Student
{
    private $student_id;
    private $name;
    private $email;
    private $password;
    private $address;
    private $birth;
    private $phone_number;
    private $role;

    /**
     * @return String
     */
    public function getId()
    {
        return $this->student_id;
    }

    /**
     * @param String $student_id
     */
    public function setId($student_id)
    {
        $this->student_id = $student_id;
    }

    /**
     * @return String
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param String $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return String
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param String $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return String
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param String $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return String
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param String $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return String
     */
    public function getBirth()
    {
        return $this->birth;
    }

    /**
     * @param String $birth
     */
    public function setBirth($birth)
    {
        $this->birth = $birth;
    }

    /**
     * @return Number
     */
    public function getPhoneNumber()
    {
        return $this->phone_number;
    }

    /**
     * @param Number $phone_number
     */
    public function setPhoneNumber($phone_number)
    {
        $this->phone_number = $phone_number;
    }

    /**
     * @return Number
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param Number $role
     */
    public function setRole($role)
    {
        $this->role = $role;
    }

    public function __toString()
    {
        return json_encode(array(
                "id" => $this->student_id, "name" => $this->name, "email" => $this->email, "password" => $this->password, "address" => $this->address, "birth" => $this->birth, "phone_number" => $this->phone_number
        ),JSON_UNESCAPED_UNICODE);
    }
}
