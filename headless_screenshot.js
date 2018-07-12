const puppeteer = require('puppeteer');

var readlineSync = require('readline-sync');

var website = readlineSync.question('Website to screenshot? ');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(website);
  await page.screenshot({path: 'example.png', fullPage: true});
//  var savedSite = String(website);
//  await page.screenshot({path: savedSite});
  await browser.close();
})();

console.log('Screenshot of ' + website + ' has been taken!');
