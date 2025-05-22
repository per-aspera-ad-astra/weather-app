import { FaLocationArrow } from 'react-icons/fa';

const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

const getDirectionLabel = (deg) => {
  return windDirections[Math.round(deg / 45) % 8];
};

const WindDirection = ({ deg }) => {
  const label = getDirectionLabel(deg);

  return (
    <>
      <span className='additional-info__item-top'>
        <FaLocationArrow
          size={18}
          style={{
            transform: `rotate(${deg}deg)`,
            transition: 'transform 0.3s',
          }}
        />
        Wind direction
      </span>
      <span>{label}</span>
    </>
  );
};

export default WindDirection;
