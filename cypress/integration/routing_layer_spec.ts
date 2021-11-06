/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Routing Layer', () => {
  before(() => {
    cy.visit('/routinglayer')
  })

  it('should render page', () => {
    cy.get('[data-cy="routing-layer"]').should('be.visible')
  })
})
