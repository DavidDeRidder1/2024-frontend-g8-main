describe("Profiel pagina", () => {
  beforeEach(() => {
    cy.login("leverancier1", "testww1");
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bedrijfveranderingen", {
      statusCode: 200,
      fixture: "aanvragen.json",
    }).as("aanvraagRequest");

    cy.visit("http://localhost:5173/profiel");
  });

  it("Toont aanvragen lijst", () => {
    cy.wait("@aanvraagRequest");

    cy.get("[data-cy=aanvragen-box]").should("exist");
    cy.get("[data-cy=aanvragen-heading]")
      .should("exist")
      .and("contain", "Aanvragen");
    cy.get("[data-cy=aanvragen-table]").should("exist");
    cy.get("[data-cy=aanvragen-table] > thead > tr > [data-cy=aangevraagd-op]")
      .should("exist")
      .and("contain", "Aangevraagd Op");
    cy.get("[data-cy=aanvragen-table] > thead > tr > [data-cy=goedgekeurd]")
      .should("exist")
      .and("contain", "Goedgekeurd");
    cy.get("[data-cy=aanvragen-table] > thead > tr > [data-cy=details]")
      .should("exist")
      .and("contain", "Details");

    cy.get("[data-cy=aanvragen-table] > tbody > tr").should("have.length", 4); // hier 4 omdat er 4 items in de mock data zijn
    cy.get(
      "[data-cy=aanvragen-table] > tbody > tr:first-child > [data-cy=aangevraagd-tijd]"
    ).should("exist");
    cy.get(
      "[data-cy=aanvragen-table] > tbody > tr:first-child > [data-cy=is-goedgekeurd]"
    ).should("exist");
    cy.get(
      "[data-cy=aanvragen-table] > tbody > tr:first-child > [data-cy=details-link]"
    ).should("exist");
  });
});
