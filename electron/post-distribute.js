const { mkdirSync } = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');

const PLATFORM_FOLDERS = {
    WINDOWS: 'NG Pomodoro-win32-x64',
};

mkdirSync(
    path.join(
        __dirname,
        PLATFORM_FOLDERS.WINDOWS,
        'resources',
        'ng-fe-pomodoro'
    )
);

const FE_DIST = path.join(
    __dirname,
    PLATFORM_FOLDERS.WINDOWS,
    'resources',
    'ng-fe-pomodoro',
    'dist'
);

mkdirSync(FE_DIST);

ncp(path.join(__dirname, '../ng-fe-pomodoro/dist'), FE_DIST, (err) => {
    if (err) {
        console.log('there was an err', err);
        return;
    }

    console.log('done');
});
