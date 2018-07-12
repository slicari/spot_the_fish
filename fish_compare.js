function compareScreenshots(fileName) {
    return new Promise((resolve, reject) => {
        const img1 = fs.createReadStream(`${testDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`${goldenDir}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);

        let filesRead = 0;
        function doneReading() {
            // Wait until both files are read
            if (++filesRead < 2) return;

            // Files should have the same dimensions
            expect(img1.width, 'image widths are the same').equal(img2.width);
            expect(img1.height, 'image heights are the same').equal(img2.height);

            // Do the visual comparison
            const diff = new PNG({width: img1.width, height: img2.height});
            const numDiffPixels = pixelmatch(
                img1.data, img2.data, diff.data, img1.width, img1.height,
                {threshold: 0.1}
            );
            // Files should look the same
            expect(numDifPixels, 'number of different pixels').equal(0);
        }
    });
}  