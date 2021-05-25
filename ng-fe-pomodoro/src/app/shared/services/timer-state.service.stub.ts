import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerStateServiceStub {
    // test only subjects to be able to `.next` observables
    public playState = new Subject();
    public elapsedTime = new Subject();
    public intervalType = new Subject();
    public intervalsCompleted = new Subject();

    public playState$ = this.playState.asObservable();
    public elapsedTime$ = this.elapsedTime.asObservable();
    public intervalType$ = this.intervalType.asObservable();
    public intervalsCompleted$ = this.intervalsCompleted.asObservable();

    public pauseTimer(): void {}

    public skipInterval(): void {}

    public resetTimer(): void {}

    public startTimer(): void {}

    public setNumIntervalsCompleted(num: number): void {}

    public resetNumIntervalsCompleted(): void {}
}
