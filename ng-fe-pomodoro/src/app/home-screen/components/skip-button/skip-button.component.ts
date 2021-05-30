import { Component } from '@angular/core';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-skip-button',
    templateUrl: './skip-button.component.html',
    styleUrls: ['./skip-button.component.scss'],
})
export class SkipButtonComponent {
    constructor(private timerStateService: TimerStateService) {}

    onClick(): void {
        this.timerStateService.skipInterval();
    }
}
