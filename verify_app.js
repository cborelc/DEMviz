const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file://' + path.resolve('index.html');
  await page.goto(filePath);

  // Check if UI elements exist
  const gridRes = await page.$('#gridRes');
  if (gridRes) {
    console.log('Grid Detail slider found.');
    const max = await gridRes.getAttribute('max');
    console.log('Grid Detail max:', max);
  } else {
    console.error('Grid Detail slider NOT found.');
  }

  const rawWidth = await page.$('#rawWidth');
  if (rawWidth) {
    console.log('RAW width input found.');
  } else {
    console.error('RAW width input NOT found.');
  }

  // Take a screenshot
  await page.screenshot({ path: 'verification_screenshot.png' });
  console.log('Screenshot saved to verification_screenshot.png');

  await browser.close();
})();
