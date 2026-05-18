class DashboardPage {

    constructor(page) {

        this.page = page;

        // FIXED DASHBOARD HEADING
        this.dashboardHeading = page.getByRole('heading', {
            name: 'Dashboard'
        });

        // PROFILE BUTTON
        this.profileButton = page.locator(
            '.dropdown-toggle'
        ).first();

        // LIVE SITE BUTTON
        this.liveSiteButton = page.locator(
            'a.btn.btn-outline-primary.btn-sm[target="_blank"]'
        );
    }

    // =====================================
    // VERIFY DASHBOARD
    // =====================================

    async verifyDashboard() {

        await this.dashboardHeading.waitFor({
            state: 'visible'
        });
    }

    // =====================================
    // CLICK PROFILE BUTTON
    // =====================================

    async clickProfileButton() {

        await this.profileButton.waitFor({
            state: 'visible'
        });

        await this.profileButton.click({
            force: true
        });
    }

    // =====================================
    // CLICK LIVE SITE BUTTON
    // =====================================

    async clickLiveSiteButton() {

        // CLOSE DROPDOWN
        await this.page.keyboard.press('Escape');

        await this.page.waitForTimeout(2000);

        await this.liveSiteButton.waitFor({
            state: 'visible'
        });

        await this.liveSiteButton.scrollIntoViewIfNeeded();

        await this.liveSiteButton.click({
            force: true
        });
    }
}

module.exports = { DashboardPage };