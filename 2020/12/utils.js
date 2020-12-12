const rotationToCompassDirection = (rotation) =>
  'NESW'.split('')[((rotation + 360) % 360) / 90];

const updateRotation = (rotation, difference) => {
  rotation += Number(difference);
  if (rotation < 0) {
    rotation += 360;
  }
  return rotation % 360;
};

const manhattanDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);

const instructions = {
  N: (number, { x, y, rotation }) => {
    y += number;
    return { x, y, rotation };
  },
  S: (number, { x, y, rotation }) => {
    y -= number;
    return { x, y, rotation };
  },
  E: (number, { x, y, rotation }) => {
    x += number;
    return { x, y, rotation };
  },
  W: (number, { x, y, rotation }) => {
    x -= number;
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

const rotations = {
  0: ({ ship, waypoint }) => ({ ship, waypoint }),
  1: ({ ship, waypoint }) => {
    const { x, y } = waypoint;
    waypoint.x = y;
    waypoint.y = -x;
    return { ship, waypoint };
  },
  2: ({ ship, waypoint }) => {
    const { x, y } = waypoint;
    waypoint.x = -x;
    waypoint.y = -y;
    return { ship, waypoint };
  },
  3: ({ ship, waypoint }) => {
    const { x, y } = waypoint;
    waypoint.x = y;
    waypoint.y = x;
    return { ship, waypoint };
  },
};

const rotateWaypoint = (number, { ship, waypoint }) => {
  const direction = ((number + 360) % 360) / 90;
  return rotations[direction]({ ship, waypoint });
};

const instructions2 = {
  N: (number, { ship, waypoint }) => {
    waypoint.y += number;
    return { ship, waypoint };
  },
  S: (number, { ship, waypoint }) => {
    waypoint.y -= number;
    return { ship, waypoint };
  },
  E: (number, { ship, waypoint }) => {
    waypoint.x += number;
    return { ship, waypoint };
  },
  W: (number, { ship, waypoint }) => {
    waypoint.x -= number;
    return { ship, waypoint };
  },
  F: (number, { ship, waypoint }) => {
    ship.x += waypoint.x * number;
    ship.y += waypoint.y * number;
    return { ship, waypoint };
  },
  L: (number, { ship, waypoint }) =>
    rotateWaypoint(-number, { ship, waypoint }),
  R: (number, { ship, waypoint }) => rotateWaypoint(number, { ship, waypoint }),
};

const util1 = (input) => {
  const location = input.reduce(
    ({ x, y, rotation }, instruction) => {
      const [, letter, number] = instruction.match(/([NSEWLRF])(\d+)/) || [];
      return instructions[letter](Number(number), { x, y, rotation });
    },
    {
      x: 0,
      y: 0,
      rotation: 90,
    },
  );
  return manhattanDistance(location);
};

const util2 = (input) => {
  const { ship, waypoint } = input.reduce(
    ({ ship, waypoint }, instruction) => {
      const [, letter, number] = instruction.match(/([NSEWLRF])(\d+)/) || [];
      console.log(letter, number, ship, waypoint);
      return instructions2[letter](Number(number), { ship, waypoint });
    },
    {
      ship: {
        x: 0,
        y: 0,
      },
      waypoint: {
        x: 10,
        y: 1,
      },
    },
  );
  console.log({ ship, waypoint });
  return manhattanDistance(ship);
};

module.exports = { util1, util2, rotationToCompassDirection, updateRotation, rotations };
