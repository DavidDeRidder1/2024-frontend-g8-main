describe("Producten overzicht", () => {
  it("should show the products", () => {
    
    cy.visit("http://localhost:5173");
    cy.get("[data-cy=product_search_input]").should("exist");
    cy.get("[data-cy=product_list_container] ").should("exist");
    cy.get("[data-cy=product_list_container]").find("[data-cy=product_item]").should("have.length", 3);
  });

  it("should show the correct products after searching", () => { 
    cy.visit("http://localhost:5173");
    cy.get("[data-cy=product_search_input]").type("laptop");
    cy.get("[data-cy=product_search_button]").click();
    cy.get("[data-cy=product_list_container]").find("[data-cy=product_item]").should("have.length", 1);
    cy.get("[data-cy=product_list_container]").find("[data-cy=product_item]").should("contain", "Laptop");
    cy.get("[data-cy=product_list_container]").find("[data-cy=product_item]").should("contain", "€800");
  });
});

