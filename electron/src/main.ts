import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    const indexFile = path.join(
        __dirname,
        '..',
        '..',
        '/ng-fe-pomodoro/dist/ng-fe-pomodoro/index.html'
    );

    // Comment out for production
    // win.webContents.openDevTools();

    win.loadFile(indexFile);

    // https://github.com/electron/electron/issues/14978
    // Reloading with Angular router causes page to not load.
    // This will just load the index html on load fail.
    win.webContents.on('did-fail-load', () => {
        console.log('did-fail-load - reload app');
        win.loadURL(`file://${indexFile}`);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
