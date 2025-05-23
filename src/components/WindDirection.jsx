import { LiaLocationArrowSolid } from 'react-icons/lia';

const windDirections = [
  'North',
  'North-East',
  'East',
  'South-East',
  'South',
  'South-West',
  'West',
  'North-West',
];

const getDirectionLabel = (deg) => {
  return windDirections[Math.round(deg / 45) % 8];
};

const WindDirection = ({ deg }) => {
  const label = getDirectionLabel(deg);

  return (
    <>
      <span className='additional-info__item-top'>
        <LiaLocationArrowSolid
          size={22}
          style={{
            transform: `rotate(${deg + 180}deg)`,
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
