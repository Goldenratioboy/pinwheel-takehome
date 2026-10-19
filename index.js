#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { retrieveADPPage } from './browser.js';

import {
  selectMonthPrompt,
  selectYearPrompt,
  historicalVsPredictionPrompt,
} from './promptHelpers.js';

import { parseNumberFromCsv } from './parse.js';

program.version('1.0.0').description('Pinwheel take home');

console.log('initializing ADP data...');
await retrieveADPPage();
console.log(chalk.green('ADP Data initalized!'));

let running = true;

while (running) {
  const choices = [
    'Total #s Absolute',
    '#s by Industry',
    '#s by Establishment Size',
    '#s by Region',
    'Quit',
  ];
  const primaryAnswer = await inquirer.prompt([
    {
      type: 'select',
      name: 'action',
      message:
        'Select where you want to explore (All data is for U.S. Private Employment #s)',
      choices,
    },
  ]);

  // Handle the selected action
  switch (primaryAnswer.action) {
    // If we've selected a data exploration choice our flows are largely the same
    case choices[0]:
    case choices[1]:
    case choices[2]:
    case choices[3]:
      const historicalVsPredictionAnswer = await inquirer.prompt(
        historicalVsPredictionPrompt,
      );

      if (historicalVsPredictionAnswer.action === 'Historical') {
        const year = await inquirer.prompt(selectYearPrompt);
        const month = await inquirer.prompt(selectMonthPrompt);

        await parseNumberFromCsv(
          primaryAnswer.action,
          year.action,
          month.action,
        );
      } else {
        // Get next month predictions for the given category
        console.log('TODO...');
      }
      break;
    case 'Quit':
      console.log('Thanks for playing!');
      running = false;
      break;
  }
}
