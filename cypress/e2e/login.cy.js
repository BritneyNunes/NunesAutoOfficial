describe("Login and Verify User", () => {

  before(() => {
    // Visit your login page
    cy.visit("http://localhost:5173/login"); // change port if needed
  });

  it("should log in and verify user's name", () => {
    // Define test data
    const email = "johndoe@gmail.com";
    const password = "johnisawesome5";
    const expectedUser = "John Doe"; // Change this to what your app displays after login

    // Login process
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Verify after login (adjust selector if your app shows the username elsewhere)
    cy.get('[data-test="user-name"]')
      .should("have.text", expectedUser);
  });

});
