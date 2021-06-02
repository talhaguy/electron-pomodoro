const {
    createApplication,
    getByTestId,
    wait,
    deleteSavedData,
} = require('../util');

describe('Save intervals completed', function () {
    this.timeout(15000);

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

    it('should save an intervals completed to disk', function (done) {
        getByTestId(app, 'play-button')
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
            })
            .then(() => {
                // if successful, that means the interval counter is there
                done();
            });
    });
});
