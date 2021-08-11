describe("Appointments", () => {
  it("should book an interview", () => {
    //since these tests actually change the server state, we must reset every time
    cy.request('GET', "/api/debug/reset")

    cy.visit("/");

    cy.contains('Monday')
    cy.get('[alt=Add]')
      .first() //there are actually two 'Add' buttons on the page, so we have to specify the first - the second one is hidden in the 5pm slot
      .click();

    //find the input bar and type the name  
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //select an interviewer
    cy.get('[alt="Sylvia Palmer"]').click();

    cy.contains('Save').click();
  });


  
});
