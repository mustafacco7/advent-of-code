
const getNumber = (value) => {
  if (!value) {
    console.log('empty');
    return 0;
  }
  return parseInt(value, 10);
};

const sum = data => data.reduce((datum, value) => {
  /* eslint-disable-next-line no-param-reassign */
  datum += getNumber(value);
  return datum;
}, 0);


const findDuplicates = (data) => {
  const frequencies = {};
  let found = false;
  let result = 0;
  while (!found) {
    /* eslint-disable-next-line no-loop-func */
    data.some((value) => {
      result += getNumber(value);
      if (frequencies[result]) {
        found = true;
      }
      frequencies[result] = true;
      return found;
    });
  }

  return result;
};

module.exports = { sum, findDuplicates };
