import { SaveData } from '@app/shared';
import { DATA_DIRECTORY, SAVE_FILE } from './constants';
import { FSPromises } from './models';

function isDataValid(data: SaveData) {
    if (typeof data.intervalsCompleted === 'number') {
        return true;
    }

    return false;
}

export async function getDataFromSaveFile(fsPromises: FSPromises) {
    try {
        const data = await fsPromises.readFile(SAVE_FILE, { encoding: 'utf8' });
        const parsed = parseFileData(data);

        if (isDataValid(parsed)) {
            return parsed;
        } else {
            const err = new Error('Data is not valid');
            (err as any).code = 'INVALID_DATA';
            throw err;
        }
    } catch (err) {
        console.log(err.message);
        return handleReadFileErrors(fsPromises, err);
    }
}

function parseFileData(data: string) {
    try {
        return JSON.parse(data);
    } catch (err) {
        const custErr = new Error('Error parsing save data file.');
        (custErr as any).code = 'PARSE_FAIL';
        throw custErr;
    }
}

async function handleReadFileErrors(fsPromises: FSPromises, err: any) {
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
                console.log(err.message);
                throw err;
            }
        default:
            throw err;
    }
}

export async function createSaveFileInFolder(
    fsPromises: FSPromises,
    data: SaveData
) {
    try {
        await fsPromises.access(DATA_DIRECTORY);
        return writeFile(fsPromises, data);
    } catch (err) {
        console.log(err.message);
        console.log('Save data folder does not exist');
        return createDataDirAndWriteFile(fsPromises, data);
    }
}

async function writeFile(fsPromises: FSPromises, data: SaveData | string) {
    let dataToSave = data;
    if (typeof dataToSave !== 'string') {
        dataToSave = JSON.stringify(data);
    }
    return fsPromises.writeFile(SAVE_FILE, dataToSave);
}

async function createDataDirAndWriteFile(
    fsPromises: FSPromises,
    data: SaveData
) {
    try {
        await fsPromises.mkdir(DATA_DIRECTORY);
        return writeFile(fsPromises, data);
    } catch (err) {
        console.log('Error creating folder');
        console.log(err.message);
        throw err;
    }
}
