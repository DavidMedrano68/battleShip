export const randomCoord = (min = 0, max = 10) => {
  const y = Math.floor(Math.random() * (max - min)) + min;
  const x = Math.floor(Math.random() * (max - min)) + min;
  return [y, x];
};
