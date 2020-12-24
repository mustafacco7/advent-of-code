const getSortedAdapters = (input) =>
  input.sort((a, b) => Number(a) - Number(b));

const util1 = (input) => {
  const sortedAdapters = getSortedAdapters(input);
  let oneDiff = 0;
  let threeDiff = 1;
  sortedAdapters.reduce(
    (adapters, adapter, i) => {
      const currentJolt = adapters[i];
      const diff = adapter - currentJolt;
      if (diff <= 3) {
        if (diff === 1) {
          oneDiff += 1;
        }
        if (diff === 3) {
          threeDiff += 1;
        }
        adapters.push(adapter);
      }
      return adapters;
    },
    [0],
  );
  return oneDiff * threeDiff;
};

const util2 = (input) => {
  const sortedAdapters = getSortedAdapters(input);
  // add the starting value to the array
  sortedAdapters.unshift('0');
  // add the ending value to the array
  sortedAdapters.push(
    `${Number(sortedAdapters[sortedAdapters.length - 1]) + 3}`,
  );
  const countArr = [1];
  const iterate = (index, joltDif) =>
    (sortedAdapters[index - joltDif] >= sortedAdapters[index] - 3
      ? Number(countArr[index - joltDif])
      : 0);
  /* const arrangements = sortedAdapters.reduce((acc, adapter, i) => {
    const count = iterate(i, 1) + iterate(i, 2) + iterate(i, 3);
    acc.push(count);
    return acc;
  }, [1]); */

  for (let i = 1; i < sortedAdapters.length; i += 1) {
    const count = iterate(i, 1) + iterate(i, 2) + iterate(i, 3);
    countArr.push(count);
  }
  return countArr[countArr.length - 1];
};

module.exports = { util1, util2 };
