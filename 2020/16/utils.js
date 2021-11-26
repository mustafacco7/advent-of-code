const parseRules = (input) =>
  input
    .map((row) => {
      const [, min1, max1, min2, max2] =
        row.match(/\w+\s?\w+?: (\d+)-(\d+) or (\d+)-(\d+)/) || [];
      if (min1 !== undefined) {
        return [min1, max1, min2, max2].map(Number);
      }
      return undefined;
    })
    .filter(Boolean);

const getRuleNames = (input) =>
  input
    .map((row) => {
      const [, name] =
        row.match(/(\w+\s?\w+?): (\d+)-(\d+) or (\d+)-(\d+)/) || [];
      if (name !== undefined) {
        return name;
      }
      return undefined;
    })
    .filter(Boolean);

const parseTickets = (input) =>
  input
    .map((row) => {
      const [ticket] = row.match(/^((\d+),?)+$/) || [];
      if (ticket) {
        return ticket.split(',').map(Number);
      }
      return undefined;
    })
    .filter(Boolean);

const isWithinRange = (value, [min1, max1, min2, max2]) =>
  (value >= min1 && value <= max1) || (value >= min2 && value <= max2);

const isWithinSomeOfTheRanges = (value, ranges) =>
  ranges.some((range) => isWithinRange(value, range));

const util1 = (input) => {
  const rules = parseRules(input);
  const [, ...nearbyTickets] = parseTickets(input);
  const invalid = nearbyTickets
    .map((ticket) =>
      ticket.reduce((invalidTicketValues, value) => {
        if (!isWithinSomeOfTheRanges(value, rules)) {
          invalidTicketValues.push(value);
        }
        return invalidTicketValues;
      }, []),
    )
    .filter((list) => list.length);

  const sum = invalid.reduce((total, ticket) => {
    total += ticket.reduce((ticketSum, value) => {
      ticketSum += value;
      return ticketSum;
    }, 0);
    return total;
  }, 0);

  return sum;
};

const getValidTickets = (rules, tickets) =>
  tickets
    .map((ticket) => {
      if (ticket.some((value) => !isWithinSomeOfTheRanges(value, rules))) {
        return false;
      }
      return ticket;
    })
    .filter(Boolean);

const findMatchingRules = (rules, tickets, ruleNames) => {
  const matches = {};
  tickets.forEach((ticket) => {
    matches[ticket] = {};
    rules.forEach((rule, ruleIndex) => {
      ticket.forEach((value, valueIndex) => {
        if (isWithinRange(value, rule)) {
          matches[ticket][ruleNames[valueIndex]] = [
            ...(matches[ticket][ruleNames[valueIndex]] || []),
            ruleIndex,
          ];
        }
      });
    });
  });
  return matches;
};

const util2 = (input) => {
  const rules = parseRules(input);
  const [, ...nearbyTickets] = parseTickets(input);
  const validTickets = getValidTickets(rules, nearbyTickets);
  const ruleNames = getRuleNames(input);
  // eslint-disable-next-line no-unused-vars
  const matchingRules = findMatchingRules(rules, validTickets, ruleNames);
  // Object.values(matchingRules).forEach((matchingRule) => console.log(matchingRule));
  return validTickets;
};

module.exports = {
  util1,
  util2,
  isWithinRange,
  isWithinSomeOfTheRanges,
  getValidTickets,
};
