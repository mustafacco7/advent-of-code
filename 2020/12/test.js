const {
  rotationToCompassDirection,
  updateRotation,
  util1,
  util2,
} = require('./utils');

describe('it should solve part 1 and part 2', () => {
  const input1 = ['F10', 'N3', 'F7', 'R90', 'F11'];

  test('it should give correct compass direction', () => {
    expect(rotationToCompassDirection(0)).toEqual('N');
    expect(rotationToCompassDirection(90)).toEqual('E');
    expect(rotationToCompassDirection(180)).toEqual('S');
    expect(rotationToCompassDirection(270)).toEqual('W');
    expect(rotationToCompassDirection(360)).toEqual('N');
    expect(rotationToCompassDirection(450)).toEqual('E');
    expect(rotationToCompassDirection(-90)).toEqual('W');
    expect(rotationToCompassDirection(-180)).toEqual('S');
    expect(rotationToCompassDirection(-270)).toEqual('E');
  });

  test('it should give correct rotation', () => {
    expect(updateRotation(0, 90)).toEqual(90);
    expect(updateRotation(90, -90)).toEqual(0);
    expect(updateRotation(0, 180)).toEqual(180);
    expect(updateRotation(0, -90)).toEqual(270);
    expect(updateRotation(90, -180)).toEqual(270);
    expect(updateRotation(180, 180)).toEqual(0);
  });
  test('it should solve example 1', () => {
    expect(util1(input1)).toEqual(25);
  });

  /* test('it should solve example 2', () => {
    expect(util2(input1)).toEqual(0);
  }); */
});
