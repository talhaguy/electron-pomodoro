# e2e-electron

This package houses E2E tests for the Electron and UI integration, e.g. being able to save data from the UI. Note, it does not test the rest of the UI wich does not interact with Electron (that is covered in the `e2e-ui` package).

## Run tests

In the UI package, `ng-ui`, run the following command to build for e2e.

```
npm run build:e2e
```

Then, in the `electron` package, run the following command to build the application for distribution.

```
npm run build:distribute
```

Finally, in this package, run the tests.

```
npm run test
```
