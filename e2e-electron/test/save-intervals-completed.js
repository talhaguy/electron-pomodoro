const {
    createApplication,
    getByTestId,
    wait,
    deleteSavedData,
} = require('../util');
const assert = require('assert');

describe('Saved interval completed data', function () {
    this.timeout(30000);

    let app;

    beforeEach(async function () {
        await deleteSavedData();
    });

    beforeEach(async function () {
        app = await createApplication();
    });

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    async function saveInterval() {
        return getByTestId(app, 'play-button')
            .then((playBtn) => {
                // click play button to start timer
                return playBtn.click();
            })
            .then(() => {
                // now wait 5 seconds + 1 more second for a buffer for the timer to end
                return wait(6000);
            })
            .then(() => {
                // restart the application
                return app.restart();
            })
            .then(() => {
                // check if there is an interval counter
                return getByTestId(app, 'count-item');
            });
    }

    it('should save intervals completed to disk', function (done) {
        saveInterval().then((element) => {
            // there should be no element error indicating that the element is not found
            assert(typeof element.error === 'undefined');
            done();
        });
    });

    it('should delete saved intervals from disk', (done) => {
        // save interval data first so there is something to delete
        saveInterval()
            .then(() => {
                return getByTestId(app, 'delete-btn');
            })
            .then((deleteBtn) => {
                return deleteBtn.click();
            })
            .then(() => {
                // wait for animation transition out for interval counter
                return wait(3000);
            })
            .then(() => {
                // check for interval counter
                return getByTestId(app, 'count-item');
            })
            .then((element) => {
                // interval count should not be there
                assert(element.error.error === 'no such element');
            })
            .then(() => {
                // restart the application to make sure saved data in file system is really deleted
                return app.restart();
            })
            .then(() => {
                // check if there is not an interval counter
                return getByTestId(app, 'count-item');
            })
            .then((element) => {
                // interval count should not be there
                assert(element.error.error === 'no such element');
                done();
            });
    });
});
