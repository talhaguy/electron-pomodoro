# e2e-electron

This package houses e2e tests for the Electron and UI integration, e.g. being able to save data from the UI.

## Run tests

In the UI package, `ng-fe-pomodoro`, run the following command to build for e2e.

```
npm run build:e2e
```

Then in the electron package, `electron`, run the following command to build the application for distribution.

```
npm run distribute
```

Finally, in this package, run the tests.

```
npm run test
```
