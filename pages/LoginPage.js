class LoginPage {

    constructor(page) {

        this.page = page;

        this.emailInput = page.locator(
            'input[type="email"]'
        );

        this.passwordInput = page.locator(
            'input[type="password"]'
        );

        this.signInButton = page.getByRole(
            'button',
            {
                name: 'Sign in'
            }
        );
    }

    // =====================================
    // OPEN LOGIN PAGE
    // =====================================

    async gotoLoginPage() {

        await this.page.goto(
            'https://demo.pmibdchapter.org/login',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        // WAIT PAGE LOAD
        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }

    // =====================================
    // LOGIN METHOD
    // =====================================

    async login(email, password) {

        // EMAIL FIELD
        await this.emailInput.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.emailInput.fill(email);

        // PASSWORD FIELD
        await this.passwordInput.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.passwordInput.fill(password);

        // SIGN IN BUTTON
        await this.signInButton.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.signInButton.click();

        // WAIT AFTER LOGIN
        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }
}

module.exports = { LoginPage };