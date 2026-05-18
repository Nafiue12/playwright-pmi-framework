const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

const { DashboardPage } = require('../pages/DashboardPage');

test.setTimeout(600000);

test.describe('PMI Professional Framework', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();

        await loginPage.login(
            'nafiue11@gmail.com',
            'nafiue420.'
        );
    });

    test('Dashboard Testing', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);

        // VERIFY DASHBOARD
        await dashboardPage.verifyDashboard();

        await expect(page).toHaveURL(/dashboard/);

        // PROFILE BUTTON
        await dashboardPage.clickProfileButton();

        // SCREENSHOT
        await page.screenshot({
            path: 'screenshots/dashboard.png',
            fullPage: true
        });

        console.log('Dashboard Test Passed');
    });
});