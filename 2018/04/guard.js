/* eslint-disable no-shadow */
const findMaxMinute = minutes => Object.entries(minutes).reduce((max, [minute, count]) => {
  if (count > max.count) {
    max.count = count;
    max.minute = minute;
  }
  return max;
}, { count: -1 });


const calculateValues = (rows) => {
  const regexp = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (?:Guard #(\d+) begins shift|(falls|wakes))/;
  let currentId;
  let startTime;
  return rows
    .map((row) => {
      const [, date, id, action] = row.match(regexp);
      return [date, id, action];
    })
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .reduce((acc, [date, id, action]) => {
      if (!action) {
        currentId = id;
        return acc;
      }
      if (!acc[currentId]) {
        acc[currentId] = { sleepTime: 0, minutes: {} };
      }
      if (action === 'falls') {
        startTime = new Date(date).getTime();
      } else {
        const sleepTime = (new Date(date).getTime() - startTime) / 1000 / 60;
        acc[currentId].sleepTime = acc[currentId].sleepTime ? acc[currentId].sleepTime + sleepTime : sleepTime;
        const startMinute = new Date(startTime).getMinutes();
        for (let minute = startMinute; minute < startMinute + sleepTime; minute += 1) {
          acc[currentId].minutes[minute] = (acc[currentId].minutes[minute] || 0) + 1;
        }
      }

      return acc;
    }, {});
};

const findGuardAndTime = (rows) => {
  const values = calculateValues(rows);
  const { id } = Object.entries(values).reduce((max, [id, { sleepTime }]) => {
    if (sleepTime > max.sleepTime) {
      max.id = id;
      max.sleepTime = sleepTime;
    }
    return max;
  }, { sleepTime: -1 });

  const { minute } = findMaxMinute(values[id].minutes);

  return minute * id;
};

const findGuardAndFrequency = (rows) => {
  const values = calculateValues(rows);
  const { id, minute } = Object.entries(values).reduce((max, [id, { minutes }]) => {
    const { count, minute } = findMaxMinute(minutes);
    if (count > max.count) {
      max.count = count;
      max.minute = minute;
      max.id = id;
    }
    return max;
  }, { count: -1 });

  return id * minute;
};

module.exports = { findGuardAndTime, findGuardAndFrequency };
