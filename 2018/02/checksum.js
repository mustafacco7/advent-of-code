const checksum = (data) => {
  const values = data.map(datum => [
    ...new Set(datum
      .split('')
      .sort()
      .join('')
      .match(/(.)\1+/g)
      .map(entry => entry.length)),
  ])
    .reduce((acc, entry) => {
      entry.forEach((value) => {
        acc[value] += 1;
      });
      return acc;
    }, { 2: 0, 3: 0 });

  return Object.values(values).reduce((acc, value) => (acc * value), 1);
};

const findMatchingId = (data) => {
  let matchingLetters = '';
  let found = false;
  data.some((datum, i) => {
    data.slice(i + 1)
      .some((comp) => {
        const matches = datum.split('')
          .map((d, index) => d === comp[index]);
        const match = matches.reduce((acc, entry) => {
          acc[entry] += 1;
          return acc;
        }, { true: 0, false: 0 });
        if (match.false === 1) {
          const matchIndex = matches.indexOf(false);
          matchingLetters = [...comp.split('').slice(0, matchIndex), ...comp.slice(matchIndex + 1)].join('');
          found = true;
        }
        return found;
      });
    return found;
  });

  return matchingLetters;
};

module.exports = { checksum, findMatchingId };
