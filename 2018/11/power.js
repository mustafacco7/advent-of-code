const calculatePowerLevel = ([x, y], gridSerial) => {
  const rackId = x + 10;
  let powerLevel = (rackId * y + gridSerial) * rackId;
  powerLevel = Math.floor((powerLevel % 1000) / 100);
  powerLevel -= 5;
  return powerLevel;
};

const calculateSquareSum = (powerLevels, x, y, squareSize) => {
  let sum = 0;
  for (let i = 0; i < squareSize; i += 1) {
    for (let j = 0; j < squareSize; j += 1) {
      sum += powerLevels[i + y][j + x];
    }
  }
  return sum;
};

const findMaxSquare = (gridSerial, minSquareSize = 3, maxSquareSize = 3) => {
  const gridSize = 300;
  const powerLevels = Array(gridSize + 1).fill().map(() => []);
  const maxPoint = { value: 0, point: [] };

  for (let y = gridSize; y > 0; y -= 1) {
    for (let x = gridSize; x > 0; x -= 1) {
      powerLevels[y][x] = calculatePowerLevel([x, y], gridSerial);
      for (let squareSize = minSquareSize; squareSize <= maxSquareSize; squareSize += 1) {
        if (x <= gridSize - squareSize && y <= gridSize - squareSize) {
          const sum = calculateSquareSum(powerLevels, x, y, squareSize);
          if (sum > maxPoint.value) {
            maxPoint.value = sum;
            maxPoint.point = `${x},${y},${squareSize}`;
            console.log(maxPoint);
          }
        }
      }
    }
  }

  return maxPoint;

};

const findReallyMaxSquare = gridSerial => findMaxSquare(gridSerial, 1, 300);


module.exports = { calculatePowerLevel, findMaxSquare, findReallyMaxSquare };
