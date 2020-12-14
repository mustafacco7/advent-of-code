/* eslint-disable no-bitwise */

const bitwiseAnd = (value, mask) => {
  const bin = (value >>> 0).toString(2).padStart(36, 0);
  const andMask = mask.replace(/X/g, '1');
  return andMask.split('').map((bit, index) => bin[index] & bit).join('');
};
const bitwiseOr = (bin, mask) => {
  const orMask = mask.replace(/X/g, '0');
  return orMask.split('').map((bit, index) => bin[index] | bit).join('');
};

const write = (value, mask) => {
  const and = bitwiseAnd(value, mask);
  const or = bitwiseOr(and, mask);
  return parseInt(or, 2);
};

const parseRow = ({ row, memory, currentMask }) => {
  const [, mask] = row.match(/mask = ([X01]+)/) || [];
  const [, mem, value] = row.match(/mem\[(\d+)\] = (\d+)/) || [];
  if (mask !== undefined) {
    currentMask = mask;
  }
  if (mem !== undefined) {
    memory[mem] = write(value, currentMask);
  }

  return { memory, currentMask };
};

const util1 = (input) => {
  const result = input.reduce(
    (result, row) => {
      const { memory, currentMask } = parseRow({ row, ...result });
      return { memory, currentMask };
    },
    { currentMask: '', memory: {} },
  );
  return Object.values(result.memory).reduce((sum, value) => {
    sum += value;
    return sum;
  }, 0);
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2, write };
