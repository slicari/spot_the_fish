const puppeteer = require('puppeteer');
//const expect = require('Mocha').expect;
const {startServer} = require('polyserve');

describe('screenshots pass', function() {
  let polyserve, browser, page;

  // This runs when the testing suite is initialized
  before(async function() {
    polyserve = await startServer({port:4000});

    // Define shell; then create a directory to save screenshotted photos in called 'screen_test'
    var shell = require('shelljs');
    shell.mkdir('-p', screen_test); 

    //var fs = require("fs");
    // Create the test directory
    //if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
    
    // Create wide screen subdirectories (may not be necessary in long run)
    // if (!fs.existsSync(`${testDir}/wide`)) fs.mkdirSync(`${testDir}/wide`);

  });  

  // This runs when the suite is done and stops the server
  after((done) => polyserve.close(done));

  // Run before every test. Starts a clean web browser
  beforeEach(async function() {
    browser = await puppeteer.launch();
    page = await browser.newPage();

  });

  // Run after every test; clean up after the browser
  afterEach(() => browser.close());
  

  // Compare test on the wide screen directory
  describe('wide screen', function() {
    beforeEach(async function() {
      return page.setViewport({width:800, height: 600});
    });
    it('/view1', async function() {
      return takeAndCompareScreenshot(page, 'view1', 'wide');
    });
  });  
});

