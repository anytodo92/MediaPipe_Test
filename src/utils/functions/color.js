const colorMap = {};
const selectedColors = {};

export const generateColor = () => {
  let randomColorString = '#';
  const arrayOfColorFunctions = '0123456789abcdef';
  for (let x = 0; x < 6; x++) {
    let index = Math.floor(Math.random() * 16);
    let value = arrayOfColorFunctions[index];

    randomColorString += value;
  }
  return randomColorString;
};

export const newColorFind = (id) => {
  if (colorMap[id]) return colorMap[id];

  let newColor;

  do {
    newColor = generateColor();
  } while (selectedColors[newColor]);

  colorMap[id] = newColor;
  selectedColors[newColor] = true;
  return newColor;
};
