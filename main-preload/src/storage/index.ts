import { promises as fsPromises } from 'fs';
import { SaveData, StorageAPI } from '@app/shared';
import { createSaveFileInFolder, getDataFromSaveFile } from './save-data';

export const storageApi: StorageAPI = {
    getData: (
        (fsPromises) => () =>
            getDataFromSaveFile(fsPromises)
    )(fsPromises),

    saveData: (
        (fsPromises) => (data: SaveData) =>
            createSaveFileInFolder(fsPromises, data)
    )(fsPromises),
};
