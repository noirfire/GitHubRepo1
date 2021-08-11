/// <reference types="Test" />

describe('Editing Computer Tests', () => {
  // ***Ideally I would just replace the database at the beginning of the test.spec.js as I can't I am adding the computer I am tesing with just to be sure it will be there***
  it ('If test compouter does not exist create computer for test', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')
    // select Add computer
    cy.get('#add').click()
    // Enter computer needed for test 
    cy.get('[id^=name]')
    .type('Atari ST')
    .should('have.value', 'Atari ST')
    cy.get('[id^=introduced]')
    .type('1985-01-01')
    .should('have.value', '1985-01-01')
    cy.get('[id^=discontinued]')
    .type('1993-01-01')
    .should('have.value', '1993-01-01')
    cy.get('[id^=company]').select('Atari')
    cy.get('[id^=company]').should('have.value', '20')
    cy.get('#main > form > div > input').click()
  })

  it ('Given user has access to computer database main page they can select and edited a computer', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')
  })


  it ('And if the user searches for a valid computer name the computer is found', () => {
    // Select searchbox
    cy.get('[id^=searchbox]')
    .type('Atari ST')
    // Select Filter by name
    cy.get('[id^=searchsubmit]').click()
    // verify that the correct URl is loaded
    cy.url().should('include','/computers?f=Atari+ST')
    // verify the page contains the searched name
    cy.contains('Atari ST')
    .should('exist')
  })

  it ('when the user clicks a computer name the computer page loads were the details for the computer can be edited and cancelled', () => {
     // Select Computer name
     cy.contains('Atari ST').click()
     // Check the field contains the correct value
     cy.get('[id^=name]')
     .should('have.value', 'Atari ST')
     // Clear the field
     cy.get('[id^=name]').clear()
     // Enter new value and verify it
     .type('Easy-Cancel')
     .should('have.value', 'Easy-Cancel')
     
     // Check the field contains the correct value
     cy.get('[id^=introduced]')
     .should('have.value', '1985-01-01')
     // Clear the field
     cy.get('[id^=introduced]').clear()
     // Enter new value and verify it
     .type('1981-07-01')
     .should('have.value', '1981-07-01')
      
     // Check the field contains the correct value
     cy.get('[id^=discontinued]')
     .should('have.value', '1993-01-01')
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

  it('Then a user can select cancel not saving their edits', () => {
    // Select the cancel button
    cy.get('#main > form:nth-child(2) > div > a').click()
    // verify by search for cancelled edited computer name
    cy.get('[id^=searchbox]')
    .type('Easy-Cancel')
    cy.get('[id^=searchsubmit]').click()
    cy.url('http://computer-database.herokuapp.com/computers?f=Easy-%24', {timeout: 60000})
    .should('include', '/computers?f=Easy');
    cy.contains('Easy-Cancel')
    .should('not.exist')

  })

  // Running tests also cover others field in computer name Atari ST not being edited by the above test
  it ('Given user has access to computer database main page they can select and edited a computer', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')
  })


  it ('And if the user searches for a valid computer name the computer is found', () => {
    // Select searchbox
    cy.get('[id^=searchbox]')
    .type('Atari ST')
    // Select Filter by name
    cy.get('[id^=searchsubmit]').click()
    // verify that the correct URl is loaded
    cy.url().should('include','/computers?f=Atari+ST')
    // verify the page contains the searched name
    cy.contains('Atari ST')
    .should('exist')   
  })

  it ('when the user clicks a computer name the computer page loads were the details for the computer can be edited and saved', () => {
     //Select Computer name
     cy.contains('Atari ST').click()

     //Check the field contains the correct value
     cy.get('[id^=name]')
     .should('have.value', 'Atari ST')
     //Clear the field
     cy.get('[id^=name]').clear()
     //Enter new value and verify it
     .type('Easy-Saved')
     .should('have.value', 'Easy-Saved')
     
     //Check the field contains the correct value
     cy.get('[id^=introduced]')
     .should('have.value', '1985-01-01')
     //Clear the field
     cy.get('[id^=introduced]').clear()
     //Enter new value and verify it
     .type('1981-12-22')
     .should('have.value', '1981-12-22')

     //Check the field contains the correct value
     cy.get('[id^=discontinued]')
     .should('have.value', '1993-01-01')
     //Clear the field
     cy.get('[id^=discontinued]').clear()
     //Enter new value and verify it
     .type('2001-08-30')
     .should('have.value', '2001-08-30')
  })

  it ('And user can selects a dropdown box with the full list availble to select from', () => {
    cy.get('[id^=company]').each($item => {
      cy.wrap($item).should($e => {
          expect($e.text()).to.eq('\n            \n                -- Choose a company --\n            \n            \n                Apple Inc.\n            \n                Thinking Machines\n            \n                RCA\n            \n                Netronics\n            \n                Tandy Corporation\n            \n                Commodore International\n            \n                MOS Technology\n            \n                Micro Instrumentation and Telemetry Systems\n            \n                IMS Associates, Inc.\n            \n                Digital Equipment Corporation\n            \n                Lincoln Laboratory\n            \n                Moore School of Electrical Engineering\n            \n                IBM\n            \n                Amiga Corporation\n            \n                Canon\n            \n                Nokia\n            \n                Sony\n            \n                OQO\n            \n                NeXT\n            \n                Atari\n            \n                Acorn computer\n            \n                Timex Sinclair\n            \n                Nintendo\n            \n                Sinclair Research Ltd\n            \n                Xerox\n            \n                Hewlett-Packard\n            \n                Zemmix\n            \n                ACVS\n            \n                Sanyo\n            \n                Cray\n            \n                Evans & Sutherland\n            \n                E.S.R. Inc.\n            \n                OMRON\n            \n                BBN Technologies\n            \n                Lenovo Group\n            \n                ASUS\n            \n                Amstrad\n            \n                Sun Microsystems\n            \n                Texas Instruments\n            \n                HTC Corporation\n            \n                Research In Motion\n            \n                Samsung Electronics\n            \n        ')
      })
    })
  })

  it('And a user can select a new dropdown option', () => {

    // set new value using text
    cy.get('[id^=company]').select('Samsung Electronics')

    // confirm the selected value
    cy.get('[id^=company]').should('have.value', '43')
  })

  it('Then a user can select save, saving their edits', () => {
    // Selecting save
    cy.get('#main > form:nth-child(2) > div > input').click()
    // verify by search for saved edited computer name
    cy.get('[id^=searchbox]')
    .type('Easy-Saved')
    cy.get('[id^=searchsubmit]').click()
    cy.url('http://computer-database.herokuapp.com/computers?f=Easy-Saved', {timeout: 60000})
    .should('include', '/computers?f=Easy');
    cy.contains('Easy-Saved')
    .should('exist')
  })

   // Deletion
   it ('Given user has access to computer database main page they can select and delete a computer', () => {
    // Main Page URL
    cy.visit('http://computer-database.herokuapp.com/computers')
  })


  it ('And if the user searches for a valid computer name the computer is found', () => {
    // Select searchbox
    cy.get('[id^=searchbox]')
    .type('Easy-Saved')
    // Select Filter by name
    cy.get('[id^=searchsubmit]').click()
    // verify that the correct URl is loaded
    cy.url().should('include','/computers?f=Easy-Saved')
    // verify the page contains the searched name
    cy.contains('Easy-Saved')
    .should('exist')  
  })

  it ('when the user clicks a computer name the computer page loads', () => {
     //Select Computer name
     cy.contains('Easy-Saved').click()

     //Check the field contains the correct value
     cy.get('[id^=name]')
     .should('have.value', 'Easy-Saved')

     //Check the field contains the correct value
     cy.get('[id^=introduced]')
     .should('have.value', '1981-12-22')

     //Check the field contains the correct value
     cy.get('[id^=discontinued]')
     .should('have.value', '2001-08-30')

     cy.get('[id^=company]').should('have.value', '43')
  })


  it('Then a user can select to delete the computer', () => {
    // Selecting Delete this computer
    cy.get('#main > form.topRight > input').click()
    // verify by search for delete computer
    cy.get('[id^=searchbox]')
    .type('Easy-Saved')
    cy.get('[id^=searchsubmit]').click()
    cy.url('http://computer-database.herokuapp.com/computers?f=Easy-Saved', {timeout: 60000})
    .should('include', '/computers?f=Easy');
  })

    //*** Ideally would want to clear up by utilizing a new Database at the start of each test.spec.js***


})