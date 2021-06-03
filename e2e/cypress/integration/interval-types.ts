describe('interval types', () => {
    it('should show correct interval on next interval', () => {
        cy.visit('/');

        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.longBreakInterval();

        // should start on focus interval
        cy.getByDataTestId('interval-label').contains('focus', {
            matchCase: false,
        });
    });

    it('should not show long break interval if a focus interval was skipped', () => {
        cy.visit('/');

        cy.focusInterval();
        cy.shortBreakInterval();

        cy.focusInterval();
        cy.shortBreakInterval();

        cy.focusInterval();
        cy.shortBreakInterval();

        // start focus interval, but skip after 1 second
        cy.getByDataTestId('play-button').click();
        cy.wait(1000);
        cy.getByDataTestId('skip-btn').click();

        cy.shortBreakInterval();
        cy.focusInterval();

        // now should be on long break interval
        cy.getByDataTestId('interval-label').contains('long break', {
            matchCase: false,
        });
    });
});
