import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-play-pause-button',
    templateUrl: './play-pause-button.component.html',
    styleUrls: ['./play-pause-button.component.scss'],
})
export class PlayPauseButtonComponent implements OnInit, OnDestroy {
    private playState: PlayState = PlayState.Stopped;
    private unsubscribe = new Subject<void>();

    constructor(private timerStateService: TimerStateService) {}

    public get label() {
        return this.playState === PlayState.Playing ? 'Pause' : 'Play';
    }

    public get icon() {
        return this.playState === PlayState.Playing
            ? 'assets/pause_white_24dp.svg'
            : 'assets/play_arrow_white_24dp.svg';
    }

    public ngOnInit(): void {
        this.timerStateService.playState$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((playState) => {
                console.log('got new play state', playState);
                this.playState = playState;
            });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public onClick(): void {
        if (
            this.playState === PlayState.Stopped ||
            this.playState === PlayState.Paused
        ) {
            this.timerStateService.startTimer();
        } else {
            this.timerStateService.pauseTimer();
        }
    }
}
