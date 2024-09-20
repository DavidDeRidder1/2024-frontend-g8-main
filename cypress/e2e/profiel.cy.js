describe("Profiel pagina", () => {
  beforeEach(() => {
    cy.login("leverancier1", "testww1");
    cy.visit("http://localhost:5173/bestellingen");
    cy.intercept("GET", "http://localhost:9000/api/bedrijf?form=false", {
      fixture: "bedrijf.json",
      delayMs: 500,
    }).as("bedrijfRequest");

    cy.visit("http://localhost:5173/profiel");
  });

  it("Toont bedrijfsgegevens", () => {
    cy.wait("@bedrijfRequest");

    cy.get("[data-cy=bedrijf-card]").should("exist");
    cy.get("[data-cy=bedrijf-logo]").should("exist");
    cy.get("[data-cy=bedrijf-naam]").should("contain", "Bedrijf1");
    cy.get("[data-cy=klant-badge]").should("exist");
    cy.get("[data-cy=leverancier-badge]").should("exist");
    cy.get("[data-cy=btw-nummer]").should("contain", "BE0123456789");
    cy.get("[data-cy=sector]").should("contain", "Sector1");
    cy.get("[data-cy=contactpersoon]").should(
      "contain",
      "Bedrijf1 Contactpersoon"
    );
    cy.get("[data-cy=email]").should("contain", "ht5ut3sy@temporary-mail.net");
    cy.get("[data-cy=telefoon]").should("contain", "+320487484486");
    cy.get("[data-cy=adres]").should(
      "contain",
      "Straat 1, 1000 Brussel br, België"
    );
    cy.get("[data-cy=betalingsopties]").should("contain", "FACTUUR, PAYPAL");
    cy.get("[data-cy=beheren-button]").should("exist");
  });
});
