const API_KEY = '3d84e1d6bf8822a2416d445ff8b50f9e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherByCoords(lat, lon, units = 'metric') {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=en`
  );
  if (!response.ok)
    throw new Error('Error when specifying weather by coordinates');
  return await response.json();
}

export async function getWeatherByCity(city, units = 'metric') {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=en`
  );
  if (!response.ok) throw new Error('City not found');
  return await response.json();
}

export async function getForecastByCity(city, units = 'metric') {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=en`
  );
  if (!response.ok) throw new Error('Error while getting forecast');
  return await response.json();
}
