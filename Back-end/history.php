<?php
    class saveHistory{
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

        public function insertHistory($location, $temp, $wind, $humidity, $date, $state){
            $con = $this -> connect();
            $stmt = $con->prepare("INSERT INTO weatherinfo (Location, Temp, Wind, Humidity, date, state) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sdddss", $location, $temp, $wind, $humidity, $date, $state);
            $stmt->execute();
            $stmt->close();
            $this -> CloseConnect($con);
            return true;
        }

        public function getListHistory(){
            $con = $this -> connect();
            $stmt = $con->prepare("SELECT * FROM weatherinfo ORDER BY id DESC LIMIT 4");
            $stmt->execute();
            $result = $stmt->get_result();
            $weather_info = array();
            while ($row = $result->fetch_assoc()) {
                $weather_info[] = array(
                    'id' => $row['id'],
                    'time' => $row['date'],
                    'location' => $row['Location'],
                    'temperature' => $row['Temp'],
                    'humidity' => $row['Humidity'],
                    'Wind' => $row['Wind'],
                    'text' => $row['state']
                );
            }
            $stmt->close();
            $this->CloseConnect($con);
            echo json_encode($weather_info);
        }
    }
?>