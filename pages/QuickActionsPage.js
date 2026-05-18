class QuickActionsPage {

    constructor(page) {

        this.page = page;
    }

    async clickQuickAction(actionName) {

        const quickAction = this.page
            .getByRole('link', {
                name: new RegExp(actionName, 'i')
            })
            .last();

        await quickAction.waitFor({
            state: 'visible'
        });

        await quickAction.scrollIntoViewIfNeeded();

        await quickAction.click();
    }
}

module.exports = { QuickActionsPage };