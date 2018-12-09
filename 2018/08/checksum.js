let list;

const initializeListData = (input) => {
  list = input.split(' ').map(v => parseInt(v, 10));
};

const getChecksum = () => {
  const [children, entries] = list.splice(0, 2);
  let checkSum = 0;

  for (let i = 0; i < children; i += 1) {
    checkSum += getChecksum();
  }

  checkSum += list.splice(0, entries).reduce((sum, v) => {
    /* eslint-disable-next-line no-param-reassign */
    sum += v;
    return sum;
  }, 0);

  return checkSum;
};

const getRootNodeValue = () => {

};


const findChecksum = (input) => {
  initializeListData(input);
  return getChecksum();
};

const findRootNodeValue = (input) => {
  initializeListData(input);
  return getRootNodeValue();
};

module.exports = { findChecksum, findRootNodeValue };
