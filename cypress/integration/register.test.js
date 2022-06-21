/**
 * @name          Auth
 * @version       1.0.0
 *
 * @fileoverview  Test registering a new user in the system with valid data
 */

import { setup } from '../util/setup'
setup()

/**
 * New user data to register
 */
const NewUser = {
  first: 'Bill',
  last: 'Gates',
  username: 'bgates',
  email: 'gates@gmail.com',
  password: 'bluescreen',
}

/**
 * Registration form and logout test
 */
it('Registers a new user with valid details', () => {
  // open form
  cy.get('.nav-link').contains('Sign Up')
  cy.get('.nav-link').last().click()

  // input data
  cy.get('input').eq(0).type(NewUser.first)
  cy.get('input').eq(1).type(NewUser.last)
  cy.get('input').eq(2).type(NewUser.username)
  cy.get('input').eq(3).type(NewUser.email)
  cy.get('input').eq(4).type(NewUser.password)
  cy.get('.btn.btn-secondary').click() // submit

  // logout
  cy.get('li.nav-item:nth-child(5) > a:nth-child(1)').contains('Logout') // can't get to work with smaller selector...
  cy.get('.nav-link').last().click()
})
