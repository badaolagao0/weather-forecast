<?php
class WeatherApi {
    private function getByUrl($url) {
        $client = curl_init($url);
        curl_setopt($client, CURLOPT_RETURNTRANSFER, 1);
        $respon = curl_exec($client);
        
        if(curl_errno($client)) {
            curl_close($client);
            return false;
        }
        
        curl_close($client);
        $result = json_decode($respon);
        return $result;
    }

    private function link($location, $amount) {
        $link = "http://api.weatherapi.com/v1/forecast.json?key=8579141fce694b5d8cf82041242404&q=".$location."&days=".$amount."&aqi=no&alerts=no";
        return $link;
    }
    
    public function weatherApi($location, $amount) {
        $url = $this->link($location, $amount);
        $result = $this->getByUrl($url);
        if($result === false) {
            $error = array('error' => "Can't connect to API.");
            echo json_encode($error);
            return;
        }
        
        header('Content-Type: application/json; charset=utf8');
        echo json_encode($result);
    }
}
?>