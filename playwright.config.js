const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    timeout: 600000,

    retries: 2,

    workers: 4,

    use: {

        // LOCAL = visible browser
        // GITHUB ACTIONS = headless

        headless: process.env.CI ? true : false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    // CROSS BROWSER TESTING

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',

            use: {
                ...devices['Desktop Firefox']
            }
        }
    ],

    reporter: [

        ['html'],

        ['allure-playwright']
    ]
});