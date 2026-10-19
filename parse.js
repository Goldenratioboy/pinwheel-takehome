/**
 * Given prompt data from CLI
 *
 * Parses the correct answer out of csv formats
 */

import fs from 'fs';
import csv from 'csv-parser';

import { months } from './promptHelpers.js';

/**
 * Gets all private employment data
 * @param {*} year
 * @param {*} month
 */
const getTotalAbsData = (year, month) => {
  const results = [];
  console.log('ARE WE COMING INTO getTotalAbsData()?');
  fs.createReadStream('line_national.csv')
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      const rowOfInterest = results.filter((obj) => {
        const date = new Date(obj.date);
        const dateYear = date.getFullYear();
        const dateMonth = date.getUTCMonth();

        // Compares year and numerical value for date
        return year === dateYear && dateMonth === months.indexOf(month);
      });
      console.log(
        `Number of ppl employed ${rowOfInterest[0]['Private Employment']} on following date: ${rowOfInterest[0]['date']}`,
      );
    })
    .on('error', (err) => {
      console.log(err);
      console.log('error reading csv file');
    });
};

/**
 * Parses csv data from a particular file using filename
 *
 * Keyword is used to console log accurate data summary
 * @param {*} filename
 * @param {*} keyword
 * @param {*} year
 * @param {*} month
 */
const parseCsvData = async (filename, keyword, year, month) => {
  const results = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        const rowsOfInterest = results.filter((obj) => {
          const date = new Date(obj.date);
          const dateYear = date.getFullYear();
          const dateMonth = date.getUTCMonth();

          // Compares year and numerical value for date
          return year === dateYear && dateMonth === months.indexOf(month);
        });
        console.log(`Number of ppl employed by ${keyword}:`);
        for (const key of Object.keys(rowsOfInterest[0])) {
          if (key !== 'date') {
            console.log(
              `${keyword}: "${key}" # of ppl: ${rowsOfInterest[0][key]}`,
            );
          }
        }

        resolve();
      })
      .on('error', (err) => {
        console.log(err);
        console.log('error reading csv file');

        reject();
      });
  });
};

export const parseNumberFromCsv = async (tableName, year, month) => {
  let result;
  switch (tableName) {
    case 'Total #s Absolute':
      // result = await getTotalAbsData(year, month);
      result = await parseCsvData(
        'line_national.csv',
        'Total Private Institution Count',
        year,
        month,
      );
      break;
    case '#s by Industry':
      result = await parseCsvData('line_industry.csv', 'Industry', year, month);
      break;
    case '#s by Establishment Size':
      result = await parseCsvData(
        'line_firmsize.csv',
        'Establishment Size',
        year,
        month,
      );
      break;
    case '#s by Region':
      result = await parseCsvData('line_region.csv', 'Region', year, month);
      break;
  }
};
