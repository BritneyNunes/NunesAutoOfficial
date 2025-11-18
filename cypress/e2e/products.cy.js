describe('Products Page Test ', () => {
  beforeEach(() => {
    // Visit brand page
    cy.visit('http://localhost:5173/brand');
    cy.wait(5000);

    // Wait for brand images to load
    cy.get('.images', { timeout: 10000 }).should('have.length.at.least', 1);

    // Click the first brand to view its parts
    cy.get('.images').first().click();

    // Confirm navigation to /parts
    cy.url().should('include', '/parts');
    cy.wait(5000);
  });

  it('should display parts after successful fetch', () => {
    cy.get('.products', { timeout: 10000 }).should('exist');
    cy.get('.products').should('have.length.greaterThan', 0);
  });

  it('should add a part to cart successfully', () => {
    // Capture the alert message dynamically
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.wait(5000);

    // Click the first Add to Cart button
    cy.contains('Add to Cart').first().click();

    cy.wait(5000);

    // Assert the alert was called with *any non-empty string*
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').then((alertStub) => {
      const message = alertStub.getCall(0).args[0];
      expect(message).to.be.a('string').and.to.include('has been added');
      cy.log(`Alert Message: ${message}`);
    });
  });
});
