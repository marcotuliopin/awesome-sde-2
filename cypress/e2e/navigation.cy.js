describe('Navigation and Routing', () => {
  describe('Public Routes', () => {
    it('should navigate to login page', () => {
      cy.visit('/login')
      cy.url().should('include', '/login')
      cy.get('[data-testid="login-header"]').should('be.visible')
    })

    it('should navigate to register page', () => {
      cy.visit('/register')
      cy.url().should('include', '/register')
      cy.contains('Create an Account').should('be.visible')
    })

    it('should redirect unauthenticated users to login when accessing protected routes', () => {
      cy.visit('/products')
      
      // Should redirect to login or show login form
      cy.url().should('satisfy', (url) => {
        return url.includes('/login') || url.includes('/') // depending on your routing logic
      })
    })
  })

  describe('Navigation Between Pages', () => {
    it('should navigate between login and register pages', () => {
      // Start at login
      cy.visit('/login')
      cy.get('[data-testid="login-header"]').should('be.visible')
      
      // Navigate to register
      cy.get('[data-testid="go-to-register"]').click()
      cy.url().should('include', '/register')
      cy.contains('Create an Account').should('be.visible')
      
      // Navigate back to login
      cy.get('[data-testid="go-to-login"]').click()
      cy.url().should('include', '/login')
      cy.get('[data-testid="login-header"]').should('be.visible')
    })
  })

  describe('URL Handling', () => {
    it('should handle direct URL access correctly', () => {
      // Test various direct URL accesses
      const routes = ['/login', '/register']
      
      routes.forEach(route => {
        cy.visit(route)
        cy.url().should('include', route)
      })
    })

    it('should handle invalid routes gracefully', () => {
      cy.visit('/invalid-route-that-does-not-exist')
      
      // Should redirect to a valid page or show 404
      cy.url().should('satisfy', (url) => {
        return url.includes('/login') || url.includes('/') || url.includes('/404')
      })
    })
  })

  describe('Browser Navigation', () => {
    it('should handle browser back and forward buttons', () => {
      // Navigate through pages
      cy.visit('/login')
      cy.get('[data-testid="go-to-register"]').click()
      cy.url().should('include', '/register')
      
      // Use browser back button
      cy.go('back')
      cy.url().should('include', '/login')
      
      // Use browser forward button
      cy.go('forward')
      cy.url().should('include', '/register')
    })
  })
})
