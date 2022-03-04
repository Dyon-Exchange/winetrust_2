# WineTrust

Monorepo for the WineTrust platform.

#### Local Development

### Yarn Workspaces

This project uses yarn workspaces, clone the repo and run `yarn install` in the root folder. This will install all the dependencies for all the projects.

### Pre-Commit Hooks

This project uses the Labrys eslint config and pre-commit hooks to run eslint. After cloning the repo and installing dependencies, run `npm run prepare` in the root folder to install git hooks for all the projects.

### Installing Packages

Use `Yarn` to install any new packages, navigate to the project where the package is going to be installed and install normally.

## Deployment

### Development

https://dev.winetrust.org - will automatically build if a feature branch is merged into "dev" branch.  

https://staging.winetrust.org - will automatically build once "dev" branch is merged into "staging" branch.

https://app.winetrust.org - will automatically build once "staging" branch is merged into "main" barnch.

Nothing is stopping anyone from merging any branch into dev, or staging or main.  This is a standard, not restricted, flow that is put in place.  

### React App

This is the WineTrust Inventory System that is currently minting wine Assets to Rinkeby and the minted NFTs are viewable in OpenSea.

### Koa App

Is the middleware with RESTful API endpoints that handles saving of records including interfacing with the Winetrust ERC1155 smart contract.

### Smart Contract

There is one smart contract implemented in this package - WineTrustToken.sol which is ERC1155.  There are scripts written for deployment, testing of the contract and setting "minter role" for a wallet address.

### Constract Address

Rinkeby Contract Address: 0x00F97A0f0FB628fe638a0BD216Ef0EE35a1cA7C5



