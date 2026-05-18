const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    timeout: 600000,

    retries: 2,

    workers: 4,

    use: {

        // HEADLESS TRUE FOR GITHUB ACTIONS
        // HEADLESS FALSE FOR LOCAL MACHINE

        headless: process.env.CI ? true : false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    },

    reporter: [

        ['html'],

        ['allure-playwright']
    ]
});