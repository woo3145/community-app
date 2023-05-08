/// <reference types="cypress" />

import { TEST_USER } from '../constants';

// ***********************************************
// This example commands.ts shows you how to
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
//

Cypress.Commands.add('dataCy', (value) => {
  cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');

  cy.dataCy('checkEmail-email-input').type(username);
  cy.dataCy('checkEmail-continue-button').click();
  cy.dataCy('emailLogin-password-input').type(password);
  cy.dataCy('emailLogin-submit-button').click();

  cy.url().should('include', '/dashboard');
  cy.getCookie('next-auth.session-token').should('exist'); // 쿠키 확인
});

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      login(email: string, password: string): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
export {};
