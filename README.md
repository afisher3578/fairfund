## Forward Research - Fair Launch Platform

A modern React-based crowdfunding platform for Arweave ecosystem projects. The site features active and past campaign management, project detail pages with support functionality, and a clean, intuitive interface for discovering and backing decentralized projects.

### Features
- **Campaign Management**: Browse active and past campaigns with tabbed navigation
- **Project Details**: Interactive side panel with project information, funding progress, backers count, and days remaining
- **Support Pages**: Dedicated pages for each project with wallet connection and contribution functionality
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Campaign Stats**: Real-time display of funding progress, backers, and time remaining

### Tech Stack
- **React 18** + **TypeScript**
- **React Router DOM** for client-side routing
- **Vite** for dev server and build
- Custom hooks and components
- SVG assets and modern CSS

### Getting started
#### Prerequisites
- Node.js 18+ and npm

#### Install dependencies
```bash
npm install
```

#### Run the development server
```bash
npm run dev
```
This starts Vite with hot reloading.

#### Type-check and build for production
```bash
npm run build
```
This runs TypeScript type-checking (`tsc`) and generates a production build in `dist/`.

#### Preview the production build locally
```bash
npm run preview
```
Serves the built site from `dist/` using Vite’s preview server.

### Deploying to Arweave
This project ships with a convenience script to upload the production build to Arweave using `arx`.

#### Requirements
- `arx` CLI installed (from the ArDrive toolchain)
- A valid Arweave wallet file at the project root named `wallet.json`

#### Deploy
```bash
npm run deploy
```
This will:
- Build the project
- Upload the `dist/` directory to Arweave via `arx upload-dir` using `wallet.json`

Command details (from `package.json`):
```bash
npm run build && arx upload-dir dist -w ./wallet.json --index-file index.html -t arweave -h https://turbo.ardrive.io
```

### Project Structure
```
src/
  assets/                # SVG logos and icons for all projects
  globalHooks/           # Custom hooks (parallax scroll, typewriter, etc.)
  pages/
    ProjectSupport.tsx   # Individual project support/claim page
    ProjectSupport.css   # Styling for project support pages
  sections/
    01-header/           # Site header with logo
    02-main/             # Campaign listings with tabs and side panel
    03-footer/           # Site footer
  App.tsx                # Main app with React Router configuration
  main.tsx
```

### Notable Files
- `src/pages/ProjectSupport.tsx`: Individual project support page with funding details and contribution form
- `src/sections/02-main/Main.tsx`: Campaign grid with active/past tabs and project details side panel
- `src/App.tsx`: Router configuration with home and project routes
- `vite.config.ts`, `tsconfig.json`: Build and TypeScript configuration

### Routes
- `/` - Home page with campaign listings
- `/project/:projectId` - Individual project support page (e.g., `/project/permaweb-journal`)

### Scripts reference
- `dev`: Start Vite dev server
- `build`: Type-check and build for production
- `preview`: Preview the production build
- `deploy`: Build and upload `dist/` to Arweave using `arx`

### License
Proprietary. All rights reserved by Forward Research.
