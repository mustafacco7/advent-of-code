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

const applyOp = (op, reg, a, b, c) => {
  const registry = [...reg];
  registry[c] = op(registry, a, b);
  return registry;
};

const isEqual = (a, b) => a.join(',') === b.join(',');


const calculate = (input) => {
  let atLeastThree = 0;
  while (input.length) {
    const [before, inst, after] = input.splice(0, 4);
    if (!before.startsWith('Before:')) {
      break;
    } else {
      const registryBefore = getRegistryBefore(before);
      const [, a, b, c] = getInstructions(inst);
      const registryAfter = getRegistryAfter(after);
      const matches = Object.values(ops).filter((op) => {
        const registry = applyOp(op, registryBefore, a, b, c);
        return isEqual(registry, registryAfter);
      }).length;

      if (matches > 2) {
        atLeastThree += 1;
      }
    }
  }

  return atLeastThree;
};


const getOperations = (input) => {
  let opCandidates = Object.keys(ops).reduce((res, op) => {
    res[op] = [];
    return res;
  }, {});

  while (input.length) {
    const [before, inst, after, rest] = input.splice(0, 4);
    if (!before.startsWith('Before:')) {
      input.unshift(rest, after);
      break;
    } else {
      const registryBefore = getRegistryBefore(before);
      const [instruction, a, b, c] = getInstructions(inst);
      const registryAfter = getRegistryAfter(after);
      Object.entries(ops).forEach(([name, op]) => {
        const registry = applyOp(op, registryBefore, a, b, c);
        if (isEqual(registry, registryAfter)) {
          if (!opCandidates[name].includes(instruction)) {
            opCandidates[name].push(instruction);
          }
        }
      });
    }
  }

  let foundInstructions = 0;
  const opCodes = {};

  while (foundInstructions < 16) {
    Object.entries(opCandidates).forEach(([name, candidates]) => {
      if (candidates.length === 1) {
        const foundNum = candidates[0];
        foundInstructions += 1;
        opCodes[foundNum] = name;
        opCandidates = Object.entries(opCandidates).reduce((res, [name, candidates]) => {
          res[name] = candidates.filter(op => op !== foundNum);
          return res;
        }, {});
      }
    });
  }

  return { opCodes, instructions: input };
};

const calculatePart2 = (input) => {
  const { opCodes, instructions } = getOperations(input);
  const registers = [0, 0, 0, 0];

  while (instructions.length) {
    const line = instructions.shift();
    const [op, a, b, c] = line.split(' ').map(v => parseInt(v, 10));
    const opCode = opCodes[op];
    registers[c] = ops[opCode](registers, a, b);
  }
  return registers[0];
};


module.exports = { calculate, calculatePart2 };
