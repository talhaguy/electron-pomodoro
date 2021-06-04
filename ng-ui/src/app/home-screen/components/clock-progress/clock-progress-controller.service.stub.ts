import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Command } from './clock-progress-controller.enum';

@Injectable({
    providedIn: 'root',
})
export class ClockProgressControllerServiceStub {
    public initController(id: string): void {}

    public deinitController(id: string): void {}

    public isInitialized(id: string): boolean {
        return false;
    }

    public start(id: string): void {}

    public pause(id: string): void {}

    public reset(id: string): void {}

    public getObservable(id: string): Observable<Command> {
        return of();
    }
}
