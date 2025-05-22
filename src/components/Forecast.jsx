import { setUnits } from '../utils/setUnits';
import WeatherIcon from './WeatherIcon';

const Forecast = ({ forecast, units }) => {
  return (
    <div className='forecast'>
      {forecast.map((day) => (
        <div className='forecast__item' key={day.date}>
          <strong className='forecast__date'>
            {new Date(day.date).toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })}
          </strong>
          <WeatherIcon iconCode={day.icon} size={64} />
          <p className='forecast__temp'>
            {Math.round(day.temp)}°{setUnits(units, 'C', 'F')}
          </p>
          <p className='forecast__description'>{day.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
