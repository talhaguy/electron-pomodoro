import { Injectable } from '@angular/core';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { PlayState } from 'src/app/shared/constants/play-state.enum';

@Injectable({
    providedIn: 'root',
})
export class ClockServiceStub {
    public getIntervalLabel(intervalType: IntervalType): string {
        return '';
    }

    public runClockProgressControllerAction(
        progressId: string,
        playState: PlayState
    ): void {}
}
