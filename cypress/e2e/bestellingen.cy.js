describe("Bestellingen overzicht", () => {

  beforeEach(() => {
    cy.login("leverancier1", "testww1")
    cy.visit("http://localhost:5173/bestellingen");
  });

  // de testen
  it("Toont de bestellingen van de ingelogde gebruiker met default filters", () => {
      cy.get('[data-cy="bestelling_row"]').should("have.length", 2);
  
      cy.get('[data-cy="filter_betalingsstatus"]').select("alle");
      cy.get('[data-cy="bestelling_row"]').should("have.length", 3);

      cy.get('[data-cy="filter_betalingsstatus"]').select("");
      cy.get('[data-cy="bestelling_row"]').should("have.length", 2);
  
      cy.get('[data-cy="filter_orderstatus"]').select("alle");
      cy.get('[data-cy="bestelling_row"]').should("have.length", 3);
  });

  it("Toont bestellingen met het ingevoerde order ID", () => {
    cy.get('[data-cy="filter_orderid"]').type("2");
    
    // eq(0) = 1ste kolom
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(0).should('contain.text', '2');
    });
  });

  it("Toont bestellingen met orderstatus 'GELEVERD'", () => {
    cy.get('[data-cy="filter_betalingsstatus"]').select("alle");
  
    cy.get('[data-cy="filter_orderstatus"]').select("GELEVERD");
  
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(3).should('contain.text', 'GELEVERD');
    });
  });

  it("Toont bestellingen met orderstatus 'INBEHANDELING'", () => {
    cy.get('[data-cy="filter_betalingsstatus"]').select("alle");
    
    cy.get('[data-cy="filter_orderstatus"]').select("INBEHANDELING");
  
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(3).should('contain.text', 'IN BEHANDELING');
    });
  });

  it("Toont bestellingen met orderstatus 'VERZONDEN'", () => {
    cy.get('[data-cy="filter_betalingsstatus"]').select("alle");
    
    cy.get('[data-cy="filter_orderstatus"]').select("VERZONDEN");
  
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(3).should('contain.text', 'VERZONDEN');
    });
  });

  it("Toont bestellingen met betalingsstatus 'BETAALD'", () => {
    cy.get('[data-cy="filter_orderstatus"]').select("alle");
  
    cy.get('[data-cy="filter_betalingsstatus"]').select("BETAALD");
  
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(4).should('contain.text', 'BETAALD');
    });
  });

  it("Toont bestellingen met betalingsstatus 'NIETBETAALD'", () => {
    cy.get('[data-cy="filter_orderstatus"]').select("alle");
  
    cy.get('[data-cy="filter_betalingsstatus"]').select("NIETBETAALD");
  
    cy.get('[data-cy="bestelling_row"]').each(($row) => {
      cy.wrap($row).find('td').eq(4).should('contain.text', 'NIET BETAALD');
    });
  });

  function createDateObject(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); 
  }

  it("Controleert of de bestellingen gesorteerd zijn op datum", () => {
    cy.get('[data-cy="filter_orderstatus"]').select("alle");

    cy.get('[data-cy="bestelling_row"]').first().find('td').eq(1).invoke('text').then((firstDate) => {
      cy.get('[data-cy="bestelling_row"]').eq(1).find('td').eq(1).invoke('text').then((secondDate) => {
        const firstDateObj = createDateObject(firstDate);
        const secondDateObj = createDateObject(secondDate);
        
        expect(firstDateObj).to.be.at.least(secondDateObj);
      });
    });
  });

  it("Controleert of de sortering omgedraaid wordt wanneer er op de 'Datum geplaatst' header geklikt wordt", () => {
    cy.get('[data-cy="sort_date_header"]').click();
    
    cy.get('[data-cy="bestelling_row"]').first().find('td').eq(1).invoke('text').then((firstDate) => {
      cy.get('[data-cy="bestelling_row"]').eq(1).find('td').eq(1).invoke('text').then((secondDate) => {
        const firstDateObj = createDateObject(firstDate);
        const secondDateObj = createDateObject(secondDate);
  
        expect(firstDateObj).to.be.at.most(secondDateObj);
  
        cy.get('[data-cy="sort_date_header"]').click();
  
        cy.get('[data-cy="bestelling_row"]').first().find('td').eq(1).invoke('text').then((newFirstDate) => {
          cy.get('[data-cy="bestelling_row"]').eq(1).find('td').eq(1).invoke('text').then((newSecondDate) => {
            const newFirstDateObj = createDateObject(newFirstDate);
            const newSecondDateObj = createDateObject(newSecondDate);
  
            expect(newFirstDateObj).to.be.at.least(newSecondDateObj); // Expecting descending order after clicking again
          });
        });
      });
    });
  });
  
  

  


 
});