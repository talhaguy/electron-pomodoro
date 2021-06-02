# NG Electron Pomodoro

This is the monorepo for the NG Electron Pomodoro app.

![Screenshot of app](screenshot.png)

## Tech

This repo uses:

- Electron
- Angular
- TypeScript
- Jest
- Spectron
- Cypress

## Packages

The top level folders are packages. Each package contains its own `README.md` inside.

## How to use the app

1. Install all dependencies for each package: `sh install-deps.sh`
1. Build the app: `sh build.sh`
1. Run the app: `cd ./main-preload && npm run start`

## A Note on E2E

There are two e2e packages in this monorepo. `e2e-electron` is using Spectron and the other one is using Cypress. Spectron is able to run an Electron app and can act as a true e2e test to verify the integration between the frontend and the NodeJS backend. The reason there is also a Cypress package is that it enables quick and easy testing for the frontend which would have been more cumbersome with Spectron alone. Cypress alone, however, does not have an Electron integration which makes testing that integration difficult. With both these packages, e2e testing is covered. The additional e2e package was worth the developer experience in this case.
