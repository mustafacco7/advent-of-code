const isUpperCase = character => character === character.toUpperCase();
const isLowerCase = character => character === character.toLowerCase();
/* eslint-disable-next-line max-len */
const areDifferentCases = (a, b) => (a.toLowerCase() === b.toLowerCase()) && ((isUpperCase(a) && isLowerCase(b)) || (isLowerCase(a) && isUpperCase(b)));

const react = (data) => {

  const result = data.split('').reduceRight((_, datum, index, original) => {

    if (index && areDifferentCases(datum, original[index - 1])) {
      original.splice(index - 1, 2);
    }

    return original;
  }, []);

  return result.length;
};

const remove = (data) => {
  let minLength = Number.MAX_VALUE;

  Array(26)
    .fill(1)
    .map((_, index) => String.fromCharCode(index + 65))
    .forEach((character) => {
      const input = data.split('').filter(datum => datum.toUpperCase() !== character).join('');
      const length = react(input);
      minLength = Math.min(length, minLength);
    });

  return minLength;
};

module.exports = { react, remove };
