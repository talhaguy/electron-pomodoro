import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss'],
    animations: [
        trigger('enterTrigger', [
            transition(':enter', [
                style({
                    opacity: 0,
                }),
                animate(
                    '300ms 50ms linear',
                    style({
                        opacity: 1,
                    })
                ),
            ]),
            transition(':leave', [
                animate(
                    '100ms',
                    style({
                        opacity: 0,
                    })
                ),
            ]),
        ]),
    ],
})
export class ControlsComponent {
    public playState$ = this.timerStateService.playState$;
    public playStates = PlayState;

    constructor(private timerStateService: TimerStateService) {}
}
