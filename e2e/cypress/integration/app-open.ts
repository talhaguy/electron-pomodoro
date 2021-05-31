describe('app open', () => {
    it('should load', () => {
        cy.visit('/');
        cy.getByDataTestId('home-screen').should('exist');
    });
});
