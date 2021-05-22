export interface API {
    storage: {
        getData: () => Promise<SaveData>;
        saveData: (data: SaveData) => Promise<SaveData>;
    };
}

export interface SaveData {
    intervalsCompleted: number;
}
