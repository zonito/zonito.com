/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Stack detail', () => {
  before(() => {
    cy.visit('/stack/snippetslab')
  })

  it('should render stack list', () => {
    cy.get('[data-cy="stack-list"]').should('be.visible')
  })

  it('should render stack detail', () => {
    cy.get('[data-cy="stack-detail"]').should('be.visible')
  })
})
