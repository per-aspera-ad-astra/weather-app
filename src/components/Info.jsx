import { setUnits } from '../utils/setUnits';
import { formatUnixTime } from '../utils/formatTime';
import WeatherIcon from './WeatherIcon';

const Info = ({ weather, countryName, units, handleUnits }) => {
  return (
    <div className='info'>
      <div className='info__top'>
        <button onClick={handleUnits} className='units-btn'>
          Change units to {units === 'metric' ? 'imperial' : 'metric'}
        </button>
        <p className='current-date'>
          {formatUnixTime(Date.now() / 1000, weather.timezone)}
        </p>
      </div>

      <div className='info__main'>
        <h2 className='city'>
          {weather.name}
          {countryName ? `, ${countryName}` : ''}
        </h2>
        <WeatherIcon iconCode={weather.weather[0].icon} size={100} />
        <div className='temperature'>
          {Math.round(weather.main.temp)}°{setUnits(units, 'C', 'F')}
        </div>
        <div className='feels-like'>
          Feels like: {Math.round(weather.main.feels_like)}°
          {setUnits(units, 'C', 'F')}
        </div>
        <div className='description'>{weather.weather[0].description}</div>
      </div>
    </div>
  );
};

export default Info;
