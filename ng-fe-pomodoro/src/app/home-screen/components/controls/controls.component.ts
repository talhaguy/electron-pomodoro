import { Component, OnInit } from '@angular/core';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
    public playState$ = this.timerStateService.playState$;
    public playStates = PlayState;

    constructor(private timerStateService: TimerStateService) {}

    ngOnInit(): void {}
}
