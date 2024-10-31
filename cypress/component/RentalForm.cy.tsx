import React from 'react'; 
import { mount } from '@cypress/react18';
import RentalForm from '../../app/components/RentalForm';

describe('RentalForm Component', () => {
    beforeEach(() => {
        mount(<RentalForm />);
    });

    it('renders correctly', () => {
        cy.get('h2').contains('Rental Form').should('be.visible');
        cy.get('[data-testid="toolCode"]').should('exist');
        cy.get('[data-testid="checkoutDate"]').should('exist');
        cy.get('[data-testid="returnDate"]').should('exist');
        cy.get('[data-testid="discountPercent"]').should('exist');
        cy.get('button[type="submit"]').contains('Submit').should('be.visible');
    });

    it('shows error message when form submission fails', () => {
        // Mock API response for failure
        cy.intercept('POST', '/api/rentals', {
            statusCode: 400,
            body: { error: 'Invalid tool code' }, 
        }).as('postRentalFail');

        // Fill in required fields with valid data
        cy.get('[data-testid="checkoutDate"]').type('2022-10-10'); // Use a valid date
        cy.get('[data-testid="returnDate"]').type('2022-10-15'); // Use a valid date

        // Enter an invalid tool code
        cy.get('[data-testid="toolCode"]').type('INVALID_CODE');
        cy.get('button[type="submit"]').click();

        // Wait for the API call and check for the error message
        cy.wait('@postRentalFail');

        // Assert that the error message is displayed correctly
        cy.get('#error-message').should('be.visible').and('contain', 'Invalid tool code');
    });

    it('submits the form with valid data', () => {
        // Mock API response for success
        cy.intercept('POST', '/api/rentals', {
            statusCode: 200,
            body: { agreementDetails: 'Sample agreement data' }, 
        }).as('postRental');

        // Fill the form with valid data
        cy.get('[data-testid="toolCode"]').type('JAKR');
        cy.get('[data-testid="checkoutDate"]').type('2015-09-03');
        cy.get('[data-testid="returnDate"]').type('2015-09-08');
        cy.get('[data-testid="discountPercent"]').type('10');
        cy.get('button[type="submit"]').click();

        // Wait for the mock API call and check for the rental agreement message
        cy.wait('@postRental');
        cy.get('#json-message', { timeout: 10000 }).should('be.visible').and('contain', 'Sample agreement data');
    });
});