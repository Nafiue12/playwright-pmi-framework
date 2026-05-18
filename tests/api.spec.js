const { test, expect } = require('@playwright/test');

test('API Testing Example', async ({ request }) => {

    // SEND GET REQUEST
    const response = await request.get(
        'https://demo.pmibdchapter.org'
    );

    // STATUS CODE
    console.log(
        `Status Code: ${response.status()}`
    );

    // ASSERTION
    expect(response.status()).toBe(200);

    // RESPONSE BODY
    const body = await response.text();

    console.log(body);

    console.log('API TEST PASSED');
});