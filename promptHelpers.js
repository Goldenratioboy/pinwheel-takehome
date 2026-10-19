/**
 * Collection of some helper prompts that can be reused
 */
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const selectMonthPrompt = [
  {
    type: 'select',
    name: 'action',
    message: 'Select Month',
    choices: months,
  },
];

export const selectYearPrompt = [
  {
    type: 'number',
    message: 'Type in your search year',
    min: 2010,
    name: 'action',
    // A bit risky since we're reading wall time
    max: new Date().getFullYear(),
  },
];

export const historicalVsPredictionPrompt = [
  {
    type: 'select',
    name: 'action',
    message: 'Select Historical Data or request a prediction for next month',
    choices: ['Historical', 'Next Month Prediction'],
  },
];
