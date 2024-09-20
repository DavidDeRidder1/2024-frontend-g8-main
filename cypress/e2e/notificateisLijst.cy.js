describe("Notificaties Pagina", () => {
  beforeEach(() => {
    cy.login("leverancier1", "testww1");
    cy.visit("http://localhost:5173/notificaties");
  });

  it("toont de notificatis correct", () => {
    cy.intercept("GET", "http://localhost:9000/api/notificaties", {
      statusCode: 200,
      fixture: "notificaties.json",
    }).as("getNotificaties");
    cy.wait("@getNotificaties");

    cy.get("[data-cy=notificatie_lijst]").should("exist");
    cy.get("[data-cy=notificatie_lijst]").within(() => {
      cy.get("[data-cy=notificatie_0]").should("exist");
      cy.get("[data-cy=notificatie_1]").should("exist");
      cy.get("[data-cy=notificatie_2]").should("exist");
    });
  });

  it("navigeert naar de bestelling bij het kliken op een notificatie", () => {
    cy.intercept("GET", "http://localhost:9000/api/notificaties", {
      statusCode: 200,
      fixture: "notificaties.json",
    }).as("getNotificaties");
    cy.wait("@getNotificaties");

    cy.get("[data-cy=notificatie_0]").click();

    cy.url().should("include", "/bestellingen/1");
  });
});
