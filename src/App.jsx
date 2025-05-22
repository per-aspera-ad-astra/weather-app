import { useEffect, useState } from 'react';
import {
  getWeatherByCoords,
  getWeatherByCity,
  getForecastByCity,
} from './services/weatherService';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { processForecastData } from './utils/forecast';
import Forecast from './components/Forecast';
import LastUpdate from './components/LastUpdate';
import Header from './components/Header';
import AdditionalInfo from './components/AdditionalInfo';
import Info from './components/Info';

function App() {
  const DEFAULT_CITY = 'Liverpool';
  const DEFAULT_COUNTRY = 'GB';

  countries.registerLocale(enLocale);

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [city, setCity] = useState(() => {
    return localStorage.getItem('city') || DEFAULT_CITY;
  });
  const [country, setCountry] = useState(() => {
    return localStorage.getItem('country') || DEFAULT_COUNTRY;
  });
  const [units, setUnits] = useState(
    () => localStorage.getItem('units') || 'metric'
  );
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('units', units);
  }, [units]);

  useEffect(() => {
    if (city) {
      localStorage.setItem('city', city);
    }
  }, [city]);

  useEffect(() => {
    if (country) {
      localStorage.setItem('country', country);
    }
  }, [country]);

  useEffect(() => {
    if (city) {
      fetchWeatherAndForecast(city);
    }
  }, [units]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      fetchWeatherAndForecast(city);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeatherByCoords(latitude, longitude, units);
          setWeather(data);
          setError('');
          setCity(data.name);
          setCountry(data.sys.country);
        } catch (err) {
          setError('Error loading weather by coordinates');
          fetchWeatherAndForecast(city);
        }
      },
      () => {
        fetchWeatherAndForecast(city);
      }
    );
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by the browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude, units);
          setWeather(data);
          setCity(data.name);
          setCountry(data.sys.country);
          setLastUpdate(new Date());
          setError('');

          const forecastData = await getForecastByCity(data.name, units);
          setForecast(processForecastData(forecastData.list));
        } catch (err) {
          setError('Error when getting weather by location');
        }
      },
      () => {
        setError('Failed to get location');
      }
    );
  };

  const fetchWeatherAndForecast = async (cityName) => {
    if (!cityName.trim()) return;
    try {
      const data = await getWeatherByCity(cityName, units);
      setWeather(data);
      setCity(data.name);
      setCountry(data.sys.country);
      setLastUpdate(new Date());
      setError('');

      const forecastData = await getForecastByCity(cityName, units);
      setForecast(processForecastData(forecastData.list));
    } catch (err) {
      console.error(err);
      setError('Unable to get data for the city');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (city) {
        fetchWeatherAndForecast(city);
      }
    }, 10 * 60 * 60); // 10 minutes

    return () => clearInterval(interval);
  }, [city, units]);

  useEffect(() => {
    fetchWeatherAndForecast(city);
  }, []);

  const handleCitySearch = () => {
    fetchWeatherAndForecast(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const countryName = country ? countries.getName(country, 'en') : '';

  return (
    <div className='container'>
      <div className='card'>
        <Header
          city={city}
          handleKeyDown={handleKeyDown}
          handleCitySearch={handleCitySearch}
          handleCityChange={handleCityChange}
          handleDetectLocation={handleDetectLocation}
          error={error}
        />

        {weather && (
          <>
            <Info
              weather={weather}
              countryName={countryName}
              units={units}
              handleUnits={handleUnits}
            />

            <AdditionalInfo weather={weather} units={units} />
          </>
        )}

        {forecast.length > 0 && <Forecast forecast={forecast} units={units} />}

        {lastUpdate && <LastUpdate lastUpdate={lastUpdate} />}
      </div>
    </div>
  );
}

export default App;
