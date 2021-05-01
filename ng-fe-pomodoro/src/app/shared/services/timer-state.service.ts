import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayState } from '../models/play-state.model';

@Injectable({
    providedIn: 'root',
})
export class TimerStateService {
    private playState = new BehaviorSubject<PlayState>(PlayState.Stopped);
    public playState$ = this.playState.asObservable();

    constructor() {}

    updatePlayState(playState: PlayState) {
        this.playState.next(playState);
    }
}
