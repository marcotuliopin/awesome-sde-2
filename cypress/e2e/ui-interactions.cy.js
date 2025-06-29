describe('User Interface and Interactions', () => {
  describe('Form Interactions', () => {
    beforeEach(() => {
      cy.visit('/register')
    })

    it('should handle form input interactions correctly', () => {
      // Test input focus and blur
      cy.get('[data-testid="name-input"]').focus().should('have.focus')
      cy.get('[data-testid="email-input"]').focus().should('have.focus')
      cy.get('[data-testid="name-input"]').should('not.have.focus')
      
      // Test input values
      cy.get('[data-testid="name-input"]').type('Test User').should('have.value', 'Test User')
      cy.get('[data-testid="email-input"]').type('test@example.com').should('have.value', 'test@example.com')
    })
  })

  describe('Responsive Design', () => {
    const viewports = [
      { device: 'iphone-6', width: 375, height: 667 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'desktop', width: 1280, height: 720 }
    ]

    viewports.forEach(viewport => {
      it(`should display correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/login')
        
        // Check if page elements are visible and properly sized
        cy.get('[data-testid="login-header"]').should('be.visible')
        cy.get('[data-testid="email-input"]').should('be.visible')
        cy.get('[data-testid="password-input"]').should('be.visible')
        cy.get('[data-testid="login-button"]').should('be.visible')
        
        // Check if elements don't overflow
        cy.get('body').then(($body) => {
          expect($body[0].scrollWidth).to.be.at.most(viewport.width + 20) // Small margin for rounding
        })
      })
    })
  })

  describe('Error Handling', () => {
    it('should display user-friendly error messages', () => {
      cy.visit('/register')
      
      // Submit form with invalid data
      cy.get('[data-testid="register-button"]').click()
      
      // Check for error message display
      cy.get('.error-message, .alert, [role="alert"], .text-red').should('be.visible')
      cy.contains('All fields are required').should('be.visible')
    })

    it('should handle network errors gracefully', () => {
      // Intercept and force network error
      cy.intercept('POST', '**/user/login', { forceNetworkError: true })
      
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type('test@example.com')
      cy.get('[data-testid="password-input"]').type('password123')
      cy.get('[data-testid="login-button"]').click()
      
      // Should show network error message
      cy.on('window:alert', (str) => {
        expect(str).to.match(/error|failed|network|server/i)
      })
    })
  })
})
