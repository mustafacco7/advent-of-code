#!/usr/bin/env node

const { clone } = require('../../utils');
const { getRows } = require('../../utils');

const parseMoonsFromInput = (rows) => rows
  .map((row) => {
    const [, x, y, z] = row.match(/x=(-?\d+), y=(-?\d+), z=(-?\d+)/);
    return {
      position: { x: Number(x), y: Number(y), z: Number(z) },
      velocity: { x: 0, y: 0, z: 0 },
    };
  });

const calculateMoonPotentialEnergy = (moon) => {
  const { x, y, z } = moon.position;
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
};

const calculateMoonKineticEnergy = (moon) => {
  const { x, y, z } = moon.velocity;
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
};

const calculateMoonEnergy = (moon) => calculateMoonKineticEnergy(moon) * calculateMoonPotentialEnergy(moon);

const calculateTotalMoonEnergy = (moons) => moons
  .reduce((sum, moon) => {
    sum += calculateMoonEnergy(moon);
    return sum;
  }, 0);

const calculatePositions = (moons, velocities) => moons
  .map((moon, index) => ['x', 'y', 'z']
    .reduce((position, axis) => {
      position[axis] += velocities[index][axis];
      return position;
    }, moon.position));

const getDelta = (a, b) => {
  if (a === b) {
    return 0;
  }
  if (a > b) {
    return 1;
  }
  return -1;
};

const calculateVelocities = (moons) => moons
  .map((moon, index) => {
    const otherMoons = clone(moons);
    otherMoons.splice(index, 1);
    return otherMoons.reduce(({ x, y, z }, otherMoon) => {
      x += getDelta(otherMoon.position.x, moon.position.x);
      y += getDelta(otherMoon.position.y, moon.position.y);
      z += getDelta(otherMoon.position.z, moon.position.z);
      return { x, y, z };
    }, { x: moon.velocity.x, y: moon.velocity.y, z: moon.velocity.z });
  });

const calculateNextStep = (moons) => {
  const velocities = calculateVelocities(moons);
  const positions = calculatePositions(moons, velocities);
  return moons.map((moon, index) => {
    moon.position = positions[index];
    moon.velocity = velocities[index];
    return moon;
  });
};

const calculateNewState = (moons, steps = 1) => {
  Array(steps).fill(1).forEach(() => {
    moons = calculateNextStep(clone(moons));
  });

  return moons;
};

const isSameState = (a, b) => a
  .every((state, index) => ['x', 'y', 'z']
    .every((axis) => (state.position[axis] === b[index].position[axis])
      && (state.velocity[axis] === b[index].velocity[axis])));

const solve1 = () => {
  getRows()
    .then((rows) => {
      const totalEnergy = calculateTotalMoonEnergy(calculateNewState(parseMoonsFromInput(rows), 1000));

      console.log(`Part 1: ${totalEnergy}`);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      /* const moons = parseMoonsFromInput(rows);
      let newState = calculateNewState(clone(moons));
      let i = 1;
      console.log(i); */
    });
};

solve1();
solve2();

module.exports = {
  calculateMoonEnergy,
  calculateNextStep,
  calculateNewState,
  calculatePositions,
  calculateVelocities,
  isSameState,
};
