import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Card, Image } from 'react-bootstrap';
import axios from "axios";
import TextField from '@mui/material/TextField';

function App() {
    const [listWeather, setListWeather] = useState([]);
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [wine, setWine] = useState(0);
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [amount, setAmount] = useState(5);
    const [province, setProvince] = useState("London");
    const [humidity, setHumidity] = useState(0);
    const [temp_c, setTemp_c] = useState(0);
    const [text, setText] = useState("");
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleSearch = async (e) => {
        if ((e.key === 'Enter' || e.target.type === 'submit') && searchTerm.trim() !== '') {
            setProvince(searchTerm)
            try {
                const response = await axios.post("https://weather-myapi.000webhostapp.com/weatherApi.php?search=" + searchTerm)
                if (response.data) {
                    setListWeather(response.data);
                    setWeatherForecast(response.data.forecast);
                    saveHistory();
                    fetchWeatherDataHistory();
                } else {
                    console.error("No data found.");
                    alert('Not found');
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        } else {
            console.error("Please enter a valid search term.");
        }
    };

    const handleLoadMore = async (e) => {
        try {
            setAmount(amount + 4);
            const response = await axios.post("https://weather-myapi.000webhostapp.com/weatherApi.php?search=" + province + "&amount=" + amount)
            if (response.data) {
                setListWeather(response.data);
                setWeatherForecast(response.data.forecast);
            } else {
                console.error("No data found.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const saveHistory = async () => {
        try {
            const response = await axios.post("https://weather-myapi.000webhostapp.com/insertHistory.php?location=" + searchTerm + "&temp=" + temp_c + "&wind=" + wine + "&humidity=" + humidity + "&date=" + dateTime + "&text=" + text)
            if (response.data) {
                // setListWeather(response.data);
                // setWeatherForecast(response.data.forecast);
                console.log(">> insert", response.data);
            } else {
                console.error("No data found.");
            }
        } catch (error) {
            console.error("Error fetching insert weather data:", error);
        }
    };

    const fetchWeatherData = async (province) => {
        try {
            const response = await axios.post(`https://weather-myapi.000webhostapp.com//weatherApi.php?search=${province}`);
            if (response.data) {
                setListWeather(response.data);
                setWeatherForecast(response.data.forecast);
                console.log(response.data);
            } else {
                console.error("No data found.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handelClickHistory = (value) => {
        setProvince(value);
        fetchWeatherData(value);
    };

    useEffect(() => {
        fetchWeatherData(province);
        fetchWeatherDataHistory();
    }, []);

    useEffect(() => {
        console.log(weatherForecast);
        if (listWeather && listWeather.location) {
            const dateTimeString = listWeather.location?.localtime;
            setDateTime(dateTimeString.split(" "));
            const initWine = listWeather.current?.wind_kph;
            setWine(((initWine * 1000) / 3000).toFixed(2));
            setHumidity(listWeather.current?.humidity);
            setTemp_c(listWeather.current?.temp_c);
            setText(listWeather.current?.condition.text);
        }
    }, [listWeather]);

    const fetchWeatherDataHistory = async () => {
        try {
            const response = await axios.post(`https://weather-myapi.000webhostapp.com//viewHistory.php`);
            if (response.data) {
                setHistory(response.data);
            } else {
                console.error("No history data found.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleRegister = async () => {
        if (isValid) {
            try {
                const response = await axios.post('https://weather-myapi.000webhostapp.com//register.php?email=' + email);
                setMessage("Please confirm via email!");
                console.log(">> mess: " + message);
            } catch (error) {
                console.error(error);
                setMessage("Failed to register for email verification");
            }
        }
    };

    const handleUnsubcribe = async () => {
        try {
            const response = await axios.post('https://weather-myapi.000webhostapp.com//unsubscribe.php?email=' + email);
            setMessage("Please confirm via email!");
            console.log(">> response: " + response);
        } catch (error) {
            console.error(error);
            setMessage("Failed to unsubcribe for email verification");
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);

        const emailRegex = /^\S+@\S+\.\S+$/;
        setIsValid(emailRegex.test(inputValue));
        console.log(">>>Mess: ", isValid);

        if (!emailRegex.test(inputValue)) {
            setMessage('Invalid email address');
        } else {
            setMessage('');
        };
    };

    return (
        <div className="app-container">
            <Header />
            <div className="full-height" style={{ backgroundColor: '#e3f2fd', padding: '30px 0 0 0', margin: '0', width: '100%', paddingBottom: '20px' }}>
                <Row style={{
                    marginLeft: '0',
                    marginRight: '0',
                }}>
                    <Col lg={4} md={4}>
                        <div style={{
                            width: '70%',
                            marginLeft: '25px',
                        }}>
                            <h5>Enter a City Name</h5>
                            <TextField
                                id="outlined-basic"
                                label="E.g., New York, London, Tokyo"
                                variant="outlined"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{ marginBottom: '10px', width: '100%' }}
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSearch}
                                style={{ marginTop: '10px', backgroundColor: '#5372f0', color: '#fff', width: '100%' }}
                            >
                                Search
                            </Button>
                            <hr style={{ border: 'none', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
                            <Button
                                variant="secondary"
                                type="submit"
                                style={{ marginTop: '10px', backgroundColor: '#6c757d', color: '#fff', width: '100%' }}
                            >
                                Use Current Location
                            </Button>
                        </div>
                        <div style={{
                            width: '70%',
                            marginLeft: '25px',
                            marginTop: '25px'
                        }}>
                            <h5>History</h5>
                            <ul>
                                {history.map((item, index) => (
                                    <li key={index}> <a href="#" name="hProvince" onClick={() => handelClickHistory(item.location)} style={{
                                        textDecoration: 'none'
                                    }}>{item.location}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div style={{
                            width: '70%',
                            marginLeft: '25px',
                            marginTop: '25px'
                        }}>
                            <h5>Email Registration</h5>
                            <input
                                style={{
                                    width: '100%'
                                }}
                                type="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                            <div style={{
                                marginTop: '5px',
                            }}>
                                <Button variant="primary" size="sm" style={{
                                    marginRight: '5px'
                                }} onClick={handleRegister}
                                >Register</Button>
                                <Button style={{
                                    backgroundColor: '#6c757d'
                                }} size="sm" onClick={handleUnsubcribe}>Unsubcribe</Button>
                            </div>
                            {!isValid && <p style={{ color: 'red' }}>{message}</p>}
                            {isValid && <p>{message}</p>}
                        </div>
                    </Col>
                    <Col lg={7} md={8}>
                        <Row>
                            <Card style={{ padding: '0', width: '100%', borderRadius: '5px', backgroundColor: '#5372f0', color: '#fff' }}>
                                <Card.Body style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <Card.Title>{listWeather.location?.name} {dateTime[0]}</Card.Title>
                                        <Card.Text style={{
                                            marginBottom: '5px'
                                        }}>
                                            Temperature: {listWeather.current?.temp_c} °C
                                        </Card.Text>
                                        <Card.Text style={{
                                            marginBottom: '5px'
                                        }}>
                                            Wind: {wine} M/S
                                        </Card.Text>
                                        <Card.Text>
                                            Humidity: {listWeather.current?.humidity}%
                                        </Card.Text>
                                    </div>
                                    <div style={{
                                        width: '15%',
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Image style={{
                                            width: '80px',
                                            height: '80px'
                                        }} src={listWeather.current?.condition.icon} rounded />
                                        <span style={{
                                            fontSize: '14px'
                                        }}>{listWeather.current?.condition.text}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <div style={{
                                height: '50px',
                                marginTop: '20px',
                                padding: '0'
                            }}>
                                <h2>4-Day Forecast</h2>
                            </div>
                            {weatherForecast.forecastday && weatherForecast.forecastday.length > 0 && (weatherForecast.forecastday.slice(1).map((item, index) => (
                                <Col lg={3} md={3} sm={2} key={index} style={{
                                    marginBottom: '10px',
                                }}>
                                    <Card style={{ width: '100%', borderRadius: '5px', backgroundColor: '#6c757d', color: '#fff' }}>
                                        <Card.Body>
                                            <Card.Title style={{
                                                fontSize: '16px',
                                            }}>({item.date})</Card.Title>
                                            <Image src={item.day.condition.icon} rounded />
                                            <Card.Text style={{
                                                marginBottom: '5px',
                                                fontSize: '14px'
                                            }}>
                                                Temp: {item.day.avgtemp_c} °C
                                            </Card.Text>
                                            <Card.Text style={{
                                                marginBottom: '5px',
                                                fontSize: '14px'
                                            }}>
                                                Wind: {item.day.avgtemp_c} M/S
                                            </Card.Text>
                                            <Card.Text style={{
                                                fontSize: '14px'
                                            }}>
                                                Humidity: {item.day.avghumidity}%
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )))}
                        </Row>
                        <Row>
                            <Col style={{
                                textAlign: "center",
                                marginTop: '10px'
                            }}>
                                <Button variant="outline-secondary"
                                    onClick={handleLoadMore}
                                >Load more</Button>{' '}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >
        </div >
    );

}

export default App;
