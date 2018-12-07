const findOrder = (rows) => {
  let instructions = rows.reduce((acc, row) => {
    const [, start, , , , , , end] = row.split(' ');
    acc[start] = acc[start] || [];
    acc[end] = [...(acc[end] || []), start];
    return acc;
  }, {});

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

module.exports = { findOrder };
