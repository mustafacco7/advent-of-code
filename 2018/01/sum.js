
const sum = data => data.reduce((acc, datum) => {
  acc += parseInt(datum, 10);
  return acc;
}, 0);


const findDuplicates = (data) => {
  const frequencies = {};
  let found = false;
  let result = 0;
  while (!found) {
    /* eslint-disable-next-line no-loop-func */
    data.some((value) => {
      result += parseInt(value, 10);
      found = !!frequencies[result];
      frequencies[result] = true;
      return found;
    });
  }

  return result;
};

module.exports = { sum, findDuplicates };
