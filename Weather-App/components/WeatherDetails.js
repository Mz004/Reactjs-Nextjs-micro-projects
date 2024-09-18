//@components/WeatherDetails.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'flag-icons/css/flag-icons.min.css';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { UnitContext } from '@/context/UnitContext';

const WeatherDetails = ({ show, onHide, weatherData }) => {
  const { unit } = useContext(UnitContext);

  if (!weatherData) {
    console.log("No Data found: WeatherDeatils.js")
    return null; 
  }

  const { name, sys, main, weather, wind, clouds, rain, snow } = weatherData;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Weather in {name}, {sys.country}<span className={`fi fi-${sys.country.toLowerCase()}`}></span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Image
            src={weatherIconUrl}
            alt={weather[0].description}
            width={100}
            height={100}
            className="rounded"
        />
        <p><strong>Weather:</strong> {weather[0].description}</p>
        <p><strong>Temperature:</strong> {main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
        <p><strong>Feels Like:</strong> {main.feels_like} {unit === 'metric' ? '°C' : '°F'}</p>
        <p><strong>Mininum Temperature:</strong> {main.temp_min} {unit === 'metric' ? '°C' : '°F'}</p>
        <p><strong>Maxinum Temperature:</strong> {main.temp_max} {unit === 'metric' ? '°C' : '°F'}</p>
        <p><strong>Humidity:</strong> {main.humidity}%</p>
        <p><strong>Pressure:</strong> {main.pressure} {unit === 'metric' ? 'hPa' : 'inHg'}</p>
        <p><strong>Wind Speed:</strong> {wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        <p><strong>Cloudiness:</strong> {clouds.all}%</p>
        {rain && <p><strong>Rain Volume:</strong> {rain['1h']} mm</p>}
        {snow && <p><strong>Snow Volume:</strong> {snow['1h']} mm</p>}
        <p><strong>Country:</strong> {sys.country}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WeatherDetails;
