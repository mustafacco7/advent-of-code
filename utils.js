const fs = require('promise-fs');
const fetch = require('node-fetch');
const envPath = require('find-config')('.env');

// dotenv is trying to read .env from the path which calls utils.js, so the path is NOT relative to utils.js
require('dotenv').config({ path: envPath });


/**
 * Try to figure out the date to use
 * @returns {*[]}
 */
const guessDate = () => {
  // If no date is specified, try to guess the date from the path of the calling file
  let [, year, day] = process.cwd().match(/(\d{4})\/(\d{1,2})$/);

  if (day.startsWith('0')) {
    day = day.substr(1);
  }

  // In case we still don't have a date try to guess it from today's day
  const today = new Date();
  if (!year) {
    const month = today.getMonth();
    year = today.getFullYear();
    // If we are not in december, let's assume that it is last years puzzle we are interested in
    if (month < 11) {
      year -= 1;
    }
  }

  if (!day) {
    day = today.getDate();
  }

  return [year, day];
};


const getRemoteData = ({ year, day } = {}) => {
  if (!year && !day) {
    [year, day] = guessDate();
  }

  const session = process.env.SESSION;
  if (!session) {
    throw new Error(`No session id specified. 
    Please update your .env file with your session id from the cookie at adventofcode.com`);
  }
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const headers = {
    cookie: `session=${session}`,
  };

  return fetch(url, { headers })
    .then(res => res.text());
};

const getData = async () => {
  const fileName = 'input.txt';
  try {
    return await fs.readFile(fileName, 'ascii');
  } catch (err) {
    console.log('No local input file found. Calling adventofcode.com');
    const content = await getRemoteData();
    await fs.writeFile(fileName, content);
    return content;
  }
};

const getRows = () => getData().then(data => data.trim().split('\n'));
const getRow = () => getRows().then(data => data[0]);

module.exports = { getRow, getRows };
