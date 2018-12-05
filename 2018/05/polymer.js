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

module.exports = { react };
