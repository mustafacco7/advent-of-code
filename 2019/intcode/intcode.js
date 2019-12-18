const getParams = (program, position, modes) => {
  // eslint-disable-next-line prefer-const
  let [, param1, param2, output] = program.slice(position, position + 4);
  param1 = modes[0] ? param1 : program[param1];
  param2 = modes[1] ? param2 : program[param2];
  return [param1, param2, output];
};

const print = (msg) => console.log(msg);

const add = (program, position, modes) => {
  const [param1, param2, output] = getParams(program, position, modes);
  program[output] = param1 + param2;
  return program;
};

const multiply = (program, position, modes) => {
  const [param1, param2, output] = getParams(program, position, modes);
  program[output] = param1 * param2;
  return program;
};

const input = (program, position, modes) => {
  const [param] = getParams(program, position, modes);
  program[param] = param;
  return program;
};

const output = (program, position) => {
  const [, param] = getParams(program, position);
  print(program[param]);
  return program;
};

const operations = {
  1: add,
  2: multiply,
  3: input,
  4: output,
};

const getOperation = (code) => code
  .toString()
  .padStart(5, '0')
  .match(/(\d)(\d)(\d)(\d\d)/)
  .slice(1)
  .map(Number)
  .reverse();

const run = (program, instructionPointer = 0) => {
  const [operation, ...modes] = getOperation(program[instructionPointer]);
  if (operations[operation]) {
    program = operations[operation](program, instructionPointer, modes);
    instructionPointer += operation <= 2 ? 4 : 2;
    run(program, instructionPointer);
  }
  return program;
};

module.exports = { run };
