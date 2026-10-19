import { chromium } from 'playwright';
import fs from 'fs';

export const retrieveADPPage = async () => {
  const ADP_URL = 'https://adpemploymentreport.com/';
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const csvMap = {};
  page.on('response', async (response) => {
    // Filter request log by csv files
    if (response.url().includes('.csv')) {
      const responseBody = await response.text();
      const filename = response.url().split('/').at(-1);
      fs.writeFile(filename, responseBody, (err) => {
        if (err) console.error('Error writing file', response.url(), err);
      });
    }
  });

  await page.goto(ADP_URL);
  await browser.close();
};
