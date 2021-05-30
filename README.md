# NG Electron Pomodoro

This is the monorepo for the NG Electron Pomodoro app.

The top level folders are packages. Each package contains its own `README.md` inside.

## Tech

This repo uses:

- Electron
- Angular
- TypeScript
- Jest
<!--
TODO: Uncomment when e2e testing is added
- Cypress
  -->

## How to use the app

1. Install all dependencies for each package: `sh install-deps.sh`
1. Build the app: `sh build.sh`
1. Run the app: `cd ./main-preload && npm run start`
