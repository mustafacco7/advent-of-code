const util1 = (input) => {
  const time = input[0];
  const buses = input[1]
    .match(/(\d+)/g)
    .map(Number)
    .sort((a, b) => a - b);
  const earliestBuses = buses.map((bus) => ({
    bus,
    time: Math.floor(time / bus) * bus + bus,
  })).sort((a, b) => a.time - b.time);
  const bus = earliestBuses[0];
  const waitTime = bus.time - time;
  return waitTime * bus.bus;
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2 };
