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
- **Type Safety**: Full TypeScript implementation for both frontend and backend
- **Testing**: Comprehensive unit tests and end-to-end testing with Jest and Cypress
- **Authentication Flow**: Protected routes and automatic token management

### System Architecture

The application follows a modern full-stack architecture:

- **Frontend**: Single-page application (SPA) built with React
- **Backend**: RESTful API built with Express.js
- **Authentication**: JWT tokens stored as HTTP-only cookies
- **Data Storage**: File-based JSON storage for simplicity (with Sequelize models for future database integration)
- **Routing**: Client-side routing with React Router
- **State Management**: React Context API for global state

## 🛠️ Technologies Used

### Frontend Technologies

- **[React 19](https://react.dev/)**: Modern JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for better code quality
- **[Vite](https://vitejs.dev/)**: Fast build tool and development server
- **[React Router DOM](https://reactrouter.com/)**: Declarative routing for React applications
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development
- **[React Icons](https://react-icons.github.io/react-icons/)**: Popular icon library for React
- **[Axios](https://axios-http.com/)**: HTTP client for API requests

### Backend Technologies

- **[Node.js](https://nodejs.org/)**: JavaScript runtime for server-side development
- **[Express.js](https://expressjs.com/)**: Fast, unopinionated web framework for Node.js
- **[JSON Web Tokens (JWT)](https://jwt.io/)**: Secure token-based authentication
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Password hashing library
- **[CORS](https://www.npmjs.com/package/cors)**: Cross-Origin Resource Sharing middleware
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**: Cookie parsing middleware
- **[Sequelize](https://sequelize.org/)**: Promise-based ORM for SQL databases (configured for future use)

### Development & Testing Tools

- **[Jest](https://jestjs.io/)**: JavaScript testing framework for unit tests
- **[Testing Library](https://testing-library.com/)**: Simple and complete testing utilities for React
- **[Cypress](https://www.cypress.io/)**: End-to-end testing framework
- **[ESLint](https://eslint.org/)**: Linting tool for identifying and fixing code issues
- **[Babel](https://babeljs.io/)**: JavaScript compiler for backwards compatibility

### DevOps & Deployment

- **[GitHub Actions](https://github.com/features/actions)**: CI/CD pipeline for automated testing
- **[Vercel](https://vercel.com/)**: Deployment platform for the frontend
- **[Docker](https://www.docker.com/)**: Containerization for development environment
- **[Dev Containers](https://containers.dev/)**: Consistent development environment

### Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── contexts/          # React Context providers
│   ├── routes/           # Page components
│   ├── services/         # API service functions
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── backend/              # Backend source code
│   ├── src/              # Server source code
│   ├── config/           # Configuration files
│   ├── data/            # JSON data storage
│   └── errors/          # Custom error classes
├── cypress/             # End-to-end tests
└── .github/workflows/   # CI/CD configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install frontend dependencies: `npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Start the backend server: `npm run dev`
5. Start the frontend development server: `npm run dev`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run ESLint
- `npx cypress open` - Open Cypress for e2e testing

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Jest and Testing Library for component and service testing
- **Integration Tests**: API endpoint testing
- **End-to-End Tests**: Cypress for full user flow testing
- **Cross-Platform Testing**: GitHub Actions runs tests on Ubuntu, Windows, and macOS

Test coverage is automatically generated and includes all TypeScript/TSX files in the `src/` directory.