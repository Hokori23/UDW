<?php

require_once '../FUNCTION/PublicFunction.php';

class Database
{

    private $conn;

    //构造方法初始化连接
    public function __construct()
    {
        $this->conn = @new mysqli('127.0.0.1', 'fangr', '123456', 'fangr');
        if (!$this->conn) {
            myEcho($this->conn->errno, $this->conn->error);
            $this->closeConn();
            exit();
        }
    }

    //关闭连接
    public function closeConn()
    {
        $this->conn->close();
    }

    //增删改
    public function execSQL($sql)
    {
        $res = $this->conn->query($sql);
        if (!$res) {
            myEcho($this->conn->errno, $this->conn->error);
            exit();
        }
        return $this->conn->affected_rows;      //返回影响行数
    }

    //查
    public function querySQL($sql)
    {
        $res = $this->conn->query($sql);        //mysqli_result类的对象
        if (!$res) {
            myEcho($this->conn->errno, $this->conn->error);
            exit();
        }
        return $res;
    }

    public function setConn($ip, $user, $password,$db)
    {
        $this->conn = @new mysqli($ip, $user, $password,$db);
        if (!$this->conn) {
            myEcho($this->conn->errno, $this->conn->error);
            $this->closeConn();
            exit();
        }
    }
}
