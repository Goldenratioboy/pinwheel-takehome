import regression from 'regression';
import { parseCsvData } from './parse.js';

export const predictNextMonth = async (category) => {
  const filenameMap = {
    'Total #s Absolute': 'line_national.csv',
    '#s by Industry': 'line_industry.csv',
    '#s by Establishment Size': 'line_firmsize.csv',
    '#s by Region': 'line_region.csv',
  };

  if (!(category in filenameMap)) {
    throw Error('Unexpected category encountered in predictNextMonth()');
  }
  const filename = filenameMap[category];
  const data = await parseCsvData(
    filename,

    // These values aren't used when we're returning early for
    // data analysis
    'NOT NEEDED',
    2010,
    'Jan',

    true, // this value is needed to override function to return early
  );

  const linearData = parseDataToLinearForm(data);
  for (const k of Object.keys(linearData)) {
    const result = regression.linear(linearData[k]);
    const dataPointToPredict = linearData[k].length + 1;
    const resultFromRegressionModel = result.predict(dataPointToPredict)[1];
    console.log(`Next Month's Estimate for ${k}`, resultFromRegressionModel);
  }
};

/**
 * Parses data to linear form for regression.linear()
 *
 * handles 1 -> n linear models
 */
const parseDataToLinearForm = (data) => {
  // Contains a map of linear regression functions
  // {Construction -> array of tuples, Information: array of tuples, etc.}
  const linearMap = {};

  // We're making an assumption here that all data is the same shape
  for (const k of Object.keys(data[0])) {
    const linearResult = [];
    if (k === 'date') {
      continue;
    }

    // Builds a linear array for a given category 'k'
    for (let i = 0; i < data.length; i++) {
      const numberOfPpl = Number(data[i][k]);
      linearResult.push([i, numberOfPpl]);
    }

    linearMap[k] = linearResult;
  }

  return linearMap;
};
