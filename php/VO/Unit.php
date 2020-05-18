<?php

class Unit
{
    private $unit_id;
    /**DC */
    private $name;
    /**DC */
    private $uc_id;
    /**DC */
    private $lecturer_id;
    /**DC、UC */
    private $tutor_id;
    /**UC */
    private $capacity;
    /**DC */
    private $description;
    /**DC */
    private $semester;
    /**DC */
    private $campus;
    /**DC */

    /**
     * @return Number
     */
    public function getId()
    {
        return $this->unit_id;
    }

    /**
     * @param Number $unit_id
     */
    public function setId($unit_id)
    {
        $this->unit_id = $unit_id;
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
    public function getUC()
    {
        return $this->uc_id;
    }

    /**
     * @param String $uc_id
     */
    public function setUC($uc_id)
    {
        $this->uc_id = $uc_id;
    }

    /**
     * @return String
     */
    public function getLecturer()
    {
        return $this->lecturer_id;
    }

    /**
     * @param String $lecturer_id
     */
    public function setLecturer($lecturer_id)
    {
        $this->lecturer_id = $lecturer_id;
    }

    /**
     * @return String
     */
    public function getTutor()
    {
        return $this->tutor_id;
    }

    /**
     * @param String $tutor_id
     */
    public function setTutor($tutor_id)
    {
        $this->tutor_id = $tutor_id;
    }

    /**
     * @return Number
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /**
     * @param Number $capacity
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;
    }

    /**
     * @return String
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param String $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return String
     */
    public function getSemester()
    {
        return $this->semester;
    }

    /**
     * @param String $semester
     */
    public function setSemester($semester)
    {
        $this->semester = $semester;
    }

    /**
     * @return String
     */
    public function getCampus()
    {
        return $this->campus;
    }

    /**
     * @param String $campus
     */
    public function setCampus($campus)
    {
        $this->campus = $campus;
    }
}

/******************************************************************************* */
class Unit_Time
{
    private $unit_id;
    private $time;
    private $type;


    public function __construct($id, $time, $type)
    {
        $this->unit_id = $id;
        $this->time = $time;
        $this->type = $type;
    }

    /**
     * @return Number
     */
    public function getId()
    {
        return $this->unit_id;
    }

    /**
     * @param Number $unit_id
     */
    public function setId($unit_id)
    {
        $this->unit_id = $unit_id;
    }

    /**
     * @return String
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param String $time
     */
    public function setTime($time)
    {
        $this->time = $time;
    }

    /**
     * @return Number
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param Number $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }
}

/******************************************************************************* */
class Unit_Enrollment
{
    private $unit_id;
    private $student_id;


    public function __construct($id, $student_id)
    {
        $this->unit_id = $id;
        $this->student_id = $student_id;
    }

    /**
     * @return Number
     */
    public function getId()
    {
        return $this->unit_id;
    }

    /**
     * @param Number $unit_id
     */
    public function setId($unit_id)
    {
        $this->unit_id = $unit_id;
    }

    /**
     * @return String
     */
    public function getStudent()
    {
        return $this->student_id;
    }

    /**
     * @param String $student_id
     */
    public function setStudent($student_id)
    {
        $this->student_id = $student_id;
    }
}
