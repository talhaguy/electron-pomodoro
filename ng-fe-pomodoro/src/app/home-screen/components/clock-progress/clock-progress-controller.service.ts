import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Command } from './clock-progress-controller.enum';

@Injectable({
    providedIn: 'root',
})
export class ClockProgressControllerService {
    private commandSubjectMap: {
        [id: string]: Subject<Command>;
    } = {};

    private commandObservableMap: {
        [id: string]: Observable<Command>;
    } = {};

    constructor() {}

    public initController(id: string): void {
        if (this.commandSubjectMap[id] || this.commandObservableMap[id])
            throw new Error('ID already used for subject or observable map.');

        this.commandSubjectMap[id] = new Subject<Command>();
        this.commandObservableMap[id] = this.commandSubjectMap[
            id
        ].asObservable();
    }

    public deinitController(id: string): void {
        delete this.commandSubjectMap[id];
        delete this.commandObservableMap[id];
    }

    public isInitialized(id: string): boolean {
        return !!(this.commandSubjectMap[id] && this.commandObservableMap[id]);
    }

    public start(id: string): void {
        this.throwErrorForIdNotFoundInSubjectMap(id);

        this.commandSubjectMap[id].next(Command.Start);
    }

    public pause(id: string): void {
        this.throwErrorForIdNotFoundInSubjectMap(id);

        this.commandSubjectMap[id].next(Command.Pause);
    }

    public reset(id: string): void {
        this.throwErrorForIdNotFoundInSubjectMap(id);

        this.commandSubjectMap[id].next(Command.Reset);
    }

    public getObservable(id: string): Observable<Command> {
        if (!this.commandObservableMap[id])
            throw new Error('No id found for command observable.');

        return this.commandObservableMap[id];
    }

    private throwErrorForIdNotFoundInSubjectMap(id: string): void {
        if (!this.commandSubjectMap[id])
            throw new Error('No id found for command subject.');
    }
}
