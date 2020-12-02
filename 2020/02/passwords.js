const validatePasswords = (input) => {
  const data = input.map((row) => {
    const [, minCount, maxCount, character, password] = row.split(
      /(\d+)-(\d+) (.): (.+)/,
    );
    return [minCount, maxCount, character, password];
  });
  const correctPasswords = data.filter(
    ([minCount, maxCount, character, password]) => {
      const wantedCharacters = password.match(new RegExp(character, 'g'));
      if (wantedCharacters == null) {
        return false;
      }
      const numberOfWantedCharacters = wantedCharacters.length;
      return (
        numberOfWantedCharacters >= minCount &&
        numberOfWantedCharacters <= maxCount
      );
    },
  );
  return correctPasswords.length;
};

const validatePasswords2 = (input) => {
  const data = input.map((row) => {
    const [, firstPos, lastPos, character, password] = row.split(
      /(\d+)-(\d+) (.): (.+)/,
    );
    return [firstPos, lastPos, character, password];
  });
  const correctPasswords = data.filter(
    ([firstPos, lastPos, character, password]) => {
      let matches = 0;
      if (password[firstPos - 1] === character) {
        matches += 1;
      }
      if (password[lastPos - 1] === character) {
        matches += 1;
      }
      return matches === 1;
    },
  );
  return correctPasswords.length;
};

module.exports = { validatePasswords, validatePasswords2 };
