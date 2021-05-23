import { InjectionToken } from '@angular/core';
import { API } from '@app/shared';

declare const api: API;

export const ApiToken = new InjectionToken<API>('Api', {
    providedIn: 'root',
    factory: () => {
        return typeof api !== 'undefined'
            ? api
            : {
                  storage: {
                      getData: () =>
                          Promise.reject(new Error('API not available')),
                      saveData: (data: { [key: string]: any }) =>
                          Promise.reject(new Error('API not available')),
                  },
              };
    },
});
