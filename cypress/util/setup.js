/**
 * @name          Setup
 * @version       1.0.0
 *
 * @fileoverview  Setup the testing enviroment
 */

const application = '127.0.0.1:3000'

export const setup = () =>
  beforeEach(() => {
    cy.visit(application)
  })
