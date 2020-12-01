const getProduct = (numbers) => {
  const wantedSum = 2020;
  let firstNumber;
  let secondNumber;
  numbers.some((number, i, list) => {
    const list2 = list.slice(i + 1);
    firstNumber = number;
    console.log(firstNumber, list2);
    return list2.some((number2) => {
      if (firstNumber + number2 === wantedSum) {
        secondNumber = number2;
        return true;
      }
      return false;
    });
  });
  console.log(firstNumber, secondNumber);
  return firstNumber * secondNumber;
};

module.exports = { getProduct };
