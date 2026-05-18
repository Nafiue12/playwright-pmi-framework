class SidebarPage {

    constructor(page) {

        this.page = page;
    }

    async clickSidebarMenu(menuName) {

        const sidebarMenu = this.page
            .locator('.nk-menu')
            .getByRole('link', {
                name: new RegExp(menuName, 'i')
            })
            .first();

        await sidebarMenu.waitFor({
            state: 'visible'
        });

        await sidebarMenu.scrollIntoViewIfNeeded();

        await sidebarMenu.click();
    }
}

module.exports = { SidebarPage };