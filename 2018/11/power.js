const calculatePowerLevel = ([x, y], gridSerial) => {
  const rackId = x + 10;
  let powerLevel = (rackId * y + gridSerial) * rackId;
  powerLevel = Math.floor((powerLevel % 1000) / 100);
  powerLevel -= 5;
  return powerLevel;
};

const findMaxSquare = (gridSerial, minSquareSize = 3, maxSquareSize = 3) => {
  const gridSize = 300;
  const powerLevels = [];
  for (let y = 0; y <= gridSize; y += 1) {
    powerLevels.push([]);
  }
  const maxPoint = { value: 0, point: [] }

  for (let y = gridSize; y > 0; y -= 1) {
    for (let x = gridSize; x > 0; x -= 1) {
      for (let squareSize = minSquareSize; squareSize <= maxSquareSize; squareSize += 1) {
        powerLevels[y][x] = calculatePowerLevel([x, y], gridSerial);
        if (x <= gridSize - squareSize - 1 && y <= gridSize - squareSize - 1) {
          let sum = 0;
          for (let i = 0; i < squareSize; i += 1) {
            for (let j = 0; j < squareSize; j += 1) {
              sum += powerLevels[i + y][j + x];
            }
          }
          if (sum > maxPoint.value) {
            maxPoint.value = sum;
            maxPoint.point = `${x},${y}`;
          }
        }
      }
    }
  }

  return maxPoint;

};

const findReallyMaxSquare = (gridSerial) => {
  const reallyMaxPoint = findMaxSquare(gridSerial, 1, 300);

  return reallyMaxPoint;
};


module.exports = { calculatePowerLevel, findMaxSquare, findReallyMaxSquare };
