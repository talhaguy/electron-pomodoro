const assert = require('assert');
const util = require('../util');

describe('Application launch', function () {
    this.timeout(10000);

    let app;

    beforeEach(async function () {
        app = await util.createApplication();
    });

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', function (done) {
        app.client.getWindowCount().then(function (count) {
            assert.strictEqual(count, 1);
            done();
        });
    });
});
