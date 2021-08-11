describe("Appointments", () => {

  const beforeEach = function () {
    //since these tests actually change the server state, we must reset every time
    cy.request('GET', "/api/debug/reset")

    cy.visit("/");

    cy.contains('Monday')
  }

  it("should book an interview", () => {
    beforeEach();

    cy.get('[alt=Add]')
      .first() //there are actually two 'Add' buttons on the page, so we have to specify the first - the second one is hidden in the 5pm slot
      .click();

    //find the input bar and type the name  
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //select an interviewer
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains('Save').click();

    //verify that the new student name and interviewer show up on the page
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    
    cy.get('[alt=Edit]')
    .last() //there will be two edit icons on the page - we want to select the last one
    .click({ force: true })
    
    //find the input bar and edit the name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Veronica Leung");

    //select another interviewer
    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains('Save').click();  

    //verify that the new student name and interviewer show up on the page
    cy.contains(".appointment__card--show", "Veronica Leung");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })
  
});
