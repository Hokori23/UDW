<?php

class Staff
{
    private $staff_id;
    private $name;
    private $email;
    private $password;
    private $address;
    private $birth;
    private $phone_number;
    private $qualification;
    private $expertise;
    private $role;



    /**
     * @return String
     */
    public function getId()
    {
        return $this->staff_id;
    }

    /**
     * @param String $staff_id
     */
    public function setId($staff_id)
    {
        $this->staff_id = $staff_id;
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
    public function getQua()
    {
        return $this->qualification;
    }

    /**
     * @param Number $qualification
     */
    public function setQua($qualification)
    {
        $this->qualification = $qualification;
    }

    /**
     * @return Number
     */
    public function getExp()
    {
        return $this->expertise;
    }

    /**
     * @param Number $expertise
     */
    public function setExp($expertise)
    {
        $this->expertise = $expertise;
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
}

class Staff_Time
{
    private $staff_id;
    private $time;



    /**
     * @return String
     */
    public function getId()
    {
        return $this->staff_id;
    }

    /**
     * @param String $staff_id
     */
    public function setId($staff_id)
    {
        $this->staff_id = $staff_id;
    }

    /**
     * @return Number
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param Number $time
     */
    public function setTime($time)
    {
        $this->time = $time;
    }
}
