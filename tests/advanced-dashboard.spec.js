require('./hooks');
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

const { DashboardPage } = require('../pages/DashboardPage');

const { SidebarPage } = require('../pages/SidebarPage');

const { DashboardCardsPage } = require('../pages/DashboardCardsPage');

const { QuickActionsPage } = require('../pages/QuickActionsPage');

test.setTimeout(600000);

test('Advanced PMI Dashboard Framework', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const dashboardPage = new DashboardPage(page);

    const sidebarPage = new SidebarPage(page);

    const dashboardCardsPage = new DashboardCardsPage(page);

    const quickActionsPage = new QuickActionsPage(page);

    // LOGIN
    await loginPage.gotoLoginPage();

    await loginPage.login(
        'nafiue11@gmail.com',
        'nafiue420.'
    );

    // VERIFY DASHBOARD
    await dashboardPage.verifyDashboard();

    await expect(page).toHaveURL(/dashboard/);

    // PROFILE BUTTON
    await dashboardPage.clickProfileButton();

    // SIDEBAR TEST
    await sidebarPage.clickSidebarMenu('Inbox');

    await page.screenshot({
        path: 'screenshots/sidebar-inbox.png',
        fullPage: true
    });

    // RETURN DASHBOARD
    await page.goto(
        'https://demo.pmibdchapter.org/dashboard'
    );

    // DASHBOARD CARD TEST
    await dashboardCardsPage.clickDashboardCard(
        '/enquiry'
    );

    await page.screenshot({
        path: 'screenshots/dashboard-card.png',
        fullPage: true
    });

    // RETURN DASHBOARD
    await page.goto(
        'https://demo.pmibdchapter.org/dashboard'
    );

    // QUICK ACTION TEST
    await quickActionsPage.clickQuickAction(
        'New Event'
    );

    await page.screenshot({
        path: 'screenshots/quick-action.png',
        fullPage: true
    });

    // RETURN DASHBOARD
    await page.goto(
        'https://demo.pmibdchapter.org/dashboard'
    );

    // LIVE SITE BUTTON
    await dashboardPage.clickLiveSiteButton();

    await page.screenshot({
        path: 'screenshots/live-site.png',
        fullPage: true
    });

    console.log('ADVANCED FRAMEWORK PASSED');
});