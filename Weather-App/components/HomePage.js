// components/HomePage.js
import { useContext, useState, useEffect, useCallback } from 'react';
import Layout from './Layout';
import WeatherList from './WeatherList';
import WeatherCard from './WeatherCard';
import { UnitContext } from '@/context/UnitContext';
import { LanguageContext } from '@/context/LanguageContext';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherDataList, setWeatherDataList] = useState([]);
  const { unit } = useContext(UnitContext);
  const { language } = useContext(LanguageContext);

  const apiKey = 'e5dc0a715a378bbefae35b37d8b698c3';

  // Function to get current geolocation position
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        const position = await getCurrentPosition(); // Function to get current geolocation position
        const { latitude, longitude } = position.coords;
  
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&lang=${language}&appid=${apiKey}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch current location weather data');
        }
  
        const data = await response.json();
        setCurrentWeatherData(data);
      } catch (err) {
        console.error('Error fetching current location weather:', err);
        setCurrentWeatherData(null);
      }
    };
    // Fetch weather data for user's current location when component mounts
    fetchCurrentLocationWeather();
  }, [unit, language]); // Depend on unit and language changes

  const fetchWeatherData = useCallback(async () => {
    setError('');
    setWeatherDataList([]);

    if (!city.trim()) {
      setError('City name must be entered.');
      return;
    }

    const [cityName, countryCode] = city.split(',').map(part => part.trim());
    if (!cityName) {
      setError('City name must be entered.');
      return;
    }

    const url = countryCode
      ? `https://api.openweathermap.org/data/2.5/find?q=${cityName},${countryCode.toLowerCase()}&units=${unit}&lang=${language}&cnt=50&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/find?q=${cityName}&units=${unit}&lang=${language}&cnt=50&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      if (data.count === 0) {
        setError('No cities found.');
      } else {
        setWeatherDataList(data.list);
      }
    } catch (err) {
      setError('Error fetching weather data.');
    }
  }, [city, unit, language]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <Layout>
      <div className="text-center">
        <form className="d-flex justify-content-center align-items-center border border-primary rounded p-2 mb-3" onSubmit={handleSearch} style={{ maxWidth: "500px", margin: "0 auto" }}>
          <input
            type="text"
            className="form-control me-2 border-0"
            placeholder="Enter city or city,country code"
            value={city}
            onChange={(e) => setCity(e.target.value.trim())}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>

      <div>
        {weatherDataList.length > 0 ? (
          <WeatherList weatherDataList={weatherDataList} />
        ) : (
          <div className="d-flex justify-content-center ">
            <div className="text-center" style={{ maxWidth: "30%" }}>
              <h2>Current Location</h2>
              {currentWeatherData && <WeatherCard weatherData={currentWeatherData} />}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
