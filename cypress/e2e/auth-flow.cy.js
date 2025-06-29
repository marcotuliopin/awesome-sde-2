describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('User Registration', () => {
    it('should show validation errors for invalid email', () => {
      cy.visit('/register')
      
      cy.get('[data-testid="name-input"]').type('Test User')
      cy.get('[data-testid="email-input"]').type('invalid-email')
      cy.get('[data-testid="password-input"]').type('Password123!')
      cy.get('[data-testid="confirm-password-input"]').type('Password123!')
      
      cy.get('[data-testid="register-button"]').click()
      
      cy.contains('Please enter a valid email address').should('be.visible')
    })

    it('should show validation errors for weak password', () => {
      cy.visit('/register')
      
      cy.get('[data-testid="name-input"]').type('Test User')
      cy.get('[data-testid="email-input"]').type('test@example.com')
      cy.get('[data-testid="password-input"]').type('weak')
      cy.get('[data-testid="confirm-password-input"]').type('weak')
      
      cy.get('[data-testid="register-button"]').click()
      
      cy.contains('Password must contain at least 6 characters').should('be.visible')
    })

    it('should show validation errors when passwords do not match', () => {
      cy.visit('/register')
      
      cy.get('[data-testid="name-input"]').type('Test User')
      cy.get('[data-testid="email-input"]').type('test@example.com')
      cy.get('[data-testid="password-input"]').type('Password123!')
      cy.get('[data-testid="confirm-password-input"]').type('DifferentPassword123!')
      
      cy.get('[data-testid="register-button"]').click()
      
      cy.contains('Passwords do not match').should('be.visible')
    })

    it('should show validation errors for empty fields', () => {
      cy.visit('/register')
      
      cy.get('[data-testid="register-button"]').click()
      
      cy.contains('All fields are required').should('be.visible')
    })

    it('should navigate to login page from registration', () => {
      cy.visit('/register')
      
      cy.get('[data-testid="go-to-login"]').click()
      
      cy.url().should('include', '/login')
      cy.get('[data-testid="login-header"]').should('be.visible')
    })
  })

  describe('User Login', () => {
    it('should show error for invalid credentials', () => {
      cy.visit('/login')
      
      cy.get('[data-testid="email-input"]').type('nonexistent@example.com')
      cy.get('[data-testid="password-input"]').type('wrongpassword')
      cy.get('[data-testid="login-button"]').click()
      
      // Check for error message (adjust based on your implementation)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Login failed. Please check your credentials.')
      })
    })

    it('should navigate to registration page from login', () => {
      cy.visit('/login')
      
      cy.get('[data-testid="go-to-register"]').click()
      
      cy.url().should('include', '/register')
      cy.contains('Create an Account').should('be.visible')
    })
  })
})
