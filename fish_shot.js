async function takeAndCompareScreenshot(page, route, filePrefix) {
    //  If you didn't specify a file, use the name of the route
    let fileName = filePrefix + '/' + (route ? route : 'index');

    // Start the browser, go to the page, and take a screenshot
    await page.goto('http://127.0.0.1:4000/${route}');
    await page.screenshot({path: `${testDir}/${fileName}.png`});

    // Now to test and compare the screenshot
    return compareScreenshots(filename);
}
