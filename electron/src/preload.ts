import { contextBridge } from 'electron';
import { API } from '@app/shared';
import { storageApi } from 'storage';

const api: API = {
    storage: storageApi,
};

contextBridge.exposeInMainWorld('api', api);
