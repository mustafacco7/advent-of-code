const getInstructions = input => input.reduce((acc, row) => {
  const [, start, , , , , , end] = row.split(' ');
  acc[start] = acc[start] || [];
  acc[end] = [...(acc[end] || []), start];
  return acc;
}, {});

const getInstructionsPart2 = input => input.reduce((acc, row) => {
  const [, start, , , , , , end] = row.split(' ');
  acc[start] = acc[start] || { before: [], marked: false };
  acc[end] = acc[end] || { before: [], marked: false };
  acc[end].before = [...acc[end].before, start];
  return acc;
}, {});

const findOrder = (input) => {
  let instructions = getInstructions(input);

  let order = [];

  // Ugly way of doing a while(true) loop....
  Array(1000).fill(1).map((_, index) => index).some(() => {
    const startNodes = Object.entries(instructions)
      .filter(([, instruction]) => !instruction.length)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([node, children]) => ({ [node]: children }));

    if (!startNodes[0]) {
      return true;
    }

    const node = Object.keys(startNodes[0])[0];
    order = [...order, node];
    delete instructions[node];
    instructions = Object.entries(instructions).reduce((acc, [n, children]) => {
      acc[n] = children.filter(child => child !== node);
      return acc;
    }, {});

    return false;
  });

  return order.join('');
};

/* eslint-disable-next-line max-len */
const getCandidates = (instructions, result) => Object.entries(instructions).reduce((candidates, [start, { before, marked }]) => {
  if (!marked) {
    const done = before.every(step => result.includes(step));
    if (done) {
      candidates.push({ letter: start, before, marked });
    }
  }
  if (candidates.length) {
    candidates.sort((a, b) => a.letter.localeCompare(b.letter));
  }
  return candidates;
}, []);


const findTime = (input, numberOfWorkers = 5, stepTimeDiff = 0) => {
  const instructions = getInstructionsPart2(input);
  const numberOfInstructions = Object.keys(instructions).length;
  const workers = Array(numberOfWorkers).fill(1).map(() => ({ step: '', remaining: 0 }));
  let completedInstructions = 0;
  let result = '';
  let time = 0;

  while (completedInstructions < numberOfInstructions) {
    const candidates = getCandidates(instructions, result);

    let finishedJob = false;

    /* eslint-disable-next-line no-loop-func */
    workers.forEach((worker) => {
      if (worker.remaining <= 0) {
        if (worker.step) {
          result += worker.step;
          completedInstructions += 1;
          worker.step = '';
          finishedJob = true;
        }

        if (candidates.length) {
          const job = candidates.pop();
          instructions[job.letter].marked = true;
          worker.step = job.letter;
          worker.remaining = job.letter.charCodeAt(0) - 4 - stepTimeDiff;
        }
      }
    });

    if (!finishedJob) {
      time += 1;
      workers.forEach((worker) => {
        worker.remaining -= 1;
      });
    }
  }
  return time;
};

module.exports = { findOrder, findTime };
