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
  const heightRegexp = new RegExp('hgt:(\\d+)(cm|in)');
  const [, height, unit] = passport.match(heightRegexp) || [];
  if (unit === 'cm') {
    return height >= 150 && height <= 193;
  }
  if (unit === 'in') {
    return height >= 59 && height <= 76;
  }
  return false;
};

const hasCorrectHairColor = (passport) => {
  const [, correctHairColor] = passport.match(/hcl:#([\dabcdef]){6}/) || [];
  return !!correctHairColor;
};

const hasCorrectEyeColor = (passport) => {
  const [, correctEyeColor] =
    passport.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)/) || [];
  return !!correctEyeColor;
};

const hasCorrectPid = (passport) => {
  const [, pidString] = passport.match(/pid:(\d{1,9})\b/) || [];
  if (!Number(pidString)) {
    return false;
  }
  const pid = pidString.padStart(9, '0');
  return !!pid && pid.length === 9;
};

const validations = {
  byr: (passport) =>
    isPresent(passport, 'byr') && minMaxNumbers(passport, 'byr', 1920, 2002),
  iyr: (passport) =>
    isPresent(passport, 'iyr') && minMaxNumbers(passport, 'iyr', 2010, 2020),
  eyr: (passport) =>
    isPresent(passport, 'eyr') && minMaxNumbers(passport, 'eyr', 2020, 2030),
  hgt: (passport) => isPresent(passport, 'hgt') && hasCorrectHeight(passport),
  hcl: (passport) =>
    isPresent(passport, 'hcl') && hasCorrectHairColor(passport),
  ecl: (passport) => isPresent(passport, 'ecl') && hasCorrectEyeColor(passport),
  pid: (passport) => isPresent(passport, 'pid') && hasCorrectPid(passport),
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
