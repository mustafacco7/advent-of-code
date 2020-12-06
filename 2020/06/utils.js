const getUniqueAnswers = (input) =>
  input.reduce(
    (acc, row) => {
      if (row) {
        acc[acc.length - 1].push(row);
      } else {
        acc.push([]);
      }
      return acc;
    },
    [[]],
  ).map((row) => [...new Set(row.join(''))]);

const util1 = (input) => {
  const totalAnswers = getUniqueAnswers(input).reduce((sum, groupAnswers) => {
    sum += groupAnswers.length;
    return sum;
  }, 0);
  return totalAnswers;
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2 };
