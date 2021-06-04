import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '../injection-tokens/window.injection-token';
import { IntervalType } from '../constants/interval-type.enum';
import { PlayState } from '../constants/play-state.enum';
import { TimerUtilityService } from './timer-utility.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class TimerStateService {
    private playState = new BehaviorSubject<PlayState>(PlayState.Stopped);
    public playState$ = this.playState.asObservable();

    private elapsedTime = new BehaviorSubject<number>(0);
    public elapsedTime$ = this.elapsedTime.asObservable();

    private intervalType = new BehaviorSubject<IntervalType>(
        IntervalType.Focus
    );
    public intervalType$ = this.intervalType.asObservable();

    private intervalsCompleted = new BehaviorSubject<number>(0);
    public intervalsCompleted$ = this.intervalsCompleted.asObservable();

    private intervalId?: number;

    constructor(
        @Inject(WINDOW) private window: Window | null,
        private timerUtilityService: TimerUtilityService,
        private storageService: StorageService
    ) {
        if (!this.window) {
            throw new Error('Window API not available.');
        }
    }

    public pauseTimer(): void {
        this.window?.clearInterval(this.intervalId);
        this.playState.next(PlayState.Paused);
    }

    public skipInterval(): void {
        this.window?.clearInterval(this.intervalId);
        this.elapsedTime.next(0);
        const previousIntervalsCompleted =
            this.intervalsCompleted.value === 0
                ? 0
                : this.intervalsCompleted.value - 1;
        this.intervalType.next(
            this.timerUtilityService.getNextInterval(
                this.intervalType.value,
                previousIntervalsCompleted
            )
        );
        this.playState.next(PlayState.Stopped);
    }

    public resetTimer(): void {
        this.window?.clearInterval(this.intervalId);
        this.elapsedTime.next(0);
        this.playState.next(PlayState.Stopped);
    }

    public startTimer(): void {
        this.playState.next(PlayState.Playing);
        this.intervalId = this.window?.setInterval(
            () => this.timerInterval(),
            1000
        );
    }

    private timerInterval(): void {
        this.elapsedTime.next(this.elapsedTime.value + 1000);

        const intervalDuration = this.timerUtilityService.getIntervalDuration(
            this.intervalType.value
        );

        if (this.elapsedTime.value >= intervalDuration) {
            this.window?.clearInterval(this.intervalId);

            this.playState.next(PlayState.Stopped);
            this.elapsedTime.next(0);

            if (this.intervalType.value === IntervalType.Focus) {
                this.intervalsCompleted.next(this.intervalsCompleted.value + 1);
                this.storageService
                    .saveData({
                        intervalsCompleted: this.intervalsCompleted.value,
                    })
                    .subscribe(
                        () => {},
                        () => {}
                    );
            }

            this.intervalType.next(
                this.timerUtilityService.getNextInterval(
                    this.intervalType.value,
                    this.intervalsCompleted.value - 1
                )
            );
        }
    }

    public setNumIntervalsCompleted(num: number): void {
        this.intervalsCompleted.next(num);
    }

    public resetNumIntervalsCompleted(): void {
        this.intervalsCompleted.next(0);
        this.storageService
            .saveData({
                intervalsCompleted: 0,
            })
            .subscribe(
                () => {},
                () => {}
            );
    }
}
