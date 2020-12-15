const parseInput = (input) => input.split(',').map(Number);

const getNextState = (state, turn) => {
  let lastNumberSpoken = state.lastNumber;
  const lastMention = state.numbers[lastNumberSpoken].length > 1
    ? state.numbers[lastNumberSpoken][state.numbers[lastNumberSpoken].length - 1]
    : 0;
  if (!lastMention) {
    state.lastNumber = 0;
    state.numbers[0] = [...state.numbers[0] || [], turn];
  } else {
    const secondLastMention = state.numbers[lastNumberSpoken][state.numbers[lastNumberSpoken].length - 2];
    lastNumberSpoken = lastMention - secondLastMention;
    state.lastNumber = lastNumberSpoken;
    state.numbers[lastNumberSpoken] = [...state.numbers[lastNumberSpoken] || [], turn];
  }
  return state;
};

const util1 = (input, wantedTurn) => {
  const numbers = parseInput(input);
  let state = { numbers: {}, lastNumber: undefined };
  let turn = numbers.length;
  numbers.forEach((number, i) => {
    state.numbers[number] = [i + 1];
    state.lastNumber = number;
  });

  while (turn < wantedTurn) {
    turn += 1;
    state = getNextState(state, turn);
  }
  return state.lastNumber;
};

const util2 = (input, wantedTurn) => {
  return util1(input, wantedTurn);
};

module.exports = { util1, util2 };
