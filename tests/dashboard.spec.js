const { test, expect } = require('@playwright/test');

test.setTimeout(600000);

test('PMI Dashboard Full Testing', async ({ page }) => {

    // =====================================
    // OPEN LOGIN PAGE
    // =====================================

    await page.goto('https://demo.pmibdchapter.org/login');

    await page.waitForLoadState('domcontentloaded');

    // =====================================
    // LOGIN
    // =====================================

    await page.locator('input[type="email"]')
        .fill('nafiue11@gmail.com');

    await page.locator('input[type="password"]')
        .fill('nafiue420.');

    // LOGIN PAGE SCREENSHOT
    await page.screenshot({
        path: 'screenshots/login-page.png'
    });

    // CLICK SIGN IN
    await page.getByRole('button', {
        name: 'Sign in'
    }).click();

    // WAIT FOR DASHBOARD
    await page.waitForURL('**/dashboard');

    // VERIFY URL
    await expect(page).toHaveURL(/dashboard/);

    console.log('Dashboard Opened Successfully');

    // DASHBOARD SCREENSHOT
    await page.screenshot({
        path: 'screenshots/dashboard-home.png',
        fullPage: true
    });

    // =====================================
    // PROFILE BUTTON TEST
    // =====================================

    console.log('================================');
    console.log('Testing Profile Button');
    console.log('================================');

    try {

        // PROFILE BUTTON
        const profileButton = page.locator(
            '.dropdown-toggle'
        ).first();

        await profileButton.waitFor({
            state: 'visible'
        });

        // FORCE CLICK
        await profileButton.click({
            force: true
        });

        await page.waitForTimeout(3000);

        // SCREENSHOT
        await page.screenshot({
            path: 'screenshots/profile-button.png',
            fullPage: true
        });

        console.log('SUCCESS: Profile Button');

    } catch (error) {

        console.log('FAILED: Profile Button');

        console.log(error.message);
    }

    // =====================================
    // SIDEBAR MENU TESTING
    // =====================================

    const sidebarMenus = [

        'Inbox',
        'Menu Manager',
        'Media Library',
        'Site Structure',
        'Manage Content',
        'Members & Recognition',
        'Mentorship Programme',
        'Events',
        'Jobs',
        'User Manager'
    ];

    for (const menu of sidebarMenus) {

        console.log('================================');
        console.log(`Testing Sidebar Menu: ${menu}`);
        console.log('================================');

        try {

            const sidebarMenu = page
                .locator('.nk-menu')
                .getByRole('link', {
                    name: new RegExp(menu, 'i')
                })
                .first();

            await sidebarMenu.waitFor({
                state: 'visible'
            });

            await sidebarMenu.scrollIntoViewIfNeeded();

            await sidebarMenu.click();

            await page.waitForTimeout(3000);

            // FILE NAME
            const fileName = menu
                .replace(/\s+/g, '-')
                .replace(/&/g, 'and');

            // SCREENSHOT
            await page.screenshot({
                path: `screenshots/sidebar-${fileName}.png`,
                fullPage: true
            });

            console.log(`SUCCESS: ${menu}`);

            console.log(`Current URL: ${page.url()}`);

        } catch (error) {

            console.log(`FAILED: ${menu}`);

            console.log(error.message);
        }

        // RETURN DASHBOARD
        await page.goto('https://demo.pmibdchapter.org/dashboard');

        await page.waitForTimeout(3000);
    }

    // =====================================
    // DASHBOARD CARD TESTING
    // =====================================

    const dashboardCards = [

        {
            name: 'Enquiries',
            url: '/enquiry'
        },

        {
            name: 'Volunteer Apps',
            url: '/volunteer-applications'
        },

        {
            name: 'Mentorship Apps',
            url: '/mentorship-applications'
        },

        {
            name: 'Pages',
            url: '/admin/page-content'
        },

        {
            name: 'Announcements',
            url: '/announcement'
        },

        {
            name: 'Slider',
            url: '/banner'
        },

        {
            name: 'Menu Items',
            url: '/admin/menus'
        },

        {
            name: 'Board Members',
            url: '/admin/board-members'
        },

        {
            name: 'Past Presidents',
            url: '/admin/past-presidents'
        },

        {
            name: 'Mentors',
            url: '/mentors'
        },

        {
            name: 'Admin Users',
            url: '/users'
        }
    ];

    for (const card of dashboardCards) {

        console.log('================================');
        console.log(`Testing Dashboard Card: ${card.name}`);
        console.log('================================');

        try {

            // LAST MATCH = VISIBLE DASHBOARD CARD
            const dashboardCard = page.locator(
                `a[href="https://demo.pmibdchapter.org${card.url}"]`
            ).last();

            await dashboardCard.waitFor({
                state: 'visible'
            });

            await dashboardCard.scrollIntoViewIfNeeded();

            await dashboardCard.click();

            await page.waitForTimeout(4000);

            // FILE NAME
            const cardFile = card.name
                .replace(/\s+/g, '-');

            // SCREENSHOT
            await page.screenshot({
                path: `screenshots/card-${cardFile}.png`,
                fullPage: true
            });

            console.log(`SUCCESS: ${card.name}`);

            console.log(`Current URL: ${page.url()}`);

        } catch (error) {

            console.log(`FAILED: ${card.name}`);

            console.log(error.message);
        }

        // RETURN DASHBOARD
        await page.goto('https://demo.pmibdchapter.org/dashboard');

        await page.waitForTimeout(3000);
    }

    // =====================================
    // QUICK ACTIONS TESTING
    // =====================================

    const quickActions = [

        'New Event',
        'New Announcement',
        'New Banner',
        'New Menu Item',
        'New Board Member',
        'New Mentor',
        'View Enquiries',
        'Mentorship Inbox',
        'Volunteer Inbox'
    ];

    for (const action of quickActions) {

        console.log('================================');
        console.log(`Testing Quick Action: ${action}`);
        console.log('================================');

        try {

            const quickAction = page
                .getByRole('link', {
                    name: new RegExp(action, 'i')
                })
                .last();

            await quickAction.waitFor({
                state: 'visible'
            });

            await quickAction.scrollIntoViewIfNeeded();

            await quickAction.click();

            await page.waitForTimeout(3000);

            // FILE NAME
            const actionFile = action
                .replace(/\s+/g, '-');

            // SCREENSHOT
            await page.screenshot({
                path: `screenshots/quick-${actionFile}.png`,
                fullPage: true
            });

            console.log(`SUCCESS: ${action}`);

            console.log(`Current URL: ${page.url()}`);

        } catch (error) {

            console.log(`FAILED: ${action}`);

            console.log(error.message);
        }

        // RETURN DASHBOARD
        await page.goto('https://demo.pmibdchapter.org/dashboard');

        await page.waitForTimeout(3000);
    }

    // =====================================
    // FINAL DASHBOARD SCREENSHOT
    // =====================================

    await page.goto('https://demo.pmibdchapter.org/dashboard');

    await page.waitForTimeout(3000);

    await page.screenshot({
        path: 'screenshots/final-dashboard.png',
        fullPage: true
    });

    // =====================================
    // VIEW LIVE SITE BUTTON TEST
    // TESTED LAST
    // =====================================

    console.log('================================');
    console.log('Testing View Live Site Button');
    console.log('================================');

    try {

        // CLOSE PROFILE DROPDOWN
        await page.keyboard.press('Escape');

        await page.waitForTimeout(2000);

        // EXACT BUTTON LOCATOR
        const liveSiteButton = page.locator(
            'a.btn.btn-outline-primary.btn-sm[target="_blank"]'
        );

        await liveSiteButton.waitFor({
            state: 'visible'
        });

        await liveSiteButton.scrollIntoViewIfNeeded();

        // FORCE CLICK
        await liveSiteButton.click({
            force: true
        });

        await page.waitForTimeout(5000);

        // SCREENSHOT
        await page.screenshot({
            path: 'screenshots/live-site-button.png',
            fullPage: true
        });

        console.log('SUCCESS: View Live Site Button');

        console.log(`Current URL: ${page.url()}`);

    } catch (error) {

        console.log('FAILED: View Live Site Button');

        console.log(error.message);
    }

    // =====================================
    // FINAL LOG
    // =====================================

    console.log('================================');
    console.log('PMI DASHBOARD TEST COMPLETED');
    console.log('================================');
});