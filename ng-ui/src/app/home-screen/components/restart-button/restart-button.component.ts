import { Component } from '@angular/core';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-restart-button',
    templateUrl: './restart-button.component.html',
    styleUrls: ['./restart-button.component.scss'],
})
export class RestartButtonComponent {
    constructor(private timerStateService: TimerStateService) {}

    onClick(): void {
        this.timerStateService.resetTimer();
    }
}
