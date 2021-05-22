const { contextBridge } = require('electron');
const fsPromises = require('fs/promises');
const path = require('path');

// TODO: use TS
// TODO: folder structure

const DATA_DIRECTORY = path.join(__dirname, 'save_data');
const SAVE_FILE = path.join(DATA_DIRECTORY, 'data.json');

function isDataValid(data) {
    console.log('type of data ', typeof data, data);
    if (typeof data.intervalsCompleted === 'number') {
        return true;
    }

    return false;
}

async function getDataFromSaveFile(fsPromises) {
    try {
        const data = await fsPromises.readFile(SAVE_FILE, { encoding: 'utf8' });
        console.log('before pase', data);
        const parsed = parseFileData(data);
        console.log('af pase', parsed);
        if (isDataValid(parsed)) {
            return parsed;
        } else {
            const err = new Error('Data is not valid');
            err.code = 'INVALID_DATA';
            throw err;
        }
    } catch (err) {
        console.log('There was an error');
        console.log(err.code);
        return handleReadFileErrors(err);
    }
}

function parseFileData(data) {
    try {
        return JSON.parse(data);
    } catch (err) {
        const custErr = new Error('Error parsing save data file.');
        custErr.code = 'PARSE_FAIL';
        throw custErr;
    }
}

async function handleReadFileErrors(err) {
    switch (err.code) {
        case 'ENOENT':
        case 'INVALID_DATA':
        case 'PARSE_FAIL':
            console.log(err.message);
            const data = {
                intervalsCompleted: 0,
            };
            try {
                await createSaveFileInFolder(fsPromises, data);
                return data;
            } catch (err) {
                console.log('Error while trying to create file');
                console.log(err);
                throw err;
            }
        default:
            throw err;
    }
}

async function createSaveFileInFolder(fsPromises, data) {
    try {
        await fsPromises.access(DATA_DIRECTORY);
        return writeFile(data);
    } catch (err) {
        console.log('Save data folder does not exist');
        console.log(err);

        return createDataDirAndWriteFile(data);
    }
}

async function writeFile(data) {
    let dataToSave = data;
    if (typeof dataToSave !== 'string') {
        dataToSave = JSON.stringify(data);
    }
    return fsPromises.writeFile(SAVE_FILE, dataToSave);
}

async function createDataDirAndWriteFile(data) {
    try {
        console.log('Creating folder');
        await fsPromises.mkdir(DATA_DIRECTORY);
        return writeFile(data);
    } catch (err) {
        console.log('Error creating folder');
        console.log(err);
        throw err;
    }
}

const api = {
    storage: {
        getData: (
            (fsPromises) => () =>
                getDataFromSaveFile(fsPromises)
        )(fsPromises),

        saveData: (
            (fsPromises) => (data) =>
                createSaveFileInFolder(fsPromises, data)
        )(fsPromises),
    },
};

contextBridge.exposeInMainWorld('api', api);
