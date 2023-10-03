describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
    cy.fixture('UserData').as('userInfo')
  })

  it('should disable the button with the wrong email', function () {
    cy.get('#email').type(this.userInfo.name)
    cy.get('#password').type(this.userInfo.password)
    cy.get('#confirm-password').type(this.userInfo.password)
    cy.contains('ไม่ใช่').click()

    cy.get('button').should('be.disabled')
  })

  it('should disable the button with the wrong password', function () {
    cy.get('#email').type(this.userInfo.email)
    cy.get('#password').type('123')
    cy.get('#confirm-password').type(this.userInfo.password)
    cy.contains('ไม่ใช่').click()

    cy.get('button').should('be.disabled')
  })

  it('should enable the button with the correct info and is not Owner', function () {
    cy.get('#email').type(this.userInfo.email)
    cy.get('#password').type(this.userInfo.password)
    cy.get('#confirm-password').type(this.userInfo.password)
    cy.contains('ไม่ใช่').click()
    cy.contains(
      'ในกรณีที่ท่านไม่ใช่เจ้าของร้านค้า ท่านจะมีสิทธิ์เป็น Agent Lead หรือ Agent เท่านั้น'
    )
    cy.get('button').should('not.be.disabled')
  })

  it('should enable the button with the correct info', function () {
    cy.get('#email').type(this.userInfo.email)
    cy.get('#password').type(this.userInfo.password)
    cy.get('#confirm-password').type(this.userInfo.password)
    cy.contains(/^ใช่$/).click()

    cy.get('#bizName').type(this.userInfo.storeName)
    cy.get('.v-autocomplete').type('ร้านอาหาร')
    cy.get('.v-list-item').contains('ร้านอาหารและเครื่องดื่ม').click()

    cy.get('.v-checkbox').should('not.be.checked')
    cy.get('.v-checkbox').contains('Line').click()
    cy.get('[data-test="idLine"]').type('@getoOffical')

    cy.get('button').should('not.be.disabled')
  })
})
