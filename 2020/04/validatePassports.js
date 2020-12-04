const getPassports = (input) =>
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
  );

const isPresent = (passport, requiredField) => {
  const presentRegexp = new RegExp(`${requiredField}:`, 'g');
  return passport.match(presentRegexp);
};

const minMaxNumbers = (passport, requiredField, min, max) => {
  const numberOfDigits = String(min).length;
  const digitsRegexp = new RegExp(`${requiredField}:(\\d{${numberOfDigits}})`);
  const [, number] = passport.match(digitsRegexp) || [];
  return number && number >= min && number <= max;
};

const hasCorrectHeight = (passport) => {
  const correctHeight = passport.match(
    /hgt:(1(5\d|[6-8]\d|9[0-3]))cm|(59|6\d|7[0-6])in/,
  );
  return !!correctHeight;
};

const hasCorrectHairColor = (passport) => {
  const [, correctHairColor] = passport.match(/hcl:#([\da-f]){6}/) || [];
  return !!correctHairColor;
};

const hasCorrectEyeColor = (passport) => {
  const [, correctEyeColor] =
    passport.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)/) || [];
  return !!correctEyeColor;
};

const hasCorrectPid = (passport) => {
  const [, pidString] = passport.match(/pid:(\d{9})\b/) || [];
  return !!pidString;
};

const validations = {
  byr: (passport) => minMaxNumbers(passport, 'byr', 1920, 2002),
  iyr: (passport) => minMaxNumbers(passport, 'iyr', 2010, 2020),
  eyr: (passport) => minMaxNumbers(passport, 'eyr', 2020, 2030),
  hgt: (passport) => hasCorrectHeight(passport),
  hcl: (passport) => hasCorrectHairColor(passport),
  ecl: (passport) => hasCorrectEyeColor(passport),
  pid: (passport) => hasCorrectPid(passport),
};

const validatePassports = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passports = getPassports(input);
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) =>
      isPresent(passport, requiredField),
    );
  });
  return matchingPassports.filter(Boolean).length;
};

const validatePassports2 = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const passports = getPassports(input);
  const matchingPassports = passports.map((passportRows) => {
    const passport = passportRows.join(',');
    return requiredFields.every((requiredField) => {
      const res = validations[requiredField](passport, requiredField);
      if (!res && requiredField === 'pid') {
        console.log(requiredField, passport);
      }
      return res;
    });
  });
  return matchingPassports.filter(Boolean).length;
};

module.exports = {
  validatePassports,
  validatePassports2,
  hasCorrectHeight,
  hasCorrectHairColor,
  hasCorrectEyeColor,
  hasCorrectPid,
};
