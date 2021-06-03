// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByDataTestId', (value) => {
    return cy.get(`[data-testid=${value}]`);
});

Cypress.Commands.add('focusInterval', () => {
    // should start on focus interval
    cy.getByDataTestId('interval-label').contains('focus', {
        matchCase: false,
    });

    // click to start timer
    cy.getByDataTestId('play-button').click();

    // wait for 5 seconds (+0.5 seconds for buffer) for focus timer to end
    return cy.wait(5500);
});

Cypress.Commands.add('shortBreakInterval', () => {
    // should be on short break interval
    cy.getByDataTestId('interval-label').contains('short break', {
        matchCase: false,
    });

    // click to start timer
    cy.getByDataTestId('play-button').click();

    // wait for 1 second (+0.5 seconds for buffer) for short break timer to end
    return cy.wait(1500);
});

Cypress.Commands.add('longBreakInterval', () => {
    // should be on long break interval
    cy.getByDataTestId('interval-label').contains('long break', {
        matchCase: false,
    });

    // click to start timer
    cy.getByDataTestId('play-button').click();

    // wait for 3 seconds (+0.5 seconds for buffer) for long break timer to end
    return cy.wait(3500);
});

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByDataTestId(value: string): Chainable<Element>;
        focusInterval(): Chainable<Element>;
        shortBreakInterval(): Chainable<Element>;
        longBreakInterval(): Chainable<Element>;
    }
}
