// TODO: type better
export interface API {
    storage: {
        getData: () => Promise<{ [key: string]: any }>;
        saveData: (data: {
            [key: string]: any;
        }) => Promise<{ [key: string]: any }>;
    };
}
