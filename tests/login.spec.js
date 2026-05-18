const { test, expect } = require('@playwright/test');
const fs = require('fs');
const csv = require('csv-parser');

const users = [];

/*
  Read CSV Data
*/
test.beforeAll(async () => {

  return new Promise((resolve) => {

    fs.createReadStream('test-data/users.csv')
      .pipe(csv())

      .on('data', (data) => {
        users.push(data);
      })

      .on('end', () => {
        console.log('CSV Loaded Successfully');
        resolve();
      });
  });
});


/*
  Main Test
*/
test('PMI Login Automation Using Playwright', async ({ page }) => {

  for (const user of users) {

    console.log('--------------------------------');
    console.log(`Testing User: ${user.email}`);
    console.log('--------------------------------');

    // Open Website
    await page.goto('https://demo.pmibdchapter.org/login');

    // Wait for page load
    await page.waitForTimeout(2000);

    // Fill Email
    await page.locator('input[type="email"]').fill(user.email);

    // Fill Password
    await page.locator('input[type="password"]').fill(user.password);

    // Screenshot before login
    await page.screenshot({
      path: `screenshots/before-${user.email}.png`
    });

    // Click Sign In
    await page.getByRole('button', {
      name: 'Sign in'
    }).click();

    // Wait after login
    await page.waitForTimeout(4000);

    // Screenshot after login
    await page.screenshot({
      path: `screenshots/after-${user.email}.png`
    });

    // Current URL
    const currentUrl = page.url();

    console.log(`Current URL: ${currentUrl}`);

    // Login Validation
    if (currentUrl.includes('dashboard')) {

      console.log('LOGIN SUCCESS');

    } else {

      console.log('LOGIN FAILED');

    }

    // Clear Browser Cookies
    await page.context().clearCookies();
  }
});