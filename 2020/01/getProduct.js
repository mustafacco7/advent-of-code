const getNumbers = (numbers, wantedSum = 2020) => {
  let firstNumber;
  let secondNumber;
  numbers.some((number, i, list) => {
    const list2 = list.slice(i + 1);
    firstNumber = number;
    return list2.some((number2) => {
      if (firstNumber + number2 === wantedSum) {
        secondNumber = number2;
        return true;
      }
      return false;
    });
  });
  return [firstNumber, secondNumber];
};

const getProduct = (numbers, wantedSum = 2020) => {
  const [x, y] = getNumbers(numbers, wantedSum);

  return x * y;
};

const getTrippleProducts = (numbers) => {
  let number1;
  let number2;
  let number3;

  numbers.some((number, i, list) => {
    const list1 = list.slice(i + 1);
    number1 = number;
    const [x, y] = getNumbers(list1, 2020 - number1);
    if (x && y) {
      number2 = x;
      number3 = y;
      return true;
    }
    return false;
  });

  return number1 * number2 * number3;
};

module.exports = { getProduct, getTrippleProducts };
