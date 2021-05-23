import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Injectable({
    providedIn: 'root',
})
export class SavedDataResolver implements Resolve<boolean> {
    constructor(
        private storageService: StorageService,
        private timerStateService: TimerStateService
    ) {}

    /**
     *  Gets the saved data and updates the app state.
     *  Returns true if saved data was gotten successfully
     *  and returns false if not.
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.storageService.getData().pipe(
            tap((data) => {
                this.timerStateService.setNumIntervalsCompleted(
                    data.intervalsCompleted
                );
            }),
            map((data) => {
                return true;
            }),
            catchError((err) => {
                console.log('Could not load save data.');
                return of(false);
            })
        );
    }
}
