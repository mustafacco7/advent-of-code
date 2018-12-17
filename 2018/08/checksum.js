// Use a "global" variable so we don't have to pass the list back and forth between functions
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

  checkSum += list.splice(0, entries).reduce((sum, v) => sum + v);

  return checkSum;
};


const sumMetadata = (tree, index, count) => tree.slice(index, index + count).reduce((sum, entry) => sum + entry);

const processNode = (tree, index) => {

  if (tree[index] === 0) {
    return {
      length: tree[index + 1] + 2,
      metadata: sumMetadata(tree, index + 2, tree[index + 1]),
    };
  }

  let length = 0;
  const metadata = [];
  for (let i = 0; i < tree[index]; i += 1) {
    const node = processNode(tree, index + length + 2);
    length += node.length;
    metadata.push(node.metadata);
  }

  let metadataSum = 0;
  for (let i = 0; i < tree[index + 1]; i += 1) {
    if (tree[index + length + 2 + i] > 0 && tree[index + length + 2 + i] <= tree[index]) {
      metadataSum += metadata[tree[index + length + 2 + i] - 1];
    }
  }

  return {
    length: length + tree[index + 1] + 2,
    metadata: metadataSum,
  };
};

const findChecksum = (input) => {
  initializeListData(input);
  return getChecksum();
};


const findRootNodeValue = (input) => {
  const tree = input.split(' ').map(v => parseInt(v, 10));
  return processNode(tree, 0).metadata;
};

module.exports = { findChecksum, findRootNodeValue };
