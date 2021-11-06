/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Security checklist', () => {
  before(() => {
    cy.visit('/routinglayer')
  })

  it('should render page', () => {
    cy.get('[data-cy="security-checklist"]').should('be.visible')
  })
})
