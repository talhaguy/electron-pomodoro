import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
    public elapsedTime = 0;

    private unsubscribe = new Subject<void>();

    constructor(private timerStateService: TimerStateService) {}

    ngOnInit(): void {
        this.timerStateService.elapsedTime$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((elapsedTime) => {
                this.elapsedTime = elapsedTime;
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
