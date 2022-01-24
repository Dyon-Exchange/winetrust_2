# WineTrust

Monorepo for the WineTrust platform.

## Local Development

### Yarn Workspaces

This project uses yarn workspaces, clone the repo and run `yarn install` in the root folder. This will install all the dependencies for all the projects.

### Pre-Commit Hooks

This project uses the Labrys eslint config and pre-commit hooks to run eslint. After cloning the repo and installing dependencies, run `npm run prepare` in the root folder to install git hooks for all the projects.

### Installing Packages

Use `Yarn` to install any new packages, navigate to the project where the package is going to be installed and install normally.

## Deployment

### React App

The `main` branch and pull requests are automatically deployed on vercel.

Main Vercel Deployment: https://winetrust.vercel.app/




