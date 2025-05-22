import ErrorMessage from './ErrorMessage';
import Search from './Search';
import { FaLocationCrosshairs } from 'react-icons/fa6';

const Header = ({
  city,
  handleKeyDown,
  handleCitySearch,
  handleCityChange,
  handleDetectLocation,
  error,
}) => {
  return (
    <header className='header'>
      <h1 className='logo'>WeatherApp</h1>
      <div className='header__search'>
        <Search
          city={city}
          handleKeyDown={handleKeyDown}
          handleCitySearch={handleCitySearch}
          handleCityChange={handleCityChange}
        />

        <button
          onClick={handleDetectLocation}
          className='location'
          title='Detect my location'
        >
          <FaLocationCrosshairs />
        </button>
      </div>
      {error && <ErrorMessage error={error} />}
    </header>
  );
};

export default Header;
