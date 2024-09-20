describe("Notificaties weergeven", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    cy.login("leverancier1", "testww1");
  });

  it("Moet notificaties weergeven wanneer er op de meldingsknop wordt geklikt", () => {
    cy.intercept("GET", "http://localhost:9000/api/notificaties/recent", {
      statusCode: 200,
      body: {
        items: [
          {
            ID: 2,
            ORDER_ID: 1,
            USER_ID: 1,
            TEXT: "Updated notification",
            TYPE: "BETALINGONTVANGEN",
            STATUS: "GELEZEN",
            DATUM: "2024-05-01T00:00:00.000Z",
          },
          {
            ID: 3,
            ORDER_ID: 3,
            USER_ID: 1,
            TEXT: "Alle producten voor bestelling zijn in voorraad en kunnen worden verzonden.",
            TYPE: "ORDERVERZENDBAAR",
            STATUS: "GELEZEN",
            DATUM: "2024-05-01T00:00:00.000Z",
          },
          {
            ID: 9,
            ORDER_ID: 1,
            USER_ID: 1,
            TEXT: "Test notification",
            TYPE: "BETALINGSVERZOEK",
            STATUS: "NIEUW",
            DATUM: "2024-05-01T00:00:00.000Z",
          },
        ],
      },
    }).as("getNotifications");

    cy.wait(1000);
    cy.get("[data-cy=notification_btn]").click();

    cy.wait("@getNotifications");

    cy.get("[data-cy=notification_0]").should(
      "contain.text",
      "Updated notification"
    );

    cy.get("[data-cy=notification_2]").should("be.visible");
    cy.get("[data-cy=notification_all_link]").click();
  });
});
