describe('Cart Page Tests', () => {
  beforeEach(() => {
    // Start directly on the cart page
    cy.visit('http://localhost:5173/cart');
    cy.wait(5000); // wait for cart items to load
  });

  it('should display all items in the cart', () => {
    cy.get('.cart-item').its('length').then((count) => {
      cy.log(`Cart has ${count} items`);
      expect(count).to.be.greaterThan(0); // ensure there is at least 1 item
    });
  });

  it('should increment and decrement quantity of the first item', () => {
    cy.get('.cart-item').first().as('firstItem');

    // Increment quantity
    cy.get('@firstItem').find('.quantity-controls button').eq(1).click({ force: true });
    cy.get('@firstItem').find('.quantity-display').invoke('text').then((text) => {
      expect(Number(text)).to.be.greaterThan(1);
    });

    // Decrement quantity
    cy.get('@firstItem').find('.quantity-controls button').eq(0).click({ force: true });
    cy.get('@firstItem').find('.quantity-display').invoke('text').then((text) => {
      expect(Number(text)).to.equal(1);
    });
  });

  it('should remove the last item from the cart dynamically', () => {
    cy.get('.cart-item').its('length').then((countBefore) => {
      cy.get('.cart-item').last().find('.delete-btn').click({ force: true });

      cy.get('.cart-item').its('length').should('eq', countBefore - 1);
    });
  });

  it('should proceed to checkout with remaining items', () => {
    cy.get('.cart-item').its('length').should('be.greaterThan', 0); // Ensure cart has items
    cy.get('.proceed-to-checkout-button').click({ force: true });

    // Assert navigation to checkout page
    cy.url().should('include', '/checkout');
  });
});
