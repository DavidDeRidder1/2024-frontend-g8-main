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

Cypress.Commands.add('login', (username, password) => { 
  Cypress.log({
    displayName: 'login',
  });

  cy.intercept('/api/users/login').as('login');
  cy.visit('http://localhost:5173/login'); 
  cy.get('[data-cy=username_input]').clear().type(username);
  cy.get('[data-cy=password_input]').clear().type(password); 
  cy.get('[data-cy=submit_btn]').click(); 
  cy.wait('@login');
});