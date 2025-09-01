# Aurora - Smart Shopping Cart System

## Overview

Aurora is a comprehensive e-commerce web application designed as an intelligent shopping cart system. The project implements a modern full-stack architecture with React frontend, Express backend, and PostgreSQL database. The system provides features for user authentication, product browsing, shopping cart management, order processing, and multi-language support. The application is built with a focus on user experience, featuring both dark and light themes, responsive design, and an intuitive interface suitable for self-service shopping terminals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Context API for auth, cart, and language state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with structured route handling
- **Data Layer**: Repository pattern for clean data access abstraction
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Simple user authentication without JWT (suitable for kiosk-style application)

### Data Storage Architecture
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Normalized relational structure with proper foreign key relationships
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon serverless PostgreSQL for cloud deployment

### Key Domain Models
- **Users**: Authentication and profile management with language preferences
- **Products**: Catalog with categories, pricing, ratings, and barcode support
- **Shopping Lists**: User-created lists with item tracking and completion status
- **Cart Items**: Session-based shopping cart functionality
- **Orders**: Purchase history and transaction records

### Authentication & Authorization
- **Strategy**: Simple email/password authentication stored in localStorage
- **Session Persistence**: Client-side user data persistence for kiosk environments
- **User Management**: Registration, login, and profile management

### Internationalization
- **Multi-language Support**: Portuguese (default), English, and Spanish
- **Context-based Translation**: React Context with translation key system
- **Persistent Language Selection**: User preferences stored in localStorage

### UI/UX Design Patterns
- **Theme System**: Dark mode default with light mode toggle using CSS variables
- **Color Scheme**: Aurora brand colors (orange/yellow primary, blue secondary)
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Component Library**: Consistent design system using Shadcn/ui components
- **Accessibility**: Radix UI primitives ensure WCAG compliance

### Development Workflow
- **Type Safety**: Full TypeScript coverage from database to UI
- **Code Organization**: Feature-based folder structure with shared utilities
- **Development Environment**: Replit-optimized with hot reload and error handling
- **Build Process**: Production-ready builds with optimized assets

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database driver for cloud deployment
- **drizzle-orm**: Type-safe ORM for PostgreSQL with excellent TypeScript integration
- **@tanstack/react-query**: Powerful data synchronization for server state management

### UI Component Dependencies
- **@radix-ui/react-***: Comprehensive set of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe utility for creating consistent component variants
- **lucide-react**: Modern icon library with consistent design language

### Form and Validation
- **react-hook-form**: Performant forms with easy validation integration
- **@hookform/resolvers**: Resolver library for popular validation schemas
- **zod**: TypeScript-first schema validation for runtime type checking

### Development Tools
- **vite**: Next-generation frontend build tool for fast development
- **typescript**: Static type checking for enhanced developer experience
- **@replit/vite-plugin-runtime-error-modal**: Replit-specific error handling
- **@replit/vite-plugin-cartographer**: Development environment integration

### Utility Libraries
- **wouter**: Minimalist routing library for React applications
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **cmdk**: Command menu component for enhanced user interactions