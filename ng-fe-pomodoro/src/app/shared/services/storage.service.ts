import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API, SaveData } from '@app/shared';
import { ApiToken } from '../injection-tokens/api.injection-token';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor(@Inject(ApiToken) private api: API) {}

    public saveData(data: SaveData): Observable<SaveData> {
        return from(
            this.api.storage
                .saveData(data)
                .then(() => [null, null])
                .catch((err) => [null, err])
        ).pipe(
            map(([data, err]) => {
                if (err) {
                    throw err;
                }

                return data;
            }),
            catchError((err) => {
                // TODO: show alert
                console.log(err);
                throw err;
            })
        );
    }

    public getData(): Observable<SaveData> {
        return from(
            this.api.storage
                .getData()
                .then((data) => [data, null])
                .catch((err) => [null, err])
        ).pipe(
            map(([data, err]) => {
                if (err) {
                    throw err;
                }

                return data;
            }),
            catchError((err) => {
                // TODO: show alert
                console.log(err);
                throw err;
            })
        );
    }
}
