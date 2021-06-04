describe('clock', () => {
    it('should show the correct time during count down', () => {
        cy.visit('/');

        cy.getByDataTestId('clock-time').contains('00:05');

        // TODO: tried to use cy.clock(), but the DOM was not updating to reflect the updated time. it might eventually be worth it to figure out what's going on with that.
        cy.getByDataTestId('play-button').click();
        cy.getByDataTestId('clock-time').contains('00:04');
        cy.getByDataTestId('clock-time').contains('00:03');
        cy.getByDataTestId('clock-time').contains('00:02');
        cy.getByDataTestId('clock-time').contains('00:01');
    });

    it.only('should show the correctly configured start times for the different intervals', () => {
        cy.visit('/');

        // focus interval
        cy.getByDataTestId('clock-time').contains('00:05');
        cy.focusInterval();

        // short break interval
        cy.getByDataTestId('clock-time').contains('00:02');
        cy.shortBreakInterval();

        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();

        // long break interval
        cy.getByDataTestId('clock-time').contains('00:03');
    });
});
