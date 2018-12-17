/* eslint-disable no-bitwise, no-confusing-arrow */
const ops = {
  addr: (reg, a, b) => reg[a] + reg[b],
  addi: (reg, a, b) => reg[a] + b,
  mulr: (reg, a, b) => reg[a] * reg[b],
  muli: (reg, a, b) => reg[a] * b,
  banr: (reg, a, b) => reg[a] & reg[b],
  bani: (reg, a, b) => reg[a] & b,
  borr: (reg, a, b) => reg[a] | reg[b],
  bori: (reg, a, b) => reg[a] | b,
  setr: (reg, a) => reg[a],
  seti: (reg, a) => a,
  gtir: (reg, a, b) => a > reg[b] ? 1 : 0,
  gtri: (reg, a, b) => reg[a] > b ? 1 : 0,
  gtrr: (reg, a, b) => reg[a] > reg[b] ? 1 : 0,
  eqir: (reg, a, b) => a === reg[b] ? 1 : 0,
  eqri: (reg, a, b) => reg[a] === b ? 1 : 0,
  eqrr: (reg, a, b) => reg[a] === reg[b] ? 1 : 0,
};

const getRegistryBefore = (before) => {
  const [, numbers] = before.match(/Before:\s+\[(.*)]/);
  return numbers.split(',').map(v => parseInt(v, 10));
};

const getRegistryAfter = (before) => {
  const [, numbers] = before.match(/After:\s+\[(.*)]/);
  return numbers.split(',').map(v => parseInt(v, 10));
};

const getInstructions = instructions => instructions.split(' ').map(v => parseInt(v, 10));

const calculate = (input) => {
  let atLeastThree = 0;
  while (input.length) {
    const [before, inst, after] = input.splice(0, 4);
    if (!before.startsWith('Before:')) {
      input = [];
    } else {
      const registryBefore = getRegistryBefore(before);
      const [, a, b, c] = getInstructions(inst);
      const registryAfter = getRegistryAfter(after);
      const matches = Object.values(ops).filter((op) => {
        const registry = [...registryBefore];
        registry[c] = op(registry, a, b);
        return registry.join(',') === registryAfter.join(',');
      }).length;

      if (matches > 2) {
        atLeastThree += 1;
      }
    }
  }

  return atLeastThree;
};


module.exports = { calculate };
