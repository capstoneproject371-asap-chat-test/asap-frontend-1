describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.fixture('UserData').as('userInfo')
  })

  it('should disable the button with the wrong email', function () {
    cy.get('#email').type(this.userInfo.name)
    cy.get('#password').type('1234567')

    cy.get('button').should('be.disabled')
  })

  it('should navigate to /signup when clicking on a specific link', function () {
    cy.get('#email').type(this.userInfo.email)
    cy.get('#password').type(this.userInfo.password)

    cy.get('button').should('be.visible')
    cy.contains('ลงทะเบียนที่นี่').click()

    cy.url().should('eq', 'http://localhost:3000/signup')
  })
})
