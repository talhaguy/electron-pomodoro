const { mkdirSync } = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');

const PLATFORM_FOLDERS = {
    WINDOWS: 'NG Pomodoro-win32-x64',
};

// TODO: Make this work for other platforms as well
mkdirSync(
    path.join(
        __dirname,
        PLATFORM_FOLDERS.WINDOWS,
        'resources',
        'ng-ui'
    )
);

const FE_DIST = path.join(
    __dirname,
    PLATFORM_FOLDERS.WINDOWS,
    'resources',
    'ng-ui',
    'dist'
);

mkdirSync(FE_DIST);

ncp(path.join(__dirname, '../ng-ui/dist'), FE_DIST, (err) => {
    if (err) {
        console.log('there was an err', err);
        return;
    }

    console.log('done');
});
