describe("User Registration", () => {
  it("should register a new user", () => {
    cy.visit("/register")
    cy.get('input[name="email"]').type("john@example.com")
    cy.get('input[name="password"]').type("password123")
    cy.get("button").click()
    cy.contains("Welcome, John Doe")
  })
})
