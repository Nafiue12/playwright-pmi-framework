class LoginPage {

    constructor(page) {

        this.page = page;

        this.emailInput = page.locator('input[type="email"]');

        this.passwordInput = page.locator('input[type="password"]');

        this.signInButton = page.getByRole('button', {
            name: 'Sign in'
        });
    }

    async gotoLoginPage() {

        await this.page.goto(
            'https://demo.pmibdchapter.org/login'
        );
    }

    async login(email, password) {

        await this.emailInput.fill(email);

        await this.passwordInput.fill(password);

        await this.signInButton.click();
    }
}

module.exports = { LoginPage };