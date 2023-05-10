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

Cypress.Commands.add('signout', () => {
  cy.visit('/api/auth/signout');
  cy.get('form').submit();
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');

  cy.get(`[data-cy=${'checkEmail-email-input'}]`).type(username);
  cy.get(`[data-cy=${'checkEmail-continue-button'}]`).click();
  cy.get(`[data-cy=${'emailLogin-password-input'}]`).type(password);
  cy.get(`[data-cy=${'emailLogin-submit-button'}]`).click();

  cy.url().should('eq', Cypress.env('appUrl') + '/');
  cy.getCookie('next-auth.session-token').should('exist'); // 쿠키 확인
});

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      login(email: string, password: string): Chainable<void>;
      signout(): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
export {};
