const { test } = require('@playwright/test');

const fs = require('fs');

const path = require('path');

test.afterEach(async ({ page }, testInfo) => {

    // =====================================
    // CREATE FOLDERS
    // =====================================

    if (!fs.existsSync('screenshots')) {

        fs.mkdirSync('screenshots');
    }

    if (!fs.existsSync('videos')) {

        fs.mkdirSync('videos');
    }

    // SAFE FILE NAME
    const safeTitle = testInfo.title
        .replace(/[^a-zA-Z0-9]/g, '_');

    // =====================================
    // SCREENSHOT
    // =====================================

    const screenshotPath = path.join(
        'screenshots',
        `${safeTitle}.png`
    );

    await page.screenshot({

        path: screenshotPath,

        fullPage: true
    });

    // ATTACH TO ALLURE + PLAYWRIGHT
    await testInfo.attach(
        'Screenshot',
        {

            path: screenshotPath,

            contentType: 'image/png'
        }
    );

    // =====================================
    // VIDEO
    // =====================================

    const video = page.video();

    if (video) {

        // IMPORTANT:
        // WAIT FOR VIDEO SAVE

        const originalVideoPath =
            await video.path();

        const newVideoPath = path.join(
            'videos',
            `${safeTitle}.webm`
        );

        // COPY VIDEO
        fs.copyFileSync(
            originalVideoPath,
            newVideoPath
        );

        // ATTACH VIDEO
        await testInfo.attach(
            'Video',
            {

                path: newVideoPath,

                contentType: 'video/webm'
            }
        );
    }
});