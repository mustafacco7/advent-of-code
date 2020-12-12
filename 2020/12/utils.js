const rotationToCompassDirection = (rotation) =>
  'NESW'.split('')[((rotation + 360) % 360) / 90];

const updateRotation = (rotation, difference) => {
  rotation += Number(difference);
  if (rotation < 0) {
    rotation += 360;
  }
  return rotation % 360;
};

const instructions = {
  N: (number, { x, y, rotation }) => {
    x += number * 0;
    y += number * -1;
    return { x, y, rotation };
  },
  S: (number, { x, y, rotation }) => {
    x += number * 0;
    y += number * 1;
    return { x, y, rotation };
  },
  E: (number, { x, y, rotation }) => {
    x += number * 1;
    y += number * 0;
    return { x, y, rotation };
  },
  W: (number, { x, y, rotation }) => {
    x += number * -1;
    y += number * 0;
    return { x, y, rotation };
  },
  F: (number, { x, y, rotation }) => {
    const dir = rotationToCompassDirection(rotation);
    return instructions[dir](number, { x, y, rotation });
  },
  L: (number, { x, y, rotation }) => {
    rotation = updateRotation(rotation, -number);
    return { x, y, rotation };
  },
  R: (number, { x, y, rotation }) => {
    rotation = updateRotation(rotation, number);
    return { x, y, rotation };
  },
};

const util1 = (input) => {
  const location = input.reduce(
    ({ x, y, rotation }, instruction) => {
      const [, letter, number] = instruction.match(/([NSEWLRF])(\d+)/) || [];
      return instructions[letter](number, { x, y, rotation });
    },
    {
      x: 0,
      y: 0,
      rotation: 90,
    },
  );
  return Math.abs(location.x) + Math.abs(location.y);
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2, rotationToCompassDirection, updateRotation };
