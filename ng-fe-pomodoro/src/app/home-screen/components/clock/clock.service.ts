import { Injectable } from '@angular/core';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { ClockProgressControllerService } from '../clock-progress/clock-progress-controller.service';

@Injectable({
    providedIn: 'root',
})
export class ClockService {
    constructor(
        private clockProgressControllerService: ClockProgressControllerService
    ) {}

    public getIntervalLabel(intervalType: IntervalType): string {
        switch (intervalType) {
            case IntervalType.Focus:
                return 'Focus';
            case IntervalType.ShortBreak:
                return 'Short Break';
            case IntervalType.LongBreak:
                return 'Long Break';
            default:
                return '';
        }
    }

    public runClockProgressControllerAction(
        progressId: string,
        playState: PlayState
    ): void {
        if (!this.clockProgressControllerService.isInitialized(progressId))
            return;

        switch (playState) {
            case PlayState.Playing:
                this.clockProgressControllerService.start(progressId);
                break;
            case PlayState.Paused:
                this.clockProgressControllerService.pause(progressId);
                break;
            case PlayState.Stopped:
                this.clockProgressControllerService.reset(progressId);
                break;
            default:
                break;
        }
    }
}
