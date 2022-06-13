beforeEach(() => {
    cy.visit("localhost:3000")
})

// The description of the test
it("login a user with email and password", () => {
    cy.get(".nav-link").contains("Login")
    cy.get(".nav-link").first().click()
    cy.get('input[name="email"]').type("clientname@domain.com")
    cy.get('input[name="password"]').type("justin bailey")
    cy.get(".btn.btn-secondary").click()
    cy.get("li.nav-item:nth-child(5) > a:nth-child(1)").contains("Logout")
    cy.get(".nav-link").last().click()
})