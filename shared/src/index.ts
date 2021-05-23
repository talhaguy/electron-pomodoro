export interface API {
    storage: StorageAPI;
}

export interface StorageAPI {
    getData: () => Promise<SaveData>;
    saveData: (data: SaveData) => Promise<void>;
}

export interface SaveData {
    intervalsCompleted: number;
}
