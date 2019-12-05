const getParams = (program, position) => program.slice(position, position + 4);

const add = (program, position) => {
  const [, param1, param2, output] = getParams(program, position);
  program[output] = program[param1] + program[param2];
  return program;
};

const multiply = (program, position) => {
  const [, param1, param2, output] = getParams(program, position);
  program[output] = program[param1] * program[param2];
  return program;
};

const operations = {
  1: add,
  2: multiply,
};

const run = (program, instructionPointer = 0) => {
  if (operations[program[instructionPointer]]) {
    program = operations[program[instructionPointer]](program, instructionPointer);
    instructionPointer += 4;
    run(program, instructionPointer);
  }
  return program;
};

module.exports = { run };
