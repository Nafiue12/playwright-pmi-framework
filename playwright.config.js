const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    timeout: 120000,

    expect: {

        timeout: 10000
    },

    retries: 2,

    workers: 2,

    use: {

        // LOCAL = visible
        // GITHUB ACTIONS = headless

        headless: process.env.CI ? true : false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure',

        navigationTimeout: 60000,

        actionTimeout: 30000
    },

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        }

        // FIREFOX DISABLED TEMPORARILY
        // ADD LATER AFTER STABLE
    ],

    reporter: [

        ['html'],

        ['allure-playwright']
    ]
});