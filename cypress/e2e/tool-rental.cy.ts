describe('Tool Rental Form', () => {
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('form').should('be.visible'); 
    });

    it('should allow rental with 101% discount', function () {
        cy.get('[data-testid="toolCode"]').type('JAKR'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2015-09-03'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2015-09-08'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('101'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        // Add assertions here to check if the expected outcome occurs
        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });

    it('should allow rental with 10% discount', function () {
        cy.get('[data-testid="toolCode"]').type('LADW'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2020-07-02'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2020-07-04'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('10'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });

    it('should allow rental with 25% discount', function () {
        cy.get('[data-testid="toolCode"]').type('CHNS'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2015-07-02'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2015-07-07'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('25'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });

    it('should allow rental with 0% discount', function () {
        cy.get('[data-testid="toolCode"]').type('JAKD'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2015-09-03'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2015-09-09'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('0'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });

    it('should allow rental with 0% discount for a different code', function () {
        cy.get('[data-testid="toolCode"]').type('JAKR'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2015-07-02'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2015-07-11'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('0'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });

    it('should allow rental with 50% discount', function () {
        cy.get('[data-testid="toolCode"]').type('JAKR'); // Tool Code
        cy.get('[data-testid="checkoutDate"]').type('2020-07-02'); // Checkout Date
        cy.get('[data-testid="returnDate"]').type('2020-07-06'); // Return Date
        cy.get('[data-testid="discountPercent"]').type('50'); // Discount Percent
        cy.get('form').submit(); // Submit the form

        cy.get('#json-message').should('be.visible');
        cy.contains('Rental Agreement').should('be.visible');
    });
});