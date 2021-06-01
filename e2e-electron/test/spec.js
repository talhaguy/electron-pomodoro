const Application = require('spectron').Application;
const assert = require('assert');
const path = require('path');

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(function () {
        this.app = new Application({
            path: path.join(
                __dirname,
                '../../main-preload/NG Pomodoro-win32-x64/NG Pomodoro.exe'
            ),

            // Assuming you have the following directory structure

            //  |__ my project
            //     |__ ...
            //     |__ main.js
            //     |__ package.json
            //     |__ index.html
            //     |__ ...
            //     |__ test
            //        |__ spec.js  <- You are here! ~ Well you should be.

            // The following line tells spectron to look and use the main.js file
            // and the package.json located 1 level above.
            args: [path.join(__dirname, '../../main-preload/dist')],
        });
        return this.app.start();
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('shows an initial window', function () {
        return this.app.client.getWindowCount().then(function (count) {
            assert.strictEqual(count, 1);
        });
    });
});
