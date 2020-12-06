const getGroupedAnswers = (input) =>
  input.reduce(
    (acc, row) => {
      if (row) {
        acc[acc.length - 1].push(row);
      } else {
        acc.push([]);
      }
      return acc;
    },
    [[]],
  );

const getUniqueAnswers = (input) =>
  getGroupedAnswers(input).map((row) => [...new Set(row.join(''))]);

const util1 = (input) => {
  const totalAnswers = getUniqueAnswers(input).reduce((sum, groupAnswers) => {
    sum += groupAnswers.length;
    return sum;
  }, 0);
  return totalAnswers;
};

const util2 = (input) => {
  const groups = getGroupedAnswers(input);
  const groupMembers = groups.map((group) => group.length);
  const sum = groups.reduce((validAnswersCount, group, i) => {
    if (groupMembers[i] === 1) {
      validAnswersCount += group[0].length;
      return validAnswersCount;
    }

    const groupAnswersCount = group.reduce((answersCount, member) => {
      member.split('').forEach((answer) => {
        answersCount[answer] = answersCount[answer] ? (answersCount[answer] += 1) : 1;
      });
      return answersCount;
    }, {});

    validAnswersCount += Object.values(groupAnswersCount).reduce((total, answers) => {
      if (answers >= groupMembers[i]) {
        total += 1;
      }
      return total;
    }, 0);

    return validAnswersCount;
  }, 0);
  return sum;
};

module.exports = { util1, util2 };
