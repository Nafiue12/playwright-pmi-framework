const { test, expect } = require('@playwright/test');

test('API Testing Example', async ({ request }) => {

    const response = await request.get(
        'https://demo.pmibdchapter.org'
    );

    console.log(
        `Status Code: ${response.status()}`
    );

    // LOG HEADERS
    console.log(
        response.headers()
    );

    // LOG BODY IF FAILED
    if (response.status() !== 200) {

        const body = await response.text();

        console.log(
            body.substring(0, 500)
        );
    }

    expect(response.status()).toBe(200);

    console.log('API TEST PASSED');
});