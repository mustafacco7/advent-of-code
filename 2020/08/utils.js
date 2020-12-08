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

const changed = {};

const getOp = ({ instructions, pointer, changeDone }) => {
  const { op, value } = instructions[pointer];
  let realOp = op;
  if (!changeDone && !changed[pointer]) {
    if (op === 'jmp') {
      realOp = 'nop';
      changeDone = true;
    } else if (op === 'nop' && value !== 0) {
      realOp = 'jmp';
      changeDone = true;
    }
    changed[pointer] = true;
  }

  return { op: realOp, value, changeDone };
};

const util2 = (input) => {
  let pointer = 0;
  let acc;
  const instructions = parseInstructions(input);
  while (pointer < instructions.length) {
    pointer = 0;
    acc = 0;
    const visited = {};
    let changeDone = false;
    while (!visited[pointer] && pointer < instructions.length) {
      const { op, value, changeDone: done } = getOp({
        instructions,
        pointer,
        changeDone,
      });
      changeDone = done;
      visited[pointer] = true;
      const result = computer[op]({ pointer, value, acc });
      acc = result.acc;
      pointer = result.pointer;
    }
  }

  return acc;
};

module.exports = { util1, util2 };
