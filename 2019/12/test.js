const {
  calculateMoonEnergy,
  calculateNewState,
  calculatePositions,
  calculateVelocities,
  isSameState,
} = require('./solve');

describe('Day 12', () => {
  describe('Day 12 part 1', () => {
    let moons = [];
    let velocities = [];

    beforeEach(() => {
      moons = [
        { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
        { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
        { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
        { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } },
      ];
    });


    test('it should calculate correct velocities after step 1', () => {
      velocities = calculateVelocities(moons);
      expect(velocities).toEqual([
        { x: 3, y: -1, z: -1 },
        { x: 1, y: 3, z: 3 },
        { x: -3, y: 1, z: -3 },
        { x: -1, y: -3, z: 1 },
      ]);
    });

    test('it should calculate correct positions after step 1', () => {
      const positionsStep1 = calculatePositions([...moons], velocities);
      expect(positionsStep1).toEqual([
        { x: 2, y: -1, z: 1 },
        { x: 3, y: -7, z: -4 },
        { x: 1, y: -7, z: 5 },
        { x: 2, y: 2, z: 0 },
      ]);
    });

    test('it should calculate correct state after step 1', () => {
      expect(calculateNewState(moons)).toEqual([
        { position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } },
        { position: { x: 3, y: -7, z: -4 }, velocity: { x: 1, y: 3, z: 3 } },
        { position: { x: 1, y: -7, z: 5 }, velocity: { x: -3, y: 1, z: -3 } },
        { position: { x: 2, y: 2, z: 0 }, velocity: { x: -1, y: -3, z: 1 } },
      ]);
    });

    test('it should calculate correct velocities after step 2', () => {
      const moonsAfterStep1 = [
        { position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } },
        { position: { x: 3, y: -7, z: -4 }, velocity: { x: 1, y: 3, z: 3 } },
        { position: { x: 1, y: -7, z: 5 }, velocity: { x: -3, y: 1, z: -3 } },
        { position: { x: 2, y: 2, z: 0 }, velocity: { x: -1, y: -3, z: 1 } },
      ];

      const velocitiesAfterStep2 = calculateVelocities(moonsAfterStep1);

      expect(velocitiesAfterStep2).toEqual([
        { x: 3, y: -2, z: -2 },
        { x: -2, y: 5, z: 6 },
        { x: 0, y: 3, z: -6 },
        { x: -1, y: -6, z: 2 },
      ]);
    });

    test('it should calculate correct state after step 10', () => {
      const newState = calculateNewState(moons, 10);

      expect(newState).toEqual([
        { position: { x: 2, y: 1, z: -3 }, velocity: { x: -3, y: -2, z: 1 } },
        { position: { x: 1, y: -8, z: 0 }, velocity: { x: -1, y: 1, z: 3 } },
        { position: { x: 3, y: -6, z: 1 }, velocity: { x: 3, y: 2, z: -3 } },
        { position: { x: 2, y: 0, z: 4 }, velocity: { x: 1, y: -1, z: -1 } },
      ]);
    });

    test('it should calculate correct energy after step 10', () => {
      const totalMoonEnergy = calculateNewState(moons, 10).reduce((sum, moon) => {
        sum += calculateMoonEnergy(moon);
        return sum;
      }, 0);

      expect(totalMoonEnergy).toEqual(179);
    });
  });

  describe('Day 12 part 2', () => {

    const initialState = [
      { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } },
    ];

    const state10 = [
      { position: { x: 2, y: 1, z: -3 }, velocity: { x: -3, y: -2, z: 1 } },
      { position: { x: 1, y: -8, z: 0 }, velocity: { x: -1, y: 1, z: 3 } },
      { position: { x: 3, y: -6, z: 1 }, velocity: { x: 3, y: 2, z: -3 } },
      { position: { x: 2, y: 0, z: 4 }, velocity: { x: 1, y: -1, z: -1 } },
    ];

    test('it should not find an equal state', () => {
      expect(isSameState(initialState, state10)).toBeFalsy();
    });

    test('it should find an equal state', () => {
      expect(isSameState(initialState, initialState)).toBeTruthy();
    });


    test('it should not find the same state after 100 steps for example 1', () => {
      const finalState = calculateNewState(initialState, 102);
      expect(isSameState(initialState, finalState)).toBeFalsy();
    });

    test('it should find the same state after 2772 steps for example 1', () => {
      const finalState = calculateNewState(initialState, 2772);
      expect(isSameState(initialState, finalState)).toBeTruthy();
    });
  });
});
