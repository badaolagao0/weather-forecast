<?php
    class handleMail{
        private function connect(){
            $conn = mysqli_connect("localhost", "root", "","weather");
            mysqli_set_charset($conn, "utf8");
            if($conn){
                return $conn;
            }else{
                return false;
            }
        }

        private function CloseConnect($conn){
            mysqli_close($conn);
        }

        public function insertEmail($email,$token){
            if ($this -> checkEmail($email)){
                $con = $this -> connect();
                $stmt = $con->prepare("INSERT INTO customer (email, token) VALUES (?, ?)");
                $stmt->bind_param("ss", $email, $token);
                $stmt->execute();
                $stmt->close();
                $this -> CloseConnect($con);
                return true;
            }
            return false;
        }

        public function getTokenByEmail($email){
            if ($this -> checkEmail($email)){
                $con = $this -> connect();
                $stmt = $con->prepare("SELECT token FROM customer WHERE email = ? ORDER BY id DESC LIMIT 1 ");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    return $row['token'];
                } else {
                    return null;
                }
                $stmt->close();
                $this->closeConnect($con);
            } 
            return false;
        }

        private function checkEmail($email){
            $con = $this -> connect();
            $stmt = $con->prepare("SELECT * FROM customer WHERE email = ? and status = 1");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['status']; // Email exists
            } else {
                return -1; // not exists
            }
            $stmt->close();
            $this->closeConnect($con);
        }

        public function unsubscribe($email, $token){
            $con = $this -> connect();
            if (($this -> checkEmail($email) == 1) && $this -> verifyEmail($email, $token)) {
                $stmt = $con->prepare("UPDATE customer SET status = 0 WHERE email = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();
                return true;
            }else {
                return false;
            }
            $stmt->close();
            $this->closeConnect($con);
        }

        public function register($email, $token){
            $con = $this -> connect();
            if (($this -> checkEmail($email) != 1) && $this -> verifyEmail($email, $token)) {
                $stmt = $con->prepare("UPDATE customer SET status = 1 WHERE email = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $result = $stmt->get_result();
                return true;
            }else {
                return false;
            }
            $stmt->close();
            $this->closeConnect($con);
        }

        function verifyEmail($email, $verificationToken) {
            $savedVerificationToken = $this->getTokenByEmail($email);
            if ($verificationToken === $savedVerificationToken) {
                return true;
            } else {
                return false;
            }
        }

    }
?>