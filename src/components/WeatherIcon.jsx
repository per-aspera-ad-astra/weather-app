import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

const iconMap = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiDayCloudy,
  '02n': WiNightAltCloudy,
  '03d': WiCloudy,
  '03n': WiCloudy,
  '04d': WiCloudy,
  '04n': WiCloudy,
  '09d': WiRain,
  '09n': WiRain,
  '10d': WiDayRain,
  '10n': WiNightAltRain,
  '11d': WiThunderstorm,
  '11n': WiThunderstorm,
  '13d': WiSnow,
  '13n': WiSnow,
  '50d': WiFog,
  '50n': WiFog,
};

const WeatherIcon = ({ iconCode, size = 64 }) => {
  const IconComponent = iconMap[iconCode] || WiCloudy;
  return <IconComponent size={size} />;
};

export default WeatherIcon;
