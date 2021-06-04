# e2e-ui

This package houses E2E tests for the `ng-ui` package. Note, it does not test the integration between the UI and Electron (the `e2e-electron` package covers that).

## Run tests

In the `ng-ui` package, run the following command to build for E2E.

```
npm run build:e2e
```

Still `ng-ui` package, start the server in E2E configuration.

```
npm run start:e2e
```

Finally, in this package, `e2e-ui`, run the tests.

```
npm run cypress:run
```

## Open Test Runner

If you want to open the test runner to run the tests of your choosing run the following.

```
npm run cypress:open
```
