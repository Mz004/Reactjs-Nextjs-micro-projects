//@components/WeatherCard.js
import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import WeatherDetails from './WeatherDetails';
import 'flag-icons/css/flag-icons.min.css';
import { UnitContext } from '@/context/UnitContext';
import { LanguageContext } from '@/context/LanguageContext';

const WeatherCard = ({ weatherData }) => {
  const { unit } = useContext(UnitContext);
  const { language } = useContext(LanguageContext);
  const [modalShow, setModalShow] = useState(false);

  if (!weatherData) {
    console.log("No Data found: WeatherCard.js")
    return null; 
  }

  const { name, sys, main, weather } = weatherData;

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const handleDetailsClick = () => {
    setModalShow(true);

    // Store city ID in local storage
    const visitedCities = JSON.parse(localStorage.getItem('visitedCities')) || [];
    if (!visitedCities.includes(weatherData.id)) {
      visitedCities.push(weatherData.id);
      localStorage.setItem('visitedCities', JSON.stringify(visitedCities));
    }
  };

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
          <div>
            <h5>{name}, {sys.country} <span className={`fi fi-${sys.country.toLowerCase()}`}></span></h5>
          </div>
          <Image
            src={weatherIconUrl}
            alt={weather[0].description}
            width={50}
            height={50}
            className="rounded"
          />
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-left">
            <strong>Temperature: </strong>{main.temp} {unit === 'metric' ? '°C' : '°F'}
            <br />
            <strong>Feels like: </strong>{main.feels_like} {unit === 'metric' ? '°C' : '°F'}
            <br />
            <strong>Weather: </strong>{weather[0].description}
            <br />
          </Card.Text>
          <div className="text-right">
            <Button variant="primary" onClick={handleDetailsClick}>
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <WeatherDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        weatherData={weatherData}
      />
    </>
  );
};

export default WeatherCard;
