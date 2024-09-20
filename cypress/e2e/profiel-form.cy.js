describe("Profiel Beheren Pagina", () => {
  beforeEach(() => {
    cy.login("leverancier1", "testww1");
    cy.visit("http://localhost:5173/profiel/beheren");
    cy.intercept("GET", "http://localhost:9000/api/bedrijf?form=true", {
      statusCode: 200,
      fixture: "bedrijf.json",
    }).as("aanvraagRequest");
  });

  it("Laadt correct met bedrijfsgegevens", () => {
    cy.visit("http://localhost:5173/profiel/beheren");

    cy.wait(1000);

    cy.get('[data-cy="sector-input"]').should("have.value", "Sector1");

    cy.get('[data-cy="logo-input"]').should(
      "have.value",
      "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png"
    );

    cy.get('[data-cy="straat-input"]').should("have.value", "Straat");
    cy.get('[data-cy="huisnummer-input"]').should("have.value", "1");
    cy.get('[data-cy="postcode-input"]').should("have.value", "1000");
    cy.get('[data-cy="stad-input"]').should("have.value", "Brussel br");
    cy.get('[data-cy="land-input"]').should("have.value", "België");

    cy.get('[data-cy="persoon-input"]').should(
      "have.value",
      "Bedrijf1 Contactpersoon"
    );
    cy.get('[data-cy="telefoon-input"]').should("have.value", "+320487484486");
    cy.get('[data-cy="email-input"]').should(
      "have.value",
      "ht5ut3sy@temporary-mail.net"
    );

    cy.get('[data-cy="betalingsopties-label"]').should("exist");
    cy.get('[data-cy="betalingsopties-flex"]').should("exist");
  });

  it("Geeft foutmelding bij ontbrekende sector", () => {
    cy.get('[data-cy="sector-input"]').clear();
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();
    cy.get('[data-cy="label_input_error"]').should("be.visible");
  });

  it("Geeft foutmelding bij ontbrekende email", () => {
    cy.get('[data-cy="email-input"]').clear();
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();
    cy.get('[data-cy="label_input_error"]').should("be.visible");
  });

  it("Geeft foutmelding bij ontbrekende logo", () => {
    cy.get('[data-cy="logo-input"]').clear();
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();
    cy.get('[data-cy="label_input_error"]').should("be.visible");
  });

  it("Geeft foutmelding bij ontbrekende telefoonnr", () => {
    cy.get('[data-cy="telefoon-input"]').clear();
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();
    cy.get('[data-cy="label_input_error"]').should("be.visible");
  });

  it("Toont foutmeldingen bij ontbrekende logo, email en persoon", () => {
    cy.get('[data-cy="telefoon-input"]').clear();
    cy.get('[data-cy="email-input"]').clear();
    cy.get('[data-cy="logo-input"]').clear();
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();

    cy.get("[data-cy='label_input_error']").should("have.length", 3);
  });

  it("Vult geldige gegevens in en slaagt", () => {
    cy.get('[data-cy="sector-input"]').clear().type("Nieuwe Sector");
    cy.get('[data-cy="email-input"]')
      .clear()
      .type("sujan.sapkota@student.hogent.be");
    cy.get('[data-cy="wijziging-aanvragen-button"]').click();

    cy.url().should("include", "/profiel");
  });
});
