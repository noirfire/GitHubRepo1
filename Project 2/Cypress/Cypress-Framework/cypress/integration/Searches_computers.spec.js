/// <reference types="Test" />

describe('Searching Computer Tests', () => {
    beforeEach(() => {
      cy.visit('http://computer-database.herokuapp.com/computers')
    })

  it ('Given user has open computer database main page', () => {
    // check on the correct page
    cy.contains('Play sample application — Computer database')
  })

  it ('And user searches for a full valid computer name it can be found', () => {
    // select searchbox and enter text
    cy.get('[id^=searchbox]')
    .type('ACE')
    // Select filter by name
    cy.get('[id^=searchsubmit]').click()
    // Check the correct page loads
    cy.url().should('include','/computers?f=ACE')
    // check it matches the exact name
    cy.contains(/^ACE$/)
    .should('exist')
  })

  it ('And user searches for a part valid computer name it can be found', () => {

    cy.get('[id^=searchbox]')
    .type('AC')
    cy.get('[id^=searchsubmit]').click()
    cy.contains('Acer Extensa')
    .should('exist')
    cy.contains('BINAC')
    .should('exist')
    cy.contains('COSMAC ELF')
    .should('exist')
    cy.contains('CSIRAC')
    .should('exist')
  })

  it ('And user searches for a invalid computer name can not be found', () => {

    cy.get('[id^=searchbox]')
    .type('noirfire')
    cy.get('[id^=searchsubmit]').click()
    cy.contains('noirfire')
    .should('not.exist')
  })
  it ('And user searches for a valid computer name while sorting by another field can be found', () => {
    cy.wait(2000);
    cy.get('#main > table > thead > tr > th.col5.header > a').click()
    cy.get('[id^=searchbox]')
    .type('CM-2a')
    cy.get('[id^=searchsubmit]').click()
    cy.url().should('include','/computers?f=CM-2a')
  })


})