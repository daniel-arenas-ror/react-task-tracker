## Task Tracker Frontend Application

This repository contains the single-page application frontend for the Task Tracker, built with React, TypeScript, and bundled with Vite. this project is running [here](https://daniel-arenas-ror.github.io/react-task-tracker/)

# Technology Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool/Bundler:** Vite
- **API Client:** Axios
- **Testing:** Jest, React Testing Library, ts-jest (WIP [here](https://github.com/daniel-arenas-ror/react-task-tracker/pull/5))

## Getting Started

Follow these steps to set up and run the frontend application locally.
Prerequisites. 

You must have the following software installed:

  **Node.js: (LTS version 18+ is recommended)**  

  **npm or yarn (npm is used in the commands below)**  


## Project Setup

Navigate to the frontend directory and install dependencies:

```
# Install dependencies
npm install
```

## Environment Configuration

The application requires the backend API URL to function.
Create a file named .env.development in the root of the frontend directory.  
Add the environment variable for your Rails backend URL (which usually runs on port 3000):  

### .env.development
VITE_BACKEND_URL=http://localhost:3000/api/v1

### Run the Development Server

Start the Vite development server. It will typically open the application at http://localhost:5173.

```
npm run dev
```

## Project Architecture and Components

The application is structured to promote Separation of Concerns, with data management handled at the top level and presentation/input logic delegated to dedicated components.  

### Component	Responsibility

- [TaskList](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/components/TaskList.tsx)	State Management, API Orchestration, Loading/Error Handling.
- [TaskForm](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/components/TaskForm/index.tsx)	User Input, local form state management, calling the parent's onTaskCreated prop.
- [TaskItem](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/components/TaskItem/index.tsx)	Presentation of a single task's data and status.
- [api/repositories/tasks.ts](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/api/repositories/tasks/index.ts)	Functions to interact with the backend (uses Connector).
- [types/Task.ts](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/types/Task.ts)	TypeScript interfaces for strict data modeling.
- [axiosConf.ts](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/src/api/axiosConf/index.ts)	Configures the central, interceptor-equipped Axios instance.

## Why We Chose Vite

We chose Vite over traditional bundlers for its superior developer experience and performance:

**Speed:** Vite utilizes Native ES Modules in development, leading to instant server startup and lightning fast Hot Module Replacement. It avoids the need for a full re-bundling step every time you save a file.  

**Modern Tooling:** It uses esbuild for extremely fast TypeScript and JSX transformation, resulting in a development loop that feels instantaneous.  

**Simplicity:** It requires minimal configuration out of the box, handling TypeScript and asset bundling seamlessly.

## Running Tests (Jest) - This is a WIP feature

The project uses Jest with ts-jest for unit and component testing, leveraging React Testing Library for high-quality, user-centric tests.

### How to Execute Tests

Run the full test suite from the root of the frontend directory:

```
npm test
```

## Continuous Integration (CI)

Tests are automatically executed on every Pull Request via GitHub Actions configured in [.github/workflows/ci.yml](https://github.com/daniel-arenas-ror/react-task-tracker/blob/main/.github/workflows/test.yml).

## Deployment (GitHub Pages)

This guide shows how to deploy your client-side-only React application to GitHub Pages.

### Configure the homepage

Since GitHub Pages serves content from a subdirectory (e.g., yourusername.github.io/your-repo-name/), you must tell Vite where the application will be hosted.  

In your package.json, add the homepage property, replacing [REPO_NAME] with your actual repository name:
JSON

```
// package.json (Snippet)
{
  "name": "task-tracker-frontend",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://[YOUR-GITHUB-USERNAME].github.io/[REPO_NAME]", 
  // ... rest of file
}
```

### Update Vite Config for Base Path

Vite needs to know the base path for assets. Create or update vite.config.ts:
TypeScript

// vite.config.ts
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/[REPO_NAME]/', // Replace with your repository name!
});

```

### Build and Deploy Script

Add a custom script to your package.json to handle the build and deployment using the gh-pages package:
Bash

```
# Install the gh-pages package
npm install --save-dev gh-pages
```

In package.json:
```

// package.json (Scripts)
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "jest",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```

### Deploy

Execute the deployment script:

```
npm run deploy
```

This script will:

1. Run npm run build (predeploy).

1. Push the contents of the generated dist folder to the gh-pages branch of your repository.

1. GitHub Pages will then automatically serve your application from that branch.
