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

const findInvalidTickets = (rules, tickets) =>
  tickets.reduce((invalidTicketValues, ticket) => {
    console.log('ticket', ticket);
    ticket.every((value) => {
      const validTicket = rules.reduce(
        (invalidNumbers, [, min1, max1, min2, max2]) => {
          console.log(value, min1, max1, min2, max2);
          if (
            (value >= min1 && value <= max1) ||
            (value >= min2 && value <= max2)
          ) {
            return invalidNumbers;
          }
          invalidNumbers.push(value);
          return invalidNumbers;
        },
        [],
      );
      console.log('valid', validTicket);
      if (!validTicket) {
        console.log('invalid', value);
        invalidTicketValues.push(value);
      }
      return validTicket;
    });
    console.log(invalidTicketValues);
    return invalidTicketValues;
  }, []);

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

const util2 = (input) => {
  console.log(input);
  return input;
};

module.exports = { util1, util2, isWithinRange, isWithinSomeOfTheRanges };
