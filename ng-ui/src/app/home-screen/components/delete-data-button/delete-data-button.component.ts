import { Component, Inject } from '@angular/core';
import {
    Confirm,
    WindowConfirm,
} from 'src/app/shared/injection-tokens/confirm.injection-token';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-delete-data-button',
    templateUrl: './delete-data-button.component.html',
    styleUrls: ['./delete-data-button.component.scss'],
})
export class DeleteDataButtonComponent {
    constructor(
        @Inject(Confirm) private confirm: WindowConfirm,
        private timerStateService: TimerStateService
    ) {}

    delete() {
        const shouldDelete = this.confirm(
            'Are you sure you want to delete the number of focus intervals completed?'
        );

        if (!shouldDelete) return;

        this.timerStateService.resetNumIntervalsCompleted();
    }
}
