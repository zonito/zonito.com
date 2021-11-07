/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Writing detail', () => {
  before(() => {
    cy.visit(
      '/writing/routing-layer'
    )
  })

  it('should render posts list', () => {
    cy.get('[data-cy="posts-list"]').should('be.visible')
  })

  it('should render post detail', () => {
    cy.get('[data-cy="post-detail"]').should('be.visible')
  })
})
