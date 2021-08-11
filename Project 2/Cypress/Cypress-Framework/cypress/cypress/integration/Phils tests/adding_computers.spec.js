/// <reference types="Test" />

describe('Adding Computer Tests', () => {

  // ***Ideally I would just replace the database at the beginning of the test.spec.js***
  // Main Page URL
  it ('If test compouter does not exist create computer for test', () => {
  cy.visit('http://computer-database.herokuapp.com/computers')
  .contains('Computer name');

  })

  it ('Given user has access to computer database main page they can select and add a computer', () => {

      // select Add computer
      cy.get('#add').click()
      // Enter computer needed for test 
      cy.get('[id^=name]')
      .type('Easy-Add')
      .should('have.value', 'Easy-Add')
      cy.get('[id^=introduced]')
      .type('1985-01-22')
      .should('have.value', '1985-01-22')
      cy.get('[id^=discontinued]')
      .type('2021-08-11')
      .should('have.value', '2021-08-11')
      cy.get('[id^=company]').select('Thinking Machines')
      cy.get('[id^=company]').should('have.value', '2')
      cy.get('#main > form > div > input').click()
  })

  it ('When when the user searches to the newly add computer they can select and edited a computer', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')

    // Select searchbox
    cy.get('[id^=searchbox]')
    .type('Easy-Add')
    // Select Filter by name
    cy.get('[id^=searchsubmit]').click()
    // verify that the correct URl is loaded
    cy.url().should('include','/computers?f=Easy-Add')
    // verify the page contains the searched name
    cy.contains('Easy-Add')
    .should('exist')

    // Select Computer name
    cy.contains('Easy-Add').click()
    // Check the field contains the correct value
    cy.get('[id^=name]')
    .should('have.value', 'Easy-Add')
    // Clear the field
    cy.get('[id^=name]').clear()
    // Enter new value and verify it
    .type('Easy-Change')
    .should('have.value', 'Easy-Change')
    
    // Check the field contains the correct value
    cy.get('[id^=introduced]')
    .should('have.value', '1985-01-22')
    // Clear the field
    cy.get('[id^=introduced]').clear()
    // Enter new value and verify it
    .type('1981-07-01')
    .should('have.value', '1981-07-01')
      
    // Check the field contains the correct value
    cy.get('[id^=discontinued]')
    .should('have.value', '2021-08-11')
    // Clear the field
    cy.get('[id^=discontinued]').clear()
    // Enter new value and verify it
    .type('1997-03-04')
    .should('have.value', '1997-03-04')
  })

  it ('And user can selects a dropdown box with the full list availble to select from', () => {
    // Check the drop down contain all available options
    // ***Improve test by checking array againt data base and not static text***
    cy.get('[id^=company]').each($item => {
      cy.wrap($item).should($e => {
          expect($e.text()).to.eq('\n            \n                -- Choose a company --\n            \n            \n                Apple Inc.\n            \n                Thinking Machines\n            \n                RCA\n            \n                Netronics\n            \n                Tandy Corporation\n            \n                Commodore International\n            \n                MOS Technology\n            \n                Micro Instrumentation and Telemetry Systems\n            \n                IMS Associates, Inc.\n            \n                Digital Equipment Corporation\n            \n                Lincoln Laboratory\n            \n                Moore School of Electrical Engineering\n            \n                IBM\n            \n                Amiga Corporation\n            \n                Canon\n            \n                Nokia\n            \n                Sony\n            \n                OQO\n            \n                NeXT\n            \n                Atari\n            \n                Acorn computer\n            \n                Timex Sinclair\n            \n                Nintendo\n            \n                Sinclair Research Ltd\n            \n                Xerox\n            \n                Hewlett-Packard\n            \n                Zemmix\n            \n                ACVS\n            \n                Sanyo\n            \n                Cray\n            \n                Evans & Sutherland\n            \n                E.S.R. Inc.\n            \n                OMRON\n            \n                BBN Technologies\n            \n                Lenovo Group\n            \n                ASUS\n            \n                Amstrad\n            \n                Sun Microsystems\n            \n                Texas Instruments\n            \n                HTC Corporation\n            \n                Research In Motion\n            \n                Samsung Electronics\n            \n        ')
      })
    })
  })

  it('And a user can select a new dropdown option', () => {
    // Set new value using text
    cy.get('[id^=company]').select('Samsung Electronics')
    // Confirm the selected value
    cy.get('[id^=company]').should('have.value', '43')
  })

  it('Then a user can select save, saving their edits', () => {
    // Selecting save
    cy.get('#main > form:nth-child(2) > div > input').click()
    // verify by search for saved edited computer name
    cy.get('[id^=searchbox]')
    .type('Easy-Change')
    cy.get('[id^=searchsubmit]').click()
    cy.url('http://computer-database.herokuapp.com/computers?f=Easy-Change', {timeout: 60000})
    .should('include', '/computers?f=Easy');
    cy.contains('Easy-Change')
    .should('exist')
  })

  // Running field Validation
  it ('Given user has access to computer database', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')
  })

  it ('And if the user searches for a valid computer name the computer is found', () => {
    // Select searchbox
    cy.get('[id^=searchbox]')
    .type('Easy-Change')
    // Select Filter by name
    cy.get('[id^=searchsubmit]').click()
    // verify that the correct URl is loaded
    cy.url().should('include','/computers?f=Easy-Change')
    // verify the page contains the searched name
    cy.contains('Easy-Change')
    .should('exist')  
  })

  it ('when the user clicks a computer name the computer page loads were the details for the computer can not have invalid data entered into the fields', () => {
    //Select Computer name
    cy.contains('Easy-Change').click()

    //These test should be a should not but couldn't find characters it wouldn't accept, this is just an example...
    //Check the field contains the correct value
    cy.get('[id^=name]')
    //Clear the field
    cy.get('[id^=name]').clear()
    //Enter new value and verify it
    .type('平仮名')
    .should('have.value', '平仮名')
    
    //Check the field contains the correct value
    cy.get('[id^=introduced]')
    //Clear the field
    cy.get('[id^=introduced]').clear()
    //Enter new value and verify it
    .type('2001-09-09')


    //Check the field contains the correct value
    cy.get('[id^=discontinued]')
    //Clear the field
    cy.get('[id^=discontinued]').clear()
    //Enter new value and verify it
    .type('0000-00-00')
    cy.contains('Edit computer')
  })

  it('And a user can select a new dropdown option', () => {

    // set new value using text
    cy.get('[id^=company]').type('Batman')
  })

  it('Then a user can select save, not saving invalid entries', () => {
    // Selecting save
    cy.get('#main > form:nth-child(2) > div > input').click()
    // verify its hasn't saved edited computer
    cy.contains('Edit computer')
    cy.get('#main > form:nth-child(2) > fieldset > div:nth-child(3)')
    .should('have.class', 'clearfix error')
  })
  
  it ('when the user clicks a computer name the computer page loads were the details for the computer can not have invalid data entered into the fields', () => {
    //Select Computer name
  //These test should be a should not but couldn't find characters it wouldn't accept.... so just a example
    //Check the field contains the correct value
    cy.get('[id^=name]')
    //Clear the field
    cy.get('[id^=name]').clear()
    //Enter new value and verify it
    
    //Check the field contains the correct value
    cy.get('[id^=introduced]')
    //Clear the field
    cy.get('[id^=introduced]').clear()
    //Enter new value and verify it
    .type('1999-11-30')


    //Check the field contains the correct value
    cy.get('[id^=discontinued]')
    //Clear the field
    cy.get('[id^=discontinued]').clear()
    //Enter new value and verify it
    .type('1999-11-31')
  })

  it('And a user can select a new dropdown option', () => {

    // set new value using text
    cy.get('[id^=company]').type('Batman')
  })

  it('Then a user can select save, not saving invalid entries', () => {
    // Selecting save
    cy.get('#main > form:nth-child(2) > div > input').click()
    // verify its hasn't saved edited computer
    cy.contains('Edit computer')
    cy.get('#main > form:nth-child(2) > fieldset > div:nth-child(1)')
    .should('have.class', 'clearfix error')
  })

  it ('when the user clicks a computer name the computer page loads were the details for the computer can not have invalid data entered into the fields', () => {
    //Select Computer name
    //These test should be a should not but couldn't find characters it wouldn't accept.... so just a example
    //Check the field contains the correct value
    cy.get('[id^=name]')
    //Clear the field
    cy.get('[id^=name]').clear()
    //Enter new value and verify it
    .type('平仮名')
    .should('have.value', '平仮名')
    
    //Check the field contains the correct value
    cy.get('[id^=introduced]')
    //Clear the field
    cy.get('[id^=introduced]').clear()
    //Enter new value and verify it
    .type('1999-11-31')


    //Check the field contains the correct value
    cy.get('[id^=discontinued]')
    //Clear the field
    cy.get('[id^=discontinued]').clear()
    //Enter new value and verify it
    .type('%%%%-&&-$$')
  })

  it('And a user can select a new dropdown option', () => {

    // set new value using text
    cy.get('[id^=company]').type('Batman')
  })

  it('Then a user can select save, not saving invalid entries', () => {
    // Selecting save
    cy.get('#main > form:nth-child(2) > div > input').click()
    // verify its hasn't saved edited computer
    cy.contains('Edit computer')
    cy.get('#main > form:nth-child(2) > fieldset > div:nth-child(3)')
    .should('have.class', 'clearfix error')
  })
})