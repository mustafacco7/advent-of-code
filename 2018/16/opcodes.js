/* eslint-disable no-bitwise */
const addr = (a, b, c, ...reg) => {
  reg[c] = reg[a] + reg[b];
  return reg;
};

const addi = (a, b, c, ...reg) => {
  reg[c] = reg[a] + b;
  return reg;
};

const mulr = (a, b, c, ...reg) => {
  reg[c] = reg[a] * reg[b];
  return reg;
};

const muli = (a, b, c, ...reg) => {
  reg[c] = reg[a] * b;
  return reg;
};

const banr = (a, b, c, ...reg) => {
  reg[c] = reg[a] & reg[b];
  return reg;
};

const bani = (a, b, c, ...reg) => {
  reg[c] = reg[a] & b;
  return reg;
};

const borr = (a, b, c, ...reg) => {
  reg[c] = reg[a] | reg[b];
  return reg;
};

const bori = (a, b, c, ...reg) => {
  reg[c] = reg[a] | b;
  return reg;
};

const setr = (a, b, c, ...reg) => {
  reg[c] = reg[a];
  return reg;
};

const seti = (a, b, c, ...reg) => {
  reg[c] = a;
  return reg;
};

const gtir = (a, b, c, ...reg) => {
  reg[c] = a > reg[b] ? 1 : 0;
  return reg;
};

const gtri = (a, b, c, ...reg) => {
  reg[c] = reg[a] > b ? 1 : 0;
  return reg;
};

const gtrr = (a, b, c, ...reg) => {
  reg[c] = reg[a] > reg[b] ? 1 : 0;
  return reg;
};

const eqir = (a, b, c, ...reg) => {
  reg[c] = a === reg[b] ? 1 : 0;
  return reg;
};

const eqri = (a, b, c, ...reg) => {
  reg[c] = reg[a] === b ? 1 : 0;
  return reg;
};

const eqrr = (a, b, c, ...reg) => {
  reg[c] = reg[a] === reg[b] ? 1 : 0;
  return reg;
};

const ops = [
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
];

const getRegistryBefore = (before) => {
  const [, numbers] = before.match(/Before:\s+\[(.*)]/);
  return numbers.split(',').map(v => parseInt(v, 10));
};

const getRegistryAfter = (before) => {
  const [, numbers] = before.match(/After:\s+\[(.*)\]/);
  return numbers.split(',').map(v => parseInt(v, 10));
};

const getInstructions = instructions => instructions.split(' ').map(v => parseInt(v, 10));

const isEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();
  return a.every((value, index) => value === b[index]);
};

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

      const matches = ops.filter(opcode => isEqual(registryAfter, opcode(a, b, c, ...registryBefore))).length;
      if (matches > 2) {
        atLeastThree += 1;
      }
    }
  }

  return atLeastThree;
};


module.exports = { calculate };
