## fairfund

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
