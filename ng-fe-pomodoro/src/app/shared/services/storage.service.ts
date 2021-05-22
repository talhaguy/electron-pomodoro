import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// TODO: use shorter path
import { API } from '../../../../../shared';
import { ApiToken } from '../injection-tokens/api.injection-token';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor(@Inject(ApiToken) private api: API) {}

    // TODO: type data better
    public saveData(data: {
        [key: string]: any;
    }): Observable<{ [key: string]: any }> {
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

    // TODO: type data better
    public getData(): Observable<{ [key: string]: any }> {
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
