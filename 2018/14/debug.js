const printDebug = (elves, scores, debug) => {
  if (!debug) {
    return;
  }

  const parenthesis = elves[0].index;
  const squareBrackets = elves[1].index;
  const string = scores.reduce((str, score, index) => {

    if (index === parenthesis || index === squareBrackets) {
      if (index === parenthesis) {
        str += '(';
      }

      if (index === squareBrackets) {
        str += '[';
      }
    } else {
      str += ' ';
    }

    str += score;

    if (index === parenthesis || index === squareBrackets) {
      if (index === parenthesis) {
        str += ')';
      }

      if (index === squareBrackets) {
        str += ']';
      }
    } else {
      str += ' ';
    }


    return str;
  }, '');
  console.log(string);
};

const printTotal = (total, debug) => {
  if (!debug) {
    return;
  }

  const string = total.reduce((str, row) => {
    str += row.join('');
    str += '\n';
    return str;
  }, '');
  console.log(string);
};

module.exports = { printDebug, printTotal };
