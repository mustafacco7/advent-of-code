const findPots = (input, steps) => {
  const [, initialState] = input.shift().match(/initial state: (.*)/);
  input.shift();
  const rules = input.map((row) => {
    const [, pattern, result] = row.match(/([.#]+) => ([.#])/);
    return [pattern, result];
  });

  const potsStates = new Array(steps).fill(null).map(() => []);
  potsStates[0] = ['.', '.', '.', ...initialState];

  let pots = ['.', '.', '.', '.', ...initialState, '.', '.', '.'];
  for (let step = 1; step <= steps; step += 1) {
    /* eslint-disable-next-line no-loop-func */
    pots = pots.map((pot, index) => {

      const min = index - 2;
      const max = index + 3;
      const neighbours = pots.slice(min, max).join('');
      let matchingRule = false;
      pot = '.';
      rules.some((rule) => {
        const [pattern, result] = rule;
        if (neighbours === pattern) {
          matchingRule = true;
          pot = result;
        }
        return matchingRule;
      });

      return pot;
    });
    pots = [...pots, '.'];
    potsStates[step] = pots;
  }

  return potsStates[steps].reduce((sum, pot, index) => {
    if (pot === '#') {
      sum += index - 4;
    }
    return sum;
  }, 0);

};

module.exports = { findPots };
