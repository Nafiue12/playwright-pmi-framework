class DashboardCardsPage {

    constructor(page) {

        this.page = page;
    }

    async clickDashboardCard(url) {

        const dashboardCard = this.page.locator(
            `a[href="https://demo.pmibdchapter.org${url}"]`
        ).last();

        await dashboardCard.waitFor({
            state: 'visible'
        });

        await dashboardCard.scrollIntoViewIfNeeded();

        await dashboardCard.click();
    }
}

module.exports = { DashboardCardsPage };