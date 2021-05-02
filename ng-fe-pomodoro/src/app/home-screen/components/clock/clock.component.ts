import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerStateService } from '../../../shared/services/timer-state.service';
import { IntervalType } from '../../../shared/constants/interval-type.enum';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
    public elapsedTime = 0;

    private intervalType = IntervalType.LongBreak;
    private unsubscribe = new Subject<void>();

    constructor(private timerStateService: TimerStateService) {}

    public get intervalLabel() {
        switch (this.intervalType) {
            case IntervalType.Focus:
                return 'Focus';
            case IntervalType.ShortBreak:
                return 'Short Break';
            case IntervalType.LongBreak:
                return 'Long Break';
            default:
                return '';
        }
    }

    ngOnInit(): void {
        this.timerStateService.elapsedTime$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((elapsedTime) => {
                this.elapsedTime = elapsedTime;
            });

        this.timerStateService.intervalType$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((intervalType) => {
                this.intervalType = intervalType;
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
