const Application = require('spectron').Application;
const path = require('path');
const { promises: fsPromises } = require('fs');

module.exports = {
    async createApplication() {
        const app = new Application({
            // The following line tells spectron to use the electron application binary
            // TODO: Make this eventually work with different platform binaries
            path: path.join(
                __dirname,
                '../../electron/NG Pomodoro-win32-x64/NG Pomodoro.exe'
            ),
            // The following line tells spectron to look and use the main.js
            args: [path.join(__dirname, '../../electron/dist')],
        });

        return app.start();
    },

    async getByTestId(app, testId) {
        return app.client.$('[data-testid="' + testId + '"]');
    },

    async wait(ms) {
        return new Promise((res) => {
            setTimeout(() => {
                res();
            }, ms);
        });
    },

    async deleteSavedData() {
        // TODO: Make this eventually work with different platform binaries
        return fsPromises.unlink(
            path.join(
                __dirname,
                '../../electron/NG Pomodoro-win32-x64/resources/app/dist/save_data/data.json'
            )
        );
    },
};
