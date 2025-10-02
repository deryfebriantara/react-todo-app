# React Todo App

A simple, full-featured todo list application built with React and Vite, featuring user authentication and CRUD operations.

## Features

- User authentication with login system
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Edit todo items inline
- Persistent authentication with JWT tokens
- Clean and responsive UI

## Tech Stack

- **React** 19.1.1 - UI library
- **Vite** 7.1.7 - Build tool and dev server
- **ESLint** - Code linting

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Build

Build for production:
```bash
npm run build
```

## Lint

Run ESLint:
```bash
npm run lint
```

## Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Login.jsx       # Login form component
│   └── TodoList.jsx    # Todo list with CRUD operations
├── services/
│   └── api.js          # API service for backend communication
├── App.jsx             # Main app component with auth state
├── App.css             # App styles
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## API Endpoints

The app expects a backend API at `http://localhost:5000` with the following endpoints:

- `POST /login` - User login (returns JWT token)
- `GET /todos` - Get all todos (requires auth)
- `POST /todos` - Create new todo (requires auth)
- `PUT /todos/:id` - Update todo (requires auth)
- `DELETE /todos/:id` - Delete todo (requires auth)

## Authentication

The app uses JWT token-based authentication stored in localStorage. The token is automatically included in API requests and cleared on logout or unauthorized responses.

## License

MIT
