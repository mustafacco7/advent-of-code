const { findOrder } = require('./sleigh');

describe('it should solve part 1 and part 2', () => {

  const input1 = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.',
  ];

  test('it should solve example 1', () => {
    expect(findOrder(input1)).toEqual('CABDFE');
  });

  test('it should solve example 2', () => {
  });
});
