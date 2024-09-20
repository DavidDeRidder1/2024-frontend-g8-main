describe("mijn eerste test", () => {

  it("draait de applicatie", () => {
    cy.visit('http://localhost:5173');
    cy.get("input").should("exist");
  });

  it("should login", () => { 
    cy.login('leverancier1', 'testww1');
  });
});