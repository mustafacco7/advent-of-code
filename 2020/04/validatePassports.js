const getPassports = (input) => {
  return input.reduce(
    (acc, row) => {
      if (row) {
        acc[acc.length - 1].push(row);
      } else {
        acc.push([]);
      }
      return acc;
    },
    [[]],
  );
};

const validatePassports = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passports = getPassports(input);
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) => {
      const regexp = new RegExp(`${requiredField}:`, 'g');
      return passport.match(regexp);
    });
  });
  return matchingPassports.filter(Boolean).length;
};

/* const validatePassports2 = (input) => {
  const passports = getPassports(input);
  const requiredFields = [
    ['byr', () => ],
    ['iyr'],
    ['eyr'],
    ['hgt'],
    ['hcl'],
    ['ecl'],
    ['pid'],
  ];
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) => {
      const present = new RegExp(`${requiredField[0]}:`, 'g');
      return passport.match(present) && passport.match();
    });
  });
  return matchingPassports.filter(Boolean).length;
};
 */

module.exports = { validatePassports };
