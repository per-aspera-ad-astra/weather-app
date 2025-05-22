import { FaSearch } from 'react-icons/fa';

const Search = ({
  city,
  handleKeyDown,
  handleCitySearch,
  handleCityChange,
}) => {
  return (
    <div className='search'>
      <input
        className='search__input'
        type='text'
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
        placeholder='Enter city...'
      />
      <button onClick={handleCitySearch} className='search__btn'>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
