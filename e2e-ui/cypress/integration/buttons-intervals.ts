describe('buttons during intervals', () => {
    it('should show correct buttons while in playing and end of interval state', () => {
        cy.visit('/');

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');

        // click to start timer
        cy.getByDataTestId('play-button').click();

        // pause and restart button should show and play button should not exist
        cy.getByDataTestId('play-button').should('not.exist');
        cy.getByDataTestId('pause-button');
        cy.getByDataTestId('restart-btn');

        // wait for 5 seconds (+0.5 seconds for buffer) for focus timer to end
        cy.wait(5500);

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');
    });

    it('should show correct buttons while paused', () => {
        cy.visit('/');

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');

        // click to start timer
        cy.getByDataTestId('play-button').click();

        // pause and restart button should show and play button should not exist
        cy.getByDataTestId('play-button').should('not.exist');
        cy.getByDataTestId('pause-button');
        cy.getByDataTestId('restart-btn');

        // wait for 1 second, then pause
        cy.wait(1000);
        cy.getByDataTestId('pause-button').click();

        // play and restart buttons should be visible
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn');
    });

    it('should show correct buttons when skipping interval', () => {
        cy.visit('/');

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');

        // click to start timer
        cy.getByDataTestId('play-button').click();

        // pause and restart button should show and play button should not exist
        cy.getByDataTestId('play-button').should('not.exist');
        cy.getByDataTestId('pause-button');
        cy.getByDataTestId('restart-btn');

        // wait for 1 second, then skip
        cy.wait(1000);
        cy.getByDataTestId('skip-btn').click();

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');
    });

    it('should show correct buttons when restarting interval', () => {
        cy.visit('/');

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');

        // click to start timer
        cy.getByDataTestId('play-button').click();

        // pause and restart button should show and play button should not exist
        cy.getByDataTestId('play-button').should('not.exist');
        cy.getByDataTestId('pause-button');
        cy.getByDataTestId('restart-btn');

        // wait for 1 second, then restart
        cy.wait(1000);
        cy.getByDataTestId('restart-btn').click();

        // play button should be visible, pause and restart button should not exist
        cy.getByDataTestId('play-button');
        cy.getByDataTestId('pause-button').should('not.exist');
        cy.getByDataTestId('restart-btn').should('not.exist');
    });
});
