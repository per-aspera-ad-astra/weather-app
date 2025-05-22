export const processForecastData = (list) => {
  const days = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  const allDates = Object.keys(days).sort();

  const fiveDays = allDates.slice(0, 5);

  return fiveDays.map((date) => {
    const entries = days[date];
    const temps = entries.map((e) => e.main.temp);
    const feels = entries.map((e) => e.main.feels_like);
    const icons = entries.map((e) => e.weather[0].icon);
    const conditions = entries.map((e) => e.weather[0].description);

    return {
      date,
      temp: avg(temps),
      feels_like: avg(feels),
      icon: icons[Math.floor(icons.length / 2)] || icons[0],
      condition: conditions[Math.floor(conditions.length / 2)] || conditions[0],
    };
  });
};

const avg = (arr) => +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
