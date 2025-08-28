# 📦 Fast Box - Frontend

A modern, responsive React TypeScript frontend for the Fast Box parcel delivery system. This frontend application provides an intuitive interface for managing parcel deliveries with role-based dashboards, real-time tracking, and seamless user experience.

## 🎯 Project Overview

Fast Box Frontend is a comprehensive web application built with React and TypeScript that interfaces with the Fast Box API to provide:

- **Multi-Role Dashboards** for Admins, Senders, Receivers, and Common Users
- **Public Parcel Tracking** with detailed timeline visualization
- **Secure Authentication** with JWT and Google OAuth2 integration
- **Responsive Design** optimized for desktop and mobile devices
- **Real-time Updates** with efficient state management
- **Modern UI/UX** with dark/light theme support

## 🌐 Live Demo

Experience Fast Box in action:

**🔗 [Live Application](https://parcel-delivery-system-client-omega.vercel.app/)**

## ✨ Key Features

### 🔐 Authentication & Authorization

- **Multiple Login Options**: Email/password and Google OAuth2
- **Role-based Access Control**: Different interfaces for different user types
- **Secure Token Management**: Automatic refresh token handling
- **Protected Routes**: Route guards based on user permissions

### 📱 User Interfaces

- **Admin Dashboard**: Complete system oversight and management
- **Sender Dashboard**: Parcel creation and sent parcel management
- **Receiver Dashboard**: Incoming parcel tracking and delivery confirmation
- **Common User Dashboard**: Combined sender/receiver functionality
- **Public Tracking**: Guest users can track parcels with tracking ID

### 🎨 Design & User Experience

- **Responsive Layout**: Works seamlessly on all device sizes
- **Dark/Light Themes**: System-aware theme switching
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Intuitive Navigation**: Dynamic sidebar with contextual menu items
- **Loading States**: Smooth loading indicators and error handling

### 📊 Dashboard Features

- **Statistics Overview**: Visual charts and metrics
- **Real-time Status Updates**: Live parcel status tracking
- **Advanced Filtering**: Filter parcels by status, date, division
- **Bulk Actions**: Efficient management of multiple parcels
- **Export Capabilities**: Download reports and data

## 🛠 Tech Stack

### Core Technologies

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Fast build tool and development server
- **React Router v6** - Declarative routing
- **Bun** - Ultra-fast JavaScript runtime and package manager

### State Management & API

- **Redux Toolkit** - Predictable state container
- **RTK Query** - Powerful data fetching and caching
- **Axios** - HTTP client with interceptors

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful SVG icons
- **Sonner** - Toast notifications

### Forms & Validation

- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

### Development Tools

- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **TypeScript Strict Mode** - Enhanced type checking

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **Bun** (v1.0 or higher) - Ultra-fast JavaScript runtime and package manager
- **Fast Box Backend** running (see backend README)
- Modern web browser with JavaScript enabled

### Installing Bun

```bash

# Install Bun (macOS, Linux, WSL)

curl -fsSL https://bun.sh/install | bash


# Or using npm

npm install -g bun


# Verify installation

bun --version

```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash

git clone https://github.com/Nifazur/Parcel-Delivery-System-Frontend

cd fast-box-frontend

```

### 2. Install Dependencies

```bash

bun install

```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env

# API Configuration

VITE_BASE_URL=http://localhost:4000/api/v1

VITE_FRONT_URL=http://localhost:3000


# Development Settings

VITE_NODE_ENV=development


# Optional: Analytics or monitoring keys

# VITE_GOOGLE_ANALYTICS_ID=your-ga-id

```

### 4. Start Development Server

```bash

bun dev

```

The application will be available at `http://localhost:3000`

### 5. Build for Production

```bash

bun run build

```

## 📁 Project Structure

```

src/

├── components/                 # Reusable UI components

│   ├── dashboardLayout/       # Dashboard layout components

│   │   ├── DashboardHeader.tsx

│   │   ├── DashboardLayout.tsx

│   │   └── DashboardSidebar.tsx

│   ├── layout/                # General layout components

│   │   ├── CommonLayout.tsx

│   │   ├── Navbar/

│   │   ├── Footer/

│   │   └── Loading.tsx

│   ├── parcel/                # Parcel-related components

│   │   ├── CreateParcelForm.tsx

│   │   └── TrackingTimelineCard.tsx

│   ├── ui/                    # Base UI components (shadcn/ui)

│   ├── SectionHeader.tsx      # Common section headers

│   └── StatusBadge.tsx        # Status indicators

├── pages/                     # Page components

│   ├── auth/                  # Authentication pages

│   │   ├── Login/

│   │   ├── Register/

│   │   └── ForgotPassword/

│   ├── dashboards/            # Dashboard pages

│   │   ├── admin/

│   │   ├── sender/

│   │   ├── receiver/

│   │   └── commonUser/

│   └── public/                # Public pages

│       ├── Home/

│       ├── About/

│       ├── Contact/

│       └── Tracking/

├── redux/                     # State management

│   ├── features/              # RTK Query API slices

│   │   ├── authApi.ts

│   │   ├── parcelApi.ts

│   │   ├── userApi.ts

│   │   └── divisionApi.ts

│   ├── store.ts               # Redux store configuration

│   ├── baseApi.ts             # Base API configuration

│   └── axiosBaseQuery.ts      # Custom base query

├── routes/                    # Route configurations

│   ├── adminRoutes.tsx

│   ├── senderRoutes.tsx

│   ├── receiverRoutes.tsx

│   ├── commonUserRoutes.tsx

│   └── index.tsx

├── types/                     # TypeScript type definitions

│   ├── index.ts

│   ├── auth.type.ts

│   ├── dashboard.ts

│   └── parcel.type.ts

├── utils/                     # Utility functions

│   ├── withAuth.tsx           # HOC for route protection

│   ├── generateRoutes.ts      # Dynamic route generation

│   ├── getSidebarItems.ts     # Sidebar configuration

│   ├── dashboardUtils.ts      # Dashboard helpers

│   └── formatDate.ts          # Date formatting

├── hooks/                     # Custom React hooks

│   ├── useTheme.ts

│   └── use-mobile.ts

├── lib/                       # Library configurations

│   ├── axios.ts               # Axios setup and interceptors

│   └── utils.ts               # Utility functions

├── constants/                 # Application constants

│   └── role.ts                # User roles

├── context/                   # React contexts

│   └── theme.context.ts       # Theme context

├── providers/                 # Context providers

│   └── theme.provider.tsx     # Theme provider

└── config/                    # Configuration files

    └── index.ts               # Environment config

```

## 🔗 API Integration

The frontend communicates with the backend through well-defined API endpoints:

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/google` - Google OAuth initiation
- `POST /auth/refresh-token` - Token refresh
- `POST /user/register` - User registration

### Parcel Management Endpoints

- `POST /parcel/create` - Create new parcel
- `GET /parcel/track/:trackingId` - Track parcel (public)
- `GET /parcel/sent` - Get sent parcels
- `GET /parcel/received` - Get received parcels
- `PATCH /parcel/status/:id` - Update parcel status (admin)
- `PATCH /parcel/cancel/:id` - Cancel parcel
- `PATCH /parcel/confirm-delivery/:id` - Confirm delivery

### User & Division Management

- `GET /user/all-users` - Get all users (admin)
- `PATCH /user/:id` - Update user profile
- `GET /division` - Get all divisions
- `POST /division/register` - Create division (admin)

## 🎨 UI Components & Styling

### Design System

- **Color Palette**: Customizable theme with CSS variables
- **Typography**: Consistent font scales and hierarchy
- **Spacing**: Systematic spacing using Tailwind utilities
- **Components**: Reusable components following design patterns

### Key Components

- **StatusBadge**: Visual status indicators with icons
- **SectionHeader**: Consistent page headers with icons
- **TrackingTimelineCard**: Interactive parcel tracking timeline
- **CreateParcelForm**: Comprehensive parcel creation form
- **Dashboard Layouts**: Responsive dashboard templates

### Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Breakpoints**: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Adaptive layouts** that work on all screen sizes
- **Touch-friendly** interactions for mobile devices

## 🔐 Authentication Flow

### Login Process

1. User submits credentials via login form
2. Frontend sends request to `/auth/login`
3. Backend validates and returns JWT tokens
4. Tokens stored in HTTP-only cookies
5. User redirected based on role

### Token Management

- **Access tokens** for API requests (short-lived)
- **Refresh tokens** for automatic token renewal (long-lived)
- **Automatic refresh** when access token expires
- **Logout** clears all tokens and redirects

### Route Protection

- **withAuth HOC** wraps protected components
- **Role-based access** control at route level
- **Automatic redirects** for unauthorized access
- **Loading states** during authentication checks

## 📱 Responsive Features

### Mobile Optimizations

- **Collapsible sidebar** for mobile navigation
- **Touch-optimized** buttons and interactions
- **Responsive tables** with horizontal scrolling
- **Mobile-friendly forms** with proper input types

### Progressive Enhancement

- **Core functionality** works without JavaScript
- **Enhanced features** with JavaScript enabled
- **Offline capabilities** for cached data
- **Performance optimizations** for slower networks

## 🎯 User Roles & Permissions

### Super Admin / Admin

- **Full system access** and management capabilities
- **User management**: Create, update, block users
- **Parcel oversight**: View all parcels, update statuses
- **Division management**: Create and manage delivery divisions
- **Statistics dashboard**: System-wide analytics and reports

### Sender

- **Create parcels**: Comprehensive parcel creation form
- **Manage sent parcels**: View, track, and cancel sent parcels
- **Dashboard analytics**: Personal sending statistics
- **Delivery tracking**: Real-time status updates

### Receiver

- **Incoming parcels**: View parcels being sent to them
- **Delivery confirmation**: Confirm receipt of parcels
- **Tracking access**: Track incoming deliveries
- **Delivery history**: View past received parcels

### Common User (Sender + Receiver)

- **Dual functionality**: Combined sender and receiver features
- **Unified dashboard**: Single interface for all activities
- **Complete parcel history**: Both sent and received parcels
- **Enhanced tracking**: Comprehensive delivery overview

### Guest/Public

- **Parcel tracking**: Track parcels using tracking ID
- **No registration required**: Instant access to tracking
- **Limited access**: Read-only tracking information

## 🔄 State Management

### Redux Store Structure

```typescript

store:{

  baseApi:{

    queries:{/* RTK Query cache */},

    mutations:{/* Mutation states */},

}

}

```

### API Slices

- **authApi**: Authentication and user management
- **parcelApi**: Parcel operations and tracking
- **userApi**: User profile and management
- **divisionApi**: Division management
- **contactUsApi**: Contact form submissions

### Cache Management

- **Automated caching** with RTK Query
- **Optimistic updates** for better UX
- **Background refetching** for fresh data
- **Selective invalidation** of cache tags

## 🚀 Performance Optimizations

### Build Optimizations

- **Code splitting** by routes and components
- **Tree shaking** to eliminate dead code
- **Asset optimization** with Vite
- **Lazy loading** for non-critical components

### Runtime Performance

- **React.memo** for component memoization
- **useMemo** and **useCallback** for expensive calculations
- **Virtual scrolling** for large lists
- **Debounced searches** to reduce API calls

### Network Optimizations

- **Request deduplication** with RTK Query
- **Background sync** for offline support
- **Compressed assets** for faster loading
- **CDN integration** for static assets

## 🧪 Development Scripts

```bash

# Development server with hot reload

bun dev


# Build for production

bun run build


# Preview production build locally

bun run preview


# Lint code with ESLint

bun run lint


# Fix linting errors automatically

bun run lint:fix


# Type checking with TypeScript

bun run type-check


# Run tests (when implemented)

bun test


# Format code with Prettier

bun run format


# Install dependencies (faster than npm/yarn)

bun install


# Add new dependencies

bun add package-name


# Add dev dependencies

bun add -d package-name

```

## 📊 Build & Deployment

### Production Build

```bash

bun run build

```

This creates optimized production files in the `dist/` directory:

- Minified JavaScript and CSS
- Optimized images and assets
- Source maps for debugging
- Manifest files for caching

### Deployment Options

#### Vercel (Recommended)

```bash

# Install Vercel CLI

bun add -g vercel


# Deploy to Vercel

vercel --prod

```

#### Netlify

```bash

# Build and deploy

bun run build

# Upload dist/ folder to Netlify

```

#### Traditional Hosting

```bash

# Build the project

bun run build


# Upload dist/ contents to your web server

```

### Environment Variables for Production

```env

VITE_BASE_URL=https://your-api-domain.com/api/v1

VITE_FRONT_URL=https://your-frontend-domain.com

```

## 🔍 Troubleshooting

### Common Issues

#### 1. API Connection Issues

```bash

# Check if backend is running

curl http://localhost:4000/api/v1/health


# Verify environment variables

echo $VITE_BASE_URL

```

#### 2. Build Errors

```bash

# Clear node_modules and reinstall

rm -rf node_modules bun.lockb

bun install


# Clear Vite cache

rm -rf node_modules/.vite

```

#### 3. TypeScript Errors

```bash

# Run type checking

bun run type-check


# Update TypeScript

bun update typescript

```

#### 4. Authentication Issues

- Check that backend is configured with same CORS origins
- Verify JWT secrets match between frontend and backend
- Ensure cookies are being set properly

### Debug Mode

```bash

# Run with debug logging

DEBUG=* bun dev


# Check network requests in browser dev tools

# Verify Redux DevTools extension is installed

```

### Performance Benefits with Bun

- **⚡ 3x faster** package installation compared to npm
- **🚀 2x faster** development server startup
- **📦 Built-in bundler** optimized for speed
- **🔧 Zero configuration** TypeScript support
- **⭐ Native ESM** support with better tree-shaking

## 🤝 Contributing

We welcome contributions to improve the Fast Box frontend! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Ensure tests pass and code is properly typed
5. Submit a pull request with a clear description

### Coding Standards

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Write **self-documenting** code with clear variable names
- Add **comments** for complex business logic
- Ensure **responsive design** for all UI components

### Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all existing tests pass
4. Update the README if you change functionality
5. Request review from maintainers

## 🐛 Bug Reports & Feature Requests

### Reporting Bugs

Please use the GitHub issue tracker to report bugs. Include:

- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser and device** information
- **Console errors** if any

### Feature Requests

We love hearing about new feature ideas! Please include:

- **Clear description** of the feature
- **Use case** and benefits
- **Mockups or sketches** if applicable
- **Technical considerations** you've thought of

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **shadcn/ui** for beautiful, accessible components
- **Lucide** for the comprehensive icon library
- **RTK Query** for powerful data fetching
- **TypeScript** for type safety and developer experience

## 📞 Support & Contact

- **Email**: support@fastbox.com
- **GitHub**: https://github.com/Nifazur/Parcel-Delivery-System-Frontend
- **Backend Repository**: https://github.com/Nifazur/Parcel-Delivery-System
- **Live Demo**: https://fastbox-demo.vercel.app

---

**Built with ❤️ by the Fast Box Team**

*Fast, Reliable, Secure - The Future of Parcel Delivery*
