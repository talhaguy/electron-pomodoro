import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '../injection-tokens/window.injection-token';
import { PlayState } from '../models/play-state.model';

@Injectable({
    providedIn: 'root',
})
export class TimerStateService implements OnInit {
    private playState = new BehaviorSubject<PlayState>(PlayState.Stopped);
    public playState$ = this.playState.asObservable();

    private elapsedTime = new BehaviorSubject<number>(0);
    public elapsedTime$ = this.elapsedTime.asObservable();

    private intervalId?: number;

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
        this.playState.next(PlayState.Stopped);
    }

    public reseTimer() {
        this.window?.clearInterval(this.intervalId);
        this.elapsedTime.next(0);
        this.playState.next(PlayState.Stopped);
    }

    public startTimer() {
        this.playState.next(PlayState.Playing);

        this.intervalId = this.window?.setInterval(() => {
            this.elapsedTime.next(this.elapsedTime.value + 1);

            if (this.elapsedTime.value >= 5000) {
                this.window?.clearInterval(this.intervalId);
                this.playState.next(PlayState.Stopped);
            }
        }, 1000);
    }
}
