const calculateNewValue = ({ value = 1, subjectNumber, divider = 20201227 }) => {
  value *= subjectNumber;
  value %= divider;
  return value;
};

const findLoopSize = ({ publicKey, subjectNumber }) => {
  let value = 1;
  let loop = 0;
  while (publicKey !== value) {
    loop += 1;
    value = calculateNewValue({ value, subjectNumber });
  }

  return loop;
};

const calculatePublicKey = ({ loopSize, publicKey }) => {
  let value = 1;
  const subjectNumber = publicKey;
  const divider = 20201227;
  for (let i = 0; i < loopSize; i += 1) {
    value = calculateNewValue({ value, subjectNumber, divider });
  }
  return value;
};

const calcultateEncryptionKey = ({ publicKey, loopSize }) => {
  let value = 1;
  for (let i = 0; i < loopSize; i += 1) {
    value = calculateNewValue({ value, subjectNumber: publicKey });
  }
  return value;
};

const util1 = (input) => {
  const cardPublicKey = Number(input[0]);
  const doorPublicKey = Number(input[1]);
  const cardLoopSize = findLoopSize({ publicKey: cardPublicKey, subjectNumber: 7 });
  return calcultateEncryptionKey({ publicKey: doorPublicKey, loopSize: cardLoopSize });
};

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2, calculateNewValue, findLoopSize, calculatePublicKey, calcultateEncryptionKey };
