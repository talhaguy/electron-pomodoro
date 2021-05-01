import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '../injection-tokens/window.injection-token';
import { IntervalType } from '../models/interval-type.model';
import { PlayState } from '../models/play-state.model';

@Injectable({
    providedIn: 'root',
})
export class TimerStateService implements OnInit {
    private playState = new BehaviorSubject<PlayState>(PlayState.Stopped);
    public playState$ = this.playState.asObservable();

    private elapsedTime = new BehaviorSubject<number>(0);
    public elapsedTime$ = this.elapsedTime.asObservable();

    private intervalType = new BehaviorSubject<IntervalType>(
        IntervalType.Focus
    );
    public intervalType$ = this.intervalType.asObservable();

    private intervalId?: number;
    private intervalsCompleted = 0;

    constructor(@Inject(WINDOW) private window: Window | null) {}

    public ngOnInit(): void {
        if (!this.window) {
            throw new Error('Window API not available.');
        }
    }

    public pauseTimer() {
        this.window?.clearInterval(this.intervalId);
        this.playState.next(PlayState.Paused);
    }

    public skipInterval() {
        this.window?.clearInterval(this.intervalId);
        this.elapsedTime.next(0);
        this.intervalType.next(
            this.getNextInterval(
                this.intervalType.value,
                this.intervalsCompleted
            )
        );
        this.playState.next(PlayState.Stopped);
    }

    public resetTimer() {
        this.window?.clearInterval(this.intervalId);
        this.elapsedTime.next(0);
        this.playState.next(PlayState.Stopped);
    }

    public startTimer() {
        this.playState.next(PlayState.Playing);

        this.intervalId = this.window?.setInterval(() => {
            this.elapsedTime.next(this.elapsedTime.value + 1);

            // TODO: dont hard code timer end value
            if (this.elapsedTime.value >= 5) {
                this.window?.clearInterval(this.intervalId);
                this.playState.next(PlayState.Stopped);
                this.elapsedTime.next(0);

                if (this.intervalType.value === IntervalType.Focus) {
                    this.intervalsCompleted += 1;
                    console.log('have now completed ', this.intervalsCompleted);
                }

                this.intervalType.next(
                    this.getNextInterval(
                        this.intervalType.value,
                        this.intervalsCompleted - 1
                    )
                );
            }
        }, 1000);
    }

    // TODO: put this in a utility service
    public getNextInterval(
        previousInterval: IntervalType,
        previousIntervalsCompleted: number
    ): IntervalType {
        if (
            previousInterval === IntervalType.LongBreak ||
            previousInterval === IntervalType.ShortBreak
        ) {
            return IntervalType.Focus;
        } else {
            // interval type was focus
            if ((previousIntervalsCompleted + 1) % 4 === 0) {
                return IntervalType.LongBreak;
            } else {
                return IntervalType.ShortBreak;
            }
        }
    }
}
