import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { WINDOW } from '../injection-tokens/window.injection-token';
import { IntervalType } from '../constants/interval-type.enum';
import { PlayState } from '../constants/play-state.enum';
import { TimerUtilityService } from './timer-utility.service';
import { StorageService } from './storage.service';

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
