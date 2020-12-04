const {
  validatePassports,
  validatePassports2,
  hasCorrectHeight,
  hasCorrectHairColor,
  hasCorrectEyeColor,
  hasCorrectPid,
} = require('./validatePassports');

describe('it should solve part 1 and part 2', () => {
  const input1 = [
    'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    'byr:1937 iyr:2017 cid:147 hgt:183cm',
    '',
    'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
    'hcl:#cfa07d byr:1929',
    '',
    'hcl:#ae17e1 iyr:2013',
    'eyr:2024',
    'ecl:brn pid:760753108 byr:1931',
    'hgt:179cm',
    '',
    'hcl:#cfa07d eyr:2025 pid:166559648',
    'iyr:2011 ecl:brn hgt:59in',
  ];

  test('it should solve example 1', () => {
    expect(validatePassports(input1)).toEqual(2);
  });

  test('it should get correct height', () => {
    expect(
      hasCorrectHeight(
        'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f',
      ),
    ).toEqual(true);
    expect(
      hasCorrectHeight('iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'),
    ).toEqual(true);
    expect(
      hasCorrectHeight(
        'ecl:brn hgt:59cm pid:021572410 eyr:2020 byr:1992 cid:277',
      ),
    ).toEqual(false);
    expect(
      hasCorrectHeight(
        'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
      ),
    ).toEqual(false);
  });

  test('it should get correct hair color', () => {
    expect(
      hasCorrectHairColor(
        'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f',
      ),
    ).toEqual(true);
    expect(
      hasCorrectHairColor('iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'),
    ).toEqual(true);
    expect(
      hasCorrectHairColor(
        'hcl:#123abz hgt:59cm pid:021572410 eyr:2020 byr:1992 cid:277',
      ),
    ).toEqual(false);
    expect(
      hasCorrectHairColor(
        'hcl:123abc ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
      ),
    ).toEqual(false);
  });

  test('it should get correct eye color', () => {
    expect(
      hasCorrectEyeColor(
        'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f',
      ),
    ).toEqual(true);
    expect(
      hasCorrectEyeColor('iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'),
    ).toEqual(false);
    expect(
      hasCorrectEyeColor(
        'ecl:#123abz hgt:59cm pid:021572410 eyr:2020 byr:1992 cid:277',
      ),
    ).toEqual(false);
    expect(
      hasCorrectEyeColor(
        'hcl:123abc ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
      ),
    ).toEqual(true);
  });

  test('it should get correct pid', () => {
    expect(
      hasCorrectPid(
        'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f',
      ),
    ).toEqual(true);
    expect(
      hasCorrectPid('iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm'),
    ).toEqual(true);
    expect(
      hasCorrectPid(
        'ecl:#123abz hgt:59cm pid:021572410 eyr:2020 byr:1992 cid:277',
      ),
    ).toEqual(true);
    expect(
      hasCorrectPid('hcl:123abc ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926'),
    ).toEqual(false);
    expect(
      hasCorrectPid(
        'hcl:123abc ecl:amb hgt:170 pid:021572410,iyr:2018 byr:1926',
      ),
    ).toEqual(true);
    expect(
      hasCorrectPid('hcl:123abc ecl:amb hgt:170 pid:0215724,iyr:2018 byr:1926'),
    ).toEqual(true);
    expect(
      hasCorrectPid('hcl:123abc ecl:amb hgt:170 pid:0215724 iyr:2018 byr:1926'),
    ).toEqual(true);
    expect(hasCorrectPid('pid:093154719')).toEqual(true);
    expect(hasCorrectPid('pid:093154')).toEqual(true);
    expect(hasCorrectPid('pid:09315471912')).toEqual(false);
  });

  test('it should solve example 2', () => {
    const input2a = [
      'eyr:1972 cid:100',
      'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
      '',
      'iyr:2019',
      'hcl:#602927 eyr:1967 hgt:170cm',
      'ecl:grn pid:012533040 byr:1946',
      '',
      'hcl:dab227 iyr:2012',
      'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277',
      '',
      'hgt:59cm ecl:zzz',
      'eyr:2038 hcl:74454a iyr:2023',
      'pid:3556412378 byr:2007',
    ];
    const input2b = [
      'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980',
      'hcl:#623a2f',
      '',
      'eyr:2029 ecl:blu cid:129 byr:1989',
      'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm',
      '',
      'hcl:#888785',
      'hgt:164cm byr:2001 iyr:2015 cid:88',
      'pid:545766238 ecl:hzl',
      'eyr:2022',
      '',
      'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719',
    ];
    expect(validatePassports2(input2a)).toEqual(0);
    expect(validatePassports2(input2b)).toEqual(4);
  });
});
