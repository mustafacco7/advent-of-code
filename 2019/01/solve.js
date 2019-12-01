#!/usr/env/node

import { getRows } from '../../utils';

const solve1 = () => {
  getRows()
    .then((rows) => {
      console.log(rows);
    });
};

const solve2 = () => {
  getRows()
    .then((rows) => {
      console.log(rows);
    });
};

solve1();
solve2();
