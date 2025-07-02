# TP 1 Software Engineering II

The project is accessible via url https://awesome-sde-2-glti.vercel.app/

## 👥 Team Members

- Marco Túlio Tristão
- Raul Araju
- Gabriel Nunes
- Fernando Vilela

## 📋 System Overview

This is a **Software Engineering Project** that implements a full-stack web application for inventory management. The system provides user authentication, product management, and a responsive user interface with theme switching capabilities.

### Key Features

- **User Authentication**: Complete user registration and login system with JWT-based authentication
- **Product Management**: Create, read, update, and search products in the inventory
- **Theme Support**: Light and dark mode toggle for better user experience
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Type Safety**: Full TypeScript implementation for frontend and JavaScript for backend
- **Testing**: Comprehensive unit tests and end-to-end testing with Jest and Cypress
- **Authentication Flow**: Protected routes and automatic token management
- **Form Validation**: Client-side validation for email format and password strength
- **Error Handling**: Custom error classes and middleware for robust error management

### System Architecture

The application follows a modern full-stack architecture:

- **Frontend**: Single-page application (SPA) built with React 19
- **Backend**: RESTful API built with Express.js and Node.js
- **Authentication**: JWT tokens stored as HTTP-only cookies with bcrypt password hashing
- **Data Storage**: File-based JSON storage for development (with Sequelize models configured for future database integration)
- **Routing**: Client-side routing with React Router DOM
- **State Management**: React Context API for authentication and theme management
- **Build Tool**: Vite for fast development and optimized production builds

## 🛠️ Technologies Used

### Frontend Technologies

- **[React 19](https://react.dev/)**: Modern JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for better code quality and developer experience
- **[Vite](https://vitejs.dev/)**: Next generation frontend tooling for fast builds and HMR
- **[React Router DOM](https://reactrouter.com/)**: Declarative routing for React applications
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development
- **[React Icons](https://react-icons.github.io/react-icons/)**: Popular icon library for React components
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for API requests

### Backend Technologies

- **[Node.js](https://nodejs.org/)**: JavaScript runtime for server-side development
- **[Express.js](https://expressjs.com/)**: Fast, unopinionated web framework for Node.js
- **[JSON Web Tokens (JWT)](https://jwt.io/)**: Secure token-based authentication
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Password hashing library for secure authentication
- **[CORS](https://www.npmjs.com/package/cors)**: Cross-Origin Resource Sharing middleware
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**: Cookie parsing middleware for JWT handling
- **[Sequelize](https://sequelize.org/)**: Promise-based ORM for SQL databases (configured for future MySQL integration)
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Environment variable management

### Development & Testing Tools

- **[Jest](https://jestjs.io/)**: JavaScript testing framework for unit and integration tests
- **[Testing Library](https://testing-library.com/)**: Simple and complete testing utilities for React components
- **[Cypress](https://www.cypress.io/)**: End-to-end testing framework for user flow testing
- **[ESLint](https://eslint.org/)**: Linting tool for identifying and fixing code issues
- **[Babel](https://babeljs.io/)**: JavaScript compiler for backwards compatibility

### DevOps & Deployment

- **[GitHub Actions](https://github.com/features/actions)**: CI/CD pipeline for automated cross-platform testing
- **[Vercel](https://vercel.com/)**: Deployment platform for the frontend application
- **[Docker](https://www.docker.com/)**: Containerization support for consistent development environments
- **[Dev Containers](https://containers.dev/)**: VS Code development containers for team consistency

### Project Structure

```
├── frontend/                    # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── layout/        # Layout components (Header, RootLayout, AuthWrapper)
│   │   │   └── ui/            # UI components (ThemeToggle)
│   │   ├── contexts/          # React Context providers (auth, theme)
│   │   ├── routes/           # Page components (Login, Register, Products, Root)
│   │   ├── services/         # API service functions
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions and constants
│   │   └── api/              # Axios configuration
│   ├── cypress/              # End-to-end tests
│   │   └── e2e/             # E2E test files
│   └── public/              # Static assets
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── domains/         # Domain-driven design structure
│   │   │   ├── user/       # User domain (models, services, controllers, tests)
│   │   │   └── product/    # Product domain (models, services, controllers, tests)
│   │   ├── middlewares/    # Express middlewares (auth, error handling)
│   │   └── utils/          # Utility functions and constants
│   ├── config/             # Configuration files (express, auth)
│   ├── data/              # JSON data storage files
│   ├── errors/            # Custom error classes
│   └── database/          # Database configuration (Sequelize)
└── .github/workflows/     # CI/CD configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tp1
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # In the backend directory, copy the example env file
   cp .env.example .env
   # Edit .env with your configuration values
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Start backend server (from backend directory)
   npm start
   
   # Terminal 2: Start frontend server (from frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3030
   - Backend API: http://localhost:3000

### Available Scripts

#### Frontend Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run unit tests with Jest
- `npm run lint` - Run ESLint for code quality
- `npx cypress open` - Open Cypress for interactive e2e testing
- `npx cypress run` - Run Cypress tests in headless mode

#### Backend Scripts
- `npm start` - Start the Express server
- `npm run dev` - Start server with nodemon for development
- `npm test` - Run backend unit tests
- `npm run lint` - Run ESLint for backend code

## 🧪 Testing Strategy

The project implements a comprehensive testing strategy across multiple levels:

### Unit Tests
- **Frontend**: Jest + Testing Library for component testing
- **Backend**: Jest for service and controller testing
- **Coverage**: Automated test coverage reporting for TypeScript/TSX files

### Integration Tests
- API endpoint testing with mocked dependencies
- Authentication flow testing
- Error handling validation

### End-to-End Tests
- **Authentication Flow**: Registration, login, logout scenarios
- **Product Management**: CRUD operations and user interactions
- **UI Interactions**: Form validation, responsive design, theme switching
- **Navigation**: Route protection and user flow testing

### Cross-Platform Testing
- GitHub Actions CI/CD pipeline
- Tests run on Ubuntu, Windows, and macOS
- Automated testing on pull requests and main branch pushes

### Test Files Structure
```
frontend/
├── src/**/*.test.tsx        # Component unit tests
├── cypress/e2e/            # End-to-end tests
│   ├── auth-flow.cy.js
│   ├── product-management.cy.js
│   ├── navigation.cy.js
│   └── ui-interactions.cy.js
backend/
└── src/**/tests/*.test.js   # Backend unit tests
```

## 🔐 Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Authentication**: JWT tokens with HTTP-only cookies
- **Input Validation**: Email format and password strength validation
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Protected Routes**: Middleware-based route protection
- **Error Handling**: Secure error messages without sensitive data exposure

## 🎨 UI/UX Features

- **Dark/Light Theme**: Complete theme switching with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Real-time client-side validation with user-friendly error messages
- **Loading States**: Proper loading and error state management
- **Accessibility**: Semantic HTML and proper ARIA attributes

Test coverage is automatically generated and includes all TypeScript/TSX files in the `src/` directory.
