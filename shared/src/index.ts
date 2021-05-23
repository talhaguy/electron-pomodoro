export interface API {
    storage: {
        getData: () => Promise<SaveData>;
        saveData: (data: SaveData) => Promise<void>;
    };
}

export interface SaveData {
    intervalsCompleted: number;
}
