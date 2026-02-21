# Smart Sports MS - MERN Stack (TypeScript)

This project is a Management System for Smart Sports, built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript.

## Project Structure

- `backend/`: Node.js Express server with TypeScript and Mongoose.
- `frontend/`: React application built with Vite and TypeScript.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or a remote URI)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your MongoDB URI and Preferred Port.
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your backend API URL.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts

- **Backend**:
  - `npm run dev`: Starts the server with `ts-node-dev`.
  - `npm run build`: Compiles TypeScript to JavaScript in `dist/`.
  - `npm run start`: Runs the compiled server from `dist/`.
- **Frontend**:
  - `npm run dev`: Starts the Vite dev server.
  - `npm run build`: Builds the production-ready application.
  - `npm run preview`: Previews the production build locally.
