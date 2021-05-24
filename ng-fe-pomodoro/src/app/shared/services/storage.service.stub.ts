import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SaveData } from '@app/shared';

@Injectable({
    providedIn: 'root',
})
export class StorageServiceStub {
    public saveData(data: SaveData): Observable<SaveData> {
        return of();
    }

    public getData(): Observable<SaveData> {
        return of();
    }
}
