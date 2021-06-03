describe('interval counts', () => {
    it('should show correct number of interval counters', () => {
        cy.visit('/');

        // should start with no counters
        cy.getByDataTestId('count-item').should('not.exist');

        // after first focus interval, there should be 1 counter
        cy.focusInterval();
        cy.getByDataTestId('count-item').should('have.lengthOf', 1);

        // after short break interval, there should still only be 1 counter
        cy.shortBreakInterval();
        cy.getByDataTestId('count-item').should('have.lengthOf', 1);

        // after next focus interval, there should be 2 counters
        cy.focusInterval();
        cy.getByDataTestId('count-item').should('have.lengthOf', 2);
    });

    it('should not show count for skipped focus interval', () => {
        cy.visit('/');

        // start focus interval and skip it after 1 second
        cy.getByDataTestId('play-button').click();
        cy.wait(1000);
        cy.getByDataTestId('skip-btn').click();

        // there should be no counters
        cy.getByDataTestId('count-item').should('not.exist');
    });

    it('should remove counters when clicking the delete button', () => {
        cy.visit('/');

        // get three counters
        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.shortBreakInterval();
        cy.focusInterval();
        cy.getByDataTestId('count-item').should('have.lengthOf', 3);

        // delete counters
        cy.getByDataTestId('delete-btn').click();
        cy.getByDataTestId('count-item').should('not.exist');
    });
});
