// pages/city/[city].js
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import Layout from '@/components/Layout';
import { UnitContext } from '@/context/UnitContext';
import { LanguageContext } from '@/context/LanguageContext';
import WeatherCard from '@/components/WeatherCard';

const City = () => {
  const router = useRouter();
  const { city } = router.query;
  const { unit } = useContext(UnitContext);
  const { language } = useContext(LanguageContext);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city}&units=${unit}&lang=${language}&appid=e5dc0a715a378bbefae35b37d8b698c3`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  }, [city, unit, language]);

  return (
    <Layout>
      {weatherData ? (
        <div style={{maxWidth:"400px"}}>
        <WeatherCard weatherData={weatherData} />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </Layout>
  );
};

export default City;
