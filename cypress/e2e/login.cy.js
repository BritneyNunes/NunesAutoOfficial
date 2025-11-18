describe('Login Test', () => {
  // Runs before each test
  beforeEach(() => {
    // Visit your frontend login page
    cy.visit('http://localhost:5173/login');
    cy.wait(4000); // wait 4 seconds for the page to load fully
  });

  it('should display the login form correctly', () => {
    cy.contains('Log In').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Log In');
  });

  it('should show an error if fields are empty', () => {
    // Try submitting without entering anything
    cy.get('form').submit();
    cy.get('.error-message').should('not.exist'); 
    // The browser's required validation prevents submission before your JS runs
  });

  it('should allow typing into inputs', () => {
    cy.get('input[type="email"]').type('testuser@gmail.com').should('have.value', 'testuser@gmail.com');
    cy.get('input[type="password"]').type('testpassword').should('have.value', 'testpassword');
  });

  it('should attempt to login and handle invalid credentials', () => {
    cy.intercept('GET', '**/checkpassword', {
      statusCode: 401,
      body: { message: 'Invalid username or password' },
    }).as('checkPassword');

    cy.get('input[type="email"]').type('wrong@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@checkPassword');
    cy.get('.error-message').should('contain', 'Error signing in');
  });

  it('should navigate to home page on successful login', () => {
    cy.intercept('GET', '**/checkpassword', {
      statusCode: 200,
      body: { message: 'Success' },
    }).as('checkPassword');

    cy.get('input[type="email"]').type('johndoe@gmail.com');
    cy.get('input[type="password"]').type('johnisawesome5');
    cy.get('button[type="submit"]').click();

    cy.wait('@checkPassword');

    // You should end up redirected to "/"
    cy.url().should('eq', 'http://localhost:5173/');
    // and localStorage should have user data
    cy.window().then((win) => {
      const user = JSON.parse(win.localStorage.getItem('user'));
      expect(user.Email).to.eq('johndoe@gmail.com');
    });
  });
});
