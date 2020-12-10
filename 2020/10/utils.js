const getSortedAdapters = (input) => input.sort((a, b) => Number(a) - Number(b));

const util1 = (input) => {
  const sortedAdapters = getSortedAdapters(input);
  let oneDiff = 0;
  let threeDiff = 1;
  sortedAdapters.reduce((adapters, adapter, i) => {
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
  }, [0]);
  return oneDiff * threeDiff;
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2 };
