/**
 * @name          Setup
 * @version       1.0.0
 *
 * @fileoverview  Test logging in and out with an existing user
 */

import { setup } from '../util/setup'
setup()

/**
 * Existing user to test
 */
const ExistingUser = {
  email: 'clientname@domain.com',
  password: 'justin bailey',
}

/**
 * Login and Logout test
 */
it('login a user with valid email and password', () => {
  // open form
  cy.get('.nav-link').contains('Login')
  cy.get('.nav-link').first().click()

  // input data
  cy.get('input[name="email"]').type(ExistingUser.email)
  cy.get('input[name="password"]').type(ExistingUser.password)
  cy.get('.btn.btn-secondary').click()

  // logout
  cy.get('li.nav-item:nth-child(5) > a:nth-child(1)').contains('Logout') // cant get to work with smaller selector...
  cy.get('.nav-link').last().click()
})
