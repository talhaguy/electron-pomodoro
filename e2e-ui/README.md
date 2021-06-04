# e2e-ui

This package houses e2e tests for the `ng-ui` package. Note, it does not test the integration between the UI and Electron (the `e2e-electron` package does this).

## Run tests

In the UI package, `ng-ui`, run the following command to build for e2e.

```
npm run build:e2e
```

Then in the electron package, `electron`, run the following command to build the application for distribution.

```
npm run distribute
```

Finally, in this package, run the tests.

```
npm run cypress:run
```

## Open Test Runner

If you want to open the test runner to run the tests of your choosing run the following.

```
npm run cypress:open
```
