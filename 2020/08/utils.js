const computer = {
  nop: ({ pointer, acc, value }) => {
    pointer += 1;
    return { pointer, acc, value };
  },
  acc: ({ acc, value, pointer }) => {
    pointer += 1;
    acc += value;
    return { pointer, acc, value };
  },
  jmp: ({ value, acc, pointer }) => {
    pointer += value;
    return { pointer, acc, value };
  },
};

const parseInstructions = (rows) => {
  const instructions = rows.map((row) => {
    const [, op, value] = row.match(/(acc|jmp|nop) ([+-]\d+)/);
    return { op, value: Number(value) };
  });
  return instructions;
};

const util1 = (input) => {
  let acc = 0;
  let pointer = 0;
  const visited = {};
  const instructions = parseInstructions(input);
  while (!visited[pointer]) {
    const { op, value } = instructions[pointer];
    visited[pointer] = true;
    const result = computer[op]({ pointer, value, acc });
    acc = result.acc;
    pointer = result.pointer;
  }
  return acc;
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2 };
