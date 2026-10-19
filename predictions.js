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

  const result = regression.linear(linearData);

  const dataPointToPredict = linearData.length + 1;
  const resultFromRegressionModel = result.predict(dataPointToPredict)[1];
  console.log("Next Month's Estimate: ", resultFromRegressionModel);
};

/**
 * Parses data to linear form for regression.linear()
 */
const parseDataToLinearForm = (data) => {
  // Should be list of tuples
  const linearResult = [];
  for (let i = 0; i < data.length; i++) {
    const numberOfPpl = Number(data[i]['Private Employment']);
    linearResult.push([i, numberOfPpl]);
  }

  return linearResult;
};
