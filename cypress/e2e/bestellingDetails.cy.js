describe("Bestellingen overzicht", () => {

  beforeEach(() => {
    cy.login("leverancier1", "testww1")
    cy.visit("http://localhost:5173/bestellingen");
    cy.get('[data-cy="filter_betalingsstatus"]').select("alle");
  });

  const urls = [
    'http://localhost:5173/bestellingen/1',
    'http://localhost:5173/bestellingen/3',
    'http://localhost:5173/bestellingen/4'
  ];
  
  urls.forEach((url) => {
    it(`Visits order detail page at ${url}`, () => {
      cy.visit(url);
      cy.get('td').each(($td) => {
        cy.wrap($td).should('not.be.empty');
      });
    });

    


  });
  

});