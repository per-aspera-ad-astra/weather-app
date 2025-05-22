export const setUnits = (units, imperial, metric) => {
  return units === 'metric' ? imperial : metric;
};
