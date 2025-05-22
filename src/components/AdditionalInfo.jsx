import WindDirection from './WindDirection';
import { FaArrowDown, FaArrowUp, FaWind } from 'react-icons/fa';
import { MdCompress, MdOutlineWaterDrop } from 'react-icons/md';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import { setUnits } from '../utils/setUnits';
import { formatUnixTime } from '../utils/formatTime';

const AdditionalInfo = ({ weather, units }) => {
  return (
    <div className='additional-info'>
      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          <WiSunrise size={24} /> Sunrise
        </span>
        <span>
          {formatUnixTime(weather.sys.sunrise, weather.timezone, 'HH:mm')}
        </span>
      </div>
      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          <WiSunset size={24} /> Sunset
        </span>
        <span>
          {formatUnixTime(weather.sys.sunset, weather.timezone, 'HH:mm')}
        </span>
      </div>
      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          <FaArrowDown size={18} /> Min
        </span>
        <span>
          {Math.round(weather.main.temp_min)}°{setUnits(units, 'C', 'F')}
        </span>
      </div>
      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          {' '}
          <FaArrowUp size={18} /> Max
        </span>
        <span>
          {' '}
          {Math.round(weather.main.temp_max)}°{setUnits(units, 'C', 'F')}
        </span>
      </div>

      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          <FaWind size={18} /> Wind
        </span>
        <span>
          {weather.wind.speed} {setUnits(units, 'm/s', 'mph')}
        </span>
      </div>

      <div className='additional-info__item'>
        <WindDirection deg={weather.wind.deg} speed={weather.wind.speed} />
      </div>

      <div className='additional-info__item'>
        <span className='additional-info__item-top'>
          <MdOutlineWaterDrop size={20} /> Humidity
        </span>
        <span>{weather.main.humidity}%</span>
      </div>

      {units === 'metric' ? (
        <div className='additional-info__item'>
          <span className='additional-info__item-top'>
            <MdCompress size={20} /> Pressure
          </span>
          <span> {(weather.main.pressure * 0.75006).toFixed(0)} mmHg</span>
        </div>
      ) : (
        <div className='additional-info__item'>
          <span className='additional-info__item-top'>
            <MdCompress size={20} /> Pressure
          </span>
          <span>{(weather.main.pressure * 0.02953).toFixed(2)} inHg</span>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
