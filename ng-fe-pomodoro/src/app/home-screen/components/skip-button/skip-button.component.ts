import { Component, OnInit } from '@angular/core';
import { PlayState } from 'src/app/shared/models/play-state.model';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-skip-button',
    templateUrl: './skip-button.component.html',
    styleUrls: ['./skip-button.component.scss'],
})
export class SkipButtonComponent implements OnInit {
    constructor(private timerStateService: TimerStateService) {}

    ngOnInit(): void {}

    onClick(): void {
        this.timerStateService.updatePlayState(PlayState.Stopped);
    }
}
