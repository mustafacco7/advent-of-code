const getLargestSum = (availabeNumbers) => {
  const largestNumber = availabeNumbers[availabeNumbers.length - 1];
  const secondLargstNumber = availabeNumbers[availabeNumbers.length - 2];
  return largestNumber + secondLargstNumber;
};

const getAvailableNumbers = (input, preamble) => {
  const availableNumbers = input.slice(0, preamble);
  availableNumbers.sort((a, b) => Number(a) - Number(b));
  return availableNumbers;
};

const calculate = (input, preamble, wantedSum) => {
  const availableNumbers = getAvailableNumbers(input, preamble);
  const largestSum = getLargestSum(availableNumbers);

  if (largestSum < wantedSum) {
    return false;
  }

  return availableNumbers.some((firstNumber, i) =>
    availableNumbers
      .slice(i + 1, availableNumbers.length)
      .some((secondNumber) => firstNumber + secondNumber === wantedSum),
  );
};

const findInvalidNumber = (input, preamble) => {
  let found;
  while (!found) {
    const wantedSum = input[preamble];
    const numbers = input.slice(0, preamble);
    if (!calculate(numbers, preamble, wantedSum)) {
      found = wantedSum;
      break;
    }
    input = input.splice(1);
  }
  return found;
};

const util1 = (input, preamble) => findInvalidNumber(input, preamble);

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, calculate, util2 };
