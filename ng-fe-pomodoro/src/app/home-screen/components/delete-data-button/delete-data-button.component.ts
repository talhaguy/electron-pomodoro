import { Component, Inject } from '@angular/core';
import { WINDOW } from 'src/app/shared/injection-tokens/window.injection-token';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-delete-data-button',
    templateUrl: './delete-data-button.component.html',
    styleUrls: ['./delete-data-button.component.scss'],
})
export class DeleteDataButtonComponent {
    constructor(
        @Inject(WINDOW) private window: Window,
        private timerStateService: TimerStateService
    ) {}

    delete() {
        const shouldDelete = this.window.confirm(
            'Are you sure you want to delete the number of focus intervals completed?'
        );

        if (!shouldDelete) return;

        this.timerStateService.resetNumIntervalsCompleted();
    }
}
