const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    timeout: 120000,

    expect: {
        timeout: 10000
    },

    retries: 2,

    workers: 2,

    reporter: [

        ['html', {
            open: 'always'
        }],

        ['allure-playwright']
    ],

    use: {

        // LOCAL = visible
        // GITHUB ACTIONS = headless

        headless: process.env.CI ? true : false,

        // ALWAYS SAVE

        screenshot: 'on',

        video: 'on',

        trace: 'on',

        navigationTimeout: 60000,

        actionTimeout: 30000,

        viewport: {
            width: 1920,
            height: 1080
        }
    },

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
});