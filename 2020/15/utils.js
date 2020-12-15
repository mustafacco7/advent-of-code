const parseInput = (input) => input.split(',').map(Number);

const util1 = (input, wantedTurn) => {
  const numbers = parseInput(input);
  const spokenNumbers = new Map();
  let lastSpokenNumber;
  numbers.forEach((number, i) => {
    if (lastSpokenNumber !== undefined) {
      spokenNumbers.set(lastSpokenNumber, i);
    }
    lastSpokenNumber = number;
  });
  for (let turn = numbers.length; turn < wantedTurn; turn += 1) {
    if (spokenNumbers.has(lastSpokenNumber)) {
      const lastIndex = spokenNumbers.get(lastSpokenNumber);
      spokenNumbers.set(lastSpokenNumber, turn);
      lastSpokenNumber = turn - lastIndex;
    } else {
      spokenNumbers.set(lastSpokenNumber, turn);
      lastSpokenNumber = 0;
    }
  }

  return lastSpokenNumber;
};

module.exports = { util1 };
